import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateAnAccount from "../components/singIn/CreateAnAccount";
import SignInHeader from "../components/header/SignInHeader";


export default function Home() {

  return (
      <>
        <SignInHeader />
        <CreateAnAccount />
        </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "navbar",
        "create-account",
      ])),
      // Will be passed to the page component as props
    },
  };
}
