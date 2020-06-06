export class ModelError {
    private _valid: boolean;
    private _errors: string[];

    constructor(valid: boolean, errors: string[]) {
        this._valid = valid;
        this._errors = errors;
    }

    public get valid(): boolean {
        return this._valid;
    }

    public get errors(): string[] {
        return this._errors;
    }
}
