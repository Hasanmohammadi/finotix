import Link from "next/link";
import Image from "next/image";
import finotixLogo from "../../styles/images/finotix-logo.svg";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from "../singIn/signin.module.css"
import { useRouter } from "next/router";



const SignInHeader = () => {
    const router = useRouter();

    return (
        <header className="border-bottom">
            <nav className="navbar">
                <div className={`${styles.navbarContainer} nav-container flex flex-row justify-between`}>
                <div onClick={() => router.back()}>
                    <button > <ArrowBackIcon /> </button>
                </div>
                <div>
                    <Link class href="/">
                        <a className="d-flex">
                            <Image src={finotixLogo} alt="FINOTIX logo" height="36px" width="36px" draggable="false"/>
                            <div className="px-1.5">
                                <p className="finotix">
                                    FINOTIX
                                </p>
                                <p className="finotix-title">
                                    Online Travel Solution
                                </p>
                            </div>
                        </a>
                    </Link>
                </div>
                <div>
                </div>
                </div>
            </nav>
        </header>
    );
};

export default SignInHeader;
