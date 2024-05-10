export function updateNavigation(html, navLinks) {
  const navRegex = /<nav>[\s\S]*?<\/nav>/
  let newNavContent = '<nav>\n\t<ul>\n'
  navLinks.forEach((link) => {
    newNavContent += `\t\t<li><a href="/#${link.url}">${link.title}</a></li>\n`
  })
  newNavContent += '\t</ul>\n</nav>'
  return html.replace(navRegex, newNavContent)
}
