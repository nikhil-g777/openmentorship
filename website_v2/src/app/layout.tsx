import {Navbar} from "@/components/layout/navbar/navbar_main";
import "./globals.css";
import {Inter} from "next/font/google";
import {Footer} from "@/components/layout/footer_main";
import {Providers} from "./providers_main";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
  title: "Open Mentorship",
  description: "Let's build an OpenMentorship Community Together!",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="w-full min-h-full h-full">
      <body className={`${inter.className} w-full min-h-full h-full`}>
        <Providers>
          <div className="w-full h-full flex flex-col">
            <Navbar />
            <div className="w-full">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
