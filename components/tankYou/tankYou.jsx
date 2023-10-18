import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./tankYou.module.css"
import tankYou from "../../styles/images/tank-you-img.svg";
import {useTranslation} from "next-i18next";

const TankYou = () => {
    const { t } = useTranslation("tank-you");


    return (
        <div className="container">
            <div className="pt-12 md:pt-6 text-center">
                <span className={styles.tankYou}> {t("tank-you")} </span>
            </div>
            <div className="text-center pt-4">
                <span className={styles.purchaseStatus}>
                {t("purchase")}
                <span className={styles.success}>
                    {
                        ` ${t("successful")}`
                    }
                </span>
                </span>
            </div>
            <div className="text-center pt-1">
                <span>
                    {t("choice")}
                </span>
            </div>
            <div className="text-center pt-24 md:pt-6">
                    <button className={styles.downloadTicket}>
                        {t("button")}
                    </button>
            </div>
            <div className="text-center pt-5">
                <Link href="/">
                    <u className={styles.backToHome}>
                        {t("back-to-home")}
                    </u>
                </Link>
            </div>
            <div className="tank-you-img-container text-center">
                <div className="ty-section-img">
                    <Image className={styles.tankYouImage} src={tankYou}/>
                </div>
            </div>

        </div>
    );
};

export default TankYou;
