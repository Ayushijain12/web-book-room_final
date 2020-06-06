import '@babel/polyfill';
import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'jss';
import { jssPreset, createGenerateClassName, StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { ThemeProvider } from 'styled-components';
import { theme } from './Web/Theme/PrjTheme';
import './assets/favicon.ico';
import rootReducer from './Store';
import App from './Pages/Main/App';

const generateClassName = createGenerateClassName();
// @ts-ignore
const jss = create({
    ...jssPreset()
});

function configureStore() {

    // const SagaMiddleware = createSagaMiddleware();
    // export const store2 = createStore(rootReducer , applyMiddleware (SagaMiddleware));
    // SagaMiddleware.run();
    
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store1 = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));
    // @ts-ignore
    if (module.hot) {
        // @ts-ignore
        module.hot.accept(() => {
            store1.replaceReducer(rootReducer);
        });
    }

    return store1;
}

const store = configureStore();

class Main extends React.Component {
    public componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    public render() {
        return (
            <Provider store={store} key={Math.random()}>
                <BrowserRouter>
                    <StylesProvider jss={jss} generateClassName={generateClassName}>
                        <ThemeProvider theme={theme}>
                            <MuiThemeProvider theme={theme}>
                                <App />
                            </MuiThemeProvider>
                        </ThemeProvider>
                    </StylesProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

const Main1 = hot(Main);

ReactDOM.render(
    // @ts-ignore
    <Main1 />,
    document.getElementById('root') as HTMLElement
);
