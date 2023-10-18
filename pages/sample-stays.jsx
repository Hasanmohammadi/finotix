import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import StaysResult from "../components/staysResult/staysResult";


export default function Home() {

    return (
        <>
            <Header />
            <StaysResult />
            <Footer />
        </>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "navbar",
                "footer"
            ])),
            // Will be passed to the page component as props
        },
    };
}
