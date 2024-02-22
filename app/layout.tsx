import { Provider } from "@/components";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Layouts/Header/Header";
import Footer from "@/components/Layouts/Footer/Footer";

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
        <body className="bg-background-800">
          <Header />
          {children}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
