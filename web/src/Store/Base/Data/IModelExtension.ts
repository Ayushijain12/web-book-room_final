import { IPrjValidation } from './Validations/IPrjValidation';
import { PropertyExtension, PropertyExtensionKind } from './PropertyExtension';
import { ModelError } from './ModelError';
import { ModelListColumnKind, ModelListColumn } from './ModelListColumn';
import { Subject } from 'rxjs';
import * as _ from 'lodash';

export enum ModelUpdateStageKind {
    PostValueUpdate = 1,
    PostValidate = 2,
    ModelPostValidate = 3,
    UpdateCompleted = 4,
    ModelUpdateCompleted = 5
}
export interface IModelUpdateInfo<T> {
    kind: ModelUpdateStageKind;
    ext: IModelExtension<T>;
    propExt?: PropertyExtension<any>;
    updatedProps?: string[];
}

export abstract class IModelExtension<T> {
    public subUpdates$ = new Subject<IModelUpdateInfo<T>>();

    protected _data: T;
    protected _defaultData: T;
    protected _properties: Array<PropertyExtension<any>>;
    protected _error: ModelError;
    protected _listColumns: ModelListColumn[];

    private _name: string;
    private _updateInProgress: boolean;

    constructor(name: string) {
        this._name = name;
        this._properties = [];

        this._defaultData = this._InitModel();
        this._data = this._defaultData;
        this._error = new ModelError(true, []);
        this._listColumns = [];

        this._updateInProgress = false;
    }

    public init() {
        this._InitProperties();

        this._properties.forEach(props => {
            props.init();
            if (props.name !== 'id') {
                this._listColumns.push({
                    name: props.name,
                    colType: ModelListColumnKind.colData
                });
            }
        });
    }

    public cleanup() {
        this._properties.forEach(props => {
            props.cleanup();
        });
    }

    public get name(): string {
        return this._name;
    }

    public get listColumns(): ModelListColumn[] {
        return this._listColumns;
    }

    public get defaultData(): T {
        return this._defaultData;
    }

    public getData(): T {
        return this._data;
    }

    public setData(data: T) {
        this._data = Object.assign({}, data);
    }

    public update(name: string, value: any, propExt?: PropertyExtension<any>) {
        const propExt1 = propExt || this.getProperty(name);
        this._onUpdate(propExt1, value);
    }

    public updateArray(name: string, index: number, value: any, propExt?: PropertyExtension<any>) {
        const propExt1 = propExt || this.getProperty(name);
        this._onUpdate(propExt1, value, index);
    }

    public updateArrayAdd(name: string, propExt?: PropertyExtension<any>) {
        const propExt1 = propExt || this.getProperty(name);
        // @ts-ignore
        const index = this._data[this._name].length;
        // @ts-ignore
        this._data[this._name][index] = '';
    }

    public async validate(): Promise<boolean> {
        const valid = this._onValidate(true);
        const errors: string[] = !valid ? ['Found model error, first resolve that.'] : [];
        this._error = new ModelError(valid, errors);
        this._onUpdateCompleted();
        return valid;
    }

    public updateValidation(propName: string, errors: string[]) {
        const propExt = this.getProperty(propName);
        propExt.updateValidation(errors);
        this._onUpdateCompleted();
    }

    public getInputData(isUpdate: boolean): T {
        return this._ToUpdateModel(isUpdate, this._data);
    }

    public get error(): ModelError {
        return this._error;
    }

    public get validationErrors(): string[] {
        const ret: string[] = [];
        for (const prop of this._properties) {
            if (prop.isArray) {
                _.forEach(prop.validationResult.errors, error => {
                    ret.push(error);
                });
                _.forEach(prop.validationResult.arrayErrors, (arrError, index) => {
                    _.forEach(arrError.errors, error => {
                        ret.push(error);
                    });
                });
            } else {
                _.forEach(prop.validationResult.errors, error => {
                    ret.push(error);
                });
            }
        }
        return ret;
    }

    public getProperty<P>(name: string): PropertyExtension<P> {
        for (const prop of this._properties) {
            if (prop.name === name) {
                return prop;
            }
        }
        throw new Error(`Property '${name}' not found`);
    }

    protected addStdProperty<P>(name: string, label: string, validations: IPrjValidation[]): PropertyExtension<P> {
        const prop = new PropertyExtension<P>(this, PropertyExtensionKind.PropTypeStd, name, label, validations, undefined);
        this._properties.push(prop);
        return prop;
    }

    protected addStdArrayProperty<P>(name: string, label: string, arrayValidations: IPrjValidation[], typeValidations: IPrjValidation[]): PropertyExtension<P> {
        const prop = new PropertyExtension<P>(this, PropertyExtensionKind.PropTypeStdArray, name, label, typeValidations, arrayValidations);
        this._properties.push(prop);
        return prop;
    }

    protected _onUpdate(propExt: PropertyExtension<any>, value: any, index?: number) {
        const name = propExt.name;
        if (index && index > -1) {
            // @ts-ignore
            const prevValue = this._data[name][index];
            if (prevValue === value) {
                return;
            }
            // @ts-ignore
            this._data[name][index] = value;
        } else {
            // @ts-ignore
            const prevValue = this._data[name];
            if (prevValue === value) {
                return;
            }
            // @ts-ignore
            this._data[name] = value;
        }
        propExt.dirtyMark();

        _.forEach(propExt.dependents, x => {
            x.dirtyMark();
        });

        this.subUpdates$.next({
            kind: ModelUpdateStageKind.PostValueUpdate,
            ext: this,
            propExt
        });

        this._onValidate(false);
        this._onUpdateCompleted();
    }

    protected _onValidate(validateAll: boolean): boolean {
        let valid = true;
        for (const prop of this._properties) {
            if (prop.isDirty || validateAll) {
                const ret = prop.validate();
                valid = valid && ret;
            }
        }
        const updatedProps: string[] = [];
        for (const prop of this._properties) {
            if (prop.isDirty) {
                updatedProps.push(prop.name);
                this.subUpdates$.next({
                    kind: ModelUpdateStageKind.PostValidate,
                    ext: this,
                    propExt: prop
                });
            }
        }
        if (updatedProps.length > 0) {
            this.subUpdates$.next({
                kind: ModelUpdateStageKind.ModelPostValidate,
                ext: this,
                updatedProps
            });
        }
        return valid;
    }

    protected _onUpdateCompleted() {
        const updatedProps: string[] = [];
        for (const prop of this._properties) {
            if (prop.isDirty) {
                updatedProps.push(prop.name);
                this.subUpdates$.next({
                    kind: ModelUpdateStageKind.UpdateCompleted,
                    ext: this,
                    propExt: prop
                });
                prop.dirtyClear();
            }
        }
        if (updatedProps.length > 0) {
            this.subUpdates$.next({
                kind: ModelUpdateStageKind.ModelUpdateCompleted,
                ext: this,
                updatedProps
            });
        }
    }

    protected abstract _InitProperties(): void;
    protected abstract _InitModel(): T;
    protected abstract _ToUpdateModel(isUpdate: boolean, input: T): any;
}
