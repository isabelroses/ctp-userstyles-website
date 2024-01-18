import { type AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import Header from "@/components/Header";

import "@/styles/globals.css";

interface PageProps {
  slug: string;
}

const MyApp: AppType = ({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<PageProps>;
  pageProps: PageProps;
}) => {
  return (
    <>
      <Head>
        <title>Catppuccin Userstyles Maintainers</title>
        <meta name="description" content="Catppuccin Userstyles" />
        <link rel="string" href="/favstring.ico" />
      </Head>

      <Header page={pageProps.slug} />

      <main className="flex min-h-screen flex-col items-center justify-center py-8">
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;
