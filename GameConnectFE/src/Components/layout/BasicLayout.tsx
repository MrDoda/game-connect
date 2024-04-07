import { AdminTopBar } from './AdminTopBar.tsx'
import { LeftBarMenu } from './LeftBarMenu.tsx'

export const BasicLayout = ({ children }: any) => {
  return (
    <div>
      <AdminTopBar />
      <div class="container is-fluid pt-6">
        <div class="columns">
          <div class="column is-2">
            <div class="grid">
              <LeftBarMenu />
            </div>
          </div>

          <div class="column is-10">{children}</div>
        </div>
        <div class="notification grid"></div>
      </div>
    </div>
  )
}
