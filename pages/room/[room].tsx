import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { api } from "../../lib/axios";

export default function Room() {
    const router = useRouter();
    const {room} = router.query;
    console.log(router);

    return (
        <h1>{room}</h1>
    );
}

export async function getServerSideProps(ctx: any) {
    const {nlwcopaToken} = parseCookies(ctx);
    const roomId = ctx.query.room;
    
    const response = await api.get(`/room/${roomId}`, {
        headers: {
            'Authorization': `Bearer ${nlwcopaToken}`
        }
    });

    console.log(response);
    
    return {
        props: {

        }
    }
}