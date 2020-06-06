import { PrjRegExpValidation } from './PrjRegExpValidation';

export class PrjFileValidation extends PrjRegExpValidation {
    constructor(errorMessage: string) {
        const allowedFiles = ['.csv'];
        super('([a-zA-Z0-9s_\\.-:])+(' + allowedFiles.join('|') + ')$', errorMessage);
    }
}
