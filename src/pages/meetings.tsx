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

export const MeetingsPage = () => {

    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const user = readFromStorage('userType');

    const retrieveMeetings = async () => {
        try {
            const response = await axios.get(`${SOLUS_HOST}/meetings`);
            const { data } = response;
            setMeetings(data);
        } catch (error) {};
    };

    useEffect(() => {
        retrieveMeetings();
    }, []);

    return (
        <div>
            <Modal center closeOnOverlayClick={false} open={showModal} onClose={() => setShowModal(false)}>
                <MeetingForm closeModal={() => { setShowModal(false); retrieveMeetings(); }} />
            </Modal>
            {user === userType.EMPLOYEE && <div>
                <button onClick={() => setShowModal(true)}>Create Meeting</button>
            </div>}
            <div className=''>
                <div className='w-full flex justify-center items-center'>
                <MeetingList data={meetings} />
                </div>
            </div>
        </div>
    )
}