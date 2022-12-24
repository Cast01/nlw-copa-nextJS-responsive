import { Dispatch, FormEvent, SetStateAction } from "react";

interface FormCodeSubmitPropsType {
    searchRoom: (e: FormEvent) => void,
    setCodeInput: Dispatch<SetStateAction<string>>
    codeInput: string,
}

export function FormCodeSubmit({codeInput,searchRoom,setCodeInput}: FormCodeSubmitPropsType) {
    return (
        <form onSubmit={searchRoom} className="h-10 self-end">
            <input
                type="text"
                placeholder="Código da sala"
                className="h-full w-64 rounded-tl-md rounded-bl-md bg-[#323238] pl-4 outline-none"
                onChange={e => setCodeInput(e.target.value)}
                value={codeInput}
            />
            <button type="submit" className="bg-[#F7DD43] h-full px-7 rounded-tr-md rounded-br-md text-black hover:bg-[#d6bf3b]">Buscar sala</button>
        </form> 
    );
}