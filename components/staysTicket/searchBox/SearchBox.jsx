import React from 'react';
import styles from "./searchBox.module.css";
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = (props) => {
    return (
        <div className={styles.searchBoxContainer}>
            <div className="pb-3">
                <span className={styles.title}>
                    {props.title}
                </span>
            </div>
            <div className={styles.searchBorder}>

                <input className={styles.searchArea} placeholder={props.placeholder} type="text"/>
                <button className={styles.icon}>
                <SearchIcon/>
                </button>
            </div>
        </div>
    );
};

export default SearchBox;
