import * as React from 'react';
import { Action } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { IModelExtension, IModelUpdateInfo } from './IModelExtension';
import { AppState } from '../../../Store';

export interface IModelEditContextValue {
    ext: IModelExtension<any>;
}

export const ModelEditContext = React.createContext<IModelEditContextValue | null>(null);

interface ModelEditViewRef {
    ctxValue: IModelEditContextValue;
}

export interface ModelEditViewChildrenProps<TModel> {
    fetching: boolean;
    ext: IModelExtension<TModel>;
    error?: any;
    error2?: any;
    valid: boolean;
    onSave: (e: any) => void;
}

interface IModelEditViewProps<TModel> {
    extFn: () => IModelExtension<TModel>;
    modelId?: string;
    isUpdate?: boolean;
    stateSelector?: (state: AppState) => TModel | undefined;
    fetchModelById?: (id?: string) => Promise<void>;
    handleSave?: (data: TModel, isUpdate: boolean, ext: IModelExtension<TModel>) => Promise<void>;
    onSave?: (ext: IModelExtension<TModel>, valid: boolean, data: TModel, isUpdate: boolean) => Promise<void>;
    onUpdate?: (ext: IModelExtension<TModel>, info?: IModelUpdateInfo<any>) => void;
}

interface IModelEditViewState<TModel> {
    fetching: boolean;
}

export interface UseModelEditRendererProps {
    children: JSX.Element;
}

export function useModelEdit<TModel>(params: IModelEditViewProps<TModel>): [(props: UseModelEditRendererProps) => JSX.Element, ModelEditViewChildrenProps<TModel>] {
    const contextRef = React.useRef<ModelEditViewRef>();
    const [, forceRender] = React.useReducer(s => s + 1, 0);

    const fakeStateSelector = (appState: AppState) => undefined;

    const stateSelector = React.useMemo(() => params.stateSelector || fakeStateSelector, [params.stateSelector]);
    const isUpdate = React.useMemo(() => (params.isUpdate ? true : false), [params.isUpdate]);

    const modelState: TModel | undefined = useSelector(stateSelector, (x, y) => {
        return contextRef.current ? x === y : false;
    });
    const [state, setState] = React.useState<IModelEditViewState<TModel>>({
        fetching: false
        // data: props.ext.defaultData
    });

    if (!contextRef.current) {
        const ctxExt = params.extFn();
        ctxExt.init();
        contextRef.current = {
            ctxValue: {
                ext: ctxExt
            }
        };
    }
    const ext = contextRef.current.ctxValue.ext;

    const onExtUpdate = React.useCallback(
        (info?: IModelUpdateInfo<any>) => {
            if (params.onUpdate) {
                params.onUpdate(ext, info);
            }
        },
        [params.onUpdate]
    );

    React.useEffect(() => {
        async function loadData() {
            if (params.fetchModelById) {
                await params.fetchModelById(params.modelId);
            }
        }

        const subscribtion = ext.subUpdates$.subscribe(onExtUpdate);
        if (isUpdate) {
            if (!modelState && params.fetchModelById) {
                setState({
                    fetching: true
                });
                loadData();
            }
        }
        return () => {
            if (subscribtion) {
                subscribtion.unsubscribe();
            }
            ext.cleanup();
        };
    }, []);

    React.useEffect(() => {
        if (isUpdate && modelState && ext.getData() !== modelState) {
            ext.setData(modelState);
            setState({
                fetching: false
            });
        }
    }, [isUpdate, modelState]);

    const onSave = React.useCallback(async () => {
        const valid = await ext.validate();
        const data = ext.getInputData(isUpdate);
        if (params.onSave) {
            await params.onSave(ext, valid, data, isUpdate);
        }
        if (valid) {
            if (params.handleSave) {
                await params.handleSave(data, isUpdate, ext);
            }
        } else {
            //
        }
    }, [isUpdate, ext, params.handleSave]);

    const renderer = React.useCallback((props: UseModelEditRendererProps): JSX.Element => {
        return <ModelEditContext.Provider value={contextRef.current!.ctxValue}>{props.children}</ModelEditContext.Provider>;
    }, []);

    return [
        renderer,
        {
            fetching: false,
            ext,
            valid: true,
            onSave
        }
    ];
}
