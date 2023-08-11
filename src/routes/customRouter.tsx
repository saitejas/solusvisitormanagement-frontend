import React from 'react';
import { Route, Routes } from "react-router-dom";
import { LandingPage } from '../pages/landingPage';
import { EmployeeLoginPage } from '../pages/employeeLogin';
import { SecurityLoginPage } from '../pages/securityLogin';
import { MeetingsPage } from '../pages/meetings';

export default function CustomRouter() {
    return(
        <Routes>
            <Route path="/" element={<LandingPage/>}></Route>
            <Route path="empLogin" element={<EmployeeLoginPage/>}></Route>
            <Route path="securityLogin" element={<SecurityLoginPage/>}></Route>
            <Route path="meetings" element={<MeetingsPage />}></Route>
        </Routes>
    )
} 
