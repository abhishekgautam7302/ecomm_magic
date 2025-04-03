import { useEffect, useState } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth(); // Destructure `auth` since `setAuth` is not being used here.

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get('/api/v1/auth/user-auth');
                if(res.data.ok){
                    setOk(true);
                }
                else{
                    setOk(false);
                } // Set `ok` based on API response.
            } catch (error) {
                console.error("Authorization check failed:", error);
                setOk(false); // Handle error gracefully by setting `ok` to `false`.
            }
        };

        if (auth?.token) {
            authCheck();
        } else {
            setOk(false); // Ensure `ok` is false when there's no token.
        }
    }, [auth?.token]);

    // Show spinner during authentication check or redirect if not authenticated
    return ok ? <Outlet /> : <Spinner path={''}/>;
}
