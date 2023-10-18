import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HotelPage from "../components/hotalPage/HotelPage";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import * as React from "react";


export default function Home() {

    return (
        <>
            <Header />
            <HotelPage />
            <Footer/>
        </>
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "navbar",
                "footer",
            ])),
            // Will be passed to the page component as props
        },
    };
}
