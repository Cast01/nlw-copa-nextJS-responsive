import { Header } from "../components/Header";

export default function WithOutAPI() {
    return (
        <div className="text-white min-h-screen text-3xl flex flex-col items-center justify-center text-center p-8 gap-6">
            <Header />
            <h1>Faça um clone do Front-End e da API para conseguir testar o projeto.</h1>
            <a className="text-blue-500 underline mt-6" href="https://github.com/Cast01/nlw-copa-nextJS-responsive" target={"_blank"}>FRONT-END</a>
            <a className="text-blue-500 underline" href="https://github.com/Cast01/nlw-copa-API-fastify" target={"_blank"}>API</a>
        </div>
    );
}