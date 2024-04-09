import { createSignal } from 'solid-js'

export const AdminTopBar = () => {
  const [isActive, setIsActive] = createSignal(false)
  const toggleNavbar = () => setIsActive(!isActive())
  const emailHash = 'your-email-md5-hash-here'
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?s=64&d=retro`

  return (
    <nav
      class="navbar p-4 cool-white-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand pr-6 is-flex is-align-content-flex-end">
        <img
          class="mt--2"
          width={230}
          src="/assets/gameConnectLogo.png"
          alt="GameConnectLogo"
        />
        <a
          role="button"
          class={`navbar-burger mobile-navbar-burger ${isActive() ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
          onClick={toggleNavbar}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class={`navbar-menu ${isActive() ? 'is-active' : ''}`}
      >
        <div class="navbar-start">
          <a class="navbar-item">Home</a>

          <a class="navbar-item">Public App</a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Editor</a>

            <div class="navbar-dropdown">
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">Pages</a>
                <div class="navbar-dropdown">
                  <a class="navbar-item">Create Page</a>
                </div>
              </div>
              <div class="navbar-dropdown">
                <div class="navbar-item has-dropdown is-hoverable">
                  <a class="navbar-link">Pages</a>
                  <div class="navbar-dropdown">
                    <a class="navbar-item">Create Page</a>
                  </div>
                </div>
              </div>
              <a class="navbar-item">Menus</a>
              <hr class="navbar-divider" />
              <a class="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div class="navbar-end is-flex is-flex-direction-column has-text-centered is-justify-content-center is-align-content-center">
          <figure class={`image is-64x64 ${isActive() ? 'is-hidden' : ''}`}>
            <img class="is-rounded ml-1" alt={`Profile`} src={gravatarUrl} />
          </figure>
          Daniel Král
          <strong>admin</strong>
        </div>
      </div>
    </nav>
  )
}
