import * as React from 'react';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';

const PaperPanel = styled(Paper)`
    margin: 20px;
    width: 450px;
    min-height: 200px;
    padding: 20px;
`;

export const PrjContentPanel = (props: any) => {
    return <PaperPanel>{props.children}</PaperPanel>;
};
