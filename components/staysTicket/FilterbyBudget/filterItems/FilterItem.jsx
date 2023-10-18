import React from 'react';
import styles from "./filterItem.module.css";

const FilterItem = (props) => {
    return (
        <div className={styles.container}>
            <label htmlFor={props.htmlFor} className={styles.titles}>
                 {
                     props.text
                 }
            </label>
            <div className="relative">
            <input className={`bardia ${styles.checkBoxes}`} type="checkbox" id={props.htmlFor} name={props.htmlFor} value="1"/>
            <span className={styles.customCheck}></span>
            </div>
        </div>
    );
};

export default FilterItem;
