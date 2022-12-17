
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from "../lib/axios";
import { toast, Toaster } from "react-hot-toast";
import { Check } from "phosphor-react";

const schema = yup.object({
  firstTeamPoints: yup.number().positive().integer().max(15).min(0),
  secondTeamPoints: yup.number().positive().integer().max(15).min(0),
}).required();

interface GuessCardPropsType {
    guess: {
        firstTeamCountryCode: string,
        secondTeamCountryCode: string,
        date: Date,
        Guess: {
            firstTeamPoints: number,
            secondTeamPoints: number,
        }
    }
    gameId: string,
    roomId: string,
    nlwcopaToken: string,
}

export function GameCard(props: GuessCardPropsType) {
    const [block, setBlock] = useState("");

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: any) => {
        console.log(data.firstTeamPoints)
        console.log(props.gameId)
        console.log(props.roomId)

        api.post(`/room/${props.roomId}/games/${props.gameId}/guesses`, {
            firstTeamPoints: data.firstTeamPoints,
            secondTeamPoints: data.secondTeamPoints,
        }, {
            headers: {
                'Authorization': `Bearer ${props.nlwcopaToken}`
            }
        })
        .then(data => {
            toast.success(data.data.message);
            setBlock("block");
        })
        .catch(err => toast.error(err.response.data.message));
    };


    return (
        <form key={props.gameId} className="flex flex-col gap-4 items-center p-4 w-[270px] bg-[#202024] h-fit" onSubmit={handleSubmit(onSubmit)}>
            <div>{props.guess.firstTeamCountryCode} vs {props.guess.secondTeamCountryCode}</div>
            <div>
                {
                    new Date(props.guess.date).toLocaleString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                }
            </div>
            <div className="w-full flex flex-col items-center gap-2">
                {
                    // INVALID
                    new Date(props.guess.date) < new Date() && (
                        <div className="w-full flex justify-between">
                            <select disabled className="bg-[#171718] cursor-not-allowed" {...register("firstTeamPoints")}>
                                <option selected value="0">0</option>
                                {
                                    Array.from({length: 15}).map((_, i) => {
                                        return (
                                            <option value={i+1}>{i+1}</option>
                                        );
                                    })
                                }
                            </select>
                            <span>{props.guess.firstTeamCountryCode}</span>
                            <span>{" X "}</span>
                            <span>{props.guess.secondTeamCountryCode}</span>
                            <select disabled className="bg-[#171718] cursor-not-allowed" {...register("secondTeamPoints")}>
                                <option selected value="0">0</option>
                                {
                                    Array.from({length: 15}).map((_, i) => {
                                        return (
                                            <option value={i+1}>{i+1}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    )
                }
                {
                    // VALID WITH OUT Guess
                    new Date(props.guess.date) > new Date() && !props.guess.Guess &&  (
                        <div className="w-full flex justify-between">
                            <select disabled={block ? true : false} className="bg-[#171718]" {...register("firstTeamPoints")}>
                                <option selected value="0">0</option>
                                {
                                    Array.from({length: 15}).map((_, i) => {
                                        return (
                                            <option value={i+1}>{i+1}</option>
                                        );
                                    })
                                }
                            </select>
                            <span>{props.guess.firstTeamCountryCode}</span>
                            <span>{" X "}</span>
                            <span>{props.guess.secondTeamCountryCode}</span>
                            <select disabled={block ? true : false} className="bg-[#171718]" {...register("secondTeamPoints")}>
                                <option selected value="0">0</option>
                                {
                                    Array.from({length: 15}).map((_, i) => {
                                        return (
                                            <option value={i+1}>{i+1}</option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                    )
                }
                {
                    props.guess.Guess && (
                        <div className="w-full flex justify-between">
                            <select disabled className="bg-[#171718] cursor-not-allowed" {...register("firstTeamPoints")}>
                                <option selected value={props.guess.Guess.secondTeamPoints}>{props.guess.Guess.firstTeamPoints}</option>
                            </select>
                            <span>{props.guess.firstTeamCountryCode}</span>
                            <span>{" X "}</span>
                            <span>{props.guess.secondTeamCountryCode}</span>
                            <select disabled className="bg-[#171718] cursor-not-allowed" {...register("secondTeamPoints")}>
                                <option selected value={props.guess.Guess.secondTeamPoints}>{props.guess.Guess.secondTeamPoints}</option>
                            </select>
                        </div>
                    )
                }
                {
                    new Date(props.guess.date) < new Date() && (
                        <button disabled type="submit" className="bg-[#505954] py-2 w-full cursor-not-allowed font-black h-[48px]">JOGO FINALIZADO</button>
                    ) 
                }
                {
                    new Date(props.guess.date) > new Date() && !props.guess.Guess && (
                        <button type="submit" className="bg-[#047C3F] py-2 w-full hover:bg-[#026232] font-black h-[48px]">ENVIAR</button>
                    )
                }
                {
                    props.guess.Guess && (
                        <button disabled type="submit" className="bg-[#3c42b6] py-2 w-full cursor-not-allowed flex items-center justify-center h-[48px]"><Check size={32} weight="bold" /></button>
                    )
                }
            </div>
        </form>
    );
}