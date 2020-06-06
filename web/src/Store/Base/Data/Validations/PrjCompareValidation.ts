import { IPrjValidation } from './IPrjValidation';
import { PropertyExtension } from '../PropertyExtension';

export class PrjCompareValidation extends IPrjValidation {
    private _otherPropName: string;
    private _subscribtion: any;

    constructor(otherPropName: string, errorMessage: string) {
        super(errorMessage);
        this._otherPropName = otherPropName;
    }

    public init(propExt: PropertyExtension<any>) {
        propExt.addDependencies([this._otherPropName]);
    }

    public cleanup() {
        if (this._subscribtion) {
            this._subscribtion.unsubscribe();
        }
    }

    public validate(propExt: PropertyExtension<any>, value?: any): boolean {
        this._valid = false;
        const otherPropExt = propExt.parent.getProperty(this._otherPropName);
        const otherValue = otherPropExt.value;

        if (value === otherValue) {
            this._valid = true;
        }
        return this.valid;
    }
}
