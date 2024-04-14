import OpenAI from 'openai'
import type Express from 'express'
import openaiTokenCounter from 'openai-gpt-token-counter'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const OpenAIService = {
  getPage: async (req: Express.Request, res: Express.Response) => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content:
            "You are HTML website generator. You are only allowed to answer in fully valid HTML. You can be fed with CSS or other HTML pages. in that case you have to respect the web page style. You will be given User prompt that will describe a web page that you will generate.\n\nALL CSS that you are using must be included in style tag in the HTML you are generating! Either inlined or in the header! This is important.\n\nImportant: somewhere in the website that you are generating there will be <div id=\"comment-section\"></div>\n\nThis comment section will be included programatically later. so just put it somewhere logical. there will be just added some comment section later.\n\nprevious generation:\n<!doctype html>\n<html lang=\"en\">\n  <head>\n    <script type=\"module\">\nimport RefreshRuntime from \"/@react-refresh\"\nRefreshRuntime.injectIntoGlobalHook(window)\nwindow.$RefreshReg$ = () => {}\nwindow.$RefreshSig$ = () => (type) => type\nwindow.__vite_plugin_react_preamble_installed__ = true\n</script>\n\n    <script type=\"module\" src=\"/@vite/client\"></script>\n\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\n    <link rel='stylesheet' href='/css/bulma.min.css'>\n    <link rel='stylesheet' type='text/css' href='https://unpkg.com/bulma-prefers-dark' />\n    <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' />\n    <script src='https://kit.fontawesome.com/01b6e8d6d9.js' crossorigin='anonymous'></script>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Výzkum soudy jistoty</title>\n  </head>\n  <body>\n  <div class='main flex flex-center is-flex-direction-column'>\n    <section class='section' style='text-align: center;'>\n      <h1 class='title'>Výzkum soudy jistoty</h1>\n      <h2 class='subtitle'>\n        Děkujeme za Vaši účast  <!-- Popřípadě zpět k <a href=\"/#/duo-test\">Duo</a> <a href=\"/#/solo-test\">Solo</a>.. -->\n      </h2>\n    </section>\n    <section class='section' id='dynamicContentArea'>\n      <div id=\"root\"></div>\n    </section>\n    <div hx-post='/ws/init' hx-swap='outerHTML' hx-trigger='load'></div>\n  </div>\n  <footer class='footer'>\n    <div class='content has-text-centered'>\n      <p>\n        <strong>VSJ</strong> Výzkum Soudy Jistoty\n      </p>\n    </div>\n  </footer>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>\n",
        },
        {
          role: 'user',
          content:
            'Create a welcoming webpage for my Obsidian Studio. We are game developers. Focusing on simulators and such.',
        },
      ],
      temperature: 1,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
  },
}
