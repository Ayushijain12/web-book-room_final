import { IPrjValidation } from './IPrjValidation';
import { PropertyExtension } from '../PropertyExtension';

export class PrjRegExpValidation extends IPrjValidation {
    // @ts-ignore:
    private regExp: string;

    constructor(regExp: string, errorMessage: string) {
        super(errorMessage);
        this.regExp = regExp;
    }

    public validate(propExt: PropertyExtension<any>, value?: string): boolean {
        this._valid = false;

        if (value) {
            const patt = new RegExp(this.regExp);
            const res = patt.exec(value);
            if (res) {
                this._valid = true;
            }
        }
        return this.valid;
    }
}
