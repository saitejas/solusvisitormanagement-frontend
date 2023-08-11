import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-col md:flex-row h-screen">
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
                    <div className='font-bricolage text-[72px] text-primaryColor'>
                            Unveil Experiences, Elevate Safety & Embrace Arrival
                        </div>
                        <div className='flex flex-col mt-[50px]'>
                            <button className='bg-primaryColor py-[12px] px-[70px] text-white font-bold rounded-[12px] text-[20px]' onClick={() => navigate('/empLogin')}>Login as employee</button>
                            <button className='mt-[20px] bg-primaryColor py-[12px] px-[70px] text-white font-bold rounded-[12px] text-[20px]' onClick={() => navigate('/securityLogin')}>Login as security</button>
                        </div>
                    </div>
                <div className="w-full md:w-1/2 bg-no-repeat bg-center" style={{backgroundImage: `url(${require("../assets/images/landingBG.jpeg")})`}}></div>
            </div>
        </div>
    )
}