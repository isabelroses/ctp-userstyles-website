/* eslint-disable @next/next/no-img-element */
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Octokit } from "octokit";

export const getServerSideProps = async () => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const contributors = await octokit
    .request("GET /repos/{owner}/{repo}/contributors", {
      owner: "catppuccin",
      repo: "userstyles",
    })
    .then((res) => res.data);

  const all = await octokit
    .request("GET /repos/{owner}/{repo}", {
      owner: "catppuccin",
      repo: "userstyles",
    })
    .then((res) => res.data);

  return {
    props: {
      contributors,
      all,
    },
  };
};

export default function Home({
  contributors,
  all,
}: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
  return (
    <>
      <Head>
        <title>Catppuccin Userstyles Wrapped</title>
        <meta name="description" content="Catppuccin Userstyles Wrapped" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mocha flex min-h-screen flex-col items-center justify-center bg-base">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-[4rem] font-extrabold tracking-tight text-text">
              Catppuccin <span className="text-sapphire">Userstyles</span>{" "}
              Wrapped
            </h1>
            <h2 className="flex text-[1.8rem] font-bold text-peach">
              <FontAwesomeIcon icon={faStar} className="h-10 pr-2" />{" "}
              {all.stargazers_count}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8">
            {contributors.map(
              (contributor) =>
                contributor.type !== "Bot" && (
                  <div
                    key={contributor.id}
                    className="flex flex-col items-center justify-center gap-4 rounded-lg bg-surface0 p-4 shadow-lg"
                  >
                    <img
                      className="h-24 w-24 rounded-full"
                      src={contributor.avatar_url ?? ""}
                      alt={contributor.login ?? ""}
                    />
                    <h3 className="text-center text-xl font-bold text-text">
                      {contributor.login}
                    </h3>
                    <p className="text-center text-sm text-subtext0">
                      {contributor.contributions} contributions
                    </p>
                  </div>
                ),
            )}
          </div>
        </div>
      </main>
    </>
  );
}
