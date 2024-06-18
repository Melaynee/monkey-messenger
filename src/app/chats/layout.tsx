import getChats from "@/actions/getChats";
import getCurrentUser from "@/actions/getCurrentUser";
import getUsers from "@/actions/getUsers";
import ChatList from "@/components/chat/organisms/ChatList";
import Sidebar from "@/components/organisms/sidebar";
import SettingsModal from "@/components/settings/SettingsModal";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React, { Suspense } from "react";

type Props = { children: React.ReactNode };

const ChatsLayout: React.FC<Props> = async ({ children }) => {
  const currentUser = await getCurrentUser();
  const chats = await getChats();
  const users = await getUsers();

  return (
    <>
      <SettingsModal currentUser={currentUser!} />

      <main className="h-full w-full ">
        <div className="h-full w-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              minSize={15}
              defaultSize={25}
              maxSize={50}
              className="hidden lg:block"
            >
              <Suspense fallback={null}>
                <Sidebar currentUser={currentUser!}>
                  <ChatList initialItems={chats} users={users} />
                </Sidebar>
              </Suspense>
            </ResizablePanel>
            <ResizableHandle className="hidden lg:block" />
            <ResizablePanel minSize={50} defaultSize={75} maxSize={100}>
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
    </>
  );
};

export default ChatsLayout;
