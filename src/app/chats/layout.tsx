import getChats from "@/actions/getChats";
import getCurrentUser from "@/actions/getCurrentUser";
import ChatList from "@/components/chat/ChatList";
import Footer from "@/components/organisms/footer";
import Sidebar from "@/components/organisms/sidebar";
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

  return (
    <main className="h-screen w-full overflow-hidden relative">
      <div className="h-full w-full">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            className="hidden lg:block"
            minSize={15}
            defaultSize={25}
            maxSize={50}
          >
            <Suspense fallback={null}>
              <Sidebar currentUser={currentUser!}>
                <ChatList initialItems={chats} />
              </Sidebar>
            </Suspense>
          </ResizablePanel>
          <ResizableHandle className="hidden lg:block" />
          <ResizablePanel minSize={50} defaultSize={75} maxSize={100}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <Footer currentUser={currentUser!} />
      </div>
    </main>
  );
};

export default ChatsLayout;
