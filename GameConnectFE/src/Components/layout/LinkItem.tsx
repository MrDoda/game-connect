import { A, useLocation } from '@solidjs/router'

export const LinkItem = ({ path, children }: any) => {
  const location = useLocation()
  return (
    <A href={path} class={`${location.pathname === path ? 'is-active' : ''}`}>
      {children}
    </A>
  )
}
