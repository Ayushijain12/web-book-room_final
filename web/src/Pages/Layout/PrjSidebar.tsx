import * as React from 'react';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface ISidebarProps {
    open: boolean;
}

const Wrapper = styled.div<ISidebarProps>`
    display: ${props => (props.open ? 'flex' : 'none')};
    width: 250px;
    .navlink {
        text-decoration: none;
    }
`;
const PrjPaper = styled.div`
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    background-color: #fff;
    flex-grow: 0;
    width: 250px;
    height: 100%;
`;
const PrjList = styled.ul`
    width: 250px;
    padding: 0;
    margin: 0;
    position: relative;
    list-style: none;
`;
const PrjListItem = styled.li`
    width: 100%;
    display: flex;
    position: relative;
    box-sizing: border-box;
    text-align: left;
    align-items: center;
    padding: 11px 16px;
    margin: 0;
    border: 0;
    border-radius: 0;
    justify-content: flex-start;
    text-decoration: none;
    cursor: pointer;
    outline: none;
    vertical-align: middle;
    background-color: transparent;
    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
`;
const PrjNavLink = styled(NavLink)`
    width: 100%;
    display: flex;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.87);
    font-size: 1rem;
    font-weight: 400;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    line-height: 1.5em;
`;
const PrjListItemIcon = styled.div`
    color: rgba(0, 0, 0, 0.54);
    display: inline-flex;
    flex-shrink: 0;
    margin-right: 1px;
`;
const PrjListItemText = styled.div`
    flex: 1 1 auto;
    padding: 0 16px;
    min-width: 0;
    margin: 0;
    display: block;
`;

const PrjSidebar = (props: ISidebarProps) => {
    return (
        <Wrapper open={props.open}>
            <PrjPaper>
                <PrjList>
                    <PrjListItem>
                        <PrjNavLink to="/room/list">
                            <PrjListItemIcon>
                                <PeopleIcon />
                            </PrjListItemIcon>
                            <PrjListItemText>Book Rooms</PrjListItemText>
                        </PrjNavLink>
                    </PrjListItem>
                    <PrjListItem>
                        <PrjNavLink to="/room/details/list">
                            <PrjListItemIcon>
                                <PeopleIcon />
                            </PrjListItemIcon>
                            <PrjListItemText>History of Rooms</PrjListItemText>
                        </PrjNavLink>
                    </PrjListItem>
                    <PrjListItem>
                        <PrjNavLink to="/Logout">
                            <PrjListItemIcon>
                                <ExitToAppIcon />
                            </PrjListItemIcon>
                            <PrjListItemText>Logout</PrjListItemText>
                        </PrjNavLink>
                    </PrjListItem>
                </PrjList>
            </PrjPaper>
        </Wrapper>
    );
};

export default PrjSidebar;
