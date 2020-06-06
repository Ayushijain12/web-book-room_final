import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';
import { FormLabel } from '@material-ui/core';

interface ILabelProps {
    label?: string;
}

const Label = styled(FormLabel)<ILabelProps>`
    width: 100%;
    color: #000000 !important;
    font-size: 16px !important;
    align-items: 'flex-start';
`;

export function PrjLabel16(props: ILabelProps) {
    return <Label>{props.label}</Label>;
}

const LabelCenter = styled(Label)`
    width: 100%;
    color: #000000 !important;
    font-size: 16px !important;
    text-align: center;
`;

export function PrjLabel16BlackCenter(props: ILabelProps) {
    return <LabelCenter>{props.label}</LabelCenter>;
}

const Label12White = styled(Label)`
    font-size: 12px !important;
    color: #ffffff !important;
`;

export function PrjLabel12White(props: ILabelProps) {
    return <Label12White>{props.label}</Label12White>;
}

const Label16White = styled(Label)`
    font-size: 16px !important;
    color: #ffffff !important;
`;

export function PrjLabel16White(props: ILabelProps) {
    return <Label16White>{props.label}</Label16White>;
}

const Label12Black = styled(Label)`
    font-size: 12px !important;
    text-align: justify;
`;

export function PrjLabel12Black(props: ILabelProps) {
    return <Label12Black>{props.label}</Label12Black>;
}

const Label16Green = styled(Label)`
    font-size: 16px !important;
    color: #00946a !important;
    font-weight: 'bold' !important;
`;

export function PrjLabel16Green(props: ILabelProps) {
    return <Label16Green>{props.label}</Label16Green>;
}

const Label22Green = styled(Label)`
    font-size: 22px !important;
    color: #00946a !important;
    font-weight: 'bold';
`;

export function PrjLabel22Green(props: ILabelProps) {
    return <Label22Green>{props.label}</Label22Green>;
}
