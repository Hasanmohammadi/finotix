import React from 'react';
import styles from "./filterComponent.module.css"

const FilterComponent = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <span className={styles.title}>
                    {props.title}
                </span>
            </div>
            <hr/>
            <div className={styles.componentContainer}>
                {
                    props.children
                }
            </div>
        </div>
    );
};

export default FilterComponent;
