/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styles from "./policies.module.css"

const Policies = () => {
    return (
        <div className="py-3">
            <div className={styles.container}>
                <div className="pb-3">
                    <p className={styles.policies}>
                        Policies
                    </p>
                </div>
                <div className="pb-3">
                <div className={styles.policiesWarn}>
                    <p className={styles.cancellation}>
                        Free Cancellation
                    </p>
                    <p className={styles.cancellationText}>
                        Cancellation policy is based on local time of destination.
                    </p>
                </div>
                </div>
                <div className={styles.text}>
                    <p className="pt-3">
                        Rates include all government issued taxes. If applicable a resort fee, urban fee, facility fee, or service charge (plus applicable sales tax) is payable to the hotel upon arrival.
                    </p>
                    <p className="py-3">
                        For all hotels in the Americas the service/resort/mandatory charges will be collected by the hotel upon check in.
                        If breakfast is included in the rate, the breakfast is included for up to 2 adults, an extra charge will apply for any additional adults. Child breakfast rates vary upon the hotel and may be an additional cost.
                    </p>
                    <p>
                        Depending on the hotel's policy, extra charge for children's stay and breakfast is applicable and payable at the hotel directly. Room packages including meals may not include children's meal charges.
                    </p>
                    <p className="py-3">
                        Bookings including children will also be based on the adults occupancy. Bedding must be shared or no additional bedding specifically for children unless otherwise stated.
                    </p>
                    <p className="pb-3">
                        Please note that in some countries there is a local tax known as stay tax or tourist tax (city-tax) which
                        must be paid directly by the guest at the hotel.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Policies;
