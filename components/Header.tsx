import Image from 'next/image';
import Link from 'next/link';
import nlwCopaLogo from '../assets/images/logo.svg';
import defaultProfileImage from '../assets/images/defaultImage.jpg';
import { useAuth } from '../hooks/useAuth';

export function Header(props: any) {
    const {user} = useAuth();

    return (
        <header className='w-full h-16 bg-slate-500 flex items-center justify-between px-4'>
            <Image src={nlwCopaLogo} alt={""}/>
            <ul className='flex gap-6 items-center'>
                <Link href={"/"}>CRIAR SALA</Link>
                <Link href={"/my-profile"}>
                    <Image 
                        src={user ? user.avatarUrl  : defaultProfileImage}
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