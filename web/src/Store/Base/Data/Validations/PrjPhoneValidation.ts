import { PrjRegExpValidation } from './PrjRegExpValidation';

export class PrjPhoneValidation extends PrjRegExpValidation {
    constructor(errorMessage: string) {
        super('^\\d{10}$', errorMessage);
    }
}
