import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/auth';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

    const authCheck = async () => {
        try {
            const res = await axios.get('/api/v1/auth/admin-auth');
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        catch (error) {
            console.error("admin Authorization check failed:", error);
            setOk(false); // Handle error gracefully by setting `ok` to `false`.

        }
    };

    useEffect(() => {
        if (auth?.token) {
            authCheck();
        } else {
            setOk(false);
        }

    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner path={''} />;
}

export default AdminRoute;

