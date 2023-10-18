import React from 'react';
import styles from "./filterbyBudget.module.css";
import FilterItem from "./filterItems/FilterItem";

let filterList = [
    "Less than $75",
    "$75 to $125",
    "$125 to $200",
    "$200 to $300",
    "Greater than $300",
]

const FilterbyBudget = () => {
    return (
        <div>
            {
                filterList.map( (item,index) =>(<FilterItem text={item} htmlFor={`budget-${index}`} key={index} />))
            }
        </div>
    );
};

export default FilterbyBudget;
