import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../Store';
import { IActionCallBackExtra } from '../../../Store/Base';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import PrjPanelItem from '../../../Web/Controls/Basic/PrjPanelItem';
import PrjPanel from '../../../Web/Controls/Basic/PrjPanel';
import PrjTablePaginaton from '../../../Web/Controls/Basic/PrjTablePagination';
import { PrjLabel22Green, PrjLabel16 } from '../../../Web/Controls/Basic/PrjLable';
import { Paper, Button } from '@material-ui/core';
import { systemAuthValidate, getSystemState } from '../../../Store/System/SystemActions';
import { getRoomListRequest} from '../../../Store/Room/RoomActions';
import { GreenButton } from '../../../Web/Controls/Basic/PrjButton';
import { Room_01Model } from '../../../Store/User/UserModel';
import { useModelEdit } from '../../../Store/Base/Data/ModelEditView';
import { PrjDateTimePicker } from '../../../Web/Controls/Basic/PrjTextField';
import { BookModel,BookModelExtension } from '../../../Store/Room/BookModel';


const TableWapper = styled(Paper)`
    margin-top: 3;
    margin-bottom: 3;
    overflow-x: auto;
    width: 100%;
`;

export default function PHRoom(props: any) {
    const dispatch = useDispatch();
    const RoomList = useSelector((state: AppState) => state.Room.IRoomList);
    console.log(RoomList);
    const [open, setOpen] = React.useState(false);

    const [totalRecord, setTotalRecord] = React.useState(0);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

   
    const totalRecordCallBack = React.useCallback(async (getState, error?, extra?: IActionCallBackExtra) => {
        if (extra && extra!.data) {
            setTotalRecord(extra!.data);
        }
    }, []);

    React.useEffect(() => {
        async function loadData() {
            await dispatch(getRoomListRequest(pageIndex, rowsPerPage, totalRecordCallBack));
        }
        loadData();
    }, []);

    const handleChangePage = React.useCallback(
        async (e: any, newPage: number) => {
            setPageIndex(newPage);
            await dispatch(getRoomListRequest(newPage, rowsPerPage, totalRecordCallBack));
        },
        [rowsPerPage]
    );

    const handleChangeRowsPerPage = React.useCallback(async (e: any) => {
        setRowsPerPage(e);
        setPageIndex(0);
        await dispatch(getRoomListRequest(0, e, totalRecordCallBack));
    }, []);

    const actionCallBack = React.useCallback(async getState => {
        const localSystem = getSystemState(getState());
        if (localSystem.isAuthenticated) {
            props.history.push('/room/list');
        }
    }, []);

    React.useEffect(() => {
        async function loadData() {
            await dispatch(systemAuthValidate(actionCallBack));
        }
        loadData();
    }, []);

    return (
            <PrjPanel width="100%" m="10px" fdirection="column" overflowX="auto">
                <PrjPanel width="100%">
                    <PrjPanelItem width="70%" im="25px">
                        <PrjLabel22Green label="Book Rooms" />
                    </PrjPanelItem>
                </PrjPanel>
                <PrjPanel m="20px 0 0 0">
                    <TableWapper>
                        <Table style={{ overflowX: 'auto', height: 100 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: 16, padding: '15px 10px 15px 14px' }}>Name</TableCell>
                                    <TableCell style={{ fontSize: 16, padding: '15px 10px 15px 14px' }}>Status</TableCell>
                                    <TableCell style={{ fontSize: 16, padding: '15px 10px 15px 14px' }}>Description</TableCell>
                                    <TableCell style={{ fontSize: 16, padding: '15px 10px 15px 14px' }}>{}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {RoomList.length > 0 ? (
                                    <>
                                        {RoomList.map((row: Room_01Model) => {
                                            return (
                                                <TableRow hover={true} key={row.id} >
                                                    <TableCell component="th" scope="row">{row.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {row.status}
                                                    </TableCell>
                                                    <TableCell>{row.desription}</TableCell>
                                                    <TableCell>
                                                        <GreenButton
                                                            width="100px"
                                                            label="Book"
                                                            onClick={async () => {
                                                                props.history.push(`/bookroomDetails/${row.id}`);
                                                            }}
                                                        />
                                                        {/* <Dialog open={open} onClose={handleClose} aria-labelledby="max-width-dialog-title">
                                                            <DialogTitle id="max-width-dialog-title">Set Timing</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText>
                                                                    Room can be booked for 3 hours only.
                                                            </DialogContentText>
                                                                select your Start Time
                                                            <PrjDateTimePicker type="time" />
                                                            <GreenButton label="Submit" />

                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={handleClose} color="primary">
                                                                    Close
                                                            </Button>
                                                            </DialogActions>
                                                        </Dialog> */}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </>
                                ) : (
                                        <tr>
                                            <td colSpan={100}>
                                                <PrjPanelItem width="100%" ip="20px">
                                                    <PrjLabel16 label="No Records" />
                                                </PrjPanelItem>
                                            </td>
                                        </tr>
                                    )}
                            </TableBody>
                        </Table>
                    </TableWapper>
                    <PrjPanelItem width="100%">
                        <TableWapper>
                            <PrjTablePaginaton
                                count={totalRecord}
                                pageIndex={pageIndex}
                                pageSize={rowsPerPage}
                                onPageIndexChange={handleChangePage}
                                onPageSizeChange={handleChangeRowsPerPage}
                            />
                        </TableWapper>
                    </PrjPanelItem>
                </PrjPanel>
            </PrjPanel>
    );
}
