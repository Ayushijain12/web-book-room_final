import { IPrjValidation } from './IPrjValidation';
import { PropertyExtension } from '../PropertyExtension';

export class PrjRequiredValidation extends IPrjValidation {
    constructor(errorMessage: string) {
        super(errorMessage);
    }

    public validate(propExt: PropertyExtension<any>, value: any): boolean {
        this._valid = true;
        if (value === undefined) {
            this._valid = false;
        } else if (typeof value === 'string' && value.length <= 0) {
            this._valid = false;
        }
        return this._valid;
    }
}
