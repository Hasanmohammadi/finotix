import React from 'react';
import styles from "./filterByHotel.module.css";
import StarRateIcon from '@mui/icons-material/StarRate';

let starData = [
    {stars: 1 , title: "oneStar"},
    {stars: 2 , title: "twoStar"},
    {stars: 3 , title: "threeStar"},
    {stars: 4 , title: "fourStar"},
    {stars: 5 , title: "fiveStar"},
];
function stars() {
    return <div>
        <div className={styles.stars}>
            <label htmlFor="oneStar">
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.goldStar} />
            </label>
            <input type="checkbox" name="oneStar" id="oneStar"/>
        </div>
        <div className={styles.stars}>
            <label htmlFor="twoStars">
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.grayStar} />
            </label>
            <input type="checkbox" name="twoStars" id="twoStars"/>
        </div>
        <div className={styles.stars}>
            <label htmlFor="threeStars">
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.grayStar} />
            <StarRateIcon className={styles.grayStar} />
            </label>
            <input type="checkbox" name="threeStars" id="threeStars"/>
        </div>
        <div className={styles.stars}>
            <label htmlFor="fourStars">
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.grayStar} />
            <StarRateIcon className={styles.grayStar} />
            <StarRateIcon className={styles.grayStar} />
            </label>
            <input type="checkbox" name="fourStars" id="fourStars"/>
        </div>
        <div className={styles.stars}>
            <label htmlFor="fiveStars">
            <StarRateIcon className={styles.goldStar} />
            <StarRateIcon className={styles.grayStar} />
            <StarRateIcon className={styles.grayStar} />
            <StarRateIcon className={styles.grayStar} />
            <StarRateIcon className={styles.grayStar} />
            </label>
            <input type="checkbox" name="fiveStars" id="fiveStars"/>
        </div>
    </div>
}


const FilterByHotel = () => {
    return (
        <div className={styles.startContainer}>
            {
                stars()
            }
        </div>
    );
};

export default FilterByHotel;
