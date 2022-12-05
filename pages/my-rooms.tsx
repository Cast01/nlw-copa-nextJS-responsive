import { NavigationMenu } from "../components/NavigationMenu/NavigationMenu";
import { api } from "../lib/axios";

export default function MyRooms() {
    const arr = [{name:"gabriel"}];

    return (
        <div className="min-h-[640px] my-[40px] text-white max-w-7xl w-screen z-50 pb-4 mx-auto outline md:bg-slate-400">
            <NavigationMenu />



            <h1 className="pt-7 pl-4 text-7xl font-black">
                Minhas salas
            </h1>


            <div >
                <input type="text" />
                <button type="submit">BUSCAR SALA</button>
            </div>

            {
                arr.length === 0 ? (
                    <h1>Não tem ninguem</h1>
                ) : (
                    <h1>Tem alguem</h1>
                )
            }
        </div>
    );
}

export async function getServerSideProps() {
    const userId = "claoraf3a0000vw4k1hg9n0or";

    const data = api.get(`/my-room/${userId}`)

    return {
        props: {

        }
    };
}