import React from "react";
import { Meeting } from "../models/meeting.model";

export function MeetingList({ meetingsData }: { meetingsData: Meeting[] }) {
    const columns = ['visitorName', 'mobileNumber', 'emailId', 'gender', 'bloodGroup', 'visitorStatus', 'fromDateTime', 'toDateTime', 'toMeet'];
    return (
        <div>
          {meetingsData.length > 0 && (
            <div>
              <div className="shadow-lg overflow-hidden">
                <table className="table text-gray-400 border-separate border-spacing-x-0 border-spacing-y-0.5 text-sm">
                  <thead className="bg-gradient-to-r from-tableGradientFrom to-tableGradientTo">
                    <tr>
                      {columns.map((key: string, index: number) => (
                        <th
                          key={index}
                          scope="col"
                          className="px-6 py-3 text-sm font-semibold tracking-wider cursor-pointer"
                        //   onClick={() => handleSort(key)}
                        >
                          {String(key).toUpperCase()}
                          {/* {sortKey === key && (
                            <span className="ml-1">
                              {sortDirection === "asc" ? "↑" : "↓"}
                            </span>
                          )} */}
                        </th>
                      ))}
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
                              {/* {key === "name" && (
                                <img
                                  src={item.avatar}
                                  className="h-[30px] w-[35px] mr-[20px]"
                                  alt="Player Avatar"
                                />
                              )} */}
                              <p className="overflow-ellipsis overflow-hidden whitespace-normal">
                                {/* {getFormatedValue(key, item)} */}
                                {item[key as keyof Meeting]}
                              </p>
                            </div>
                          </td>
                        ))}
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