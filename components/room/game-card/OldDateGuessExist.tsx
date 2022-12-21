import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { Check } from 'phosphor-react';
import { useForm } from 'react-hook-form';

import { TeamCountryCodeType } from './ValidDateGuessNoExist';

interface TeamPoints {
    firstTeamPoints: number,
    secondTeamPoints: number,
}

export function OldDateGuessExist(props: TeamCountryCodeType & TeamPoints) {
    const { register, formState: { errors } } = useForm();

    return (
        <>
            <div className="w-full flex justify-between">
                <select disabled className="bg-[#171718] cursor-not-allowed" {...register("firstTeamPoints")}>
                    <option selected value={props.secondTeamPoints}>{props.firstTeamPoints}</option>
                </select>
                <span>{getUnicodeFlagIcon(props.firstTeamCountryCode)}</span>
                <span>{" X "}</span>
                <span>{getUnicodeFlagIcon(props.secondTeamCountryCode)}</span>
                <select disabled className="bg-[#171718] cursor-not-allowed" {...register("secondTeamPoints")}>
                    <option selected value={props.secondTeamPoints}>{props.secondTeamPoints}</option>
                </select>
            </div>
            <button disabled type="submit" className="bg-[#3c42b6] py-2 w-full cursor-not-allowed flex items-center justify-center h-[48px]"><Check size={32} weight="bold"/></button>
        </>
    );
}