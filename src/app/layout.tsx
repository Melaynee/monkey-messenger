import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "./organisms/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monkey Messenger",
  description: "Even monkeys fall from trees",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25}>
              <Sidebar />
            </ResizablePanel>
            <ResizableHandle  />
            <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </body>
    </html>
  );
}
