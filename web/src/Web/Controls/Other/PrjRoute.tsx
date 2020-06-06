import * as React from 'react';
import { RouteProps } from 'react-router-dom';

export const PrjRoute: React.StatelessComponent<RouteProps> = (props: RouteProps) => {
    if (!__IS_SERVER__) {
        if (props.location) {
            window.location.href = props.location.pathname;
        }
    }
    return <div>Redirecting</div>;
};
