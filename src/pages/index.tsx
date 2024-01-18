/* eslint-disable @next/next/no-img-element */
import type { InferGetServerSidePropsType } from "next";
import { parse } from "yaml";
import type { UserStylesSchema, Userstyle } from "@/types";
import UserstyleCard from "@/components/UserstyleCard";
import LazyLoad from "react-lazy-load";
import Head from "next/head";

export const getServerSideProps = async () => {
  try {
    const raw = await fetch(
      "https://raw.githubusercontent.com/catppuccin/userstyles/main/scripts/userstyles.yml",
    ).then((res) => res.text());

    const userstyles = parse(raw) as UserStylesSchema;

    const updateUserstyleIcons = async (
      userstyles: Userstyle[],
    ): Promise<Userstyle[]> => {
      const updatedUserstyles = await Promise.all(
        userstyles.map(async (userstyle) => {
          if (userstyle.icon) {
            try {
              const fetchedIcon = await fetchIcon(userstyle.icon);
              userstyle.icon = fetchedIcon;
            } catch (error) {
              console.error(
                `Error fetching icon for ${String(userstyle.name)}: ${String(error)}`,
              );
            }
          }
          return userstyle;
        }),
      );
      return updatedUserstyles;
    };

    const fetchIcon = async (icon: string): Promise<string> => {
      try {
        const res = await fetch(`https://simpleicons.org/icons/${icon}.svg`);

        if (res.ok) {
          return await res.text();
        } else {
          throw new Error(
            `Error fetching icon: ${res.status} ${res.statusText}`,
          );
        }
      } catch (error) {
        console.error("Error fetching icon:", error);
        throw error; // Propagate the error so it can be caught in updateUserstyleIcons
      }
    };

    const userstylesWithIcons = await updateUserstyleIcons(
      Object.values(userstyles.userstyles),
    );

    return {
      props: {
        userstyles: userstylesWithIcons,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);

    return {
      props: {
        userstyles: [],
      },
    };
  }
};

export default function Home({
  userstyles,
}: Readonly<InferGetServerSidePropsType<typeof getServerSideProps>>) {
  return (
    <>
      <Head>
        <title>Catppuccin Userstyles</title>
      </Head>
      <div className="container flex flex-col items-center justify-center gap-4 px-4">
        <div className="grid grid-cols-2 gap-4 text-text sm:grid-cols-4 md:gap-8">
          {Array.isArray(userstyles) &&
            userstyles.map((userstyle: Userstyle) => (
              <LazyLoad key={String(userstyle.name)}>
                <UserstyleCard userstyle={userstyle} />
              </LazyLoad>
            ))}
        </div>
      </div>
    </>
  );
}
