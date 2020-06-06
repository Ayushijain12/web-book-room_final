import { PrjRegExpValidation } from './PrjRegExpValidation';

export class PrjEmailValidation extends PrjRegExpValidation {
    constructor(errorMessage: string) {
        super(
            '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
            errorMessage
        );
    }
}
