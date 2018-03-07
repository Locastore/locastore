# Locastore

> Connecting locally-minded consumers to the businesses in their community.

## Team

  - __Product Owner__: Yufan Wang
  - __Scrum Master__: Annah Patterson
  - __Lead Engineers__: Queenie Smith, Michael Shin

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [Installing Dependencies](#installing-dependencies)
1. [Roadmap](#roadmap)

## Usage

![Locastore Landing Page](https://c1.staticflickr.com/5/4794/38769942270_458d481090.jpg)

- From the landing page, a user enters their location (e.g., 'san francisco', '83642', etc.) in the search bar. The browser will display a results page with local businesses of all types from that geography.
- To narrow the search results to a specific business type or product, the user may enter a keyword (e.g., 'flowers', 'clothing', etc.) in the 'Search Local Retailers' search bar of this results page. The browser will display local businesses from the user's geography which relate to the keyword search.
- The user may click on a business that interests them to view details (hours, website, and photos).
- If the user has set up a profile and logged in, the user may click on a 'Favorite' button to add a business to their list of favorite businesses, which can be viewed from the home page under 'Profile'.
- When a user is done browsing, they can logout.

## Requirements

In addition to the dependencies listed in package.json, you will need recent versions of node and mongoDB installed on your computer.

Dependencies

```
  "apollo-fetch": "^0.7.0",
  "axios": "^0.18.0",
  "bcrypt-nodejs": "0.0.3",
  "body-parser": "^1.18.2",
  "bootstrap": "^4.0.0-alpha.6",
  "cheerio": "^1.0.0-rc.2",
  "cookie-parser": "^1.4.3",
  "cors": "^2.8.4",
  "dotenv": "^5.0.1",
  "express": "^4.16.2",
  "express-session": "^1.15.6",
  "install": "^0.10.4",
  "jquery": "^3.3.1",
  "mongoose": "^5.0.6",
  "npm": "^5.6.0",
  "passport": "^0.4.0",
  "passport-google-oauth": "^1.0.0",
  "react": "^16.2.0",
  "react-cookie": "^1.0.5",
  "react-dom": "^16.2.0",
  "react-places-autocomplete": "^6.1.2",
  "react-router": "^4.2.0",
  "react-router-dom": "^4.2.2",
  "react-transition-group": "^2.2.1",
  "reactstrap": "^5.0.0-beta",
  "request": "^2.83.0"
```

## Development

Dev Dependencies

```
  "babel-cli": "^6.26.0",
  "babel-core": "^6.26.0",
  "babel-loader": "^7.1.2",
  "babel-plugin-transform-object-rest-spread": "^6.26.0",
  "babel-preset-env": "^1.6.1",
  "babel-preset-es2015": "^6.24.1",
  "babel-preset-react": "^6.24.1",
  "babel-preset-stage-0": "^6.24.1",
  "babel-register": "^6.26.0",
  "css-loader": "^0.28.9",
  "eslint": "^4.18.1",
  "eslint-config-airbnb": "^16.1.0",
  "eslint-plugin-import": "^2.8.0",
  "eslint-plugin-jsx-a11y": "^6.0.3",
  "eslint-plugin-react": "^7.7.0",
  "file-loader": "^1.1.9",
  "less": "^2.7.3",
  "less-loader": "^4.0.5",
  "style-loader": "^0.20.2",
  "url-loader": "^0.6.2",
  "webpack": "^3.11.0",
  "webpack-dev-server": "^2.11.1"
```

### Installing Dependencies

From within the root directory:

```sh
1) npm install
2) Create .env file with your yelp API key and google OAuth keys:
  - create a yelp API key via https://www.yelp.com/fusion
  - create google OAuth clientID/secret via https://console.developers.google.com/apis/dashboard -> credentials -> create credentials -> OAuth client ID
  - yelpKey="<yelp API key>"
  - googleClientID="<google client ID>"
  - googleClientSecret="<google client secret>"
  - googleCallbackURL="http://127.0.0.1:3000/auth/google/callback"
3) npm run react-dev
4) npm run server-dev
5) sudo mongod
6) mongo 127.0.0.1 --port 27017
```

### Roadmap

View the project roadmap [here](https://github.com/Locastore/locastore/issues)

