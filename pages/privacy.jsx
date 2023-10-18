import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Privacy from "../components/PrivacyAndPolicy/Privacy";
import Header from "../components/header/Header";

export default function Stays() {

    return (
        <>
            <Header />
            <Privacy />
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
