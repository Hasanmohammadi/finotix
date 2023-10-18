import styles from "../loadingResult.module.css";
import samplelogo from "../../../styles/images/sample-logo.png"
import bigDot from "../../../styles/images/big-dot.png"
import dot from "../../../styles/images/dot.png"
import samplePlane from "../../../styles/images/sample-plane.png"
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import Image from "next/image";

let fakeTickets = [
    {
        wentAirplane: "Turkish Airlines1",
        wnetStartTime: "06:35 pm",
        wentStartTileLocal: "IST",
        lengthOfTrip: "3h 10m",
        arriveTime: "10:45 pm",
        arriveLocal: "PAR",
        anyStop: "1 stop",
        tripPrice: "320",
        currency: "USD",
        backAirplane: "Pegasus Airlines",
        backStartTime: "06:35 pm",
        backStartLocal: "IST",
        backTravelTime: "3h 10m",
        backArriveTime: "10:45 pm",
        backTravelLocal: "PAR",
        backAnyStop: "nonstop",
        departureFlight: {
            numberOfFlights: 2,
            departureFlightDate: "Departure flight (Wednesday, 24 Jul)",
            firstFlightName: "Turkish Airlines",
            firstFlightCode: "TK7933",
            firstFlightService: "Economy",
            firstFlightTakeOffTime: "06:35 pm",
            firstFlightAbb: "IKA,",
            firstFlightAirportName: "Imam Khomeini",
            firstFlightCity: "Tehran",
            firstFlightTime: "3h 10m",
            firstFlightArriveTime: "10:35 pm",
            firstFlightArriveTimAirportName: "Istanbul Sabiha Gokcen",
            firstFlightArriveTimAirportAbb : "IST,",
            firstFlightArriveCity: "Istanbul",
            totalBaggage: "20kg",
            stopBetween: "Stop: 13h 20min",
            secondFlightName: "Turkish Airlines",
            secondFlightCode: "TK7933",
            secondFlightService: "Economy",
            secondFlightTakeOffTime: "06:35 pm",
            secondFlightAirportName: "Imam Khomeini",
            secondFlightAbb: "IKA,",
            secondFlightCity: "Tehran",
            secondFlightTime: "3h 10m",
            secondFlightArriveTime: "10:35 pm",
            secondFlightArriveTimeAirportName: "IST, Istanbul Sabiha Gokcen",
            secondFlightArriveCity: "Istanbul",
        },
        returnFlight: {
            returnFlightDate: "Return flight (Saturday, 27 Jul)",
            firstFlightName: "Pegasus Airlines",
            firstFlightCode: "PS23598",
            firstFlightService: "Economy",
            firstFlightTakeOffTime: "06:35 pm",
            firstFlightAirportName: "Imam Khomeini",
            firstFlightAirportAbb: "IKA,",
            firstFlightCity: "Tehran",
            firstFlightTime: "3h 10m",
            firstFlightArriveTime: "10:35 pm",
            firstFlightArriveTimAirportName: "Istanbul Sabiha Gokcen",
            firstFlightArriveTimAirporAbb: "IST,",
            firstFlightArriveCity: "Istanbul",
            totalBaggage: "30kg",
        }
    },
    {
        wentAirplane: "Turkish Airlines",
        wnetStartTime: "06:35 pm",
        wentStartTileLocal: "IST",
        lengthOfTrip: "3h 10m",
        arriveTime: "10:45 pm",
        arriveLocal: "PAR",
        anyStop: "1 stop",
        tripPrice: "320",
        currency: "USD",
        departureFlight: {
            numberOfFlights: 1,
            departureFlightDate: "Departure flight (Wednesday, 24 Jul)",
            firstFlightName: "Turkish Airlines",
            firstFlightCode: "TK7933",
            firstFlightService: "Economy",
            firstFlightTakeOffTime: "06:35 pm",
            firstFlightAirportName: "IKA, Imam Khomeini",
            firstFlightCity: "Tehran",
            firstFlightTime: "3h 10m",
            firstFlightArriveTime: "10:35 pm",
            firstFlightArriveTimAirportName: "IST, Istanbul Sabiha Gokcen",
            firstFlightArriveCity: "Istanbul",
            totalBaggage: "20kg",
        },
        returnFlight: {
            returnFlightDate: "Return flight (Saturday, 27 Jul)",
            firstFlightName: "Pegasus Airlines",
            firstFlightCode: "PS23598",
            firstFlightService: "Economy",
            firstFlightTakeOffTime: "06:35 pm",
            firstFlightAirportName: "IKA, Imam Khomeini",
            firstFlightCity: "Tehran",
            firstFlightTime: "3h 10m",
            firstFlightArriveTime: "10:35 pm",
            firstFlightArriveTimAirportName: "IST, Istanbul Sabiha Gokcen",
            firstFlightArriveCity: "Istanbul",
            totalBaggage: "30kg",
        }
    },
    {
        wentAirplane: "Turkish Airlines",
        wnetStartTime: "06:35 pm",
        wentStartTileLocal: "IST",
        lengthOfTrip: "3h 10m",
        arriveTime: "10:45 pm",
        arriveLocal: "PAR",
        anyStop: "1 stop",
        tripPrice: "320",
        currency: "USD",
        changeAirplane: true,
        departureFlight: {
            numberOfFlights: 1,
            departureFlightDate: "Departure flight (Wednesday, 24 Jul)",
            firstFlightName: "Turkish Airlines",
            firstFlightCode: "TK7933",
            firstFlightService: "Economy",
            firstFlightTakeOffTime: "06:35 pm",
            firstFlightAirportName: "IKA, Imam Khomeini",
            firstFlightCity: "Tehran",
            firstFlightTime: "3h 10m",
            firstFlightArriveTime: "10:35 pm",
            firstFlightArriveTimAirportName: "IST, Istanbul Sabiha Gokcen",
            firstFlightArriveCity: "Istanbul",
            totalBaggage: "20kg",
        },
        returnFlight: {
            returnFlightDate: "Return flight (Saturday, 27 Jul)",
            firstFlightName: "Pegasus Airlines",
            firstFlightCode: "PS23598",
            firstFlightService: "Economy",
            firstFlightTakeOffTime: "06:35 pm",
            firstFlightAirportName: "IKA, Imam Khomeini",
            firstFlightCity: "Tehran",
            firstFlightTime: "3h 10m",
            firstFlightArriveTime: "10:35 pm",
            firstFlightArriveTimAirportName: "IST, Istanbul Sabiha Gokcen",
            firstFlightArriveCity: "Istanbul",
            totalBaggage: "30kg",
        }

    },
    {
        wentAirplane: "Turkish Airlines",
        wnetStartTime: "06:35 pm",
        wentStartTileLocal: "IST",
        lengthOfTrip: "3h 10m",
        arriveTime: "10:45 pm",
        arriveLocal: "PAR",
        anyStop: "1 stop",
        tripPrice: "320",
        currency: "USD",
        backAirplane: "Pegasus Airlines",
        backStartTime: "06:35 pm",
        backStartLocal: "IST",
        backTravelTime: "3h 10m",
        backArriveTime: "10:45 pm",
        backTravelLocal: "PAR",
        backAnyStop: "nonstop",
        cheapest: true ,
        departureFlight: {
            numberOfFlights: 1,
            departureFlightDate: "Departure flight (Wednesday, 24 Jul)",
            firstFlightName: "Turkish Airlines",
            firstFlightCode: "TK7933",
            firstFlightService: "Economy",
            firstFlightTakeOffTime: "06:35 pm",
            firstFlightAirportName: "IKA, Imam Khomeini",
            firstFlightCity: "Tehran",
            firstFlightTime: "3h 10m",
            firstFlightArriveTime: "10:35 pm",
            firstFlightArriveTimAirportName: "IST, Istanbul Sabiha Gokcen",
            firstFlightArriveCity: "Istanbul",
            totalBaggage: "20kg",
        },
        returnFlight: {
            returnFlightDate: "Return flight (Saturday, 27 Jul)",
            firstFlightName: "Pegasus Airlines",
            firstFlightCode: "PS23598",
            firstFlightService: "Economy",
            firstFlightTakeOffTime: "06:35 pm",
            firstFlightAirportName: "IKA, Imam Khomeini",
            firstFlightCity: "Tehran",
            firstFlightTime: "3h 10m",
            firstFlightArriveTime: "10:35 pm",
            firstFlightArriveTimAirportName: "IST, Istanbul Sabiha Gokcen",
            firstFlightArriveCity: "Istanbul",
            totalBaggage: "30kg",
        }
    },
    {
        wentAirplane: "Turkish Airlines",
        wnetStartTime: "06:35 pm",
        wentStartTileLocal: "IST",
        lengthOfTrip: "3h 10m",
        arriveTime: "10:45 pm",
        arriveLocal: "PAR",
        anyStop: "1 stop",
        tripPrice: "320",
        currency: "USD",
        backAirplane: "Pegasus Airlines",
        backStartTime: "06:35 pm",
        backStartLocal: "IST",
        backTravelTime: "3h 10m",
        backArriveTime: "10:45 pm",
        backTravelLocal: "PAR",
        backAnyStop: "nonstop",
        departureFlight: {
            numberOfFlights: 1,
            departureFlightDate: "Departure flight (Wednesday, 24 Jul)",
            firstFlightName: "Turkish Airlines",
            firstFlightCode: "TK7933",
            firstFlightService: "Economy",
            firstFlightTakeOffTime: "06:35 pm",
            firstFlightAirportName: "IKA, Imam Khomeini",
            firstFlightCity: "Tehran",
            firstFlightTime: "3h 10m",
            firstFlightArriveTime: "10:35 pm",
            firstFlightArriveTimAirportName: "IST, Istanbul Sabiha Gokcen",
            firstFlightArriveCity: "Istanbul",
            totalBaggage: "20kg",
        },
        returnFlight: {
            returnFlightDate: "Return flight (Saturday, 27 Jul)",
            firstFlightName: "Pegasus Airlines",
            firstFlightCode: "PS23598",
            firstFlightService: "Economy",
            firstFlightTakeOffTime: "06:35 pm",
            firstFlightAirportName: "IKA, Imam Khomeini",
            firstFlightCity: "Tehran",
            firstFlightTime: "3h 10m",
            firstFlightArriveTime: "10:35 pm",
            firstFlightArriveTimAirportName: "IST, Istanbul Sabiha Gokcen",
            firstFlightArriveCity: "Istanbul",
            totalBaggage: "30kg",
        }
    }];

