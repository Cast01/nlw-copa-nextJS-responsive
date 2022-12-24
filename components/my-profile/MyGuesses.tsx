import Image from "next/image";
import Link from "next/link";

interface MyGuessesPropsType {
    room: {
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
    }
}

export function MyGuesses({room}: MyGuessesPropsType) {
    return (
        <Link 
            href={`http://localhost:3000/room/${room.id}`} 
            className="bg-[#F7DD43] w-[270px] rounded-lg py-[2px] h-fit overflow-hidden">
            <div className="p-4 w-full bg-[#202024] flex flex-col gap-5">
                <div className="w-full h-[50%]">
                    <div className="text-2xl font-black truncate">Sala do{"(a)"} {room.title}</div>
                    <div className="text-[#C4C4CC] text-sm">Criado por {room.owner.name}</div>
                </div>
                <div className="w-full h-[50%] flex items-center justify-center">
                    <ul className="flex relative left-4">

                        
                        {
                            room.Participant.map((participant, i) => {
                                return (
                                    <Image key={participant.id} src={participant.user.avatarUrl} alt={""} className={`rounded-[50%] relative -left-3 border-[#202024] border-solid border-[3px]`} width={37} height={37} />
                                );
                            })
                        }
                        
                        

                        {
                            room.Participant.length > 4 && (
                                <div className="rounded-[50%] relative -left-2 bg-[#2e2e30] border-[#202024] border-solid border-[3px] w-[37px] h-[37px] flex items-center justify-center text-sm">
                                    <span>+{room._count.Participant}</span>
                                </div>
                            )
                        }

                        
                    </ul>
                </div>
            </div>
        </Link>
    );
}