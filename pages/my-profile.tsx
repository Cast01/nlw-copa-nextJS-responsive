import { parseCookies } from "nookies";
import { FormEvent, useState } from "react";
import { Header } from "../components/Header";
import { useAuth } from "../hooks/useAuth";
import { api } from "../lib/axios";

import { toast, Toaster } from 'react-hot-toast'
import Image from "next/image";
import Router from "next/router";

interface MyProfilePropsType {
    roomsIIn: {
        id: string,
        title: string,
        owner: {
            name: string,
        },
        _count: {
            participant: number,
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

export default function MyProfile(props: MyProfilePropsType) {
    const [codeInput, setCodeInput] = useState("");

    const searchRoom = async (e: FormEvent) => {
        e.preventDefault();

        const response = await api.post("/room/join", {
            code: codeInput,
        }, {
            headers: {
                'Authorization': `Bearer ${props.nlwcopaToken}`
            }
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


                <form onSubmit={searchRoom} className="h-10 self-end">
                    <input
                        type="text"
                        placeholder="Código da sala"
                        className="h-full w-64 rounded-tl-md rounded-bl-md bg-[#323238] pl-4 outline-none"
                        onChange={e => setCodeInput(e.target.value)}
                        value={codeInput}
                    />
                    <button type="submit" className="bg-[#F7DD43] h-full px-7 rounded-tr-md rounded-br-md text-black hover:bg-[#d6bf3b]">Buscar sala</button>
                </form>

                <div className="flex-1 flex flex-wrap gap-6 bg-[rgba(255,255,255,0.2)] rounded-lg p-2 overflow-auto">
                    {
                        props.roomsIIn.map(room => {
                            return (
                                <div className="bg-[#F7DD43] w-[270px] rounded-lg py-1 h-fit">
                                    <div className="p-4 w-full bg-[#202024] rounded-bl-2xl rounded-br-2xl rounded-tl-2xl rounded-tr-2xl flex flex-col gap-5">
                                        <div className="w-full h-[50%]">
                                            <div className="text-2xl font-black truncate">Sala do{"(a)"} {room.title}</div>
                                            <div className="text-[#C4C4CC] text-sm">Criado por {room.owner.name}</div>
                                        </div>
                                        <div className="w-full h-[50%] flex items-center justify-center">
                                            <ul className="flex relative left-4">

                                                
                                                {
                                                    room.Participant.map((participant, i) => {
                                                        return (
                                                            <Image src={participant.user.avatarUrl} alt={""} className={`rounded-[50%] relative -left-3 border-[#202024] border-solid border-[3px]`} width={37} height={37} />
                                                        );
                                                    })
                                                }
                                                
                                                

                                                {
                                                    room.Participant.length > 4 ? (
                                                        <div className="rounded-[50%] relative -left-2 bg-[#2e2e30] border-[#202024] border-solid border-[3px] w-[37px] h-[37px] flex items-center justify-center text-sm">
                                                            <span>+15</span>
                                                        </div>
                                                    ) : (<></>)
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
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

    const roomsIIn = await api.get("/room", {
        headers: {
            'Authorization': `Bearer ${nlwcopaToken}`
        }
    });

    return {
        props: {
            roomsIIn: roomsIIn.data,
            nlwcopaToken,
        }
    }
}