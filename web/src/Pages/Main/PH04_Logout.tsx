import * as React from 'react';
import { useDispatch } from 'react-redux';
import { systemAuthLogOut } from '../../Store/System/SystemActions';

const Logout = (props: any) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        async function loadData() {
            await dispatch(systemAuthLogOut());
            props.history.push('/login');
        }
        loadData();
    }, []);

    return <div>logout</div>;
};

export default Logout;
