import React from "react";
import Link from "next/link";
import Image from "next/image";
import pageNotFoundImage from "../../styles/images/page-not-found.png"
import {useTranslation} from "next-i18next";

const PageNotFound = () => {
    const { t } = useTranslation("page-not-found");

    return (
        <div className="page-not-found-container">
            <p className="number-404"> 404 </p>
            <p className="m-0 pb-1">
                {t("404message")}
            </p>
            <Link href="/">
                <a>
                    <button className="back-to-home-btn">
                        {t("404btnText")}
                    </button>
                </a>
            </Link>
            <div>
                <Image src={pageNotFoundImage} draggable="false" alt={t("404alt")} height="500" width="700"/>
            </div>
        </div>
    );
};

export default PageNotFound;
