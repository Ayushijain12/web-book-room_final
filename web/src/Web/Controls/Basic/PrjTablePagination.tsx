import * as React from 'react';
import { TablePagination } from '@material-ui/core';

interface IPrjTablePaginatonProps {
    rowsPerPageOptions?: number[];
    count: number;
    pageIndex: number;
    pageSize: number;
    onPageIndexChange: (e: any, page: number) => void;
    onPageSizeChange?: (e: any) => void;
}

function PrjTablePaginaton(props: IPrjTablePaginatonProps) {
    const onPageIndexChange = async (e: any, page: number) => {
        if (props.onPageIndexChange) {
            props.onPageIndexChange(e, page);
        }
    };

    const onPageSizeChange = async (e: any) => {
        if (props.onPageSizeChange) {
            props.onPageSizeChange(+e.target.value);
        }
    };

    return (
        <TablePagination
            rowsPerPageOptions={[5,10,15]}
            component="div"
            count={props.count}
            rowsPerPage={props.pageSize}
            page={props.pageIndex}
            backIconButtonProps={{
                'aria-label': 'Previous Page'
            }}
            nextIconButtonProps={{
                'aria-label': 'Next Page'
            }}
            onChangePage={onPageIndexChange}
            onChangeRowsPerPage={onPageSizeChange}
        />
    );
}

export default PrjTablePaginaton;
