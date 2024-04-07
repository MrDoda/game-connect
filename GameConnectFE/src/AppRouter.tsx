import { HashRouter, Route } from '@solidjs/router'
import { Pages } from './constants/pages.ts'
import { Admin } from './Pages/Admin.tsx'
import { CommentMock } from './Components/CommentMock.tsx'
import { BasicLayout } from './Components/layout/BasicLayout.tsx'
import { DashBoard } from './Components/DashBoard.tsx'

export const AppRouter = () => {
  return (
    <HashRouter root={BasicLayout}>
      <Route path={Pages.Home} component={Admin} />
      <Route path={Pages.Admin} component={Admin} />
      <Route path={Pages.CommentMock} component={CommentMock} />
      <Route path={Pages.Dashboard} component={DashBoard} />
    </HashRouter>
  )
}
