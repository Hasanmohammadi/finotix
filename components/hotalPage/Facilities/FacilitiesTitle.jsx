import React from 'react';
import styles from "./facilities.module.css";

const FacilitiesTitle = ({text,icon}) => {
    return (
        <div className={styles.item}>
            {
                icon
            }
            <span className="px-3">
                {
                    text
                }
            </span>
        </div>
    );
};

export default FacilitiesTitle;
