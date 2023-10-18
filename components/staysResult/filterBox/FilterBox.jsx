import React from 'react';
import styles from "./filterBox.module.css";

const FilterBox = ({title,children}) => {
    return (
        <div className={styles.filterContainer}>
            <div className={styles.title}>
                {
                    title
                }
            </div>
            <hr/>
            <div className={styles.items}>
                {
                    children
                }
            </div>
        </div>
    );
};

export default FilterBox;
