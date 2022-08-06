import Head from 'next/head';
import Header from '../components/Header';
import { getSession } from "next-auth/react";
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widget from '../components/Widget';

export default function Home({ session}) {
  if(!session) return <Login />;

  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed />
        {/* Widgets */}
        <Widget />
      </main>

    </div>
  );
}


export async function getServerSideProps(context){
  // 取得使用者
  const session = await getSession(context);

  // 將使用者傳來的登入資訊視為prop，再render去browser
  return {
    props: {
      session
    }
  }
}