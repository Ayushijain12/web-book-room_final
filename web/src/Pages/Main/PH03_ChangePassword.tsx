import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { systemAuthValidate, getSystemState } from '../../Store/System/SystemActions';
import { ChangePasswordModel, ChangePasswordExtension } from '../../Store/ChnagePassword/ChangePassword';
import { useModelEdit } from '../../Store/Base/Data/ModelEditView';
import { PropertyEditView } from '../../Store/Base/Data/PropertyEditView';
import PrjPanel from '../../Web/Controls/Basic/PrjPanel';
import PrjPanelItem from '../../Web/Controls/Basic/PrjPanelItem';
import { GreenButton16 } from '../../Web/Controls/Basic/PrjButton';
import { PrjLabel16BlackCenter } from '../../Web/Controls/Basic/PrjLable';
import { PrjTextField } from '../../Web/Controls/Basic/PrjTextField';
import { Paper } from '@material-ui/core';
import { systemAuthResetPasswordInit } from '../../Store/System/SystemActions';
import logo from '../../assets/images.png';

const PHChangePassword = (props: any) => {
    const dispatch = useDispatch();
    const systemState = useSelector(getSystemState);

    const actionCallBack = React.useCallback(async getState => {
        const localSystem = getSystemState(getState());
        if (localSystem.isAuthenticated) {
            props.history.push('/changePassword');
            // /changePassword
        }
    }, []);

    React.useEffect(() => {
        async function loadData() {
            await dispatch(systemAuthValidate(actionCallBack));
        }
        loadData();
    }, []);

    const handleSave = React.useCallback(async (data1: ChangePasswordModel, isUpdate1: boolean) => {
        await dispatch(systemAuthResetPasswordInit(data1, actionCallBack));
        props.history.push('/login');
    }, []);

    const [ModelEditView, modelProps] = useModelEdit<ChangePasswordModel>({
        extFn: () => new ChangePasswordExtension(),
        handleSave,
        isUpdate: true
    });
    return (
        <ModelEditView>
            <PrjPanel height="100%">
                <PrjPanelItem width="100%" height="100%">
                    <Paper style={{ width: '400px', alignItems: 'center', display: 'flex' }}>
                        <PrjPanel width="100%" height="100%" m="20px">
                            <PrjPanelItem width="100%" aitems="center" ip="20px 0 0 0">
                                <abbr title="Room Booking">
                                    <img style={{ height: 100, width: 100 }} src={logo} />
                                </abbr>
                                <PrjLabel16BlackCenter label="Room Booking" />
                            </PrjPanelItem>
                            <PrjPanelItem aitems="flex-start" ip="10px 10px 0px 25px">
                            <PrjPanel m="5px 10px 5px 10px">
                                    <PropertyEditView name="otp">
                                        {(props1, state, controlProps) => <PrjTextField label="New Password" type="password" variant="outlined" {...controlProps} width="300px" />}
                                    </PropertyEditView>
                                </PrjPanel>
                                <PrjPanel m="5px 10px 5px 10px">
                                    <PropertyEditView name="password">
                                        {(props1, state, controlProps) => <PrjTextField label="New Password" type="password" variant="outlined" {...controlProps} width="300px" />}
                                    </PropertyEditView>
                                </PrjPanel>
                                <PrjPanel m="5px 10px 10px 10px">
                                    <PropertyEditView name="confirm_password">
                                        {(props1, state, controlProps) => (
                                            <PrjTextField label="confirm Password" type="password" variant="outlined" {...controlProps} width="300px" />
                                        )}
                                    </PropertyEditView>
                                </PrjPanel>
                            </PrjPanelItem>
                            <PrjPanel width="100%">
                                <PrjPanelItem ip="0 10px 50px 30px" width="50%">
                                    <GreenButton16 label="Submit" width="85%" onClick={modelProps.onSave} />
                                </PrjPanelItem>
                                <PrjPanelItem ip="0 10px 50px 10px" width="50%">
                                    <GreenButton16
                                        label="Back"
                                        width="85%"
                                        onClick={() => {
                                            props.history.push('/forgetpassword');
                                        }}
                                    />
                                </PrjPanelItem>
                            </PrjPanel>
                        </PrjPanel>
                    </Paper>
                </PrjPanelItem>
            </PrjPanel>
        </ModelEditView>
    );
};
export default PHChangePassword;
