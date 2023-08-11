import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../service/util';

export const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div className='h-[70px] w-full bg-primaryColor flex flex-row items-center px-[20px] justify-between'>
            <div className='cursor-pointer' onClick={() => navigate('/')}>
                <p className='text-white text-[36px] font-bold font-bricolage'>Solus</p>
            </div>
            {location.pathname === '/meetings' && <div className='cursor-pointer' onClick={() => logout(navigate)}>
                <p className='text-white text-[18px] font-bold font-bricolage'>Logout</p>
            </div>}
        </div>
    )
}