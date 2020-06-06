import * as React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';

import styled from 'styled-components';

interface IPrjHeaderProps {
    onMenuClick?: () => any;
}

const Wrapper = styled.div`
    display: flex;

    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 60px;
    width: 100%;
`;
const PrjAppBar = styled.header`
    color: #fff;
    background-color: #00946a;
    position: static;
    display: flex;
    z-index: 1100;
    box-sizing: border-box;
    min-width: 100%;
    flex-shrink: 0;
    flex-direction: column;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;
const PrjToolbar = styled.div`
    align-items: center;
    justify-content: space-between;
    display: flex;
    position: relative;
    align-items: center;
    min-height: 56px;
    padding-left: 16px;
    padding-right: 16px;
      @media (min-width: 0px) and (orientation: landscape) {
        min-height: 48px;
    }
    @media (min-width: 600px) {
        min-height: 64px;
        padding-left: 24px;
        padding-right: 24px;
    }
`;
const PrjIconButton = styled<IconButtonProps & React.ComponentType<any>>(IconButton)`
    margin-left: -12px;
    margin-right: 20px;
`;
const PrjTypography = styled<TypographyProps & React.ComponentType<any>>(Typography)`
    flex-grow: 1;
`;

const PrjHeader = (props: IPrjHeaderProps) => {
    return (
        <Wrapper>
            <PrjAppBar>
                <PrjToolbar>
                    <PrjIconButton color="inherit" aria-label="Menu" onClick={props.onMenuClick}>
                        <MenuBookOutlinedIcon />
                    </PrjIconButton>
                    <PrjTypography variant="h6" color="inherit">
                       Room-Booking
                    </PrjTypography>
                </PrjToolbar>
            </PrjAppBar>
        </Wrapper>
    );
};

export default PrjHeader;
