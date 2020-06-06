import * as React from 'react';

interface PrjPanelCols {
    1920?: number;
    1280?: number;
    960?: number;
    600?: number;
}

export interface PrjPanelContextValue {
    width?: number;
    height?: number;
    margin?: string;
    padding?: string;
    bpoints: number[];
    cols?: PrjPanelCols;
    rows?: number | number[];
    unit: string;
}

export const PrjPanelContext = React.createContext<PrjPanelContextValue | null>(null);
