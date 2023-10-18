import React from 'react';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {useTranslation} from "next-i18next";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MapView from "./mapView/MapView";
import styles from "./staysTicket.module.css"
import SearchBox from "./searchBox/SearchBox";
import FilterComponent from "./filterComponent/FilterComponent";
import FilterbyBudget from "./FilterbyBudget/FilterbyBudget";

const StaysTicket = () => {
    const { t } = useTranslation("stays");

    function handleKeyDown(e) {
        let runOnce = () => setTimeout( ()=>{
            console.log("log")
        },1000)
        runOnce()
        console.log(e,'e')
    }

    const handleLocaleChange = (event) => {
        const value = event.target.value;
        console.log(value,'val')

    };
    // TODO: change data with api call data
    // TODO: fix multi lang for this page


    return (
        <div>
        <div className={`px-40`}>
        <section className="pt-4">
            {/*TODO: change here with currect button for choose room and can add other room*/}
            <div className="container mx-auto">
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


        </section>
        </div>
                <section className="pt-4">
                    <div className={`px-40 bg-gray-100 py-4`}>
                    <div className="">
                        <div className={`flex gap-4`}>
                            <div className="w-1/5">
                                <section>
                                    <MapView/>
                                </section>

                                <section className="py-2">
                                    <SearchBox title="Search by property name" placeholder="e. g. Best Western"/>
                                </section>

                                <section>
                                    <FilterComponent title="Filter by Your Budget"  >
                                        <FilterbyBudget />
                                    </FilterComponent>
                                </section>

                                <section className="pt-2">
                                    <FilterComponent title="Filter by Hotel Class"  >
                                        <FilterbyBudget />
                                    </FilterComponent>
                                </section>

                            </div>
                            <div className="w-4/5">
                                2
                            </div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
    );
};

export default StaysTicket;
