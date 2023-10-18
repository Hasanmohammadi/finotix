import React from 'react';
import styles from "./overview.module.css";

const Overview = () => {
    return (
        <>
        <div className={styles.titlePadding}>
            <b className={styles.titles}>Overview</b>
        </div>
    <p className="pt-4">
        Situated along the Bosphorus, this renovated 19th century Ottoman palace features a historic
        architecture in harmony with luxurious details. An indoor pool and a heated outdoor pool
        with free parasols and sun loungers are available. The seafront property also has a garden
        and a spacious terrace with panoramic views of the Bosphorus. Free WiFi and private parking
        are available on site.
    </p>
    <p className="py-4">
        Tastefully decorated with fine furnishings, each air-conditioned room offers an iPod docking
        station and a flat-screen TV with satellite channels. A minibar, safety deposit box and a
        desk are also provided.
    </p>
    <p className="pb-4">
        Aqua Restaurant, with its terrace overlooking the Bosphorus, serves Mediterranean cuisine,
        with Italian and Turkish specialties. Guests can enjoy the breakfast with international
        flavours in buffet style.
    </p>
        </>
    );
};

export default Overview;
