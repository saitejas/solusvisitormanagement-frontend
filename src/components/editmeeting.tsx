import React from 'react';
import { Meeting } from '../models/meeting.model';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { VisitorType, Gender, VisitorStatus, userType } from '../constants/enum';
import { readFromStorage } from '../service/localstorage';

export const EditMeeting = ({ closeModal, updateData, meeting }: { closeModal: any, updateData: any, meeting: Meeting | undefined }) => {
    const typeOfUser = readFromStorage('userType');
    const initialValues = {
        _id: meeting?._id,
        visitorType: meeting?.visitorType,
        visitorName:  meeting?.visitorName,
        mobileNumber: meeting?.mobileNumber,
        emailId: meeting?.emailId,
        gender:  meeting?.gender,
        bloodGroup: meeting?.bloodGroup,
        visitorStatus:  meeting?.visitorStatus,
        meetingStatus: meeting?.meetingStatus,
        toMeet:  meeting?.toMeet,
        fromDateTime:  meeting?.fromDateTime,
        toDateTime:  meeting?.toDateTime
    }

    const employeeValidationSchema = yup.object().shape({
        visitorType: yup.string().required('Visitor Type is required'),
        visitorName: yup.string().required('Visitor Name is required'),
        emailId: yup.string().email('Invalid email').required('Email is required'),
        gender: yup.string().required('Specifying gender is required'),
        bloodGroup: yup.string().required('Blood Group is required'),
        toMeet: yup.string().required('Please mention the person whom you like to meet'),
        fromDateTime: yup.number().test('length', 'Provide a valid starting date and time', val => val?.toString().length === 10).required('Date and Time is required'),
        toDateTime: yup.number().test('length', 'Provide a valid ending date and time', val => val?.toString().length === 10).required('To Date is required'),
      });

      const securityValidationSchema = yup.object().shape({
        visitorStatus: yup.string().required('Visitor Status is required'),
      });

    const formik = useFormik({
        initialValues,
        validationSchema: typeOfUser === userType.EMPLOYEE ? employeeValidationSchema : securityValidationSchema,
        onSubmit: (values) => {
            updateData(values);
        }
    });

    return (
        <div>
            <div className="text-center text-[30px] font-extrabold text-primaryColor min-w-[350px]">Update meeting</div>
            <form onSubmit={formik.handleSubmit}>
                {typeOfUser === userType.EMPLOYEE && <div className="my-[5px]">
                    <label htmlFor="name">Visitor Name</label>
                    <input className={`w-full p-2 border rounded ${formik.touched.visitorName && formik.errors.visitorName ? 'border border-errorRed': ''}`} type="text" id="visitorName" name="visitorName" onBlur={formik.handleBlur} value={formik.values.visitorName} onChange={formik.handleChange} />
                </div>}
                {formik.touched.visitorName && formik.errors.visitorName ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.visitorName}</p> : null}
                {typeOfUser === userType.EMPLOYEE && <div className="my-[5px]">
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
                </div>}
                {formik.touched.visitorType && formik.errors.visitorType ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.visitorType}</p> : null}
                {typeOfUser === userType.SECURITY && <div className="my-[5px]">
                    <label htmlFor="visitorStatus">Visitor Status</label>
                    <select name="visitorStatus" id="visitorType"
                        className={`px-3 py-2 border rounded w-full ${formik.touched.visitorStatus && formik.errors.visitorStatus ? 'border border-errorRed': ''}`}
                        onBlur={formik.handleBlur}
                        value={formik.values.visitorStatus}
                        onChange={(event) => { formik.setFieldValue('visitorStatus', event.target.value); formik.setFieldValue('meetingStatus', event.target.value) }}
                    >
                        <option value={VisitorStatus.PENDING}>Pending</option>
                        <option value={VisitorStatus.CANCELLED}>Cancel</option>
                        <option value={VisitorStatus.REJECTED}>Reject</option>
                        <option value={VisitorStatus.SIGNED_IN}>Signed In</option>
                        <option value={VisitorStatus.SIGNED_OUT}>Signed Out</option>
                    </select>
                </div>}
                {formik.touched.visitorType && formik.errors.visitorType ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.visitorType}</p> : null}
                {typeOfUser === userType.EMPLOYEE && <div className="my-[5px]">
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
                </div>}
                {formik.touched.gender && formik.errors.gender ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.gender}</p> : null}
                {typeOfUser === userType.EMPLOYEE && <div className="my-[5px]">
                    <label htmlFor="email">Email ID</label>
                    <input type="text" id="emailId" name="emailId" className={`w-full p-2 border rounded ${formik.touched.emailId && formik.errors.emailId ? 'border border-errorRed': ''}`} onBlur={formik.handleBlur} value={formik.values.emailId} onChange={formik.handleChange} />
                </div>}
                {formik.touched.emailId && formik.errors.emailId ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.emailId}</p> : null}
                {typeOfUser === userType.EMPLOYEE && <div className="my-[5px]">
                    <label htmlFor="bloodGroup">Blood Group</label>
                    <input type="text" id="bloodGroup" name="bloodGroup" className={`w-full p-2 border rounded ${formik.touched.bloodGroup && formik.errors.bloodGroup ? 'border border-errorRed': ''}`} onBlur={formik.handleBlur} value={formik.values.bloodGroup} onChange={formik.handleChange} />
                </div>}
                {formik.touched.bloodGroup && formik.errors.bloodGroup ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.bloodGroup}</p> : null}
                {typeOfUser === userType.EMPLOYEE && <div className="my-[5px]">
                    <label htmlFor="toMeet">Whom are you visiting?</label>
                    <input type="text" id="toMeet" name="toMeet" className={`w-full p-2 border rounded ${formik.touched.toMeet && formik.errors.toMeet ? 'border border-errorRed': ''}`} onBlur={formik.handleBlur} value={formik.values.toMeet} onChange={formik.handleChange} />
                </div>}
                {formik.touched.toMeet && formik.errors.toMeet ? <p className="text-errorRed text-[11px] font-semibold font-bricolage">{formik.errors.toMeet}</p> : null}
                <div>
                    <button className="my-[5px] text-center bg-primaryColor text-white py-[10px] rounded text-[18px] w-full" type="submit">Update</button>
                </div>
            </form>
        </div>
    )

}