import React from "react";

export const ConfirmationModal = ({ confirmationMessage, confirm, cancel }: { confirmationMessage: string, confirm: any, cancel: any }) => {

    return (
        <div className="min-w-[400px]">
            <div>
                {confirmationMessage}
            </div>
            <div className="my-[10px]">
                <textarea className="w-[100%] h-[100px] p-[12px]" placeholder="Comment..." />
            </div>
            <div className="flex justify-center">
                <button onClick={() => confirm()} className="bg-primaryColor text-white px-[26px] py-[6px] rounded mr-[10px]">Confirm</button>
                <button onClick={() => cancel()} className="border-[2px] border-primaryColor text-primaryColor px-[26px] py-[4px] rounded">Cancel</button>
            </div>
        </div>
    )
}