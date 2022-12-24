import { MyProfilePropsType } from "../../pages/my-profile";
import { MyGuesses } from "./MyGuesses";

export type RoomIParticipateType = Pick<MyProfilePropsType, 'roomsIParticipate'>

export function RoomsIParticipate({roomsIParticipate}: RoomIParticipateType){
    return (
        <div className="flex flex-1 flex-wrap gap-6 bg-[rgba(255,255,255,0.2)] p-2 overflow-auto rounded-bl-2xl rounded-br-2xl">
            {
                roomsIParticipate.map(room => {
                    return (
                        <MyGuesses key={room.id} room={room}/>
                    );
                })  
            }
        </div>
    );
}