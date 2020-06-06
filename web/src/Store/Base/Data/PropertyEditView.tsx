import * as React from 'react';
import { IModelUpdateInfo, ModelUpdateStageKind } from './IModelExtension';
import { PropertyExtension } from './PropertyExtension';
import { ModelEditContext } from './ModelEditView';
import { PropertyValidationResult } from './PropertyValidationResult';
import { controlEditType } from './ModelControlBase';

export interface PropertyEditViewChildrenProps {
    propExt: PropertyExtension<any>;
    onChange: (value: any) => void;
}

export interface PropertyEditViewChildrenState {
    value: any;
    validationResult: PropertyValidationResult;
}

export interface PropertyEditViewProps {
    type?: controlEditType;
    name: string;
    children: (props: PropertyEditViewChildrenProps, state: PropertyEditViewChildrenState, controlProps: any) => JSX.Element;
}

interface PropertyEditViewState {
    valid: boolean;
}

export function PropertyEditView(props: PropertyEditViewProps) {
    const context = React.useContext(ModelEditContext);
    const [, forceRender] = React.useReducer(s => s + 1, 0);

    const propExt = React.useMemo(() => context!.ext.getProperty(props.name), [context, props.name]);

    const onExtUpdate = React.useCallback((info?: IModelUpdateInfo<any>) => {
        if (info && info.kind === ModelUpdateStageKind.UpdateCompleted) {
            if (info.propExt!.name === propExt.name && propExt.isDirty) {
                forceRender({});
            }
        }
    }, []);

    React.useEffect(() => {
        const subscribtion = context!.ext.subUpdates$.subscribe(onExtUpdate);
        return () => {
            if (subscribtion) {
                subscribtion.unsubscribe();
            }
        };
    }, []);

    const onChange = React.useCallback(
        (thisValue: any) => {
            if (propExt) {
                propExt.update(thisValue);
            }
        },
        [propExt]
    );

    if (!propExt) {
        return <></>;
    }
    if (propExt.isArray) {
        return <div>Invalid, array</div>;
    }

    const value = `${propExt.value}`;
    const validationResult = propExt.validationResult;

    const controlProps = {
        id: propExt.name,
        label: propExt.label,
        onChange,
        error: !validationResult.valid,
        errors: validationResult.errors,
        value
    };

    return props.children(
        {
            propExt,
            onChange
        },
        {
            value,
            validationResult
        },
        controlProps
    );
}
