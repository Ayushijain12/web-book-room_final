import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModelEdit } from '../../../Store/Base/Data/ModelEditView';
import { PropertyEditView } from '../../../Store/Base/Data/PropertyEditView';
import { AppState } from '../../../Store';
import PrjPanelItem from '../../../Web/Controls/Basic/PrjPanelItem';
import PrjPanel from '../../../Web/Controls/Basic/PrjPanel';
import { PrjLabel22Green } from '../../../Web/Controls/Basic/PrjLable';
import { PrjTextField } from '../../../Web/Controls/Basic/PrjTextField';
import { GreenButton } from '../../../Web/Controls/Basic/PrjButton';
import { Paper } from '@material-ui/core';
import { BookModel, BookModelExtension } from '../../../Store/Room/BookModel';
import { PrjLabel12Black } from '../../../Web/Controls/Basic/PrjLable';
import { createBookRequest } from '../../../Store/Room/RoomActions';
import { IModelExtension } from '../../../Store/Base/Data/IModelExtension';
import { PrjDateTimePicker } from '../../../Web/Controls/Basic/PrjTextField';
import _ from 'lodash';
import { Room_01Model } from 'Store/User/UserModel';

export default function PHBookRoom(props: any) {
    const dispatch = useDispatch();
    const roomid = props.match.params.roomid;
    console.log(roomid);
    const RoomList = useSelector((state: AppState) => state.Room.IRoomList);
    console.log(RoomList);


    // const fakeState = (state: AppState) =>
    //     React.useMemo(() => {
    //         try {
    //             const room = _.find(state.Room.IRoomList, x => x.id === roomid);
    //             console.log(room , `room`);
    //             const ret: RoomModel = {
    //                 name: room!.name,
    //                 desription: room!.desription,
    //                 status: room!.status,
    //             };
    //             console.log(ret , `ret`);
    //             return ret;
    //         } catch {
    //             props.history.push('/room/list');
    //             alert('hrllo');
    //         }
    //     }, [roomid]);

    const handleSave = React.useCallback(async (data1: BookModel, isUpdate1: boolean) => {
         await dispatch(createBookRequest(data1, roomid ));
    }, []);

    const [ModelEditView, modelProps] = useModelEdit<BookModel>({
        extFn: () => new BookModelExtension(),
        handleSave,
        isUpdate: true
    });

    return (
        <ModelEditView>
            <PrjPanel m="20px">
                <Paper style={{ width: '725px', alignItems: 'center', display: 'flex' }}>
                    <PrjPanelItem width="100%" align-items="center" im="20px">
                        <PrjPanelItem width="100%" ip="0px 20px 60px 20px">
                            <PrjLabel22Green label=" Book Room:" />
                        </PrjPanelItem>
                    </PrjPanelItem>
                    <PrjPanel m="10px 10px 10px 30px" p="10px">
                        {/* <PrjPanel p="10px" width="300px">
                                <PropertyEditView name="name" type="textbox">
                                    {(props1, state, controlProps) => <PrjTextField value={state.value} variant="outlined" {...controlProps} />}
                                </PropertyEditView>
                            </PrjPanel> */}
                        <PrjPanel p="10px" width="300px">
                            <PrjTextField value="room1" variant="outlined" label="Room name" />
                        </PrjPanel>
                        <PrjPanel p="10px" width="300px">
                            <PrjTextField value="" variant="outlined" label="Description" />
                        </PrjPanel>
                        <PrjPanel p="10px" width="300px">
                            <PrjDateTimePicker type="datetime-local" variant="outlined" label="Enter StartTime" />
                            <PrjLabel12Black label="Room can be booked for 3 hours only" />     
                        </PrjPanel>
                        <PrjPanel m="10px 0 -10px 0  " width="300px">
                            <GreenButton label="submit" onClick={modelProps.onSave} />
                        </PrjPanel>
                        <PrjPanel m="-13px 0px 0px 100px" width="300px">
                            <GreenButton label="cancel" />
                        </PrjPanel>
                        {/* <PrjPanel p="10px" width="300px">
                            <PropertyEditView name="status" type="textbox">
                                {(props1, state, controlProps) => <PrjTextField value="hello" variant="outlined" {...controlProps} />}
                            </PropertyEditView>
                        </PrjPanel> */}
                    </PrjPanel>
                </Paper>
            </PrjPanel>
        </ModelEditView>
    );
}
