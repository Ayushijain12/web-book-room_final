import * as React from 'react';
import styled from 'styled-components';

interface IPrjPanelProps {
    id?: string;
    width?: string;
    height?: string;
    m?: string;
    p?: string;
    bg?: string;
    fdirection?: string;
    fgrow?: string;
    children?: any;
    overflowX?: string;
}

const PanelBox = styled.div<IPrjPanelProps>`
    display: flex;
    flex-direction: ${({ fdirection }) => (fdirection ? `${fdirection}` : 'row')};
    flex-grow: ${({ fgrow }) => (fgrow ? `${fgrow}` : '0')};
    flex-wrap: wrap;
    ${({ width }) => (width ? `width: ${width}` : '')};
    ${({ height }) => (height ? `height: ${height}` : '')};
    ${({ m }) => (m ? `margin: ${m}` : '')};
    ${({ p }) => (p ? `padding: ${p}` : '')};
    ${({ bg }) => (bg ? `background-color: ${bg}` : '')};
    ${({ overflowX }) => (overflowX ? `overflow-X: ${overflowX}` : '')};
`;

export default function PrjPanel(props: IPrjPanelProps) {
    return (
        <PanelBox
            id={props.id}
            width={props.width}
            height={props.height}
            m={props.m}
            p={props.p}
            bg={props.bg}
            fdirection={props.fdirection}
            fgrow={props.fgrow}
            overflowX={props.overflowX}>
            {props.children}
        </PanelBox>
    );
}
