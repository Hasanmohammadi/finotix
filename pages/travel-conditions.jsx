import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TermsOfService from "../components/TermsOfService/TermsOfService";
import Header from "../components/header/Header";
import TravelConditions from "../components/travelConditions/TravelConditions";

export default function Stays() {

    return (
        <>
            <Header />
            <TravelConditions/>
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
