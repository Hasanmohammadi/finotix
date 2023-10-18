import React from 'react';
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import styles from "./locations.module.css";

const TitleItems = ({title,km}) => {
    return (
        <div className="flex pb-3 w-full">
            <HorizontalRuleIcon className={styles.icon} />
            <div className={`flex px-3 w-full justify-between ${styles.text}`}>
                                <span>
                                    {
                                        title
                                    }
                                </span>
                <span className="pl-12">
                                    {
                                        km
                                    }
                </span>
            </div>
        </div>
    );
};

export default TitleItems;
