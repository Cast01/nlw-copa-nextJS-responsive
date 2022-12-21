
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { api } from "../../lib/axios";
import { toast } from "react-hot-toast";
import { NoGuess } from "./NoGuess";
import { OldGame } from "./OldGame";
import { MyGuess } from "./MyGuess";
const { getName } = require('country-list');

const schema = yup.object({
    firstTeamPoints: yup.number().positive().integer().max(15).min(0),
    secondTeamPoints: yup.number().positive().integer().max(15).min(0),
}).required();

interface GameCardPropsType {
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

interface inputValueType {
    firstTeamPoints: string,
    secondTeamPoints: string,
}

export function GameCard(props: GameCardPropsType) {
    const [block, setBlock] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = ({ firstTeamPoints, secondTeamPoints }: inputValueType) => {
        console.log("cheguei")

        api.post(`/room/${props.roomId}/games/${props.gameId}/guesses`, {
            firstTeamPoints,
            secondTeamPoints,
        })
            .then(data => {
                toast.success(data.data.message);
                setBlock(true);
            })
            .catch(err => toast.error(err.response.data.message));
    };

    return (
        <form key={props.gameId} className="flex flex-col gap-4 items-center p-4 w-[270px] bg-[#202024] h-fit" onSubmit={handleSubmit(() => onSubmit)}>
            <div className="w-full text-center bg-[rgba(0,0,0,0.3)] py-3 font-black rounded">
                <div className="truncate">{getName(props.guess.firstTeamCountryCode)}</div>
                <div>X</div>
                <div className="truncate">{getName(props.guess.secondTeamCountryCode)}</div>
            </div>
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
                    // OLD GAME
                    new Date(props.guess.date) < new Date() && (
                        <OldGame firstTeamCountryCode={props.guess.firstTeamCountryCode} secondTeamCountryCode={props.guess.secondTeamCountryCode} />
                    )
                }
                {
                    // DATE VALID AND MY GUESS DOES NOT EXIST
                    new Date(props.guess.date) > new Date() && !props.guess.Guess && (
                        <NoGuess firstTeamCountryCode={props.guess.firstTeamCountryCode} secondTeamCountryCode={props.guess.secondTeamCountryCode} block={block} />
                    )
                }
                {
                    // DATE VALID AND MY GUESS EXIST
                    new Date(props.guess.date) > new Date() && props.guess.Guess && (
                        <MyGuess firstTeamCountryCode={props.guess.firstTeamCountryCode} secondTeamCountryCode={props.guess.secondTeamCountryCode} firstTeamPoints={props.guess.Guess.firstTeamPoints} secondTeamPoints={props.guess.Guess.secondTeamPoints} />
                    )
                }
            </div>
        </form>
    );
}