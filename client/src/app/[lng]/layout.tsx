import {ReactNode, Suspense} from "react";
import {languages} from "@/shared/config/i18n/settings";
import {dir} from "i18next";
import {Inter} from "next/font/google";
import {LanguageParams} from "@/shared/config/i18n/types";
import {Header} from "@/widgets/Header";
import "@/shared/styles/index.scss";
import "@/shared/styles/variables/common.scss";
import {AuthenticationProvider} from "@/providers/Provider/AuthenticationProvider";
import {StoreProvider} from "@/providers/Provider/StoreProvider";
import Loading from "@/app/[lng]/loading";


const inter = Inter({subsets: ["latin", "cyrillic"]});

export const metadata = {
    title: "Inctagram | Social Media Service",
    description: "Chat and share ",
};

export async function generateStaticParams() {
    return languages.map((lng) => ({lng}));
}

const RootLayout = ({children, params: {lng}}: { children: ReactNode; params: LanguageParams }) => {
    return (
        <html lang={lng} dir={dir(lng)} className={inter.className}>
        <head/>
        <body className="app">
        <AuthenticationProvider>
            <StoreProvider>
                <Header lng={lng}/>
                <Suspense fallback={<Loading/>}>
                       {children}
                </Suspense>
            </StoreProvider>
        </AuthenticationProvider>
        </body>
        </html>
    );
};

export default RootLayout;
