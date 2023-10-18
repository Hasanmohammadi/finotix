import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./failedPurchase.module.css"
import failed from "../../styles/images/failed-purchase.svg";
import {useTranslation} from "next-i18next";

const Failed = () => {
    const { t } = useTranslation("failed");

    return (
        <div className="container">
            <div className="pt-12 md:pt-6 text-center">
                <span className={styles.failed}> {t("filed")} </span>
            </div>
            <div className="text-center pt-4 px-12 md:px-0">
                <span className={styles.purchaseStatus}>
                {t("purchase")}
                </span>
            </div>

            <div className="text-center pt-24">
                    <Link href="/">
                        <a className={styles.downloadTicket}>
                            {t("button")}
                        </a>
                    </Link>
            </div>

            <div className="tank-you-img-container text-center pt-12">
                <div className="ty-section-img">
                    <Image height={700} src={failed}/>
                </div>
            </div>

        </div>
    );
};

export default Failed;