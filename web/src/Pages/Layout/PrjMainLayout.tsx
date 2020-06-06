import * as React from 'react';
import PrjFooter from './PrjFooter';
import PrjHeader from './PrjHeader';
import PrjSidebar from './PrjSidebar';
import { SnackbarProvider } from 'notistack';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    min-height: 100vh;
`;
const Main = styled.div`
    /* max-width: 100%; */
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: auto;
    display: flex;
    flex-direction: row;
`;

interface IPrjMainLayoutState {
    isSidebarOpen: boolean;
}

class PrjMainLayout extends React.Component<any, IPrjMainLayoutState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isSidebarOpen: true
        };
        this.onHeaderMenuClick = this.onHeaderMenuClick.bind(this);
    }

    public onHeaderMenuClick() {
        this.setState({
            isSidebarOpen: !this.state.isSidebarOpen
        });
    }

    public render() {
        const { children } = this.props;

        return (
            <Wrapper>
                <SnackbarProvider>
                    <PrjHeader onMenuClick={this.onHeaderMenuClick} />
                    <Main>
                        <PrjSidebar open={this.state.isSidebarOpen} />
                        {children}
                    </Main>
                    <PrjFooter />
                </SnackbarProvider>
            </Wrapper>
        );
    }
}
export default PrjMainLayout;
