import { KeyboardArrowLeft } from '@mui/icons-material'
import { useRouter } from 'next/router'
import TravelInfoMobile from './components/TravelInfoMobile'
import PassengerInformation from './components/PassengerInformation'
import SidebarMenu from '../header/components/SidebarMenu'

export default function TravelInformationMobile() {
  const router = useRouter()

  return (
    <div>
      <div className="w-full relative h-1/6 bg-[#F00] text-white py-8">
        <div className="flex items-center justify-between">
          <KeyboardArrowLeft
            fontSize="large"
            className="w-1/5"
            onClick={() => router.back()}
          />
          <p className="w-3/5 text-center">Traveler Information</p>
          <div className="w-[19%]">
            <SidebarMenu />
          </div>
        </div>
      </div>
      <TravelInfoMobile />
      <PassengerInformation />
    </div>
  )
}