const handleShowDetails = (e) => {
    let elemets = e.target.parentElement.parentElement.getElementsByClassName('details-section')[0];
    let elemetClassnames = e.target.parentElement.parentElement.getElementsByClassName('details-section')[0].className;
    elemetClassnames.split(" ").map(item => {
        item === "hidden" ? elemets.classList.remove('hidden') : elemets.classList.add('hidden')
    })
}

const SearchResult = () => {
    return (
        <div className="pt-2 pb-20">
            {
                fakeTickets.map((item,index) => (
                    <div className="py-2" key={`cheapest-${index}`}>
                        <div className={styles.ticketContainer}>
                            {
                                item.cheapest ?
                                    <div className={styles.cheapest}>
                                        <span className={styles.cheapestBadge}>
                                            Cheapest
                                        </span>
                                    </div>
                                    : null
                            }
                            <div className="flex">
                                <div className="w-5/6">
                                    <div className="grid grid-flow-col grid-cols-5">
                                        <div className="flex">
                                            <div className="self-center">
                                                {
                                                    item && item.changeAirplane ? <div className="relative">
                                                        <div className={styles.iconsOne}>
                                                            <Image src={samplelogo} alt=""/>
                                                        </div>
                                                        <div className={styles.iconTwo}>
                                                            <Image src={samplelogo} alt=""/>
                                                        </div>
                                                    </div> : <Image src={samplelogo} alt=""/>
                                                }
                                            </div>
                                            <div className="w-1/2 self-center px-3">
                                            <span className={styles.airlineName}>
                                                {item.wentAirplane}
                                            </span>
                                            </div>
                                        </div>
                                        <div className="col-span-3">
                                            <div className="flex justify_between">
                                                <div className="block w-2/12 self-center">
                                                    <p className="f-15 font-bold">
                                                        {
                                                            item.wnetStartTime
                                                        }
                                                    </p>
                                                    <p className="f-15 text-muted">
                                                        {
                                                            item.wentStartTileLocal
                                                        }
                                                    </p>
                                                </div>
                                                <div className="self-center w-8/12">
                                                    <p className="text-center">
                                                        {item.lengthOfTrip}
                                                    </p>
                                                    <div className="flex relative  mx-5 justify-between">
                                                        <span className="self-center">
                                                            <Image draggable="false" className="z-index5" src={bigDot} alt=""/>
                                                        </span>
                                                        <span className="w-auto flex self-center justify-center">
                                                            <Image draggable="false" className="z-index5" src={samplePlane} alt=""/>
                                                            <hr/>
                                                        </span>
                                                        <span className="self-start">
                                                            <Image draggable="false" className="z-index5" src={dot} alt=""/>
                                                        </span>
                                                        <div className={`${styles.underPlaneLine} z-index0`}>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="block px-2 w-2/12 self-center">
                                                    <p className="f-15 font-bold">
                                                        {
                                                            item.arriveTime
                                                        }
                                                    </p>
                                                    <p className="f-15 text-muted">
                                                        {
                                                            item.arriveLocal
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.stopStyle}>
                                            <p className="text-center">
                                                {
                                                    item.anyStop
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    {
                                        item && item.backAirplane && !item.changeAirplane ?
                                            <div className="grid grid-flow-col grid-cols-5 pt-5">
                                                <div className="flex">
                                                    <div className="self-center">
                                                        {
                                                            item.backAirplane ? <Image src={samplelogo} alt=""/> : null
                                                        }
                                                    </div>
                                                    <div className="w-1/2 self-center px-3">
                                                    <span className={styles.airlineName}>
                                                    {
                                                        item.backAirplane ? item.backAirplane : null
                                                    }
                                                    </span>
                                                    </div>
                                                </div>

                                                <div className="col-span-3">
                                                    <div className="flex justify_between">
                                                        <div className="block w-2/12 self-center">
                                                            <p className="f-15 font-bold">
                                                                {
                                                                    item.wnetStartTime
                                                                }
                                                            </p>
                                                            <p className="f-15 text-muted">
                                                                {
                                                                    item.wentStartTileLocal
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="self-center w-8/12">
                                                            <p className="text-center">
                                                                {item.lengthOfTrip}
                                                            </p>
                                                            <div className="flex relative mx-5 justify-between">
                                                        <span className="self-center">
                                                            <Image draggable="false" className="z-index5" src={bigDot} alt=""/>
                                                        </span>
                                                                <span className="w-auto flex self-center justify-center">
                                                            <Image draggable="false" className="z-index5" src={samplePlane} alt=""/>
                                                            <hr/>
                                                        </span>
                                                                <span className="self-start">
                                                            <Image draggable="false" className="z-index5" src={dot} alt=""/>
                                                        </span>
                                                                <div className={`${styles.underPlaneLine} z-index0`}>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="block px-2 w-2/12 self-center">
                                                            <p className="f-15 font-bold">
                                                                {
                                                                    item.arriveTime
                                                                }
                                                            </p>
                                                            <p className="f-15 text-muted">
                                                                {
                                                                    item.arriveLocal
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`text-center ${styles.stopStyle}`}>
                                                    {
                                                        item.backAnyStop ? item.backAnyStop : null
                                                    }
                                                </div>
                                            </div>
                                            : null
                                    }
                                </div>
                                <div className="w-1/6 text-right">
                                    <p className={styles.currencyStyles}>
                                        {
                                            item.currency
                                        }
                                    </p>
                                    <p className={styles.tripPriceStyles}>
                                        {
                                            item.tripPrice
                                        }
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-between pt-3">
                                <button onClick={handleShowDetails}>
                                    Details
                                </button>
                                <button className={styles.bookBtn}>
                                    Book
                                </button>
                            </div>
                            <div className="details-section hidden pt-3">
                                <div>
                                    <Image src={samplePlane} alt=""/>
                                    <span className="px-2">
                                    {
                                        item.departureFlight?.departureFlightDate
                                    }
                                    </span>
                                </div>
                                <div className="grid grid-cols-5 py-5 gap-3">
                                    <div className="flex">
                                        <div className="self-center">
                                            <Image src={samplelogo} alt=""/>
                                        </div>
                                        <div className="px-3 self-center">
                                            <p>
                                                {item.departureFlight?.firstFlightName}
                                            </p>
                                            <p>
                                                {item.departureFlight?.firstFlightCode}
                                            </p>
                                            <p>
                                                {item.departureFlight?.firstFlightService}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-center self-center">
                                        <p className="font-semibold">{item.departureFlight?.firstFlightTakeOffTime}</p>
                                        <div className="flex justify-center">
                                            <span className="font-semibold px-1">
                                               {item.departureFlight?.firstFlightAbb}
                                            </span>
                                            <p className="whitespace-nowrap	">{item.departureFlight?.firstFlightAirportName}</p>
                                        </div>
                                        <p>{item.departureFlight?.firstFlightCity}</p>
                                    </div>
                                    <div className="text-center self-center">
                                        {item.departureFlight?.firstFlightTime}
                                    </div>
                                    <div className="text-center self-center">
                                        <p className="font-semibold">{item.departureFlight?.firstFlightArriveTime}</p>
                                        <div className="flex justify-center">
                                            <span className="font-semibold px-1">
                                               {item.departureFlight?.firstFlightArriveTimAirportAbb}
                                            </span>
                                            <p className="whitespace-nowrap	">{item.departureFlight?.firstFlightArriveTimAirportName}</p>
                                        </div>
                                        <p>{item.departureFlight?.firstFlightArriveCity}</p>
                                    </div>
                                    <div className="flex justify-center	items-center">
                                        <div className="px-4">
                                            <LuggageOutlinedIcon className={styles.luggageStyle}/>
                                        </div>
                                        <div>
                                            <p>baggage:</p>
                                            <p>{item.departureFlight?.totalBaggage}</p>
                                        </div>
                                    </div>
                                </div>
                                {item && item.departureFlight?.numberOfFlights === 2 ? (<>
                                    <div>
                                        <div className={styles.stopBorder}>
                                            <span className={`${styles.stopTime}`}>
                                                {item.departureFlight?.stopBetween}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="grid grid-cols-5 py-5 gap-3">
                                            <div className="flex">
                                                <div className="self-center">
                                                    <Image src={samplelogo} alt=""/>
                                                </div>
                                                <div className="px-3 self-center">
                                                    <p>
                                                        {item.departureFlight?.secondFlightName}
                                                    </p>
                                                    <p>
                                                        {item.departureFlight?.secondFlightCode}
                                                    </p>
                                                    <p>
                                                        {item.departureFlight?.secondFlightService}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-center self-center">
                                                <p className="font-semibold">{item.departureFlight?.secondFlightTakeOffTime}</p>
                                                <div className="flex justify-center">
                                            <span className="font-semibold px-1">
                                               {item.departureFlight?.secondFlightAbb}
                                            </span>
                                                    <p className="whitespace-nowrap	">{item.departureFlight?.secondFlightAirportName}</p>
                                                </div>
                                                <p>{item.departureFlight?.secondFlightCity}</p>
                                            </div>
                                            <div className="text-center self-center">
                                                {item.departureFlight?.firstFlightTime}
                                            </div>
                                            <div className="text-center self-center">
                                                <p className="font-semibold">{item.departureFlight?.firstFlightArriveTime}</p>
                                                <div className="flex justify-center">
                                            <span className="font-semibold px-1">
                                               {item.departureFlight?.firstFlightArriveTimAirportAbb}
                                            </span>
                                                    <p className="whitespace-nowrap	">{item.departureFlight?.firstFlightArriveTimAirportName}</p>
                                                </div>
                                                <p>{item.departureFlight?.firstFlightArriveCity}</p>
                                            </div>
                                            <div className="flex justify-center	items-center">
                                                <div className="px-4">
                                                    <LuggageOutlinedIcon className={styles.luggageStyle}/>
                                                </div>
                                                <div>
                                                    <p>baggage:</p>
                                                    <p>{item.departureFlight?.totalBaggage}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>) : null}
                                <div className="py-5">
                                    <div>
                                        <Image src={samplePlane} alt=""/>
                                        <span className="px-2">
                                    {
                                        item.returnFlight?.returnFlightDate
                                    }
                                    </span>
                                    </div>
                                </div>
                                <div className="pb-5">
                                    <div className="grid grid-cols-5 py-5 gap-3">
                                        <div className="flex">
                                            <div className="self-center">
                                                <Image src={samplelogo} alt=""/>
                                            </div>
                                            <div className="px-3 self-center">
                                                <p>
                                                    {item.returnFlight?.firstFlightName}
                                                </p>
                                                <p>
                                                    {item.returnFlight?.firstFlightCode}
                                                </p>
                                                <p>
                                                    {item.returnFlight?.firstFlightService}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-center self-center">
                                            <p className="font-semibold">{item.returnFlight?.firstFlightTakeOffTime}</p>
                                            <div className="flex justify-center">
                                            <span className="font-semibold px-1">
                                               {item.returnFlight?.firstFlightAirportAbb}
                                            </span>
                                                <p className="whitespace-nowrap	">{item.returnFlight?.firstFlightAirportName}</p>
                                            </div>
                                            <p>{item.returnFlight?.firstFlightCity}</p>
                                        </div>
                                        <div className="text-center self-center">
                                            {item.returnFlight?.firstFlightTime}
                                        </div>
                                        <div className="text-center self-center">
                                            <p className="font-semibold">{item.returnFlight?.firstFlightArriveTime}</p>
                                            <div className="flex justify-center">
                                            <span className="font-semibold px-1">
                                               {item.returnFlight?.firstFlightArriveTimAirporAbb}
                                            </span>
                                                <p className="whitespace-nowrap	">{item.returnFlight?.firstFlightArriveTimAirportName}</p>
                                            </div>
                                            <p>{item.returnFlight?.firstFlightArriveCity}</p>
                                        </div>
                                        <div className="flex justify-center	items-center">
                                            <div className="px-4">
                                                <LuggageOutlinedIcon className={styles.luggageStyle}/>
                                            </div>
                                            <div>
                                                <p>baggage:</p>
                                                <p>{item.returnFlight?.totalBaggage}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>
    );
};

export default SearchResult;