export enum ModelListColumnKind {
    colData = 0,
    colAction = 1
}

export interface ModelListColumn {
    name: string;
    colType: ModelListColumnKind;
}
