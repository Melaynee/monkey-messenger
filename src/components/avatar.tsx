import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = { user?: User; size?: number };

const AvatarComponent: React.FC<Props> = ({ user, size }) => {
  const imageSrc = user?.image ?? "/img/avatar.jpeg";
  const imgSize = size ?? 40;
  return (
    <Image
      src={imageSrc}
      alt="avatar"
      width={imgSize}
      height={imgSize}
      className={cn(
        "rounded-full overflow-hidden",
        `w-${imgSize}px`,
        `h-${imgSize}px`
      )}
    />
  );
};

export default AvatarComponent;
