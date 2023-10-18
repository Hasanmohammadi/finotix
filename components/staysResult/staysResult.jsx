import React from 'react';
import FilterBy from "./filterBy/FilterBy";
import SearchIcon from '@mui/icons-material/Search';
import styles from "./staysResult.module.css";
import FilterBox from "./filterBox/FilterBox";
import FilterByBudget from "./filterByBudget/FilterByBudget";
import ShowMap from "./showMap/ShowMap";
import FilterByHotel from "./filterByHotel/FilterByHotel";
import RoomResult from "./roomResult/RoomResult";

const StaysResult = () => {
    //TODO: change this section with api data
    // TODO: fix multi lang for this page

    return (
        <div className="bg-gray-200">
            <div className="container flex py-5 gap-4">
                <div className="w-3/12">
                    <div className="pb-5">
                        <div className="py-2">
                            <ShowMap />
                        </div>
                        <div className="py-2">
                        <FilterBy title="Search by property name">
                            <div className="p-6">
                                <div className={`${styles.searchBorder} flex w-full`}>
                                    <input className={`w-full ${styles.searchInput}`} placeholder="e. g. Best Western" type="text"/>
                                    <SearchIcon />
                                </div>
                            </div>
                        </FilterBy>
                        </div>
                        <div className="py-2">
                            <FilterBox title="Filter by Your Budget">
                            <FilterByBudget />
                            </FilterBox>
                        </div>
                        <div className="py-2">
                            <FilterBox title="Filter by Hotel Class">
                            <FilterByHotel />
                            </FilterBox>
                        </div>
                    </div>
                </div>
                <div className="w-9/12">
                    <div className={styles.showBy}>
                        <span>
                            Dubai: 474 properties found
                        </span>
                        <span>
                            Sorted by
                            <b>
                                <select className={styles.sortBy} name="sortBy" id="sortBy">
                                    <option selected value="Recommended"> Recommended </option>
                                    <option value="mostExpensive"> most expensive </option>
                                    <option value="cheapest"> cheapest </option>
                                </select>
                            </b>
                        </span>
                    </div>
                    <div className="py-2">
                    <RoomResult />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaysResult;
