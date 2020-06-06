import * as React from 'react';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import InputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import styled from 'styled-components';

interface IPrjTextFieldProps {
    id?: string;
    label?: string;
    type?: string;
    name?: string;
    value?: string;
    disabled?: boolean;
    textarea?: boolean;
    rows?: number;
    cols?: number;
    onChange?: (value: any) => any;
    required?: boolean;
    errors?: string[];
    error?: boolean;
    width?: string;
    variant?: string;
    select?: boolean;
    defaultValue?: string;
}

const PrjFormControl = styled<FormControlProps & React.ComponentType<any>>(FormControl)`
    width: 100%;
`;

const PrjInput = styled<FormControlProps & React.ComponentType<any>>(TextField)`
    ${({ variant }) => (variant ? `variant: ${variant}` : 'outlined')};

    ${({ width }) => (width ? `width: ${width}` : '500px')};
`;

const PrjFormHelperText = styled<FormControlProps & React.ComponentType<any>>(FormHelperText)`
    ${({ width }) => (width ? `width: ${width}` : '500px')};
`;

export function PrjTextField(props: IPrjTextFieldProps) {
    const label = props.label ? props.label : props.id;

    function _onChange(e: any) {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    }

    return (
        <FormControl disabled={props.disabled} error={props.error} style={{ width: '100%' }}>
            <PrjInput id={props.id} label={props.label} type={props.type} onChange={_onChange} value={props.value} multiline={props.textarea} rows={props.rows} width={props.width} variant={props.variant} select={props.select} defaultValue={props.defaultValue} />
            <PrjFormHelperText>{props.errors}</PrjFormHelperText>
        </FormControl>
    );
}

export function PrjFileField(props: IPrjTextFieldProps) {
    const label = props.label ? props.label : props.id;

    function _onChange(e: any) {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    }

    return (
        <FormControl disabled={props.disabled} error={props.error} style={{ width: '100%' }}>
            <PrjInput id={props.id} label={props.label} type={props.type} InputLabelProps={{ shrink: true }} onChange={_onChange} value={props.value} rows={props.rows} width={props.width} variant={props.variant} defaultValue={props.defaultValue} />
            <PrjFormHelperText>{props.errors}</PrjFormHelperText>
        </FormControl>
    );
}

export function PrjDateTimePicker(props: IPrjTextFieldProps) {
    const label = props.label ? props.label : props.id;

    function _onChange(e: any) {
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    }

    return (
        <FormControl disabled={props.disabled} error={props.error} style={{ width: '100%' }}>
            <PrjInput id={props.id} label={props.label} type={props.type} InputLabelProps={{ shrink: true }} onChange={_onChange} value={props.value} rows={props.rows} width={props.width} variant={props.variant} defaultValue={props.defaultValue} />
            <PrjFormHelperText>{props.errors}</PrjFormHelperText>
        </FormControl>
    );
}


