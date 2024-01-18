/* eslint-disable @next/next/no-img-element */
import type { Userstyle } from "@/types";
import React, { useState, useEffect } from "react";
import Image from "next/image";

function UserstyleCard({ userstyle }: { readonly userstyle: Userstyle }) {
  const [iconSvg, setIconSvg] = useState<string | null>(null);

  useEffect(() => {
    const fetchIcon = async () => {
      if (!userstyle.icon) return;

      try {
        const res = await fetch(
          `https://simpleicons.org/icons/${userstyle.icon}.svg`,
        );

        if (res.ok) {
          setIconSvg(await res.text());
        } else {
          throw new Error(
            `Error fetching icon: ${res.status} ${res.statusText}`,
          );
        }
      } catch (error) {
        console.error("Error fetching icon:", error);
      }
    };

    fetchIcon();
  }, [userstyle.icon]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-surface0 p-4">
      {(iconSvg && (
        <div
          dangerouslySetInnerHTML={{ __html: iconSvg }}
          className={`h-12 w-12 fill-${userstyle.color ?? "text"}`}
        />
      )) ?? (
        <Image
          className="h-12 w-12"
          src="/circle.webp"
          alt={
            Array.isArray(userstyle.name)
              ? userstyle.name.join(", ")
              : userstyle.name
          }
          width={48}
          height={48}
        />
      )}

      <div className="flex flex-row items-center justify-center">
        <a
          className="text-center text-xl font-bold"
          href={`https://github.com/catppuccin/userstyles/tree/main/styles/${
            Array.isArray(userstyle.name)
              ? userstyle.name[0]?.toLocaleLowerCase().replaceAll(" ", "-") ??
                ""
              : userstyle.name
                  .toString()
                  .toLocaleLowerCase()
                  .replaceAll(" ", "-") ?? ""
          }`}
        >
          <span
            className={`text-blue hover:underline text-${userstyle.color ?? "text"}`}
          >
            {Array.isArray(userstyle.name)
              ? userstyle.name.map((name, index) => (
                  <span key={String(name)}>
                    {index > 0 ? "/" : ""}
                    {name}
                  </span>
                ))
              : userstyle.name}
          </span>
        </a>
      </div>
    </div>
  );
}

export default UserstyleCard;
