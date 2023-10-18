import React, {useState} from 'react';
import styles from "./filterByBudget.module.css";

let data = [
    "Less than $75",
    "$75 to $125",
    "$125 to $200",
    "$200 to $300",
    "Greater than $300"
]

const FilterByBudget = () => {

    return (
        <div className={styles.budgetContainer}>
            {
                data && data.map( (item,index)=>(<div className={styles.budgetItem} key={`budget-${index}`}>
                    <label htmlFor={item}>{item}</label>
                    <input className={styles.budgetInput} type="checkbox" id={item} name={item} />
                    </div>) )
            }
        </div>
    );
};

export default FilterByBudget;
