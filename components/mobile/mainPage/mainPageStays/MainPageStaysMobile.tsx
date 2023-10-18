import {
  AccountCircleOutlined,
  BedOutlined,
  FlightTakeoff,
  MenuOutlined,
} from '@mui/icons-material'
import { useRouter } from 'next/router'
import FinotixMobileLogo from '../../../../styles/images/finotixMobileLogo'

export default function MainPageStaysMobile() {
  const { push } = useRouter()

  return (
    <>
      <div className="pt-8 bg-[#F00]">
        <div className="flex justify-between px-6">
          <FinotixMobileLogo />
          <div className="flex gap-4">
            <AccountCircleOutlined htmlColor="white" fontSize="large" />
            <MenuOutlined htmlColor="white" fontSize="large" />
          </div>
        </div>
        <div className="mt-10 flex text-white w-full h-full">
          <div
            className="flex gap-2 w-1/2 justify-center pb-4"
            onClick={() => push('/')}
          >
            <FlightTakeoff />
            <span>Flights</span>
          </div>
          <div className="flex gap-2 w-1/2 justify-center pb-4 border-b-4 border-b-white">
            <BedOutlined />
            <span>Stays</span>
          </div>
        </div>
      </div>
    </>
  )
}
