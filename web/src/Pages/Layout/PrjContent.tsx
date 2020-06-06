import * as React from 'react';
import { Theme, WithStyles, withStyles, createStyles } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
    createStyles({
        main: {
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: 'auto'
        }
    });

export class PrjContent1 extends React.Component<WithStyles<typeof styles>> {
    public render() {
        const { classes, children } = this.props;

        return <div className={classes.main}>{children}</div>;
    }
}
export const PrjContent = withStyles(styles)(PrjContent1);
