declare module 'react-geocode' {
    import * as React from 'react';

    export interface GeocodeProps {
        setApiKey?: any,
        fromAddress?: any
    }

    export default class Geocode extends React.Component<GeocodeProps> {
    }
}
