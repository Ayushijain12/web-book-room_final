import { IPrjValidation } from './IPrjValidation';
import { PropertyExtension } from '../PropertyExtension';

export class PrjRangeValidation extends IPrjValidation {
    private minRange: string;
    private maxRange: string;

    constructor(errorMessage: string, minRange: string, maxRange: string) {
        super(errorMessage);
        this.minRange = minRange;
        this.maxRange = maxRange;
    }

    public validate(propExt: PropertyExtension<any>, value?: string): boolean {
        this._valid = false;
        if (value) {
            if (value.length === 6) {
                this._valid = true;
            }
        }
        return this._valid;
    }
}
