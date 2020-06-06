import { PropertyExtension } from './PropertyExtension';
import { PropertyValidationResult } from './PropertyValidationResult';

export type controlEditType = 'textbox' | 'select' | 'checkbox' | 'file';

export interface ModelControlEditProps {
    propExt: PropertyExtension<any>;
    onChange: (e: any) => void;
}

export interface ModelControlEditState {
    value: any;
    validationResult: PropertyValidationResult;
}

export function prepareEditTextboxProps(propExt: PropertyExtension<any>, validationResult: PropertyValidationResult, onChange: any): any {
    return {
        name: propExt.name,
        label: propExt.label,
        onChange,
        error: !validationResult.valid,
        errors: validationResult.errors
    };
}
