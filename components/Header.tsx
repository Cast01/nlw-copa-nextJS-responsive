import Image from 'next/image';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import { parse } from 'path';
import { useEffect, useState } from 'react';
import nlwCopaLogo from '../assets/images/logo.svg';

interface nlwMyProfileData {
    name: string,
    avatarUrl: string,
    sub: string,
}

export function Header(props: any) {
    const [ nlwMyProfileData, setNlwMyProfileData ] = useState<nlwMyProfileData>();
    console.log(nlwMyProfileData);

    useEffect(() => {
        const {nlwMyProfileData} = parseCookies();

        if (nlwMyProfileData) {
            const parse = JSON.parse(nlwMyProfileData);
            setNlwMyProfileData(parse);
        }
    }, []);

    return (
        <header className='w-full h-16 bg-slate-500 flex items-center justify-between px-4'>
            <Image src={nlwCopaLogo} alt={""}/>
            <ul className='flex gap-6 items-center'>
                <Link href={"/"}>CRIAR SALA</Link>
                <Link href={"/my-profile"}>
                    <Image 
                        src={nlwMyProfileData ? nlwMyProfileData.avatarUrl  : ""}
                        alt={""} 
                        width={50} 
                        height={50}
                        className="rounded-[50%]"
                    />
                </Link>
            </ul>
        </header>
    );
}