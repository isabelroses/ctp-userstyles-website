/* eslint-disable @next/next/no-img-element */
import type { Userstyle } from "@/types";
import React from "react";
import Image from "next/image";

function UserstyleCard({ userstyle }: { readonly userstyle: Userstyle }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-surface0 p-4">
      {(userstyle.icon && (
        <div
          dangerouslySetInnerHTML={{ __html: userstyle.icon }}
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
