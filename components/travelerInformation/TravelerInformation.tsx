import Header from '../header/Header'
import PassengerInformation from './PassengerInformation'
import TravelerHeader from './TravelerHeader'
import YourOrder from './YourOrder'

const TravelerInformation = () => {
  return (
    <>
      <Header />
      <TravelerHeader />
      <div className="bg-gray-200">
        <div className="container flex py-5 gap-4 px-16">
          <div className="w-9/12">
            <PassengerInformation />
          </div>
          <div className="w-3/12">
            <YourOrder />
          </div>
        </div>
      </div>
    </>
  )
}

export default TravelerInformation
