import { BedOutlined, FlightTakeoff } from '@mui/icons-material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { HeaderMobile } from '../../header'

export default function MainPageStaysMobile() {
  const { push, pathname } = useRouter()

  return (
    <>
      <>
        <HeaderMobile />
        <div className="flex text-gray-900 w-full h-full bg-white">
          <div
            className={clsx(
              'flex gap-2 w-1/2 justify-center py-4 border-b-4 ',
              {
                'border-b-[#F00]': pathname === '/',
              }
            )}
            onClick={() => push('/')}
          >
            <FlightTakeoff />
            <span>Flights</span>
          </div>
          {/* <div
            className={clsx(
              'flex gap-2 w-1/2 justify-center py-4 border-b-4 ',
              {
                'border-b-[#F00]': pathname === '/stays',
              }
            )}
            onClick={() => push('/stays')}
          >
            <BedOutlined />
            <span>Stays</span>
          </div> */}
        </div>
      </>
    </>
  )
}
