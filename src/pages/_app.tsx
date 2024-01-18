import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <Head>
        <meta name="description" content="Catppuccin Userstyles" />
        <link rel="favicon" href="/favicon.ico" />
      </Head>

      <Header route={currentRoute} />

      <main className="flex min-h-screen flex-col items-center justify-center py-8">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
