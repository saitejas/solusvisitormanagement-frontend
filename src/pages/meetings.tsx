import React, { useEffect, useState } from 'react';
import { Meeting } from '../models/meeting.model';
import axios from 'axios';
import { SOLUS_HOST } from '../constants/server';
import { MeetingList } from '../components/meetingList';
import { readFromStorage } from '../service/localstorage';
import { userType } from '../constants/enum';
import "react-responsive-modal/styles.css";
import Modal from 'react-responsive-modal';
import { MeetingForm } from '../components/meetingForm';
import { DatePicker } from "antd";

export const MeetingsPage = () => {

    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [origMeetings, setOrigMeetings] = useState<Meeting[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [startTimeToSearch, setStartTimeToSearch] = useState<number>();
    const [endTimeToSearch, setEndTimeToSearch] = useState<number>();
    const user = readFromStorage('userType');

    const retrieveMeetings = async () => {
        try {
            const response = await axios.get(`${SOLUS_HOST}/meetings`);
            const { data } = response;
            setMeetings(data);
            setOrigMeetings(data);
        } catch (error) {};
    };

    useEffect(() => {
        retrieveMeetings();
    }, []);

    const filterDateRange = () => {
        if (startTimeToSearch && endTimeToSearch && startTimeToSearch < endTimeToSearch) {
            const filteredMeetings = origMeetings.filter((meeting: Meeting) => meeting.fromDateTime >= startTimeToSearch && meeting.toDateTime <= endTimeToSearch)
            setMeetings(filteredMeetings);
        } else if (startTimeToSearch || endTimeToSearch) {
            if (startTimeToSearch) setMeetings(origMeetings.filter((meeting: Meeting) => meeting.fromDateTime >= startTimeToSearch))
            if (endTimeToSearch) setMeetings(origMeetings.filter((meeting: Meeting) => meeting.toDateTime <= endTimeToSearch))
        } else {
            setMeetings(origMeetings);
        }
    }

    const clearFilters = () => {
        window.location.reload();
    }

    return (
        <div>
            <Modal center closeOnOverlayClick={false} open={showModal} onClose={() => setShowModal(false)}>
                <MeetingForm closeModal={() => { setShowModal(false); retrieveMeetings(); }} />
            </Modal>
            <div className='flex items-center justify-between mx-[5%] my-[2%]'>
                <div>
                    <DatePicker
                        showTime
                        name="fromDate"
                        className="m-[10px]"
                        size="large"
                        format="YYYY/MM/DD HH:mm"
                        onChange={(event) => setStartTimeToSearch(event?.unix())}
                    />
                    <DatePicker
                        showTime
                        name="toDate"
                        className="m-[10px]"
                        size="large"
                        format="YYYY/MM/DD HH:mm"
                        onChange={(event) => setEndTimeToSearch(event?.unix())}
                    />
                    <button className="bg-primaryColor text-white px-[26px] py-[6px] rounded mr-[10px]" onClick={filterDateRange}>Apply Date Search</button>
                    <button className="border-[2px] border-primaryColor text-primaryColor px-[26px] py-[4px] rounded" onClick={clearFilters}>Clear</button>
                </div>
                {user === userType.EMPLOYEE && <div>
                    <button className='bg-primaryColor text-white px-[26px] py-[6px] rounded mr-[10px]' onClick={() => setShowModal(true)}>Create Meeting</button>
                </div>}
            </div>
            <div>
                <div className='w-full flex justify-center items-center'>
                <MeetingList data={meetings} />
                </div>
            </div>
        </div>
    )
}