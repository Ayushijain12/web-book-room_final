import { PropertyExtension } from '../PropertyExtension';

export abstract class IPrjValidation {
    protected _valid: boolean;
    protected _message: string;

    constructor(message: string) {
        this._message = message;
        this._valid = true;
    }

    public init(propExt: PropertyExtension<any>) {
        //
    }

    public cleanup() {
        //
    }

    public abstract validate(propExt: PropertyExtension<any>, value?: any): boolean;

    public get message(): string {
        return this._message;
    }

    public get valid(): boolean {
        return this._valid;
    }
}
