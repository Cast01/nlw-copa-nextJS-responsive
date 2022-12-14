import Image from "next/image";
import { parseCookies } from "nookies";
import { api } from "../../lib/axios";
import { GameCard } from "../../components/room/game-card/GameCard";
import { toast, Toaster } from "react-hot-toast";
import { Header } from "../../components/Header";
import { PaginatedItems } from "../../components/room/Pagination";


export interface RoomPropsType {
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
            id: string,
            user: {
                avatarUrl: string,
            }
        }[],
        _count: {
            Participant: number,
        }
    },
    roomId: string,
}

export default function Room({allGamesInThisRoom,roomIIn,roomId}: RoomPropsType) {
    function copyToClipBoard(code: string) {
        navigator.clipboard.writeText(code);
        toast.success("Código copiado!");
    }

    return (
        <div className="min-h-[640px] my-[40px] max-w-7xl w-screen z-50 flex flex-col relative pb-4 mx-auto text-white">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Header />
            <section className="flex justify-between items-center pt-8">
                <div>
                    <h1 className="text-6xl font-black mb-7">Sala do{"(a): "}{roomIIn.title}</h1>
                    <h2
                        className="text-2xl">Código{": "}
                        <span
                            className="text-blue-500 underline cursor-pointer"
                            onClick={() => copyToClipBoard(roomIIn.code)}
                        >
                            {roomIIn.code}
                        </span>
                    </h2>
                </div>
                <ul className="flex">
                    {
                        roomIIn.Participant.map(participant => {
                            return (
                                <Image 
                                    key={participant.id} 
                                    src={participant.user.avatarUrl} 
                                    alt={""} 
                                    className={`rounded-[50%] w-[37px] h-[37px] relative -left-3 border-[#202024] border-solid border-[3px]`} 
                                    width={37} 
                                    height={37} 
                                />
                            );
                        })
                    }
                    {
                        roomIIn._count.Participant > 4 && (
                            <div 
                                className="rounded-[50%] relative -left-2 bg-[#2e2e30] border-[#202024] border-solid border-[3px] w-[37px] h-[37px] flex items-center justify-center text-sm"
                            >
                                <span>+{JSON.stringify(roomIIn._count.Participant)}</span>
                            </div>
                        )
                    }
                </ul>
            </section>
            <div className="w-full h-[1px] bg-slate-500 my-7" />
            <div className="flex-1 flex flex-wrap overflow-auto max-h[600px] justify-center gap-8">

                {/* Sem paginação */}
                {/* {
                    allGamesInThisRoom.map(game => {
                        return (
                            <GameCard 
                                key={game.id} 
                                game={game} 
                                gameId={game.id} 
                                roomId={roomId} 
                            />
                        );
                    })
                } */}

                {/* Com paginação */}
                <PaginatedItems 
                    itemsPerPage={3} 
                    allGamesInThisRoom={allGamesInThisRoom} 
                    roomId={roomId}
                />
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

    const roomIIn = roomResponse.data.insideRoom;

    console.log(roomIIn);

    return {
        props: {
            allGamesInThisRoom,
            roomIIn,
            roomId,
        }
    }
}