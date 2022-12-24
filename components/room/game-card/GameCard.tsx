
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from "../../../lib/axios";
import { toast, Toaster } from "react-hot-toast";
import { Check } from "phosphor-react";

import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { GamePoints } from "./GamePoints";
import { FirstTeamCountryCode } from "./FirstTeamCountryCode";
import { SecondTeamCountryCode } from "./SecondTeamCountryCode";
import { FirstTeamCountryName } from "./FirstTeamCountryName";
import { SecondTeamCountryName } from "./SecondTeamCountryName";
const { getName } = require('country-list');

const schema = yup.object({
    firstTeamPoints: yup.number().positive().integer().max(15).min(0),
    secondTeamPoints: yup.number().positive().integer().max(15).min(0),
}).required();

interface GuessCardPropsType {
    game: {
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
}

export function GameCard({game,gameId,roomId}: GuessCardPropsType) {
    const [block, setBlock] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const submitMyGuess = (data: any) => {
        api.post(`/room/${roomId}/games/${gameId}/guesses`, {
            firstTeamPoints: data.firstTeamPoints,
            secondTeamPoints: data.secondTeamPoints,
        })
            .then(data => {
                toast.success(data.data.message);
                setBlock(true);
            })
            .catch(err => toast.error(err.response.data.message));
    };

    return (
        <form 
            key={gameId} 
            className="flex flex-col gap-4 items-center p-4 w-[270px] bg-[#202024] h-fit"
            onSubmit={handleSubmit(submitMyGuess)}
        >
            <div className="w-full text-center bg-[rgba(0,0,0,0.3)] py-3 font-black rounded">
                <FirstTeamCountryName firstTeamCountryCode={game.firstTeamCountryCode}/>
                <div>vs</div>
                <SecondTeamCountryName secondTeamCountryCode={game.secondTeamCountryCode}/>
            </div>
            <div>
                {
                    new Date(game.date).toLocaleString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })
                }
            </div>

            {/* All types of GameCard */}
            <div className="w-full flex flex-col items-center gap-2">
                {
                    // GAME: Old date and my guess not exist
                    new Date(game.date) < new Date() && !game.Guess && (
                        <>
                            <div className="w-full flex justify-between">
                                <select disabled className="bg-[#171718] cursor-not-allowed" {...register("firstTeamPoints")}>
                                    <option defaultValue={0} value="0">0</option>
                                </select>
                                <FirstTeamCountryCode firstTeamCountryCode={game.firstTeamCountryCode}/>
                                <span>{" X "}</span>
                                <SecondTeamCountryCode secondTeamCountryCode={game.secondTeamCountryCode}/>
                                <select disabled className="bg-[#171718] cursor-not-allowed" {...register("secondTeamPoints")}>
                                    <option defaultValue={0} value="0">0</option>
                                </select>
                            </div>
                            <button disabled type="submit" className="bg-[#505954] py-2 w-full cursor-not-allowed font-black h-[48px]">JOGO FINALIZADO</button>
                        </>
                    )
                }
                {
                    // GAME: Old date and my guess exist
                    new Date(game.date) < new Date() && game.Guess && (
                        <>
                            <div className="w-full flex justify-between">
                                <select disabled className="bg-[#171718] cursor-not-allowed" {...register("firstTeamPoints")}>
                                    <option selected value={game.Guess.secondTeamPoints}>{game.Guess.firstTeamPoints}</option>
                                </select>
                                <FirstTeamCountryCode firstTeamCountryCode={game.firstTeamCountryCode}/>
                                <span>{" X "}</span>
                                <SecondTeamCountryCode secondTeamCountryCode={game.secondTeamCountryCode}/>
                                <select disabled className="bg-[#171718] cursor-not-allowed" {...register("secondTeamPoints")}>
                                    <option selected value={game.Guess.secondTeamPoints}>{game.Guess.secondTeamPoints}</option>
                                </select>
                            </div>
                            <button disabled type="submit" className="bg-[#3c42b6] py-2 w-full cursor-not-allowed flex items-center justify-center h-[48px]"><Check size={32} weight="bold" /></button>
                        </>
                    )
                }
                {
                    // GAME: Date valid and my guess not exist
                    new Date(game.date) > new Date() && !game.Guess && (
                        <>
                            <div className="w-full flex justify-between">
                                <select 
                                    disabled={block ? true : false} 
                                    className={`bg-[#171718] ${block ? "cursor-not-allowed" : ""}`} {...register("firstTeamPoints")}
                                >
                                    <option defaultValue={0} value="0">0</option>
                                    <GamePoints />
                                </select>
                                <FirstTeamCountryCode firstTeamCountryCode={game.firstTeamCountryCode}/>
                                <span>{" X "}</span>
                                <SecondTeamCountryCode secondTeamCountryCode={game.secondTeamCountryCode}/>
                                <select 
                                    disabled={block ? true : false} 
                                    className={`bg-[#171718] ${block ? "cursor-not-allowed" : ""}`} {...register("secondTeamPoints")}
                                >
                                    <option defaultValue={0} value="0">0</option>
                                    <GamePoints />
                                </select>
                            </div>
                            <button
                                disabled={block ? true : false} type="submit"
                                className={`py-2 w-full font-black h-[48px] flex items-center justify-center ${block ? "cursor-not-allowed bg-[#3c42b6]" : "bg-[#047C3F] hover:bg-[#026232]"}`}
                            >
                                {block ? (
                                    <Check size={32} weight="bold" />
                                ) : (
                                    <span>ENVIAR</span>
                                )}
                            </button>
                        </>
                    )
                }
                {
                    // GAME: Valid date and my guess exist
                    new Date(game.date) > new Date() && game.Guess && (
                        <>
                            <div className="w-full flex justify-between">
                                <select disabled className="bg-[#171718] cursor-not-allowed" {...register("firstTeamPoints")}>
                                    <option selected value={game.Guess.secondTeamPoints}>{game.Guess.firstTeamPoints}</option>
                                </select>
                                <FirstTeamCountryCode firstTeamCountryCode={game.firstTeamCountryCode}/>
                                <span>{" X "}</span>
                                <SecondTeamCountryCode secondTeamCountryCode={game.secondTeamCountryCode}/>
                                <select disabled className="bg-[#171718] cursor-not-allowed" {...register("secondTeamPoints")}>
                                    <option selected value={game.Guess.secondTeamPoints}>{game.Guess.secondTeamPoints}</option>
                                </select>
                            </div>
                            <button disabled type="submit" className="bg-[#3c42b6] py-2 w-full cursor-not-allowed flex items-center justify-center h-[48px]"><Check size={32} weight="bold" /></button>
                        </>
                    )
                }
            </div>
        </form>
    );
}