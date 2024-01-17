import FinotixMobileLogo from '../../../styles/images/finotixMobileLogo'

import Link from 'next/link'
import SidebarMenu from './components/SidebarMenu'

export default function HeaderMobile() {
  return (
    <div className="py-8 bg-[#F00]">
      <div className="flex justify-between px-6">
        <Link href="/">
          <FinotixMobileLogo />
        </Link>
        <SidebarMenu />
      </div>
    </div>
  )
}
