import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { Check } from 'phosphor-react';
import { useForm } from 'react-hook-form';

export interface TeamCountryCodeType {
    firstTeamCountryCode: string,
    secondTeamCountryCode: string,
    block?: boolean;
}

export function NoGuess(props: TeamCountryCodeType) {
    const { register, formState: { errors } } = useForm();

    return (
        <>
            <div className="w-full flex justify-between">
                <select disabled={props.block ? true : false} className={`bg-[#171718] ${props.block ? "cursor-not-allowed" : ""}`} {...register("firstTeamPoints")}>
                    <option defaultValue={0} value="0">0</option>
                    {
                        Array.from({ length: 15 }).map((_, i) => {
                            return (
                                <option key={i} value={i + 1}>{i + 1}</option>
                            );
                        })
                    }
                </select>
                <span>{getUnicodeFlagIcon(props.firstTeamCountryCode)}</span>
                <span>{" X "}</span>
                <span>{getUnicodeFlagIcon(props.secondTeamCountryCode)}</span>
                <select disabled={props.block ? true : false} className={`bg-[#171718] ${props.block ? "cursor-not-allowed" : ""}`} {...register("secondTeamPoints")}>
                    <option defaultValue={0} value="0">0</option>
                    {
                        Array.from({ length: 15 }).map((_, i) => {
                            return (
                                <option key={i} value={i + 1}>{i + 1}</option>
                            );
                        })
                    }
                </select>
            </div>
            <button disabled={props.block ? true : false} type="submit" className={`bg-[#047C3F] py-2 w-full font-black h-[48px] flex items-center justify-center ${props.block ? "cursor-not-allowed bg-[#3c42b6]" : "hover:bg-[#026232]"}`}>
                {props.block ? (
                    <Check size={32} weight="bold" />
                ) : (
                    <span>ENVIAR</span>
                )}
            </button>
        </>
    );
}