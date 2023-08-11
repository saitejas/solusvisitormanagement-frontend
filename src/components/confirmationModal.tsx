import React from "react";

export const ConfirmationModal = ({ confirmationMessage, confirm, cancel }: { confirmationMessage: string, confirm: any, cancel: any }) => {

    return (
        <div>
            <div>
                {confirmationMessage}
            </div>
            <div>
                <textarea placeholder="Comment..." />
            </div>
            <div className="flex">
                <button className="bg-primaryColor text-white px-[26px] py-[6px] rounded mr-[10px]" onClick={confirm()}>Confirm</button>
                <button className="border-[2px] border-primaryColor text-primaryColor px-[26px] py-[4px] rounded" onClick={cancel()}>Cancel</button>
            </div>
        </div>
    )
}