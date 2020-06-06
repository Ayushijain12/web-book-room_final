import { PrjRegExpValidation } from './PrjRegExpValidation';

export class PrjPasswordValidation extends PrjRegExpValidation {
    constructor(errorMessage: string) {
        super('^[a-zA-Z]\\w{3,14}$', errorMessage);
    }
}
