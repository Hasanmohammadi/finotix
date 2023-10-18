import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ContactUs from "../components/contactUs/ContactUs";
import Header from "../components/header/Header";

export default function Home() {

  return (
      <>
        <Header />
        <ContactUs/>
        </>
        );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "navbar",
        "contact-us",
          "footer"
      ])),
      // Will be passed to the page component as props
    },
  };
}
