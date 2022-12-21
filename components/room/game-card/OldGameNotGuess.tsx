import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { Check } from 'phosphor-react';
import { useForm } from 'react-hook-form';

import { TeamCountryCodeType } from './ValidDateGuessNoExist';

export function OldGameNotGuess(props: TeamCountryCodeType) {
    const { register, formState: { errors } } = useForm();

    return (
        <>
            <div className="w-full flex justify-between">
                <select disabled className="bg-[#171718] cursor-not-allowed" {...register("firstTeamPoints")}>
                    <option defaultValue={0} value="0">0</option>
                    {
                        Array.from({length: 15}).map((_, i) => {
                            return (
                                <option key={i} value={i+1}>{i+1}</option>
                            );
                        })
                    }
                </select>
                <span>{getUnicodeFlagIcon(props.firstTeamCountryCode)}</span>
                <span>{" X "}</span>
                <span>{getUnicodeFlagIcon(props.secondTeamCountryCode)}</span>
                <select disabled className="bg-[#171718] cursor-not-allowed" {...register("secondTeamPoints")}>
                    <option defaultValue={0} value="0">0</option>
                    {
                        Array.from({length: 15}).map((_, i) => {
                            return (
                                <option key={i} value={i+1}>{i+1}</option>
                            );
                        })
                    }
                </select>
            </div>
            <button disabled type="submit" className="bg-[#505954] py-2 w-full cursor-not-allowed font-black h-[48px]">JOGO FINALIZADO</button>
        </>
    );
}