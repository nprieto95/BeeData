import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#526cc5',
            main: '#124294',
            dark: '#001d65',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ffffff',
            main: '#fafafa',
            dark: '#c7c7c7',
            contrastText: '#000',
        },
        background: {
            default: '#fafafa'
        }
    },
});

export default theme;