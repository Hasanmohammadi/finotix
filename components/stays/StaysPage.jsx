import React from "react";
import {useTranslation} from "next-i18next";
import Link from "next/link";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Head from "next/head";

const StaysPage = () => {
    const { t } = useTranslation("stays");

    const handleLocaleChange = (event) => {
        const value = event.target.value;
        console.log(value,'val')

    };

    function handleKeyDown(e) {
        let runOnce = () => setTimeout( ()=>{
            console.log("log")
        },1000)
        runOnce()
        console.log(e,'e')
    }


    return (
        <>
            <Head>
                    <title>
                        FINOTIX Stays
                    </title>
            </Head>
            <section className="stays-container">
                <div className="stays-page-style">
                    <div className="block text-center mobile-view">
                        <h1 className="f-51 font-medium"> <span className="font-black"> {t("staysText.hotels")} </span> <span className="font-black">{t("staysText.homes")} </span> <span className="font-thin">{t("staysText.text")} </span></h1>
                        <h3 className="pt-3.5 text-4xl custom-gray font-thin leading-8">
                            {t("staysTitle")}
                        </h3>
                    </div>
                    <div className="container sm:container box-place">
                        <div className="pick-ticket-container text-center m-auto pt-6">
                            <div className="columns-auto w-full" id="flights-or-stays">
                                <button className="pick-ticket">
                                    <Link href="/">
                                        <a>
                                            {t("Flights")}
                                        </a>
                                    </Link>
                                </button>
                                <button className="pick-ticket active">
                                    <Link href="/stays" passHref>
                                            <a>
                                                <h2>
                                                {t("Stays")}
                                                </h2>
                                            </a>
                                    </Link>
                                </button>
                                <hr/>
                            </div>
                            <div className="flex py-5">
                                <div className="flex items-center px-1">
                                    <span className="px-1" id="room">
                                        1
                                    </span>
                                    <span>
                                        {t("room")},
                                    </span>
                                </div>
                                <div className="px-1 flex items-center">
                                <span id="person-numbers">
                                    1
                                </span>
                                </div>
                                <div>
                                    <FormControl className="flex">
                                        <Select
                                            className="f-15"
                                            id="demo-Round-select"
                                            label="Age"
                                            value="Round-trip"
                                            onChange={handleLocaleChange}
                                        >
                                            <MenuItem value="Round-trip">Round-trip</MenuItem>
                                            <MenuItem value="One Way">One Way</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="container mx-auto">
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                                    <div className="flex border custom-border md:col-span-3 w-full">
                                        <div className="self-center px-3">
                                            <LocationOnIcon />
                                        </div>
                                        <div className="self-center">
                                            <label className="block text-justify w-96" htmlFor="ticket-from">{t("go")}</label>
                                            <input className="block placeholder-from-to" type="text" id="ticket-from" onKeyDown={handleKeyDown} placeholder={t("goHitPoint")}/>
                                        </div>
                                    </div>
                                    <div className="flex border custom-border md:col-span-2 w-full">
                                        <div className="date-picker w-full">
                                            <div className="px-2 self-center">
                                                <CalendarMonthIcon />
                                            </div>
                                            <div className="grid text-justify self-center px-4">
                                                <label className="self-center" htmlFor="date-picker">{t("date")}</label>
                                                <input className="chose-date" type="text" id="date-picker" placeholder={t("dateHitPoint")}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="search-btn w-full">
                                            {t("search")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <style jsx>
                {
                    `
                    .active:after{
                    border:none;
                    }
                    `
                }
            </style>
        </>
    );
};

export default StaysPage;
