import Image from "next/image";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useForm } from "react-hook-form";
import { GameCard } from "../../components/GameCard";
import { Toaster } from "react-hot-toast";


interface RoomPropsType {
    allGamesInThisRoom: {
        id: string,
        firstTeamCountryCode: string,
        secondTeamCountryCode: string,
        date: Date,
        Guess: {
            firstTeamPoints: number,
            secondTeamPoints: number,
        }
    }[],
    roomIIn: {
        title: string,
        code: string,
        Participant: {
            user: {
                avatarUrl: string,
            }
        }[],
        _count: {
            Participant: number,
        },
    },
    roomId: string,
    nlwcopaToken: string,
}

export default function Room(props: RoomPropsType) {
    return (
        <div className="min-h-[640px] my-[40px] max-w-7xl w-screen z-50 flex flex-col relative pb-4 mx-auto text-white">


            <Toaster
                position="top-center"
                reverseOrder={false}
            />


            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-6xl font-black">Sala do{"(a): "}{props.roomIIn.title}</h1>
                    <h2 className="text-2xl">Código{": "}{props.roomIIn.code}</h2>
                </div>
                <ul className="flex">
                    {
                        props.roomIIn.Participant.map(participant => {
                            return (
                                <Image src={participant.user.avatarUrl} alt={""} className={`rounded-[50%] w-[37px] h-[37px] relative -left-3 border-[#202024] border-solid border-[3px]`} width={37} height={37} />
                            );
                        })
                    }
                    <div className="rounded-[50%] relative -left-2 bg-[#2e2e30] border-[#202024] border-solid border-[3px] w-[37px] h-[37px] flex items-center justify-center text-sm">
                        <span>+{JSON.stringify(props.roomIIn._count.Participant)}</span>
                    </div>
                </ul>
            </div>
            <div className="w-full h-[1px] bg-slate-500 my-7" />
            <div className="flex-1 flex flex-wrap overflow-auto max-h[600px] justify-center gap-8">
                {
                    props.allGamesInThisRoom.map(guess => {
                        return (
                            <GameCard guess={guess} gameId={guess.id} roomId={props.roomId} nlwcopaToken={props.nlwcopaToken} />
                        );
                    })
                }
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx: any) {
    const { nlwcopaToken } = parseCookies(ctx);
    const roomId = ctx.query.room;

    const gameResponse = await api.get(`/room/${roomId}/games`, {
        headers: {
            'Authorization': `Bearer ${nlwcopaToken}`
        }
    });

    const allGamesInThisRoom = gameResponse.data.games;

    const roomResponse = await api.get(`/room/${roomId}`, {
        headers: {
            'Authorization': `Bearer ${nlwcopaToken}`
        }
    });

    const roomIIn = roomResponse.data;
    const roomIIn2 = roomResponse.data.Participant;

    console.log(allGamesInThisRoom);

    return {
        props: {
            allGamesInThisRoom,
            roomIIn,
            roomId,
            nlwcopaToken,
        }
    }
}