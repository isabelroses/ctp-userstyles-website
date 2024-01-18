/* eslint-disable @next/next/no-img-element */
import type { InferGetServerSidePropsType } from "next";
import { parse } from "yaml";
import type { UserStylesSchema } from "@/types";
import UserstyleCard from "@/components/UserstyleCard";
import LazyLoad from "react-lazy-load";

export const getServerSideProps = async () => {
  const raw = fetch(
    "https://raw.githubusercontent.com/catppuccin/userstyles/main/scripts/userstyles.yml",
  ).then((res) => res.text());

  const userstyles = parse(await raw) as UserStylesSchema;

  return {
    props: {
      userstyles,
      slug: "index",
    },
  };
};

export default function Home({
  userstyles,
}: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
  return (
    <div className="container flex flex-col items-center justify-center gap-4 px-4">
      <div className="grid grid-cols-2 gap-4 text-text sm:grid-cols-4 md:gap-8">
        {Array.isArray(Object.values(userstyles?.userstyles ?? {})) &&
          Object.values(userstyles?.userstyles ?? {}).map((userstyle) => (
            <LazyLoad key={String(userstyle.name)}>
              <UserstyleCard
                key={String(userstyle.name)}
                userstyle={userstyle}
              />
            </LazyLoad>
          ))}
      </div>
    </div>
  );
}
