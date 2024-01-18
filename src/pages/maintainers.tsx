/* eslint-disable @next/next/no-img-element */
import type { InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { parse } from "yaml";
import type { UserStylesSchema } from "@/types";
import MaintainerCard from "@/components/MaintainerCard";
import LazyLoad from "react-lazy-load";

export const getServerSideProps = async () => {
  const raw = fetch(
    "https://raw.githubusercontent.com/catppuccin/userstyles/main/scripts/userstyles.yml",
  ).then((res) => res.text());

  const userstyles = parse(await raw) as UserStylesSchema;

  return {
    props: {
      userstyles,
      slug: "maintainers",
    },
  };
};

export default function Maintainers({
  userstyles,
}: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
  return (
    <>
      <Head>
        <title>Catppuccin Userstyles Maintainers</title>
      </Head>
      <div className="flex flex-col items-center justify-center gap-4 px-4">
        <div className="grid grid-cols-2 gap-4 text-text sm:grid-cols-4 md:gap-8">
          {userstyles.collaborators?.map((collaborator) => (
            <LazyLoad
              key={String(
                collaborator.name ?? collaborator.url.split("/").pop(),
              )}
              className="flex flex-col items-center justify-center gap-4"
            >
              <MaintainerCard collaborator={collaborator} />
            </LazyLoad>
          ))}
        </div>
      </div>
    </>
  );
}
