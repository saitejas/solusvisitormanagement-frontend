import React, { useEffect, useState } from "react";
import { Meeting } from "../models/meeting.model";
import { getFormatedValue } from "../service/meeting";
import { sortData } from "../service/util";
import { readFromStorage } from "../service/localstorage";
import { VisitorStatus, userType } from "../constants/enum";
import { DatePicker } from "antd";

export function MeetingList({ data }: { data: Meeting[] }) {
    const columns = ['visitorName', 'mobileNumber', 'emailId', 'gender', 'bloodGroup', 'visitorStatus', 'fromDateTime', 'toDateTime', 'toMeet'];
    const [sortKey, setSortKey] = useState<string>("");
    const [sortDirection, setSortDirection] = useState("asc");
    const [meetingsData, setMeetingsData] = useState<Meeting[]>(data);
    const [origMeetingsData,] = useState<Meeting[]>(data);
    const [startTimeToSearch, setStartTimeToSearch] = useState<number>();
    const [endTimeToSearch, setEndTimeToSearch] = useState<number>();

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
        if (readFromStorage('userType') === userType.EMPLOYEE && meeting.visitorStatus === VisitorStatus.PENDING) {
            return true;
        }
        return false;
    }

    const filterDateRange = () => {
        console.log({ startTimeToSearch, endTimeToSearch })
        if (startTimeToSearch && endTimeToSearch && startTimeToSearch < endTimeToSearch) {
            const filteredMeetings = meetingsData.filter((meeting: Meeting) => meeting.fromDateTime >= startTimeToSearch && meeting.toDateTime <= endTimeToSearch)
            setMeetingsData(filteredMeetings);
        } else if (startTimeToSearch || endTimeToSearch) {
            if (startTimeToSearch) setMeetingsData(meetingsData.filter((meeting: Meeting) => meeting.fromDateTime >= startTimeToSearch))
            if (endTimeToSearch) setMeetingsData(meetingsData.filter((meeting: Meeting) => meeting.toDateTime <= endTimeToSearch))
        } 
    }

    const clearFilters = () => {
        window.location.reload();
    }

    return (
        <div>
          <div className="flex my-[30px] items-center">
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
          {meetingsData.length > 0 && (
            <div>
              <div className="shadow-lg overflow-hidden">
                <table className="table border-separate border-spacing-x-0 border-spacing-y-0.5 text-sm px-[50px]">
                  <thead className="bg-primaryColor bg-gradient-to-r from-primaryColor to-white">
                    <tr>
                      {columns.map((key: string, index: number) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-sm font-semibold tracking-wider cursor-pointer"
                          onClick={() => handleSort(key)}
                        >
                          {String(key).toUpperCase()}
                          {sortKey === key && (
                            <span className="ml-1">
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
                            // onClick={() =>
                            //   onSelectingAPlayer(paginatedData[index])
                            // }
                            className={`px-6 py-4 ${
                              String(item[key as keyof Meeting] || "").length >
                              100
                                ? "whitespace-normal"
                                : "whitespace-nowrap"
                            } text-sm`}
                          >
                            <div className="flex items-center rounded-[10px]">
                              <p className="overflow-ellipsis overflow-hidden whitespace-normal">
                                {getFormatedValue(key, item)}
                              </p>
                            </div>
                          </td>
                        ))}
                        <td className="flex items-center mt-[16px]">
                        <span><img alt="edit" className="h-[16px] w-[16px] mr-[10px]" src={require("../assets/images/edit.png")} /></span>
                        {canDeleteMeeting(item) && <span><img alt="delete" className="h-[16px] w-[16px]" src={require("../assets/images/bin.png")} /></span>}
                    </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* <div className="my-4 flex justify-center">
                <nav className="inline-flex rounded-md shadow bg-gradient-to-r from-tableGradientFrom to-tableGradientTo text-white">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-transparent text-gray-500 rounded-l-md"
                  >
                    {"<"}
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-4 py-2 ${
                        currentPage === i + 1
                          ? "bg-white text-black"
                          : "bg-tableGradientFrom text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-transparent text-gray-500 rounded-r-md"
                  >
                    {">"}
                  </button>
                </nav>
              </div> */}
            </div>
          )}
        </div>
      );
}