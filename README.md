twenty-app
==========

Requirements:
- ionic (npm install -g cordova ionic)

Run the app in local environment:
- python -m SimpleHTTPServer 8080

Emulate the app with XCode:
- navigate to the top-level directory
- build the application (ionic build ios)
- run the emulator (ionic emulate ios)
- If you want to actually make changes, you have to close the emulator and repeat the process

Better/easier emulation:
- boot up the server in the main view (nodemon server.js)
- navigate to http://localhost:3000/#/
- in Chrome, open the console and hit the emulate tab, then an iPhone option, then hit 'Emulate'
