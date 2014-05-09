Twenty
===

### Intro

This is a public repo built by the [Twenty](https://github.com/hr-twenty) team at [Hack Reactor](http://www.hackreactor.com/)

### Twenty

Twenty is a mobile app that allows you to quickly and easily connect with professionals in your area.  Whether it's to connect with other developers to discuss pointers on the newest libraries, to find VCs to invest in your latest venture, or simply to make the most out of your layover at SFO, Twenty is the app for converting your virtual networks into physical ones.

Log in with LinkedIn to get started.  You'll see a stack of potential connections and simply swipe right to connect or swipe left to move on to the next one.  If both people swipe right, you'll get a notification and can immediately start chatting using our in-app messenger.


### Technical

Twenty uses the following technologies:
  - Angular/Ionic
  - Node
  - Express
  - Neo4j

This repo contains all code for Angular/Ionic mobile-app.

==========

### Running your own instance of this repo

Steps
1. Clone Repo
2. npm install -g cordova ionic (gets you both ionic and cordova)
3. npm install from root (to get all dependencies)
4. bower install from www (to get bower components)
5. cordova platform add ios
6. cordova plugin add org.apache.cordova.device
7. cordova plugin add org.apache.cordova.statusbar
8. cordova plugin add org.apache.cordova.inappbrowser
9. ionic build ios
10. ionic emulate ios
