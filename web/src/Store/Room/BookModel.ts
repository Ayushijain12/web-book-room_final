import { IModelExtension } from '../Base/Data/IModelExtension';
import { ModelListColumnKind } from '../Base/Data/ModelListColumn';
import { PrjRequiredValidation } from '../Base/Data/Validations/PrjRequiredValidation';

export interface BookModel {
    start_time: string;
}

export class BookModelExtension extends IModelExtension<BookModel> {
    constructor() {
        super('Bookdetails');
    }

    public init() {
        super.init();
        this._listColumns.push({
            name: 'Actions',
            colType: ModelListColumnKind.colAction
        });
    }

    protected _InitProperties() {
        this.addStdProperty<string>('date', 'Book date', [new PrjRequiredValidation('Book date required')]);        
    }

    protected _InitModel(): BookModel {
        return {
            start_time: '',
        };
    }

    protected _ToUpdateModel(isUpdate: boolean, input: BookModel) {
        return {
            start_time: input.start_time
        };
    }
}
