import React, {useState} from 'react';
import styles from "./hotel.module.css";
import StarRateIcon from '@mui/icons-material/StarRate';
import PinDropIcon from '@mui/icons-material/PinDrop';
import Facilities from "./Facilities/Facilities";
// import PopularFacilities from "./PopularFacilities /PopularFacilities";
import Overview from "./Overview/Overview";
import RoomTicket from "./roomTicket/RoomTicket";
import Locations from "./locations/Locations";
import Policies from "./Policies/Policies";


let fakeRooms = [1, 2, 3, 4, 5, 6, 7, 8]

const HotelPage = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleActiveTab = (e) => {
        if (e.target.id == "Overview") {
            setActiveTab(1)
        } else if (e.target.id == "Rooms") {
            setActiveTab(2)
        } else if (e.target.id == "Amenities") {
            setActiveTab(3)
        } else if (e.target.id == "Locations") {
            setActiveTab(4)
        } else if (e.target.id == "Policies") {
            setActiveTab(5)
        }
    }

    return (
        <>
            <div>
                <div className="container">
                    <div className={`flex py-3`}>
                        <div className="w-9/12">
                            <div>
                                <span className={styles.hotelName}>
                                    The Meydan Hotel
                                </span>
                            </div>
                            <div className="flex">
                                <div className={styles.hotelStars}>
                                    <StarRateIcon className={styles.startsFont}/>
                                    <StarRateIcon className={styles.startsFont}/>
                                    <StarRateIcon className={styles.startsFont}/>
                                    <StarRateIcon className={styles.startsFont}/>
                                    <StarRateIcon className={styles.startsFont}/>
                                </div>
                                <span className={styles.hotelLocation}>
                                    Dubai, United Arabic Emirates
                                </span>
                            </div>
                        </div>
                        <div className="w-3/12">
                            <button className="w-full">
                                <span className={styles.showOnMap}>
                                    <span className={styles.showMapStyle}>
                                        <PinDropIcon/>
                                        Show on map
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.rowBorder}/>
                <div className="container">
                    <div className={styles.underNav}>
                        <div className={styles.secondNav}>
                            <button id="Overview" className={activeTab === 1 ? "custom-active" : null}
                                    onClick={handleActiveTab}>
                                Overview
                            </button>
                            <button id="Rooms" className={activeTab === 2 ? "custom-active" : null}
                                    onClick={handleActiveTab}>
                                Rooms
                            </button>
                            <button id="Amenities" className={activeTab === 3 ? "custom-active" : null}
                                    onClick={handleActiveTab}>
                                Amenities
                            </button>
                            <button id="Locations" className={activeTab === 4 ? "custom-active" : null}
                                    onClick={handleActiveTab}>
                                Locations
                            </button>
                            <button id="Policies" className={activeTab === 5 ? "custom-active" : null}
                                    onClick={handleActiveTab}>
                                Policies
                            </button>
                        </div>
                        <div className="py-2">
                            <button className={styles.reserve}>
                                Reserve a Room
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.hotelContainer}>
                <div className="container pt-8">
                    <div className={styles.HotelImages}>
                        {/*TODO: remove bg white here later and show selected image*/}
                        <div className="w-full md:w-9/12 bg-white">
                            big image show
                        </div>
                        {/*TODO: remove bg white here later and show selected image*/}
                        <div className="w-full md:w-3/12 bg-white">
                            small images
                        </div>
                    </div>
                    <div className={styles.hotelInfo}>
                        <Overview />
                        <div className="pb-5">
                            {/* <PopularFacilities /> */}
                        </div>
                    </div>
                    <div className="py-3">
                        <div className={styles.roomsAvalablity}>
                            <b>
                                Rooms Availablity
                            </b>
                            <br/>
                            {/*    TODO: complete this section later*/}
                        </div>
                    </div>
                    {/*TODO: change this section with the api call data */}

                    {
                        fakeRooms.map( (room,index)=>{
                            return (<RoomTicket key={index} />)
                        } )
                    }
                        <Facilities />
                        <Locations />
                        <Policies />


                    <div className="pt-10 pb-6">
                        <p>
                            Similar hotels to The Meydan Hotel
                        </p>

                    {/*  TODO: slider here with api call data  */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HotelPage;
