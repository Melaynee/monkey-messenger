import getCurrentUser from "@/actions/getCurrentUser";
import Footer from "@/components/organisms/footer";
import Sidebar from "@/components/organisms/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default async function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <main>
      <div className="hidden lg:block">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel minSize={15} defaultSize={25} maxSize={50}>
            <Sidebar currentUser={currentUser!} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={50} defaultSize={75} maxSize={100}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="block lg:hidden h-screen">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel minSize={50} defaultSize={75} maxSize={100}>
            {children}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={0} defaultSize={10} maxSize={15}>
            <Footer currentUser={currentUser!} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
