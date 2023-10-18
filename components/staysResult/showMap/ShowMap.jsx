import React from 'react';
import styles from "./showMap.module.css";
import PinDropIcon from '@mui/icons-material/PinDrop';

const ShowMap = () => {
    return (
        <button className="w-full">
            <span className={styles.mapButton}>
                <span className={styles.innerButton}>
                    <PinDropIcon />
                    <span>
                        Map View
                    </span>
                </span>
            </span>
        </button>
    );
};

export default ShowMap;
