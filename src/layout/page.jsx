import { Outlet } from 'react-router-dom'
import { SidebarWithHeader } from '../components/sidebar'
const Page = () => {
  return (
    <SidebarWithHeader>
        <Outlet />
    </SidebarWithHeader>
  )
}

export default Page