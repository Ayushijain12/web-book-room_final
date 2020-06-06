import * as _ from 'lodash';

export class PropertyValidationResult {
    private _valid: boolean;
    private _name: string;
    private _errors: string[];
    private _arrayErrors: PropertyValidationResult[];

    constructor(name: string, valid: boolean, errors: string[], _arrayErrors?: PropertyValidationResult[]) {
        this._name = name;
        this._valid = valid;
        this._errors = errors;
        this._arrayErrors = _arrayErrors || [];
    }

    public get valid(): boolean {
        return this._valid;
    }

    public updateValid(errors: string[]) {
        if (errors.length > 0) {
            this._valid = false;
            this._errors = _.concat(this._errors, errors);
        }
    }

    public get errors(): string[] {
        return this._errors;
    }

    public get arrayErrors(): PropertyValidationResult[] {
        return this._arrayErrors;
    }

    public get name(): string {
        return this._name;
    }
}
