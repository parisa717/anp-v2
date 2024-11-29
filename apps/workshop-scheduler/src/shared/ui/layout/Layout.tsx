import { useTranslation } from '@nexus-ui/i18n'
import { ProfileButton, Sidebar, Topbar } from '@nexus-ui/ui'
import { Button } from 'primereact/button'
import { Divider } from 'primereact/divider'
import { Menu } from 'primereact/menu'
import { MenuItem } from 'primereact/menuitem'
import { Outlet } from 'react-router-dom'

export interface LayoutProps {
  userFullName: string
  isLoggedIn: boolean
  menuItems: MenuItem[]
}

export const Layout = ({ menuItems, userFullName, isLoggedIn }: LayoutProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col h-screen bg-bluegray-50 p-2">
      <div className="mb-2">
        <Topbar
          title={t('widgets.baseLayout.topbar.title')}
          right={
            <>
              {userFullName && <ProfileButton fullName={userFullName} />}
              {isLoggedIn && (
                <>
                  <Divider layout="vertical" className="p-0" />
                  <Button icon="pi pi-sign-out" text aria-label={t('sign out')} data-cy="sign-out-button" />
                </>
              )}
            </>
          }
        />
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
