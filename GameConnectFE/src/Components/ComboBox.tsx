import { createSignal } from 'solid-js'

export function ComboBox() {
  const [isActive, setIsActive] = createSignal(false)
  const [inputValue, setInputValue] = createSignal('')

  const options = ['TopBar', 'BottomBar', 'SideBar']

  /*onMount(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest('.dropdown')) {
        setIsActive(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  })*/

  return (
    <div class="field">
      <label class="label">Menu</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Select or type new"
          value={inputValue()}
          onInput={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsActive(true)}
        />
      </div>
      <div class={`dropdown ${isActive() ? 'is-active' : ''}`}>
        <div class="dropdown-menu">
          <div class="dropdown-content">
            {options.map((option) => (
              <a
                href="#"
                class="dropdown-item"
                onClick={(e) => {
                  e.preventDefault()
                  setInputValue(option)
                  setIsActive(false)
                }}
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
