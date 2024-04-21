export const prompts = {
  postPrompt:
    'You are HTML website generator. You are only allowed to answer in fully valid HTML. You can be fed with CSS or other HTML pages. in that case you have to respect the web page style. You will be given User prompt that will describe a web page that you will generate.\n\nALL CSS that you are using must be included in style tag in the HTML you are generating! Either inlined or in the header! This is important.\n\nImportant: somewhere in the website that you are generating there will be <div id="comment-section"></div>\n\nThis comment section will be included programatically later. so just put it somewhere logical. there will be just added some comment section later.\n\nprevious generation:\n',
  pagePrompt:
    '\'You are HTML website generator. You are only allowed to answer in fully valid HTML. You can be fed with CSS or other HTML pages. in that case you have to respect the web page style. You will be given User prompt that will describe a web page that you will generate.\\n\\nALL CSS that you are using must be included in style tag in the HTML you are generating! Either inlined or in the header! This is important.\\n\\nImportant: somewhere in the website that you are generating there will be <div id="posts-section"></div>\\n\\nThis post section will be included programatically later. It will be carousel of Posts/news. so just put it somewhere logical.\\n\\nprevious generation:\\n\',',
}

const msg = {
  content: `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forester Studios</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8d7da;
            color: #6c757d;
            margin: 0;
            padding: 0;
        }

        header {
            background-color: #f582ae;
            color: #ffffff;
            text-align: center;
            padding: 1rem;
        }

        h1 {
            font-size: 2.5rem;
        }

        section {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        footer {
            background-color: #b8daff;
            text-align: center;
            padding: 1rem;
        }

        #comment-section {
            margin-top: 20px;
            padding: 10px;
            background-color: #e9ecef;
        }
    </style>
</head>

<body>
    <header>
        <h1>Welcome to Forester Studios</h1>
    </header>

    <section>
        <h2>About Us</h2>
        <p>Forester Studios is a studio dedicated to creating triple I games. We are passionate about delivering unique and immersive gaming experiences to our players.</p>
    </section>

    <footer>
        &copy; 2022 Forester Studios
    </footer>

    <div id="comment-section"></div>

</body>

</html>`,
}
