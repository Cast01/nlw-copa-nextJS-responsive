import { Dispatch, SetStateAction } from "react";
import { SwitchTab } from "../../pages/my-profile";

interface MyGuessesListButtonPropsType {
    switcTab: string,
    setSwitchTab: Dispatch<SetStateAction<SwitchTab>>,
}

export function RoomRankingListButton({setSwitchTab,switcTab}: MyGuessesListButtonPropsType) {
    return (
        <button 
            className={`rounded-md py-5 px-10 font-black ${switcTab === "GroupRankingList" ? "bg-blue-500" : "bg-[#202024]"}`}
            onClick={() => setSwitchTab("GroupRankingList")}
        >
            RANKING DO GRUPO
        </button>
    );
}