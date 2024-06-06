import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import OnlineIcon from "./OnlineIcon";
import useActiveList from "@/hooks/useActiveList";

type Props = { user?: User; size?: number };

const AvatarComponent: React.FC<Props> = ({ user, size }) => {
  const imageSrc = user?.image ?? "/img/avatar.jpeg";
  const imgSize = size ?? 40;

  const { members } = useActiveList();

  const isActive = members.indexOf(user?.email!) !== -1;
  console.log(members);

  return (
    <div className="relative min-w-fit">
      <Image
        src={imageSrc}
        alt="avatar"
        width={imgSize}
        height={imgSize}
        className={cn(
          "rounded-full overflow-hidden",
          `w-${imgSize}px`,
          `h-${imgSize}px`,
          "cursor-pointer"
        )}
      />
      {isActive && (
        <div className="absolute right-0 bottom-0">
          <OnlineIcon size={imgSize} />
        </div>
      )}
    </div>
  );
};

export default AvatarComponent;
