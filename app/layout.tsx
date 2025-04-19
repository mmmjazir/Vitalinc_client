'use client'
import { Josefin_Sans, Poppins, Roboto,Arimo,Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100","300","400", "500","700"],
  variable: "--font-Roboto",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100","200","300", "400","500","600","700"],
  variable: "--font-Outfit",
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
      <div className={`${poppins.variable} w-full overflow-hidden ${outfit.variable} ${josefin.variable} ${roboto.variable} text-[#000] bg-no-repeat !bg-white duration-300`}>
      <Providers>
   <SessionProvider>
    <div className="overflow-x-hidden">
        {children} 
    </div>

        <Toaster position="top-center" reverseOrder={false} />   
   </SessionProvider>
      </Providers>
      </div>
        </body>
    </html>
  );
}

