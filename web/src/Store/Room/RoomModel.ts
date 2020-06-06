import { IModelExtension } from '../Base/Data/IModelExtension';
import { ModelListColumnKind } from '../Base/Data/ModelListColumn';
import { PrjRequiredValidation } from '../Base/Data/Validations/PrjRequiredValidation';
import { PrjEmailValidation } from '../Base/Data/Validations/PrjEmailValidation';
import { PrjPhoneValidation } from '../Base/Data/Validations/PrjPhoneValidation';

export interface RoomModel {
    name: string;
    desription : string;
    status: string;
}

export class RoomModelExtension extends IModelExtension<RoomModel> {
    constructor() {
        super('Roomdetails');
    }

    public init() {
        super.init();
        this._listColumns.push({
            name: 'Actions',
            colType: ModelListColumnKind.colAction
        });
    }

    protected _InitProperties() {
        this.addStdProperty<string>('name', 'Room Name', [new PrjRequiredValidation('Room Name required')]);        
        this.addStdProperty<string>('status', 'Status', []);
    }

    protected _InitModel(): RoomModel {
        return {
            name: '',
            desription : '',
            status: ''
        };
    }

    protected _ToUpdateModel(isUpdate: boolean, input: RoomModel) {
        return {
            name: input.name,
            desription : input.desription,
            status: input.status,
        };
    }
}
