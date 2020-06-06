import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 60px;
`;
const PrjAppBar = styled.header`
    top: auto;
    bottom: 0;
    left: auto;
    right: 0;
    position: fixed;
    color: #fff;
    background-color: #00946a;
    min-width: 100%;
    display: flex;
    z-index: 1100;
    box-sizing: border-box;
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

interface IPrjFooterProps {
    onclick?: () => any;
}

const PrjFooter = (props: IPrjFooterProps) => {
    return (
        <Wrapper>
            <React.Fragment>
                <PrjAppBar>
                    <PrjToolbar />
                </PrjAppBar>
            </React.Fragment>
        </Wrapper>
    );
};

export default PrjFooter;
