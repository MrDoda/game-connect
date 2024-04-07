import { useLocation } from '@solidjs/router'
import { Pages } from '../../constants/pages.ts'
import { createEffect } from 'solid-js'
import { LinkItem } from './LinkItem.tsx'
export const LeftBarMenu = () => {
  const location = useLocation()

  createEffect(() => {
    console.log('The current URL path is:', location.pathname)
  })

  return (
    <aside class="menu is-hidden-touch">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <LinkItem path={Pages.Dashboard}>Dashboard</LinkItem>
        </li>
        <li>
          <LinkItem path={Pages.Customers}>Customers</LinkItem>
        </li>
      </ul>
      <p class="menu-label">Administration</p>
      <ul class="menu-list">
        <li>
          <LinkItem path={Pages.PageEditor2} class="is-active">
            Pages
          </LinkItem>
          <ul>
            <li>
              <LinkItem path={Pages.PageEditor}>Create Page</LinkItem>
            </li>
          </ul>
        </li>
        <li>
          <LinkItem path={Pages.PostEditor2} class="">
            Posts
          </LinkItem>
          <ul>
            <li>
              <LinkItem path={Pages.PostEditor}>Create Post</LinkItem>
            </li>
          </ul>
        </li>
        <li>
          <LinkItem path={Pages.MenuEditor} class="">
            Menus
          </LinkItem>
        </li>
      </ul>
    </aside>
  )
}
