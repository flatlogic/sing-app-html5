# Sing App - HTML5 Version

## Quick Start

#### 1. Get the latest version

You can start by cloning the latest version of Sing App Lite on your local machine by running:

```shell
$ git clone -o sing-app-lite -b master --single-branch \
      https://github.com/flatlogic/sing-app-html5.git MyApp
$ cd MyApp
```

#### 2. Run `npm install && bower install`

This will install both run-time project dependencies and developer tools listed
in [package.json](../package.json) file. We are moving all dependencies to npm, so there will be no bower dependencies soon.

#### 3. Run `gulp build`

This command will build the app from the source files (`/src`) into the output
`/dist` folder. Then open `dist/index.html` in your browser.

Now you can open your web app in a browser, on mobile devices and start
hacking. Then open `dist/dashboard/index.html` in your browser. The page must be served from a web server, e.g. apache,
nginx, WebStorm built-in web server, etc., otherwise some features may not work properly.

#### 3. Run `gulp watch`

This command will watch for changes in `/src` and recompile handlebars' templates & scss styles on the fly into html & css accordingly.

For more information please refer to full [documentation](https://demo.flatlogic.com/sing-app/documentation).
