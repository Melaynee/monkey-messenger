import { useEffect, useState } from "react";
import useActiveList from "./useActiveList";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);

  useEffect(() => {
    let channel = activeChannel;

    if (!channel) {
      channel = pusherClient.subscribe("presence-messenger");
      setActiveChannel(channel);
    }
    channel.bind("pusher:subscription_successed", (members: Members) => {
      const initialMembers: string[] = [];

      members.each((member: Record<string, any>) =>
        initialMembers.push(member.id)
      );

      set(initialMembers);
      localStorage.setItem("onlineStatus", JSON.stringify(initialMembers));
    });
    channel.bind("pusher:member_added", (member: Record<string, any>) => {
      add(member.id);
      const updatedMembers = JSON.parse(
        localStorage.getItem("onlineStatus") ?? "[]"
      );
      updatedMembers.push(member.id);
      localStorage.setItem("onlineStatus", JSON.stringify(updatedMembers));
    });

    channel.bind("pusher:member_removed", (member: Record<string, any>) => {
      remove(member.id);
      const updatedMembers = JSON.parse(
        localStorage.getItem("onlineStatus") ?? "[]"
      );
      const filteredMembers = updatedMembers.filter(
        (id: string) => id !== member.id
      );
      localStorage.setItem("onlineStatus", JSON.stringify(filteredMembers));
    });
    return () => {
      if (activeChannel) {
        pusherClient.unsubscribe("presence-messenger");
        setActiveChannel(null);
      }
    };
  }, [activeChannel, set, add, remove]);
  useEffect(() => {
    const storedOnlineStatus = JSON.parse(
      localStorage.getItem("onlineStatus") ?? "[]"
    );
    set(storedOnlineStatus);
  }, [set]);
  return activeChannel;
};

export default useActiveChannel;
