import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ToasterContext from "@/context/ToasterContext";
import AuthContext from "@/context/AuthContext";
import ActiveStatus from "@/components/ActiveStatus";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

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
        <div className="h-screen">
          <AuthContext>
            <ReactQueryProvider>
              <ToasterContext />
              <ActiveStatus />
              {children}
            </ReactQueryProvider>
          </AuthContext>
        </div>
      </body>
    </html>
  );
}
