import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Page404 from "../components/pageNotFound/404";
import Header from "../components/header/Header";

export default function Home() {

    return (
        <>
            <Header />
            <Page404 />
         </>
            );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "navbar",
                "page-not-found"
            ])),
            // Will be passed to the page component as props
        },
    };
}
