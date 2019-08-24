# Gatsby Plugin: Source Meetup Group Events

A Gatsby Plugin that sources meetup group events using the V3 api. It can take in a single group, or multiple, and return all of their respective events as nodes to work with. Built with community websites in mind that aggregate multiple area groups.

### Installing

`npm install --save gatsby-source-meetup-events`


## How to use

The plugin expects two things: Your Access Token from meetup and one or more Meetup Group URLs. To get an access token from meetup you need to first get an OAuth Consumer from Meetup. The ability to generate one of these may be locked behind a Meetup Pro paywall. If not, you can visit: https://secure.meetup.com/meetup_api/oauth_consumers/ to obtain yours. After that you'll also need to set up a way to get your Access Token via Oauth2. This plugin won't handle that, unfortunately. Tip: use Express to create a basic locally hosted page that is the target of your Redirect URI on Meetup and log out the access token.

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-meetup-events`,
      options: {
        key: process.env.MEETUP_API_KEY,
        groups: "denver-script",
      },
    },
  ],
}
```