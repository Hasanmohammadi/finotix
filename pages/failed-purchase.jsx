import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Failed from "../components/failedPurchase/failedPurchase";
import React from "react";

export default function FailedPurchase() {

    return (<Failed />);
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                "failed",
            ])),
            // Will be passed to the page component as props
        },
    };
}
