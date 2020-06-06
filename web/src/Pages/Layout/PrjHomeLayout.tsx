import * as React from 'react';
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles';
import PrjMainLayout from './PrjMainLayout';

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '100vh',
            margin: '0 10px'
        }
    });

interface IPrjHomeLayoutProps extends WithStyles<typeof styles> {
    htmlFor?: string;
}

export class PrjHomeLayout1 extends React.Component<IPrjHomeLayoutProps, any> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <PrjMainLayout />
            </div>
        );
    }
}

export const PrjHomeLayout = withStyles(styles)(PrjHomeLayout1);
