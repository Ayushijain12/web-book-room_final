import * as React from 'react';
import styled from 'styled-components';

interface IPrjPanelItemProps {
    id?: string;
    width?: string;
    height?: string;
    im?: string;
    ip?: string;
    ib?: string;
    aitems?: string;
    fdirection?: string;
    fgrow?: string;
    f?: string;
    jc?: string;
    children?: any;
    overflowX?: string;
}

const PanelItem = styled.div<IPrjPanelItemProps>`
    display: flex;
    justify-content: ${({ jc }) => (jc ? `${jc}` : 'center')};
    align-items: ${({ aitems }) => (aitems ? `${aitems}` : 'center')};
    flex-direction: ${({ fdirection }) => (fdirection ? `${fdirection}` : 'column')};
    ${({ fgrow }) => (fgrow ? `flex-grow: ${fgrow}` : '')};
    ${({ f }) => (f ? `flex: ${f}` : '')};
    ${({ width }) => (width ? `width: ${width}` : '')};
    ${({ height }) => (height ? `height: ${height}` : '')};
    ${({ im }) => (im ? `margin: ${im}` : '')};
    ${({ ip }) => (ip ? `padding: ${ip}` : '')};
    ${({ ib }) => (ib ? `background-color: ${ib}` : '')};
    ${({ overflowX }) => (overflowX ? `overflow-X: ${overflowX}` : '')};
`;

export default function PrjPanelItem(props: IPrjPanelItemProps) {
    return (
        <PanelItem
            id={props.id}
            width={props.width}
            height={props.height}
            im={props.im}
            ip={props.ip}
            ib={props.ib}
            aitems={props.aitems}
            fdirection={props.fdirection}
            fgrow={props.fgrow}
            f={props.f}
            jc={props.jc}
            overflowX={props.overflowX}>
            {props.children}
        </PanelItem>
    );
}
