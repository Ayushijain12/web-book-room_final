import { IModelExtension } from '../Base/Data/IModelExtension';
import { ModelListColumnKind } from '../Base/Data/ModelListColumn';
import { PrjRequiredValidation } from '../Base/Data/Validations/PrjRequiredValidation';
import { PrjEmailValidation } from '../Base/Data/Validations/PrjEmailValidation';
import { PrjPhoneValidation } from '../Base/Data/Validations/PrjPhoneValidation';
import { number } from 'prop-types';

export interface UserDataModel {
    username: string;
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    phone_number: string;
    // status: string;
    group_name: string;
    password: string;
}
export class UserModelExtension extends IModelExtension<UserDataModel> {
    constructor() {
        super('UserDetails');
    }

    public init() {
        super.init();
        this._listColumns.push({
            name: 'Actions',
            colType: ModelListColumnKind.colAction
        });
    }

    protected _InitProperties() {
        this.addStdProperty<string>('username', 'UserName', [new PrjRequiredValidation('UserName required')]);
        this.addStdProperty<string>('name', 'Name', [new PrjRequiredValidation('Name required')]);
        this.addStdProperty<string>('email', 'Email Address', [new PrjRequiredValidation('email required'), new PrjEmailValidation('Please enter a valid email address')]);
        this.addStdProperty<string>('address', 'Address', [new PrjRequiredValidation('Address required')]);
        this.addStdProperty<string>('city', 'City', [new PrjRequiredValidation('City required')]);
        this.addStdProperty<string>('state', 'State', [new PrjRequiredValidation('State required')]);
        this.addStdProperty<string>('country', 'country', [new PrjRequiredValidation('country required')]);
        this.addStdProperty<string>('zipcode', 'Zipcode', [new PrjRequiredValidation('Zipcode required')]);
        this.addStdProperty<string>('phone_number', 'Phone Number', [new PrjRequiredValidation('Phone Number required'), new PrjPhoneValidation('Phone number must be 10 digit.')]);
        // this.addStdProperty<string>('status', 'status', []);
        this.addStdProperty<string>('group_name', 'Role Name', [new PrjRequiredValidation('Role Name required')]);
        this.addStdProperty<string>('password', 'Password', [new PrjRequiredValidation('Password required')]);
    }

    protected _InitModel(): UserDataModel {
        return {
            username: '',
            name: '',
            email: '',
            address: '',
            city: '',
            state: '',
            country: '',
            zipcode: '',
            phone_number: '',
            // status: '',
            group_name: '',
            password: ''
        };
    }

    protected _ToUpdateModel(isUpdate: boolean, input: UserDataModel) {
        return {
            username: input.username,
            name: input.name,
            email: input.email,
            address: input.address,
            city: input.city,
            state: input.state,
            country: input.country,
            zipcode: input.zipcode,
            phone_number: input.phone_number,
            // status: input.status,
            password: input.password,
            group_name : input.group_name
        };
    }
}
