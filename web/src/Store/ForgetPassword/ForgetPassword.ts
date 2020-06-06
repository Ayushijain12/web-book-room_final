import { IModelExtension } from '../Base/Data/IModelExtension';
import { ModelListColumnKind } from '../Base/Data/ModelListColumn';
import { PrjRequiredValidation } from '../Base/Data/Validations/PrjRequiredValidation';

export interface ForgetPasswordModel {
    email: string;
}

export class ForgetPasswordExtension extends IModelExtension<ForgetPasswordModel> {
    constructor() {
        super('IForgetPassword');
    }

    public init() {
        super.init();
        this._listColumns.push({
            name: 'Actions',
            colType: ModelListColumnKind.colAction
        });
    }

    protected _InitProperties() {
        this.addStdProperty<string>('email', 'email', [new PrjRequiredValidation('email required')]);
    }

    protected _InitModel(): ForgetPasswordModel {
        return {
            email: ''
        };
    }

    protected _ToUpdateModel(isUpdate: boolean, input: ForgetPasswordModel) {
        return {
            email: input.email
        };
    }
}
