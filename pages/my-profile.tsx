import { parseCookies } from "nookies";
import { FormEvent, useState } from "react";
import { Header } from "../components/Header";
import { api } from "../lib/axios";

import { toast, Toaster } from 'react-hot-toast'
import Router from "next/router";
import { MyGuessesListButton } from "../components/my-profile/MyGuessesListButton";
import { RoomRankingListButton } from "../components/my-profile/RoomRankingListButton";
import { RoomsIParticipate } from "../components/my-profile/RoomsIParticipate";
import { GroupRankingList } from "../components/my-profile/GroupRankingList";
import { FormCodeSubmit } from "../components/my-profile/FormCodeSubmit";

export interface MyProfilePropsType {
    roomsIParticipate: {
        id: string,
        title: string,
        owner: {
            name: string,
        },
        _count: {
            Participant: number,
        },
        Participant: {
            id: string,
            user: {
                avatarUrl: string,
            },
        }[]
    }[],
    nlwcopaToken: string,
}

export type SwitchTab = "RoomIParticipateList" | "GroupRankingList";

export default function MyProfile(props: MyProfilePropsType) {
    const [codeInput, setCodeInput] = useState("");
    const [switcTab, setSwitchTab] = useState<SwitchTab>("RoomIParticipateList");

    const searchRoom = (e: FormEvent) => {
        e.preventDefault();

        api.post("/room/join", {
            code: codeInput,
        })
        .then(data => {
            console.log(data.data.roomId)
            Router.push(`http://localhost:3000/room/${data.data.roomId}`);
        })
        .catch(err => toast.error(err.response.data.message));
    }

    return (
        <div className="min-h-[640px] my-[40px] max-w-7xl w-screen z-50 flex flex-col relative pb-4 mx-auto text-white">

            <Toaster
                position="top-center"
                reverseOrder={false}
            />


            <Header />


            <div className="flex flex-col gap-8 flex-1 px-4 pt-8">
                
                <h1 className="font-black text-6xl">Participações</h1>

                <FormCodeSubmit codeInput={codeInput} searchRoom={searchRoom} setCodeInput={setCodeInput}/>

                {/* My guesses and group ranking section */}
                <div className="flex flex-col flex-1">
                    <div className="bg-[rgba(255,255,255,0.2)] w-full flex justify-center gap-11 py-4 px-9 rounded-tl-2xl rounded-tr-2xl">
                        <MyGuessesListButton setSwitchTab={setSwitchTab} switcTab={switcTab}/>
                        <RoomRankingListButton setSwitchTab={setSwitchTab} switcTab={switcTab}/>
                    </div>
                    {
                        switcTab === "RoomIParticipateList" ? (
                            <RoomsIParticipate roomsIParticipate={props.roomsIParticipate}/>
                        ) : (

                            <GroupRankingList />
                        )
                    }
                </div>

            </div>

        </div>
    );
}

export async function getServerSideProps(ctx: any) {
    const { nlwcopaToken } = parseCookies(ctx);

    if (!nlwcopaToken) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    const roomsIParticipate = await api.get("/room", {
        headers: {
            'Authorization': `Bearer ${nlwcopaToken}`
        }
    });

    return {
        props: {
            roomsIParticipate: roomsIParticipate.data,
            nlwcopaToken,
        }
    }
}