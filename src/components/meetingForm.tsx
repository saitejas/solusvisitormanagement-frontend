import React from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { Gender, MeetingStatus, VisitorStatus, VisitorType } from "../constants/enum";
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { RangePickerProps } from 'antd/es/date-picker';
import axios from 'axios';
import { SOLUS_HOST } from "../constants/server";
dayjs.extend(customParseFormat);

export const MeetingForm = ({ closeModal }: { closeModal: any }) => {

    const { RangePicker } = DatePicker;

    // const range = (start: number, end: number) => {
    //     const result = [];
    //     for (let i = start; i < end; i++) {
    //       result.push(i);
    //     }
    //     return result;
    //   };

    const initialValues = {
        visitorType: 'General',
        visitorName: '',
        mobileNumber: undefined,
        emailId: '',
        gender: '',
        bloodGroup: '',
        visitorStatus: VisitorStatus.PENDING,
        meetingStatus: MeetingStatus.PENDING,
        toMeet: '',
        fromDateTime: undefined,
        toDateTime: undefined
    }

    const validationSchema = yup.object().shape({
        visitorType: yup.string().required('Visitor Type is required'),
        visitorName: yup.string().required('Visitor Name is required'),
        emailId: yup.string().email('Invalid email').required('Email is required'),
        mobileNumber: yup.number().test('length', 'Phone number must be exactly 10 digits', val => val?.toString().length === 10).required('Name is required'),
        gender: yup.string().required('Specifying gender is required'),
        bloodGroup: yup.string().required('Blood Group is required'),
        toMeet: yup.string().required('Please mention the person whom you like to meet'),
        fromDateTime: yup.number().test('length', 'Provide a valid starting date and time', val => val?.toString().length === 10).required('Date and Time is required'),
        toDateTime: yup.number().test('length', 'Provide a valid ending date and time', val => val?.toString().length === 10).required('To Date is required'),
      });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            scheduleMeeting(values);
        }
    });

    const scheduleMeeting = async(payload: any) => {
        try {
            await axios.post(`${SOLUS_HOST}/meetings`, payload);
            closeModal();
        } catch (error) {}
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        const endOfPreviousDay = dayjs().subtract(1, 'day').endOf('day');
        return current && current < endOfPreviousDay
    };

    // const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {

    //     const currentDateTime = dayjs();

    //     const currentHour = currentDateTime.hour();
    //     const currentMinute = currentDateTime.minute();

    //     return {
    //       disabledHours: () => range(0, 60).splice(0, currentHour),
    //       disabledMinutes: () => range(0, currentMinute),
    //     };
    //   };
      

    const onRangeChange = (dates: any, setFieldValue: any) => {
        setFieldValue('fromDateTime', dates[0].unix());
        setFieldValue('toDateTime', dates[1].unix());
    }

    return (
        <div>
            <div className="text-center text-[30px] font-extrabold text-primaryColor">Schedule a meeting</div>
            <form onSubmit={formik.handleSubmit}>
                <div className="my-[5px]">
                    <label htmlFor="name">Visitor Name</label>
                    <input className={`w-full p-2 border rounded ${formik.touched.visitorName && formik.errors.visitorName ? 'border border-errorRed': ''}`} type="text" id="visitorName" name="visitorName" onBlur={formik.handleBlur} value={formik.values.visitorName} onChange={formik.handleChange} />
                </div>
                {formik.touched.visitorName && formik.errors.visitorName ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.visitorName}</p> : null}
                <div className="my-[5px]">
                    <label htmlFor="visitorType">Visitor Type</label>
                    <select name="visitorType" id="visitorType"
                        className={`px-3 py-2 border rounded w-full ${formik.touched.visitorType && formik.errors.visitorType ? 'border border-errorRed': ''}`}
                        onBlur={formik.handleBlur}
                        value={formik.values.visitorType}
                        onChange={formik.handleChange}
                    >
                        <option value={VisitorType.GENERAL}>General</option>
                        <option value={VisitorType.VISITOR}>Visitor</option>
                    </select>
                </div>
                {formik.touched.visitorType && formik.errors.visitorType ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.visitorType}</p> : null}
                <div className="my-[5px]">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender"
                        className={`px-3 py-2 border rounded w-full ${formik.touched.gender && formik.errors.gender ? 'border border-errorRed': ''}`}
                        onBlur={formik.handleBlur}
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                    >
                        <option value={""}></option>
                        <option value={Gender.MALE}>Male</option>
                        <option value={Gender.FEMALE}>Female</option>
                        <option value={Gender.OTHER}>Other</option>
                    </select>
                </div>
                {formik.touched.gender && formik.errors.gender ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.gender}</p> : null}
                <div className="my-[5px]">
                    <label htmlFor="email">Email ID</label>
                    <input type="text" id="emailId" name="emailId" className={`w-full p-2 border rounded ${formik.touched.emailId && formik.errors.emailId ? 'border border-errorRed': ''}`} onBlur={formik.handleBlur} value={formik.values.emailId} onChange={formik.handleChange} />
                </div>
                {formik.touched.emailId && formik.errors.emailId ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.emailId}</p> : null}
                <div className="my-[5px]">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input type="number" id="mobileNumber" name="mobileNumber" className={`w-full p-2 border rounded ${formik.touched.mobileNumber && formik.errors.mobileNumber ? 'border border-errorRed': ''}`} onBlur={formik.handleBlur} value={formik.values.mobileNumber} onChange={formik.handleChange} />
                </div>
                {formik.touched.mobileNumber && formik.errors.mobileNumber ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.mobileNumber}</p> : null}
                <div className="my-[5px]">
                    <label htmlFor="fromDateTime">Meeting time and duration</label>
                    <RangePicker size="large" className={`w-full p-2 border ${formik.touched.fromDateTime && formik.errors.fromDateTime ? 'border border-errorRed': ''}`}
                        showTime 
                        disabledDate={disabledDate}
                        format="YYYY/MM/DD HH:mm"
                        onChange={(event) => { onRangeChange(event, formik.setFieldValue) }}
                    />
                </div>
                {formik.touched.fromDateTime && formik.errors.fromDateTime ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.fromDateTime}</p> : null}
                <div className="my-[5px]">
                    <label htmlFor="bloodGroup">Blood Group</label>
                    <input type="text" id="bloodGroup" name="bloodGroup" className={`w-full p-2 border rounded ${formik.touched.bloodGroup && formik.errors.bloodGroup ? 'border border-errorRed': ''}`} onBlur={formik.handleBlur} value={formik.values.bloodGroup} onChange={formik.handleChange} />
                </div>
                {formik.touched.bloodGroup && formik.errors.bloodGroup ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.bloodGroup}</p> : null}
                <div className="my-[5px]">
                    <label htmlFor="toMeet">Whom are you visiting?</label>
                    <input type="text" id="toMeet" name="toMeet" className={`w-full p-2 border rounded ${formik.touched.toMeet && formik.errors.toMeet ? 'border border-errorRed': ''}`} onBlur={formik.handleBlur} value={formik.values.toMeet} onChange={formik.handleChange} />
                </div>
                {formik.touched.toMeet && formik.errors.toMeet ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.toMeet}</p> : null}
                <div>
                    <button className="my-[5px] text-center bg-primaryColor text-white py-[10px] rounded text-[18px] w-full" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}