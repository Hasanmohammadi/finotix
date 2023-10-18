import React from 'react';
import styles from "./roomResult.module.css";
import StarRateIcon from '@mui/icons-material/StarRate';
import CircleIcon from '@mui/icons-material/Circle';

let fakeRoom = [
    {
        id: 1,
        hotelName: "hotel example name",
        hotelStars: 4,
        hotelLocation: "Dubai",
        mapUrl: "example.url/hotels/sample/1234",
        roomLeft: 1,
        distanceToCityCenter: "15 km from center",
        night: 3,
        adults: 2,
        hotelPrice: 500,
        discounted: false,
        goodDeal: false
    },
    {
        id: 1,
        hotelName: "hotel example name",
        hotelStars: 4,
        hotelLocation: "Dubai",
        mapUrl: "example.url/hotels/sample/1234",
        roomLeft: 1,
        distanceToCityCenter: "15 km from center",
        night: 3,
        adults: 2,
        hotelPrice: 1500,
        discounted: true,
        goodDeal: false
    },
    {
        id: 1,
        hotelName: "hotel example name",
        hotelStars: 4,
        hotelLocation: "Dubai",
        mapUrl: "example.url/hotels/sample/1234",
        roomLeft: 1,
        distanceToCityCenter: "15 km from center",
        night: 3,
        adults: 2,
        hotelPrice: 1700,
        discounted: false,
        goodDeal: false
    },
    {
        id: 1,
        hotelName: "hotel example name",
        hotelStars: 4,
        hotelLocation: "Dubai",
        mapUrl: "example.url/hotels/sample/1234",
        roomLeft: 1,
        distanceToCityCenter: "15 km from center",
        night: 3,
        adults: 2,
        hotelPrice: 1800,
        discounted: false,
        goodDeal: false
    },
    {
        id: 1,
        hotelName: "hotel example name",
        hotelStars: 4,
        hotelLocation: "Dubai",
        mapUrl: "example.url/hotels/sample/1234",
        roomLeft: 1,
        distanceToCityCenter: "15 km from center",
        night: 3,
        adults: 2,
        hotelPrice: 1900,
        discounted: false,
        goodDeal: false
    },
    {
        id: 1,
        hotelName: "hotel example name",
        hotelStars: 4,
        hotelLocation: "Dubai",
        mapUrl: "example.url/hotels/sample/1234",
        roomLeft: 1,
        distanceToCityCenter: "15 km from center",
        night: 3,
        adults: 2,
        hotelPrice: 2000,
        discounted: false,
        goodDeal: true
    },
]


const RoomResult = () => {
    return (
        <div>
            {
                fakeRoom && fakeRoom.map( (room,index) =>{
                    return <div className="py-2" key={index}>
                        <div className={styles.roomContainer}>
                            <div className="flex">
                                <div className="w-3/12">
                                    {/*TODO: need to add slider but internet connection is too bad now need to do this section later */}
                                    slider
                                </div>
                                <div className={`w-6/12 ${styles.cardPadding}`}>
                                    <div>
                                <span className={styles.hotelName}>
                                    The Meydan Hotel
                                </span>
                                    </div>
                                    <div className={styles.hotelStars}>
                                        <StarRateIcon className={styles.starFontSiz} />
                                        <StarRateIcon className={styles.starFontSiz} />
                                        <StarRateIcon className={styles.starFontSiz} />
                                        <StarRateIcon className={styles.starFontSiz} />
                                        <StarRateIcon className={styles.starFontSiz} />
                                    </div>
                                    <div>
                                <span className={styles.hotelLocation}>
                                    Dubai
                                </span>
                                        <span className="px-2">
                                    <CircleIcon className={styles.circleSize} />
                                </span>
                                        <button className={styles.showOnMap}>
                                            Show on Map
                                        </button>
                                    </div>
                                    <div>
                                <span className={styles.hotelDistance}>
                                    17.1 km from centre
                                </span>
                                    </div>
                                </div>
                                <div className={`w-3/12 bookTicketBorder ${styles.cardPadding}`}>
                                    <div>
                                <span className={styles.roomStays}>
                                    3 nights, 2 Adults
                                </span>
                                    </div>
                                    <div>
                                    <span className={styles.roomCurrency}>
                                        USD
                                    </span>
                                    </div>
                                    <div>
                                        <b className={styles.roomPrice}>
                                            1200
                                        </b>
                                    </div>
                                    <div className="text-center py-3">
                                        <button className={styles.Availability}>
                                            See availability
                                        </button>
                                    </div>
                                    <div className="text-center">
                                    <span className={styles.roomLeft}>
                                        Only 1 Room left
                                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    );
};

export default RoomResult;
