import React from 'react';
import styles from "./facilities.module.css";
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import PoolIcon from '@mui/icons-material/Pool';
import SpaIcon from '@mui/icons-material/Spa';
import TitleItems from "./TitleItems";
import FacilitiesTitle from "./FacilitiesTitle";


const Facilities = () => {
    return (
        <div className="py-3">
        <div className={styles.facilities}>
            <div>
                <p className={styles.facilitiesTitle}>
                    Facilities
                </p>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div>
                    <FacilitiesTitle text="Outdoor swimming pool" icon={<PoolIcon />} />
                    <TitleItems title="All pools are free of charge" />
                    <TitleItems title="All ages welcome" />
                </div>
                <div>
                    <FacilitiesTitle text="Spa and wellness" icon={<SpaIcon />} />
                    <TitleItems title="Fitness/spa locker rooms" />
                    <TitleItems title="Personal trainer" />
                    <TitleItems title="Fitness" />
                    <TitleItems title="Full body massage" additional="Additional charge" />
                    <TitleItems title="Couples massage" additional="Additional charge" />
                    <TitleItems title="Spa/wellness packages" />
                </div>
                <div>
                    <FacilitiesTitle text="Outdoor swimming pool" icon={<PoolIcon />} />
                    <TitleItems title="All pools are free of charge" />
                    <TitleItems title="All ages welcome" />
                </div>
                <div>
                    <FacilitiesTitle text="Cleaning services" icon={<DryCleaningIcon />} />
                    <TitleItems title="Daily housekeeping" />
                    <TitleItems title="Trouser press " additional="Additional charge" />
                    <TitleItems title="Ironing service " additional="Additional charge" />
                    <TitleItems title="Dry cleaning " />
                    <TitleItems title="Laundry " additional="Additional charge"/>
                </div>
                <div>
                    <FacilitiesTitle text="Outdoor swimming pool" icon={<PoolIcon />} />
                    <TitleItems title="All pools are free of charge" />
                    <TitleItems title="All ages welcome" />
                </div>
                <div>
                    <FacilitiesTitle text="Cleaning services" icon={<DryCleaningIcon />} />
                    <TitleItems title="Daily housekeeping" />
                    <TitleItems title="Trouser press " additional="Additional charge" />
                    <TitleItems title="Ironing service " additional="Additional charge" />
                    <TitleItems title="Dry cleaning " />
                    <TitleItems title="Laundry " additional="Additional charge"/>
                </div>
                <div>
                    <FacilitiesTitle text="Spa and wellness" icon={<SpaIcon />} />
                    <TitleItems title="Fitness/spa locker rooms" />
                    <TitleItems title="Personal trainer" />
                    <TitleItems title="Fitness" />
                    <TitleItems title="Full body massage" additional="Additional charge" />
                    <TitleItems title="Couples massage" additional="Additional charge" />
                    <TitleItems title="Spa/wellness packages" />
                </div>
                <div>
                    <FacilitiesTitle text="Cleaning services" icon={<DryCleaningIcon />} />
                    <TitleItems title="Daily housekeeping" />
                    <TitleItems title="Trouser press " additional="Additional charge" />
                    <TitleItems title="Ironing service " additional="Additional charge" />
                    <TitleItems title="Dry cleaning " />
                    <TitleItems title="Laundry " additional="Additional charge"/>
                </div>
                <div>
                    <FacilitiesTitle text="Spa and wellness" icon={<SpaIcon />} />
                    <TitleItems title="Fitness/spa locker rooms" />
                    <TitleItems title="Personal trainer" />
                    <TitleItems title="Fitness" />
                    <TitleItems title="Full body massage" additional="Additional charge" />
                    <TitleItems title="Couples massage" additional="Additional charge" />
                    <TitleItems title="Spa/wellness packages" />
                </div>
            </div>
        </div>
        </div>
    );
};

export default Facilities;
