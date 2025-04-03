import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom'


const Spinner = ({path='login'}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [count,setCount] =useState(3);
    useEffect(()=>{
        const interval = setInterval(()=>{
           setCount((prevVlaue)=> --prevVlaue) 
        },500)
        count ===0 && navigate(`/${path}`,{
            state:location.pathname
        });
        return()=>clearInterval(interval)
    },[count,navigate,location,path])
    return (
        <div class="d-colom justify-content-center align-content-center" style={{height:"100vh "}}>
            {/* <h3 className='text-center'>redirecting to you in {count} second</h3> */}
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner