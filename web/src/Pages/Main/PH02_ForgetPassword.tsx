import * as React from 'react';
import { useDispatch } from 'react-redux';
import { systemAuthValidate, getSystemState, systemAuthForgetPasswordInit } from '../../Store/System/SystemActions';
import { ForgetPasswordModel, ForgetPasswordExtension } from '../../Store/ForgetPassword/ForgetPassword';
import { useModelEdit } from '../../Store/Base/Data/ModelEditView';
import { PropertyEditView } from '../../Store/Base/Data/PropertyEditView';
import PrjPanel from '../../Web/Controls/Basic/PrjPanel';
import PrjPanelItem from '../../Web/Controls/Basic/PrjPanelItem';
import { GreenButton16 } from '../../Web/Controls/Basic/PrjButton';
import { PrjLabel16BlackCenter } from '../../Web/Controls/Basic/PrjLable';
import { PrjTextField } from '../../Web/Controls/Basic/PrjTextField';
import { Paper } from '@material-ui/core';
import logo from '../../assets/images.png';

const PHForgetPassword = (props: any) => {
    const dispatch = useDispatch();

    const actionCallBack = React.useCallback(async getState => {
        const localSystem = getSystemState(getState());
        if (localSystem.isAuthenticated) {
            props.history.push('/forgetpassword');
        }
    }, []);

    React.useEffect(() => {
        async function loadData() {
            await dispatch(systemAuthValidate(actionCallBack));
        }
        loadData();
    }, []);

    const handleSave = React.useCallback(
        async (data1: ForgetPasswordModel, isUpdate1: boolean) => {
            await dispatch(systemAuthForgetPasswordInit(data1, actionCallBack));
            props.history.push('/');
             props.history.push('/change/password');
        }, []);

    const [ModelEditView, modelProps] = useModelEdit<ForgetPasswordModel>({
        extFn: () => new ForgetPasswordExtension(),
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
                                <abbr title="Room Booking"><img style={{ height: 100, width: 100 }} src={logo} /></abbr>
                                <PrjLabel16BlackCenter label="Room Booking" />
                            </PrjPanelItem>
                            <PrjPanelItem aitems="flex-start" width="85%" ip="10px 10px 0px 35px">
                                <PropertyEditView name="email" >
                                    {(props1, state, controlProps) => <PrjTextField label="Email Address" variant="outlined" {...controlProps} width="300px" />}
                                </PropertyEditView>
                            </PrjPanelItem>
                            <PrjPanel width="100%" m="0 0 20px 0px">
                                <PrjPanelItem ip="10px 10px 30px 30px" width="50%" >
                                    <GreenButton16 label="Verify" width="90%" onClick={modelProps.onSave} />
                                </PrjPanelItem>
                                <PrjPanelItem ip="10px 10px 30px 20px">
                                    <GreenButton16 label="Resend Link" width="100%" onClick={() =>{ props.history.push('/changePassword/769abee4bfd7a4c7404028317f0ceebe');}} />
                                </PrjPanelItem>
                            </PrjPanel>
                        </PrjPanel>
                    </Paper>
                </PrjPanelItem>
            </PrjPanel>
        </ModelEditView>

    );
};
export default PHForgetPassword;