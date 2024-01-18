/* eslint-disable @next/next/no-img-element */
import type { Maintainer } from "@/types";

function MaintainerCard({
  collaborator,
}: {
  readonly collaborator: Maintainer;
}) {
  return (
    <>
      <img
        className="h-24 w-24 rounded-full"
        src={`${collaborator.url}.png`}
        alt={collaborator.name}
      />
      <a className="text-sapphire hover:text-teal" href={collaborator.url}>
        {collaborator.name ?? collaborator.url.split("/").pop()}
      </a>
    </>
  );
}

export default MaintainerCard;
