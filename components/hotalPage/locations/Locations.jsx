import React from 'react';
import styles from "./locations.module.css";
import PinDropIcon from '@mui/icons-material/PinDrop';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AttractionsIcon from '@mui/icons-material/Attractions';
import TitleItems from "./TitleItems";
import Title from "./Title";


const Locations = () => {
    return (
        <div className="py-3">
            <div className={styles.container}>
                <div>
                    <p className={styles.title}>
                        Locations
                    </p>
                </div>
                <div className="forgot">
                    <button className={styles.button}>
                        <PinDropIcon />
                        <span className="px-2">
                            Show on map
                        </span>
                    </button>
                </div>
                <div className="flex">
                    <div className="w-4/12 pr-10">
                        <Title title="What’s nearby" icon={<MyLocationIcon />} />
                        <TitleItems title="Demiroren Shopping Mall" km="0.1 km"/>
                        <TitleItems title="Cicek Passage" km="0.1 km" />
                        <TitleItems title="Galatasaray High School" km="0.1 km" />
                    </div>
                    <div className="w-3/12">
                        <Title title="Top attractions" icon={<AttractionsIcon />} />
                        <TitleItems title="Azadi Tower" km="0.1 km" />
                        <TitleItems title="Milad Tower" km="0.1 km" />
                        <TitleItems title="Opark waterpark" km="0.1 km" />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Locations;
