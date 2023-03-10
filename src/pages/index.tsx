import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex min-h-screen flex-col items-center">
        <header className="w-full bg-gray-800 text-white py-8">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold">Catch the Chicken</h1>
            <p className="text-xl font-light">Test your reflexes and aim with this fun and challenging game</p>
            <a href="#" className="btn-primary">Play Now</a>
          </div>
        </header>
        <section className="py-8 container mx-auto">
          <div className="container mx-auto flex">
            <div className="w-1/2">
              {/*<img src="chicken.jpg" alt="Chicken running" className="w-full">*/}
            </div>
            <div className="w-1/2 pl-8">
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p>In this game, you must press the button to stop the chicken as it moves from left to right, trying to
                catch it in the center of the screen. Try to beat your high score and see how precise your aim can
                be!</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full bg-gray-800 text-white py-8">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-xs font-light">Copyright &copy; 2021 Catch the Chicken</p>
          <ul className="flex">
            <li><a href="#" className="text-white font-light hover:text-gray-400"><i
              className="fab fa-twitter"></i></a></li>
            <li><a href="#" className="text-white font-light hover:text-gray-400"><i className="fab fa-facebook"></i></a>
            </li>
            <li><a href="#" className="text-white font-light hover:text-gray-400"><i className="fab fa-instagram"></i></a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
