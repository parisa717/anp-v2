import { Sidebar, Topbar } from '@nexus-ui/ui'
import { Menu } from 'primereact/menu'
import { Outlet } from 'react-router-dom'

import { useMenuItems } from '../lib/useMenuItems'

export const BaseLayout = () => {
  const menuItems = useMenuItems()

  return (
    <div className="flex flex-col h-screen bg-bluegray-50 p-2">
      <div className="mb-2">
        <Topbar title="Admin Portal" />
      </div>

      <div className="flex grow overflow-auto">
        <nav data-cy="layout-menu" className="flex-shrink-0">
          <Sidebar className="h-full">
            <Menu model={menuItems} />
          </Sidebar>
        </nav>

        <div className="flex-grow overflow-auto pl-28 pr-40 pt-12">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
