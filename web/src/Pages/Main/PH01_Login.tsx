import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { systemAuthValidate, getSystemState, systemAuthSignInInit } from '../../Store/System/SystemActions';
import { LoginModel, LoginModelExtension } from '../../Store/Login/LoginModel';
import { useModelEdit } from '../../Store/Base/Data/ModelEditView';
import { PropertyEditView } from '../../Store/Base/Data/PropertyEditView';
import { Paper, FormControl, Link } from '@material-ui/core';
import PrjPanel from '../../Web/Controls/Basic/PrjPanel';
import PrjPanelItem from '../../Web/Controls/Basic/PrjPanelItem';
import { GreenButton16 } from '../../Web/Controls/Basic/PrjButton';
import { PrjTextField } from '../../Web/Controls/Basic/PrjTextField';
import { PrjLabel16BlackCenter } from '../../Web/Controls/Basic/PrjLable';
import logo from '../../assets/images.png';


const PHLogin = (props: any) => {
    const dispatch = useDispatch();
    const systemState = useSelector(getSystemState);
    
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

    const handleSave = React.useCallback(
        async (data1: LoginModel, isUpdate1: boolean) => {
            console.log(data1 , `data1`);
            await dispatch(systemAuthSignInInit(data1, actionCallBack));
        }, []);

    const [ModelEditView, modelProps] = useModelEdit<LoginModel>({
        extFn: () => new LoginModelExtension(),
        handleSave,
        isUpdate: true
    });

    return (
        <ModelEditView>
            <PrjPanel height="100%" >
                <PrjPanelItem width="100%" height="100%">
                    <Paper style={{ width: '400px', alignItems: 'center', display: 'flex' }}>
                        <PrjPanel width="100%" height="100%" p="20px">
                            <PrjPanelItem width="100%" aitems="center" ip="20px 0 0 0">
                                <abbr title="Room Booking"><img style={{ height: 100, width: 100 }} src={logo} /></abbr>
                                <PrjLabel16BlackCenter label="Room Booking" />
                            </PrjPanelItem>
                            <FormControl>
                                <PrjPanel fdirection="row" >
                                    <PrjPanelItem aitems="flex-start" ip="25px 10px 0px 25px">
                                        <PrjPanel m="5px 10px 5px 10px">
                                            <PropertyEditView name="Username" >
                                                {(props1, state, controlProps) => <PrjTextField label="Username" variant="outlined" {...controlProps} width="300px" />}
                                            </PropertyEditView>
                                        </PrjPanel>
                                        <PrjPanel m="5px 10px 10px 10px">
                                            <PropertyEditView name="Password">
                                                {(props1, state, controlProps) => <PrjTextField label="Password" type="password" variant="outlined"{...controlProps} width="300px" />}
                                            </PropertyEditView>
                                        </PrjPanel>
                                    </PrjPanelItem>
                                </PrjPanel >
                                <PrjPanel width="100%" m="10px 10px 20px 5px">
                                    <PrjPanelItem ip="10px 30px 10px 10px" width="50%">
                                        <GreenButton16 label="Login" onClick={modelProps.onSave} width="70%" type="submit" />
                                    </PrjPanelItem>
                                    <PrjPanelItem ip="10px 0 10px 0" width="50%">
                                        <Link component="button" variant="body2" onClick={() => { props.history.push('/forgetpassword'); }}> Forget Password?</Link>
                                    </PrjPanelItem>
                                </PrjPanel>
                            </FormControl>
                        </PrjPanel>
                    </Paper>
                </PrjPanelItem>
            </PrjPanel>
        </ModelEditView>
    );
};
export default PHLogin;