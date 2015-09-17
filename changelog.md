
Changelog
--

**Version 2.0.0**

  - Component structure upgrade for angular version (better project organization)
  - Profile page added
  - Angular chat App
  - Full library list update
  - Bootstrap 3.3.5 update


Version 2.0.0 upgrade instructions

Ajax version. Following files are changed:

  - bower.json
  - profile.html (**new**)
  - sass/_base.scss
  - sass/_widgets.scss
  - sass/_custom-libs-override.scss

Angular version. The entire application structure has been rewritten according to latest angular/front-end best practices.
Codebase is now organized in a modules structure (see `src/app/modules/` folder). To start the app you need to run
following commands:

  1. `npm install -g gulp bower`
  2. `npm install`
  3. `bower install`
  4. `gulp serve`
  5. Go to [http://localhost:3000/](http://localhost:3000/)

That's it. It will launch a local web server and serve the app from project folder.


**Version 1.2.0**

  - Bootstrap 3.3.4 update

Version 1.2.0 upgrade instructions

1.2.0 upgrade introduces no new features, so no special steps needed.

**Version 1.1.1**

  - Angular Datatables fix (Angular version)

Version 1.1.1 upgrade instructions

Following files are changed:

  - angular/js/ng/app.js
  - angular/index.html


**Version 1.1.0**

  - Bootstrap 3.3 update
  - Angular 1.3.8 update
  - Font awesome 4.3.0

Version 1.1.0 upgrade instructions

1.1.0 upgrade introduces no new features. It just updates libraries to their newest versions (March 2015), so it requires no additional steps when updating.
You may simply replace main templates files: `bower.json`, `application.scss` and javascripts.
