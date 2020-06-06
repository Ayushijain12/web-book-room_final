import { IModelExtension } from '../Base/Data/IModelExtension';
import { ModelListColumnKind } from '../Base/Data/ModelListColumn';
import { PrjRequiredValidation } from '../Base/Data/Validations/PrjRequiredValidation';
// import { PrjPasswordValidation } from '../Base/Data/Validations/PrjPasswordValidation';

export interface ForgetPasswordinfo {
    email: string;
}
export interface ChangePasswordinfo {
    otp : string;
    password: string;
    confirm_password: string;
}

export interface LoginModel {
    Username: string;
    Password: string;
}

export class LoginModelExtension extends IModelExtension<LoginModel> {
    constructor() {
        super('IEnterUsername');
    }

    public init() {
        super.init();
        this._listColumns.push({
            name: 'Actions',
            colType: ModelListColumnKind.colAction
        });
    }

    protected _InitProperties() {
        this.addStdProperty<string>('Username', 'Username', [new PrjRequiredValidation('Username required')]);
        this.addStdProperty<string>('Password', 'Password', [new PrjRequiredValidation('Password required')]);
        // new PrjPasswordValidation('Password Must be contain Digits & Capital Characters.'
    }

    protected _InitModel(): LoginModel {
        return {
            Username: '',
            Password: ''
        };
    }

    protected _ToUpdateModel(isUpdate: boolean, input: LoginModel) {
        return {
            Username: input.Username,
            Password: input.Password
        };
    }
}
