import * as React from 'react';
import styled from 'styled-components';
import { PrjLabel12White, PrjLabel16White } from './PrjLable';
import { Button } from '@material-ui/core';

interface IBtnProps {
    label?: string;
    onClick?: (event: any) => any;
    disabled?: boolean;
    width?: string;
    height?: string;
    type?: any;
}

const ButtonEdit = styled(Button)<IBtnProps>`
    border-radius: 45px;
    background-color: #00946a;
    justify-content: center;
    ${({ width }) => (width ? `width: ${width}` : '50px')};
    ${({ height }) => (height ? `height: ${height}` : '50px')};
`;

export function GreenButton(props: IBtnProps) {
    return (
        <ButtonEdit width={props.width} height={props.height} onClick={props.onClick} disabled={props.disabled} type={props.type}>
            <PrjLabel12White label={props.label} />
        </ButtonEdit>
    );
}

export function GreenButton16(props: IBtnProps) {
    return (
        <ButtonEdit width={props.width} height={props.height} onClick={props.onClick} disabled={props.disabled} type={props.type}>
            <PrjLabel16White label={props.label} />
        </ButtonEdit>
    );
}
