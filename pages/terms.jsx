import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TermsOfService from "../components/TermsOfService/TermsOfService";
import Header from "../components/header/Header";

export default function Stays() {

    return (
        <>
            <Header />
            <TermsOfService />
            </>
            );
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "navbar",
                "stays",
                "footer"
            ])),
            // Will be passed to the page component as props
        },
    };
}
