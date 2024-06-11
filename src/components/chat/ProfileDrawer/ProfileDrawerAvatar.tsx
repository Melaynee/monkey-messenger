import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Chat, User } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
  chat?: Chat & {
    users: User[];
  };
  statusText?: string;
  title: string;
};

const ProfileDrawerAvatar = (props: Props) => {
  const imageSrc = props.user?.image ?? "/img/avatar.jpeg";

  return (
    <div className="relative">
      {props.chat?.isGroup ? (
        <Carousel>
          <CarouselContent>
            {props.chat?.users.map((user) => {
              const imageSrc = user.image ?? "/img/avatar.jpeg";
              return (
                <CarouselItem key={user.id}>
                  <Image
                    src={imageSrc}
                    width={400}
                    height={400}
                    alt="avatar"
                    className="w-full h-full"
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <Image
          src={imageSrc}
          width={400}
          height={400}
          alt="avatar"
          className="w-full h-full"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 min-h-40 bg-gradient-to-b from-transparent to-dark">
        <div className="absolute bottom-5 translate-x-4 text-white">
          <div className="text-2xl font-medium">{props.title}</div>
          <div className="text-xl font-light">
            {props.chat?.isGroup
              ? `${props.chat.users.length} members `
              : props.statusText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawerAvatar;
