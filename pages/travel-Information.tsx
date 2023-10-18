import TravelInformationMobile from '../components/mobile/travelerInformation/TravelInformationMobile'
import TravelerInformation from '../components/travelerInformation/TravelerInformation'
import { isMobile } from 'react-device-detect'
import { useEffect, useState } from 'react'
import { isMobile as isMobileSize } from 'react-device-detect'

export default function TravelInfo() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(isMobileSize)
  }, [isMobileSize])

  return (
    <div>
      {isMobile && <TravelInformationMobile />}
      {!isMobile && <TravelerInformation />}
    </div>
  )
}
