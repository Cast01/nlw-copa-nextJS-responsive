import { FormEvent, useContext, useState } from 'react';

import Image from 'next/image';
import bg from '../assets/images/BG-effects.png';
import cellPhones from '../assets/images/aplicacao-trilha-ignite.png';
import avatares from '../assets/images/avatares.png';
import icon from '../assets/images/icon.svg';
import googleLogoSVG from '../assets/images/GoogleLogo.svg';

import Router from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { api } from '../lib/axios';
import { Header } from '../components/Header';
import { parseCookies } from 'nookies';

export interface HomeContextType {
	roomQuantity: number | undefined,
	userQuantity: number | undefined,
	guessQuantity: number | undefined,
	nlwcopaToken: string | undefined,
}

export default function Home({ guessQuantity, nlwcopaToken, roomQuantity, userQuantity }: HomeContextType) {
	const [roomTitleInput, setRoomTitleInput] = useState("");

	const { login } = useAuth();

	const withOutAPI = () => {
		Router.push("/with-out-api")
	}

	const createRoom = async (e: FormEvent) => {
		try {
			e.preventDefault();

			const response = await api.post('/room', {
				title: roomTitleInput,
			});

			const { code, roomCreatedId } = response.data;

			// Armazena o código no ctrl+c do usuário.
			navigator.clipboard.writeText(code);

			setRoomTitleInput("");

			Router.push(`/room/${roomCreatedId}`);
		} catch (error) {
			console.log(error)
		}

	}

	return (
		<div className="min-h-screen bg-[#121214] relative flex justify-center items-center text-white">
			<Image
				id="BackgroundAPP"
				src={bg}
				alt={'Plano de fundo'}
				className="absolute bg-no-repeat bg-cover max-h-screen w-screen top-0 left-0"
			/>
			<div className="min-h-[640px] my-[40px] max-w-7xl w-screen z-50 flex flex-col relative pb-4">
				<Header />
				<div className="flex pt-4 px-4">
					<div className="w-[60%] pr-4 flex flex-col gap-[40px]">
						<strong className="text-clamp1rem3vw2.7rem">
							Crie seu próprio bolão da copa e compartilhe entre amigos!
						</strong>
						<div className="flex items-center">
							<Image src={avatares} alt={""} className="h-13" />
							<ul className="font-bold">
								<li
									id="number"
									className="text-[#129E57] mr-2 ml-5"
								>
									+{userQuantity || 236}
								</li>
								<li
									id="worlds"
									className="text-[#E1E1E6]"
								>
									pessoas já estão usando.
								</li>
							</ul>
						</div>
						<form onSubmit={createRoom}>
							{
								nlwcopaToken ? (
									<></>
								) : (
									<span className='text-[#DB4437] mb-6'>Faça login com a sua conta do google para liberar seu acesso.</span>
								)
							}
							<div className='flex'>
								<input
									type="text"
									placeholder='Qual o nome do Bolão?'
									className="bg-[#323238] h-[50px] w-[300px] mr-3 rounded pl-4"
									value={roomTitleInput}
									onChange={e => setRoomTitleInput(e.target.value)}
								/>
								{
									nlwcopaToken ? (
										// Default button
										<button
											type={"submit"}
											className="bg-[#F7DD43] text-black font-bold px-4 rounded"
										>
											CRIAR MEU BOLÃO
										</button>
									) : (
										// Button Google Login
										<div
											className="bg-[#DB4437] text-black font-bold rounded px-11 flex items-center justify-center cursor-pointer"
											onClick={() => withOutAPI()}
										>
											<Image src={googleLogoSVG} alt={""} width={30} height={30} />
										</div>
									)
								}
							</div>
						</form>
						<p className="max-w-[500px] text-[#8D8D99]">
							Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
						</p>
						<div id="horizontalSeparator" className="w-[100%] h-[2px] bg-[#323238] mx-auto" />
						{/* 
							RoomQUantity and Guess quantity
						*/}
						<div className="w-full flex gap-12">
							<div className="w-calc50%-1px">
								<div className="flex">
									<Image
										src={icon}
										alt={"icon correct"}
										className="mr-4"
									/>
									<div>
										<div>+ {roomQuantity || 37}</div>
										<div>Salas criadas</div>
									</div>
								</div>
							</div>
							<div id="verticalSeparator" className="w-[2px] bg-[#323238]" />
							<div className="w-calc50%-1px">
								<div className="flex justify-end">
									<Image
										src={icon}
										alt={"icon correct"}
										className="mr-4"
									/>
									<div>
										<div>+ {guessQuantity || 847}</div>
										<div>Palpites enviados</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="w-[40%] flex justify-center items-center">
						<Image
							src={cellPhones}
							alt={"2 cellphones with nlw copa application"}
							className="max-h-full"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

// Basicamente ele monta a página com os dados do Banco de Dados. Quando chamamos as rota dentro do
// componente ele não espera os dados chegarem para os robos do google identificarem que os dados existem
// no caso de um E-Commerce os robos do google vão ver uma pagina normal, mas os itens a venda não serão
// indexados e se alguem pesquisar por sapato da nike o seu site não ira aparecer, pois os nomes das coisas
// vem do Banco de Dados e se chamar a rota no componente em si os robos não esperam os dados chegar 
// para liberar o site para os buscadores.
// export async function getServerSideProps(ctx: any) {
// 	const { nlwcopaToken } = parseCookies(ctx);

// 	const [
// 		roomQuantity,
// 		userQuantity,
// 		guessQuantity,
// 	] = await Promise.all([
// 		api.get("/room/quantity"),
// 		api.get("/user/quantity"),
// 		api.get("/guess/quantity"),
// 	]);

// 	return {
// 		props: {
// 			roomQuantity: roomQuantity.data.roomQuantity,
// 			userQuantity: userQuantity.data.userQuantity,
// 			guessQuantity: guessQuantity.data.guessQuantity,
// 			nlwcopaToken: nlwcopaToken ?? null,
// 		}
// 	}
// }