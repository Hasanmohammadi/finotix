import Footer from "../footer/Footer";
import styles from './contactUs.module.css'
import {useTranslation} from "next-i18next";

const ContactUs = () => {
  const { t } = useTranslation("contact-us");

  return (
    <>
    <div className="container px-4 md:px-0 py-14">
      <div className={`md:grid md:grid-cols-2 md:gap-3 ${styles.contactUsContent}`}>
        <div className="w-full md:w-3/4 m-auto">
          <h2 className={`text-xl font-black ${styles.contactUs}`}>
            {t("contactUs")}
          </h2>
          <div>
            <p className={`w-4/6 ${styles.contactUsText}`}>
              {t("titleMessage")}
            </p>
          </div>
          <div className="pt-14">
          <p className="py-4">
            <span className={`text-xl font-medium ${styles.textDark}`}>
              {t("phone")}
            </span>
            <a href={`tel:${t("phoneNumber")}`} className={`px-1  ${styles.contactUsText} ${styles.textMuted}`}>
              {t("phoneNumber")}
            </a>
          </p>
          <p className="py-4">
            <span className={`text-xl font-medium ${styles.textDark}`}>
              {t("email")}
            </span>
             <a href={`mailto:${t("emailAddress")}`} className={`px-1 ${styles.contactUsTitle} ${styles.textMuted}`}>
               {t("emailAddress")}
             </a>
          </p>
          <p className="py-4">
            <span className={`text-xl font-medium ${styles.textDark}`}>
              {t("workTime")}
            </span>
             <span  className={`px-1 ${styles.contactUsTitle} ${styles.textMuted}`}>
               {t("workingHours")}
             </span>
          </p>
          <p className="py-4">
            <span className={`text-xl font-medium ${styles.textDark}`}>
              {t("address")}
            </span>
            <span  className={`px-1 ${styles.contactUsTitle} ${styles.textMuted}`}>
              {t("addressLocate")}
            </span>
          </p>
          </div>
        </div>
        <div className={styles.w70}>
          <div className={styles.contactUsForm}>
            <form action="getInformation">
              <div>
                <input type="text" className={`w-full ${styles.customInput}`} placeholder={t("formName")}/>
              </div>
              <div className="py-3">
                <input type="text" className={`w-full ${styles.customInput} `} placeholder={t("formEmail")} />
              </div>
              <div>
                <textarea name="Your Message" className={`w-full ${styles.customInput} ${styles.customTextAre}`} placeholder={t("formMessage")} cols="30" rows="10"></textarea>
              </div>
              <div className="pt-3">
                <button className={`w-full ${styles.customSubmitBtn}`}>
                  {t("submit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;
