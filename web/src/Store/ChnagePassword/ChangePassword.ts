import { IModelExtension } from '../Base/Data/IModelExtension';
import { ModelListColumnKind } from '../Base/Data/ModelListColumn';
import { PrjRequiredValidation } from '../Base/Data/Validations/PrjRequiredValidation';
import { PrjCompareValidation } from '../Base/Data/Validations/PrjCompareValidation';

export interface ChangePasswordModel {
    otp : string;
    password: string;
    confirm_password: string;
}

export class ChangePasswordExtension extends IModelExtension<ChangePasswordModel> {
    constructor() {
        super('IChangePassword');
    }

    public init() {
        super.init();
        this._listColumns.push({
            name: 'Actions',
            colType: ModelListColumnKind.colAction
        });
    }

    protected _InitProperties() {
        this.addStdProperty<string>('password', 'New Password', [new PrjRequiredValidation('Password required')]);
        this.addStdProperty<string>('confirm_password', 'Confirm Password', [
            new PrjRequiredValidation('confimPassword required'),
            new PrjCompareValidation('password', 'Password and confirm password should be match')
        ]);
        this.addStdProperty<string>('otp', 'otp', [new PrjRequiredValidation('otp required')]);
    }

    protected _InitModel(): ChangePasswordModel {
        return {
            otp : '',
            password: '',
            confirm_password: ''
        };
    }

    protected _ToUpdateModel(isUpdate: boolean, input: ChangePasswordModel) {
        return {
            otp : input.otp,
            password: input.password,
            confirm_password: input.confirm_password
        };
    }
}
