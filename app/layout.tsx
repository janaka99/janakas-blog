import { Footer, Provider } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Janaka's Blog",
  description: "Every Developers Favourite Blog",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en">
      <Provider session={session}>
        <body className={inter.className}>
          <div className="_container">
            <Header />
          </div>
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
