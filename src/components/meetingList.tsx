import React, { useEffect, useState } from "react";
import { Meeting } from "../models/meeting.model";
import { getFormatedValue } from "../service/meeting";
import { sortData } from "../service/util";
import { readFromStorage } from "../service/localstorage";
import { ConfirmationMessage, ToastMessage, VisitorStatus, userType } from "../constants/enum";
import { toast } from 'react-toastify';
import axios from "axios";
import { SOLUS_HOST } from "../constants/server";
import Modal from "react-responsive-modal";
import { EditMeeting } from "./editmeeting";
import { ConfirmationModal } from "./confirmationModal";

export function MeetingList({ data }: { data: Meeting[] }) {
    const columns = ['visitorName', 'mobileNumber', 'emailId', 'gender', 'bloodGroup', 'visitorStatus', 'fromDateTime', 'toDateTime', 'toMeet'];
    const typeOfUser = readFromStorage('userType');
    const [sortKey, setSortKey] = useState<string>("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [meetingsData, setMeetingsData] = useState<Meeting[]>(data);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [meetingToBeUpdated, setMeetingToBeUpdated] = useState<Meeting>();
    const [meetingToBeDeleted, setMeetingToBeDeleted] = useState<Meeting>();
    const [showDeleteConfirmation, setShowDeleteConfirmationModal] = useState<boolean>(false);

    useEffect(() => {
        const sorted = sortData(data, sortKey, sortDirection);
        setMeetingsData(sorted);
      }, [data, sortKey, sortDirection]);

    const handleSort = (key: string) => {
        if (sortKey === key) {
          setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
          setSortKey(key);
          setSortDirection("asc");
        }
    };

    const canDeleteMeeting = (meeting: Meeting): boolean => {
        if (typeOfUser === userType.EMPLOYEE && meeting.visitorStatus === VisitorStatus.PENDING) {
            return true;
        }
        return false;
    }

    const canUpdateMeeting = (meeting: Meeting): boolean => {
        if (typeOfUser === userType.SECURITY || (typeOfUser === userType.EMPLOYEE && meeting.visitorStatus === VisitorStatus.PENDING)) {
            return true;
        }
        return false;
    }


    const deleteMeeting = async () => {
        const id = meetingToBeDeleted?._id;
        try {
            setShowDeleteConfirmationModal(false);
            await axios.delete(`${SOLUS_HOST}/meetings/${id}`);
            const index = meetingsData.findIndex((meeting: Meeting) => meeting._id === id);
            if (index === 0) { 
                setMeetingsData([]);
            } else if (index !== -1) {
                const newMeetingsData = meetingsData.splice(index, 1);
                setMeetingsData(newMeetingsData);
            }
            toast(ToastMessage.DELETE_SUCCESSFUL);
        } catch (error) {
            toast(ToastMessage.DELETE_UNSUCCESSFUL);
        }
    }

    const triggerUpdate = (meeting: Meeting) => {
        setMeetingToBeUpdated(meeting);
        setTimeout(() => {
            setShowEditModal(true);
        }, 1000)
    }

    const triggerDelete = (meeting: Meeting) => {
        setMeetingToBeDeleted(meeting);
        setTimeout(() => {
            setShowDeleteConfirmationModal(true);
        }, 1000)
    }

    const updateMeeting = async (meeting: Meeting) => {
        try {
            await axios.patch(`${SOLUS_HOST}/meetings/${meeting._id}`, meeting);
            setShowEditModal(false);
            const index = meetingsData.findIndex((meetingObj: Meeting) => meeting._id === meetingObj._id);
            const newMeetingsData = [...meetingsData];
            newMeetingsData[index] = meeting;
            setMeetingsData(newMeetingsData);
            toast(ToastMessage.UPDATE_SUCCESSFUL);
        } catch (error) {
            toast(ToastMessage.UPDATE_UNSUCCESSFUL);
        }
    }

    return (
        <div className="w-full flex justify-center">
          <Modal center closeOnOverlayClick={false} open={showEditModal} onClose={() => setShowEditModal(false)}>
                <EditMeeting meeting={meetingToBeUpdated} closeModal={() => { setShowEditModal(false); }} updateData={(meeting: Meeting) => updateMeeting(meeting)} />
          </Modal>
          <Modal center closeOnOverlayClick={false} open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmationModal(false)}>
                <ConfirmationModal confirmationMessage={ConfirmationMessage.CONFIRM_DELETE} cancel={() => { setShowDeleteConfirmationModal(false); }} confirm={() => { deleteMeeting(); }} />
          </Modal>
          {meetingsData.length > 0 && (
            <div className="shadow-lg overflow-x-auto w-[90%]">
                <table className="min-w-full table border-separate border-spacing-x-0 border-spacing-y-0.5 text-sm">
                <thead className="bg-primaryColor bg-gradient-to-r from-primaryColor to-white">
                    <tr>
                    {columns.map((key: string, index: number) => (
                        <th
                        key={index}
                        scope="col"
                        className="py-3 text-sm font-semibold tracking-wider cursor-pointer"
                        onClick={() => handleSort(key)}
                        >
                        {String(key).toUpperCase()}
                        {sortKey === key && (
                            <span>
                            {sortDirection === "asc" ? "↑" : "↓"}
                            </span>
                        )}
                        </th>
                    ))}
                    <th>
                        ACTIONS
                    </th>
                    </tr>
                </thead>
                <tbody>
                    {meetingsData.map((item, index) => (
                    <tr key={index} className="bg-gradient-to-r from-tableGradientFrom to-tableGradientTo cursor-pointer">
                        {columns.map((key: any, index: number) => (
                        <td
                            key={index}
                            className={`py-[10px] ${
                            String(item[key as keyof Meeting] || "").length >
                            100
                                ? "whitespace-normal"
                                : "whitespace-nowrap"
                            } text-sm`}
                        >
                            <div className="flex items-center justify-center rounded-[10px]">
                            <p className="overflow-ellipsis overflow-hidden whitespace-normal">
                                {getFormatedValue(key, item)}
                            </p>
                            </div>
                        </td>
                        ))}
                        <td className="flex items-center justify-center py-[10px]">
                        {canUpdateMeeting(item) && <span><img onClick={() => triggerUpdate(item)} alt="edit" className="h-[16px] w-[16px] mr-[10px]" src={require("../assets/images/edit.png")} /></span>}
                        {canDeleteMeeting(item) && <span><img onClick={() => triggerDelete(item)} alt="delete" className="h-[16px] w-[16px]" src={require("../assets/images/bin.png")} /></span>}
                    </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
          {meetingsData.length === 0 && <div>
            <div>
                <p className="text-[24px] text-primaryColor font-bold">No meetings scheduled yet!</p>
            </div>
            <div className="flex justify-center">
                <img alt="noData" className="w-[50%]" src={require("../assets/images/noDataFound.avif")} />
            </div>
          </div>}
        </div>
      );
}