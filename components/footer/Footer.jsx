import styles from './footer.module.css'
import {useTranslation} from "next-i18next";

export default function Footer() {
    const { t } = useTranslation("footer");
    return (
    <footer className={styles.footerContainer}>
        <div className='container p-10'>
            <div className='w-full md:w-1/4'>
                 <p className='pb-8 font-bold'>
                     {t("title")}
                 </p>
                <div>
                    <p>
                        <span className={styles.title}>
                            {t("address")}
                        </span>
                        <span className={`px-1 ${styles.text}`}>
                           {t("textAddress")}
                        </span>
                    </p>
                    <p className='py-2'>
                        <span className={styles.title}>
                            {t("phone")}
                        </span>
                        <a  href={`tel:${t("textPhone")}`} className={`px-1 ${styles.text}`}>
                            {t("textPhone")}
                        </a>
                    </p>
                    <p>
                            <span className={styles.title}>
                                {t("email")}
                            </span>
                            <a href={`mailto:${t("textEmail")}`}  className={`px-1 ${styles.text}`}>
                                {t("textEmail")}
                            </a>
                    </p>
                    <p className='pt-2'>
                            <span className={styles.title}>
                                {t("workingHours")}
                            </span>
                            <span className={`px-1 ${styles.text}`}>
                                {t("textWorkingHours")}
                            </span>
                    </p>
                </div>
            </div>
        </div>
        <div className={`text-center py-2  ${styles.footerLine}`}>
            {t("footerText")}
            <span className="font-bold px-2">{t("footerLink")}</span>
        </div>

    </footer>
  )
}
