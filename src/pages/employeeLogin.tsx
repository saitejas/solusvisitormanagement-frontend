/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SOLUS_HOST } from '../constants/server';
import { useNavigate } from 'react-router-dom';
import { readFromStorage, writeToStorage } from '../service/localstorage';

export const EmployeeLoginPage = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (readFromStorage('auth') === 'true') {
            navigate('/meetings');
        }
    }, []);

    const verifyAndLogin = async () => {
        try {
            if (email !== '' && password !== '') {
                await axios.post(`${SOLUS_HOST}/authentication/verifyEmployee`, { email, password });
                writeToStorage('auth', 'true');
                writeToStorage('userType', 'employee');
                navigate('/meetings');
            }
            
        } catch (error) {}
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row h-screen justify-center">
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
                    <div className='bg-primaryColor h-[70%] w-[70%] rounded-[20px] justify-center'>
                        <div>
                            <p className='font-bricolage text-white text-[42px] mt-[20px] font-extrabold'>Employee Login</p>
                        </div>
                        <div className='mt-[20%]'>
                            <div>
                                <input className='bg-white py-[12px] px-[15px] rounded-[8px] w-[68%]' onChange={(event) => setEmail(event.target.value)} placeholder='Enter Email ID...' />
                            </div>
                            <div className='mt-[30px]'>
                                <input className='bg-white py-[12px] px-[15px] rounded-[8px] w-[68%]' onChange={(event) => setPassword(event.target.value)} placeholder='Enter Password...' />
                            </div>
                            </div>
                            <div className='mt-[50px]'>
                                <button className='bg-white py-[8px] text-primaryColor font-bold rounded-[12px] text-[20px] w-[68%]' onClick={() => verifyAndLogin()}>Login</button>
                            </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 bg-cover h-150 bg-center" style={{backgroundImage: `url(${require("../assets/images/loginIllustration.png")})`}}></div>
            </div>
        </div>
    )
}