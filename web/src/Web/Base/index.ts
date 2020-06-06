import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { PropsWithChildren } from 'react';

declare global {
    const __IS_SERVER__: boolean;
    interface Window {
        __PAGE_DATA__: any;
    }
}

export interface IAppModuleContext extends StaticContext {
    data: any;
}

export interface IPageProps extends PropsWithChildren<RouteComponentProps<{}, StaticContext, any>> {
    test1?: boolean;
}

export interface IRouteInfo {
    exact?: boolean;
    path: string;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}
