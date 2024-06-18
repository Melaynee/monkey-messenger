import getCurrentUser from "@/actions/getCurrentUser";
import getUsers from "@/actions/getUsers";
import UserList from "@/components/UserList";
import Sidebar from "@/components/organisms/sidebar";
import SettingsModal from "@/components/settings/SettingsModal";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Suspense } from "react";

export default async function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  const users = await getUsers();
  return (
    <>
      <SettingsModal currentUser={currentUser!} />
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
                  <UserList users={users} />
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
}
