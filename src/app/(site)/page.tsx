import React from "react";
import Sidebar from "../organisms/sidebar";
import WelcomeComponent from "../organisms/welcome";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="flex min-h-full  items-center bg-primary">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={25}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <WelcomeComponent />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
};

export default page;
