import Image from 'next/image';
import Link from 'next/link';
import nlwCopaLogo from '../assets/images/logo.svg';
import { useAuth } from '../hooks/useAuth';

export function Header() {
    const {user} = useAuth();
    console.log("TESTEEEEEE" + user);

    return (
        <header className='w-full h-16 bg-slate-500 flex items-center justify-between px-4'>
            <Image src={nlwCopaLogo} alt={""}/>
            <ul className='flex gap-6 items-center'>
                <Link href={"/"}>CRIAR SALA</Link>
                <Link href={"/my-room"}>
                    <Image 
                        src={"https://lh3.googleusercontent.com/a/ALm5wu29n_kQ9bU_TdWy81sJgiRDzb6e1vfkfRa917eX=s96-c"}
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