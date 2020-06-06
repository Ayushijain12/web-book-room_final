import { IPrjValidation } from './Validations/IPrjValidation';
import { PrjRequiredValidation } from './Validations/PrjRequiredValidation';
import { PropertyValidationResult } from './PropertyValidationResult';
import { IModelExtension } from './IModelExtension';
import * as _ from 'lodash';

export enum PropertyExtensionKind {
    PropTypeStd = 0,
    PropTypeStdArray = 1
}

export class PropertyExtension<T> {
    public static propTypeStd = 0;

    protected _parent: IModelExtension<any>;
    protected _propType: PropertyExtensionKind;
    protected _name: string;
    protected _label: string;
    protected _dependencies: Array<PropertyExtension<any>>;
    protected _dependents: Array<PropertyExtension<any>>;

    protected _typeValidations: IPrjValidation[];
    protected _typeRequiredValidation?: IPrjValidation;

    protected _arrayValidations: IPrjValidation[];
    protected _arrayRequiredValidation?: IPrjValidation;

    protected _validationResult: PropertyValidationResult;

    protected _lastValue: any;
    protected _valid: boolean;
    protected _isDirty: boolean;
    protected _isDirtyValidated: boolean;

    constructor(
        parent: IModelExtension<any>,
        propType: PropertyExtensionKind,
        name: string,
        label: string,
        typeValidations?: IPrjValidation[],
        arrayValidations?: IPrjValidation[]
    ) {
        this._parent = parent;
        this._propType = propType;
        this._name = name;
        this._label = label;
        this._dependencies = [];
        this._dependents = [];

        this._typeValidations = typeValidations || [];
        this._typeRequiredValidation = undefined;

        this._arrayValidations = arrayValidations || [];
        this._arrayRequiredValidation = undefined;

        this._validationResult = new PropertyValidationResult(this._name, true, []);

        this._valid = true;
        this._isDirty = false;
        this._isDirtyValidated = false;
    }

    public init() {
        if (this._typeValidations.length > 0) {
            const typeValidations = this._typeValidations;
            this._typeValidations = [];
            typeValidations.forEach((validation: IPrjValidation) => {
                validation.init(this);
                if (validation instanceof PrjRequiredValidation) {
                    this._typeRequiredValidation = validation;
                } else {
                    this._typeValidations.push(validation);
                }
            });
        }
        if (this._arrayValidations.length > 0) {
            const arrayValidations = this._arrayValidations;
            this._arrayValidations = [];
            arrayValidations.forEach((validation: IPrjValidation) => {
                validation.init(this);
                if (validation instanceof PrjRequiredValidation) {
                    this._arrayRequiredValidation = validation;
                } else {
                    this._arrayValidations.push(validation);
                }
            });
        }
    }

    public cleanup() {
        if (this._typeRequiredValidation) {
            this._typeRequiredValidation.cleanup();
        }
        this._typeValidations.forEach((validation: IPrjValidation) => {
            validation.cleanup();
        });
    }

    public get parent(): IModelExtension<any> {
        return this._parent;
    }

    public get name(): string {
        return this._name;
    }

    public get label(): string {
        return this._label;
    }

    public get value(): T {
        return this._parent.getData()[this._name];
    }

    public get values(): T[] {
        return this._parent.getData()[this._name];
    }

    public get validationResult(): PropertyValidationResult {
        if (this.isDirty && !this._isDirtyValidated) {
            this.validate();
        }
        return this._validationResult;
    }

    public get isArray() {
        if (this._propType === PropertyExtensionKind.PropTypeStdArray) {
            return true;
        }
        return false;
    }

    public get dependents(): Array<PropertyExtension<any>> {
        return this._dependents;
    }

    public addDependencies(dependencies: string[]) {
        _.forEach(dependencies, x => {
            const prop1 = this.parent.getProperty(x);
            prop1._dependents.push(this);
            this._dependencies.push(prop1);
        });
    }

    public update(value: any) {
        this._parent.update(this._name, value, this);
    }

    public updateArray(index: number, value: string) {
        this._parent.updateArray(this._name, index, value, this);
    }

    public updateArrayAdd() {
        if (!this.isArray) {
            throw new Error(`Array type config '${this.name}' not found`);
        }
        this._parent.updateArrayAdd(this._name, this);
    }

    public get isDirty() {
        return this._isDirty;
    }

    public dirtyMark() {
        this._isDirty = true;
    }

    public dirtyClear() {
        this._lastValue = this.value;
        this._isDirty = false;
        this._isDirtyValidated = false;
    }

    public updateValidation(errors: string[]) {
        const newErrors = _.concat(this._validationResult.errors, errors);
        this._validationResult = new PropertyValidationResult(this._name, false, newErrors);
        this._isDirty = true;
    }

    public validate(): boolean {
        let isDependenciesUpdated = false;
        _.forEach(this._dependencies, x => {
            if (x._lastValue !== x.value) {
                isDependenciesUpdated = true;
            }
        });

        if (!isDependenciesUpdated) {
            if (this._propType === PropertyExtensionKind.PropTypeStdArray) {
                if (this._lastValue === this.values) {
                    this._isDirtyValidated = true;
                    return this._valid;
                }
            } else {
                if (this._lastValue === this.value) {
                    this._isDirtyValidated = true;
                    return this._valid;
                }
            }
        }

        let valid = true;

        if (this._propType === PropertyExtensionKind.PropTypeStdArray) {
            const arrayValidationResults: PropertyValidationResult[] = [];
            this.values.forEach((value, index: number) => {
                arrayValidationResults[index] = this._validate(value);
                valid = valid && arrayValidationResults[index].valid;
            });
            this._validationResult = new PropertyValidationResult(this._name, valid, [], arrayValidationResults);
        } else {
            this._validationResult = this._validate(this.value);
            valid = valid && this._validationResult.valid;
        }

        this._valid = valid;
        this._isDirty = true;
        this._isDirtyValidated = true;

        return valid;
    }

    protected _validate(value: any): PropertyValidationResult {
        let valid = true;
        const errors: string[] = [];

        const requiredResult = this._typeRequiredValidation ? this._typeRequiredValidation.validate(this, value) : new PrjRequiredValidation('dummy').validate(this, value);
        if (this._typeRequiredValidation && !requiredResult) {
            valid = false;
            errors.push(this._typeRequiredValidation.message);
        }

        this._typeValidations.forEach((validation: IPrjValidation) => {
            if (this._typeRequiredValidation && !requiredResult) {
                if (validation instanceof PrjRequiredValidation) {
                    errors.push(validation.message);
                }
            } else {
                const ret = validation.validate(this, value);
                if (!ret) {
                    valid = false;
                    errors.push(validation.message);
                }
            }
        });
        return new PropertyValidationResult(this._name, valid, errors);
    }
}
