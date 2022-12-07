import { FormEvent, useState } from 'react';

import Image from 'next/image';
import bg from '../assets/images/BG-effects.png';
import cellPhones from '../assets/images/aplicacao-trilha-ignite.png';
import avatares from '../assets/images/avatares.png';
import icon from '../assets/images/icon.svg';
import logoWhite from '../assets/images/logoWhite.svg';

import { api } from '../lib/axios';

import { NavigationMenu } from '../components/NavigationMenu/NavigationMenu';

import { useAuth } from '../hooks/useAuth';

import { useGoogleLogin } from '@react-oauth/google';

import jwt_decode from "jwt-decode";

interface HomeProps {
  roomQuantity: number;
  userQuantity: number;
  guessQuantity: number;
} 


export default function Home(props: HomeProps) {
  const [decodedJWT, setDecodedJWT] = useState<string>();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      api.post("/user", {
        access_token: tokenResponse.access_token,
      })
      .then(data => {
        const JWTDecoded: any = jwt_decode(data.data.tokenJWT);
        setDecodedJWT(JWTDecoded);
      })
      .catch(err =>  console.log(err));

      console.log(tokenResponse.access_token);
    },
  });

  console.log(decodedJWT);

  /*
    const testConst = function teste() {
      if (userr === undefined) {
        return {};
      }
      const newObj = {...userr,
        meuTone: "asd",
      }
      return newObj;
    }

    console.log(testConst())
  */



  const [roomTitle, setRoomTitle] = useState("");

  const {user} = useAuth();

  const createRoom = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const response = await api.post('/room', {
        roomTitle
      });

      const {code} = response.data;

      // Armazena o código no ctrl+c do usuário.
      navigator.clipboard.writeText(code);

      setRoomTitle("");

      window.alert("Sala criada com sucesso! Código copiado!");
    } catch (error) {
      window.alert(error)
    }

  }

  return (

    <>
    {
      decodedJWT ? (
        <div className="min-h-screen bg-[#121214] relative flex justify-center items-center text-white">
          <Image 
            src={bg} 
            alt={'Plano de fundo'} 
            className="absolute bg-no-repeat bg-cover max-h-screen w-screen top-0 left-0" 
          />
          <div className="min-h-[640px] my-[40px] max-w-7xl w-screen z-50 flex flex-col relative px-4 pb-4">



            <NavigationMenu />




            <div className="flex pt-4">
              <div className="w-[60%] h-full pr-4 flex flex-col gap-[40px]">
                <strong className="text-clamp18px-4vw-40px">
                  Crie seu próprio bolão da copa e compartilhe entre amigos!
                </strong>
                <div className="flex items-center">
                  <Image src={avatares} alt={""} className="h-13" />
                  <div className="font-bold">
                    <span 
                      id="number"
                      className="text-[#129E57] mr-2 ml-5"
                    >
                      +{props.userQuantity || 12}
                    </span>
                    <span 
                      id="worlds"
                      className="text-[#E1E1E6]"
                    >
                      pessoas já estão usando.
                    </span>
                  </div>
                </div>
                <form className="flex" onSubmit={createRoom}>
                  <input 
                    type="text" 
                    placeholder='Qual o nome do Bolão?'
                    className="bg-[#323238] h-[50px] w-[300px] mr-3 rounded pl-4"
                    value={roomTitle}
                    onChange={e => setRoomTitle(e.target.value)}
                  />
                  <button 
                    type={"submit"}
                    className="bg-[#F7DD43] text-black font-bold px-4 rounded"
                  >
                    CRIAR MEU BOLÃO
                  </button>
                </form>
                <p className="max-w-[500px] text-[#8D8D99]">
                  Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
                </p>
                <div id="horizontalSeparator" className="w-[100%] h-[2px] bg-[#323238] mx-auto" />
                <div className="w-full flex">
                  <div className="w-calc50%-1px">
                    <div className="flex">
                      <Image 
                        src={icon} 
                        alt={"icon correct"}
                        className="mr-4"
                      />
                      <div>
                        <div>+ {props.roomQuantity || 1}</div>
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
                        <div>+ {props.guessQuantity || 1}</div>
                        <div>Palpites enviados</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div className="w-[40%] h-full flex justify-center items-center">
                <Image 
                  src={cellPhones} 
                  alt={"2 cellphones with nlw copa application"}
                  className="max-h-full"
                />
              </div>
            </div>



          </div>
        </div>
      ) : (
        <div className="text-white flex flex-col gap-6 justify-center items-center min-h-screen">
          <Image
            src={logoWhite}
            alt={""}
            className="w-[280px]"
          />
          
          <button onClick={() => login()}>Login</button>

          <p className="w-[280px]">
            Não utilizamos nenhuma informação além do seu e-mail e da sua iamgem de perfil para criação de sua conta.
          </p>
        </div>
      )
    }
    </>
  )
}

// Basicamente ele monta a página com os dados do Banco de Dados. Quando chamamos as rota dentro do
// componente ele não espera os dados chegarem para os robos do google identificarem que os dados existem
// no caso de um E-Commerce os robos do google vão ver uma pagina normal, mas os itens a venda não serão
// indexados e se alguem pesquisar por sapato da nike o seu site não ira aparecer, pois os nomes das coisas
// vem do Banco de Dados e se chamar a rota no componente em si os robos não esperam os dados chegar 
// para liberar o site para os buscadores.
/*export async function getServerSideProps() {
  const [
    roomQuantity,
    userQuantity,
    guessQuantity,
  ] = await Promise.all([
    api.get("/room/quantity"),
    api.get("/user/quantity"),
    api.get("/guess/quantity"),
  ]);

  return {
    props: {
      roomQuantity: roomQuantity.data.roomQuantity,
      userQuantity: userQuantity.data.userQuantity,
      guessQuantity: guessQuantity.data.guessQuantity,
    }
  }
}*/
