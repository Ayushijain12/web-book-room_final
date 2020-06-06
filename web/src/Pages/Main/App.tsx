import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PrjMainLayout from '../Layout/PrjMainLayout';
import { IPageProps } from '../../Web/Base';
import { unathenticatedRoutes, authenticatedRoutes } from './routes';
import { getSystemState, systemAuthValidate, systemCLearError } from '../../Store/System/SystemActions';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
// @ts-ignore
import loding from '../../assets/loding.svg';

const GlobalStyle = createGlobalStyle`
	html {
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	*, *::before, *::after {
		box-sizing: inherit;
	}
	body {
		margin: 0;
		background-color: #fafafa;
	}
	@media print {
		body {
			background-color: #fff;
		}
	}
`;

const App = (props: IPageProps) => {
    const dispatch = useDispatch();
    const systemState = useSelector(getSystemState);

    const showOverlay = React.useMemo(() => {
        if (systemState.actionError) {
            return true;
        }
        return systemState.actionLoading > 0;
    }, [systemState]);

    const actionCallBack = React.useCallback(async getState => {
        const localSystem = getSystemState(getState());
        if (!localSystem.isAuthenticated) {
            props.history.push('/login');
        }
    }, []);

    React.useEffect(() => {
        async function loadData() {
            await dispatch(systemAuthValidate(actionCallBack));
        }
        loadData();
        return () => {
           //
        };
    }, []);

    const onBackdropPress = React.useCallback(async () => {
        if (systemState.actionError) {
            await dispatch(systemCLearError());
        }
    }, [systemState.actionError]);

    let child = <div />;
    if (showOverlay) {
        if (systemState.actionLoading > 0) {
            child = (
                <>
                    <img style={{ height: 100, width: 100 }} src={loding} />
                </>
            );
        } else if (systemState.actionError) {
            child = (
                <>
                    <DialogTitle id="alert-dialog-title">{'Error'}</DialogTitle>
                    <div style={{ width: 300, height: 100, padding: 20 }}>{systemState.actionError}</div>
                </>
            );
        }
    }

    if (!systemState.isAuthenticatedValidated) {
        return <></>;
    }
    return (
        <React.Fragment>
            <GlobalStyle />
            {systemState.isAuthenticated ? (
                <PrjMainLayout>
                    <Switch>
                        {authenticatedRoutes.map((route, i) => {
                            return <Route key={i} path={route.path} component={route.component} />;
                        })}
                    </Switch>
                </PrjMainLayout>
            ) : (
                    <Switch>
                        {unathenticatedRoutes.map((route, i) => {
                            return <Route key={i} path={route.path} component={route.component} />;
                        })}
                    </Switch>
                )}
            <Dialog open={showOverlay} onClose={onBackdropPress} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                {child}
            </Dialog>
        </React.Fragment>
    );
};

export default withRouter(App);
