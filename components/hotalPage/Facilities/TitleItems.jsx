import React from 'react';
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import styles from "./facilities.module.css";

const TitleItems = ({title,additional}) => {
    return (
        <div>
            <HorizontalRuleIcon className={styles.titleIcon}/>
            <span className={`px-3 ${styles.title}`}>
                {
                    title
                }
            </span>
            {additional && <span className={`px-3 ${styles.additional}`}> {additional} </span>}
        </div>
    );
};

export default TitleItems;
