import { HashRouter, Route } from '@solidjs/router'
import { Pages } from './constants/pages.ts'
import { Admin } from './Pages/Admin.tsx'
import { CommentMock } from './Components/CommentMock.tsx'
import { BasicLayout } from './Components/layout/BasicLayout.tsx'
import { DashBoard } from './Components/DashBoard.tsx'
import { CreateNewPage } from './Components/CreateNewPage.tsx'
import { CreateNewPost } from './Components/CreateNewPost.tsx'

export const AppRouter = () => {
  return (
    <HashRouter root={BasicLayout}>
      <Route path={Pages.Home} component={Admin} />
      <Route path={Pages.Admin} component={Admin} />
      <Route path={Pages.CommentMock} component={CommentMock} />
      <Route path={Pages.Dashboard} component={DashBoard} />
      <Route path={Pages.PageEditor} component={CreateNewPage} />
      <Route path={Pages.PostEditor} component={CreateNewPost} />
    </HashRouter>
  )
}
