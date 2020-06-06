import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#00946a',
            dark: '#00cc92',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000'
        }
    },
    props: {
        MuiButton: {
            variant: 'contained',
            color: 'primary'
        }
    },
    typography: {}
});
