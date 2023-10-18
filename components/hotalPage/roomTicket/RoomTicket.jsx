import React from 'react';
import styles from "./room.module.css";
import HeightIcon from "@mui/icons-material/Height";
import WaterIcon from "@mui/icons-material/Water";
import PeopleIcon from "@mui/icons-material/People";

const RoomTicket = () => {
    return (
        <div className="py-3">
            <div className={`flex gap-3 ${styles.roomContainer}`}>
                <div className="w-3/12">
                    {/*TODO: add slider here later*/}
                    slider
                </div>
                <div className={`w-6/12 ${styles.roomContainerPadding}`}>
                    <p className={styles.ticketTitle}>
                        Superior Room with King Bed
                    </p>
                    <div className="flex">
                        {/*TODO: change this icon i cant find in mui icons*/}
                        <HeightIcon/>
                        <span className={styles.textMuted}>
                                        495 sq ft
                                    </span>
                    </div>
                    <div className="flex">
                        <WaterIcon/>
                        <span className={styles.textMuted}>
                                        Sea View
                                    </span>
                    </div>
                    <div className="flex">
                        <PeopleIcon className={styles.iconSize}/>
                        <span className={styles.textMuted}>
                                        5 Sleeps
                                    </span>
                    </div>
                    <div className={`flex pt-5 ${styles.Cancellation}`}>
                        <button>
                            Cancellation 
                        </button>
                    </div>
                </div>
                <div className={`w-3/12 solid-room ${styles.roomContainerPadding}`}>
                    <div className="forgot">
                                    <span className={styles.roomsFor}>
                                        <span className={styles.roomsBold}>
                                            2
                                        </span>
                                         rooms for
                                    </span>
                    </div>
                    <div className="forgot">
                                    <span className={styles.price}>
                                        $7.376
                                    </span>
                    </div>
                    <div className="forgot">
                        {/*TODO: this section font-size from 10px change to 12px for seo reasons check with (sara hoseini) and (manager) later*/}
                        <span className={styles.ticketMuted}>
                                        Includes taxes and charges
                                    </span>
                    </div>
                    <div className="text-center pt-3">
                        <button className={styles.reserveBtn}>
                            Reserve 2 rooms
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomTicket;
