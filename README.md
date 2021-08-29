# Starter pack

## Goal 🎯

This project was initially a technical test.
After releasing my test, I had a discussion with my reviewer and decided to add some modifications, to perfect it.
I developped all the front-end part, which communicates with a back-end api (available in the /backend folder, I did not developped it. Endpoint details are available at the end of this readme file. Please see other projects like [this one](https://github.com/sbelalouibertot/friends-backend) if you want an overview of my back-end skills).
It is now a side project.

The goal is to develop a messages-reader app. The messages are related to realtors.

It includes the following features :

- I can change realtor and I see the list of messages from the related realtor
- I can scroll through the list of messages on several pages (infinite scroll)
- Clicking on a message display its details
- If the message was not read the counter decrements

![Capture d’écran 2021-08-29 à 16 52 48](https://user-images.githubusercontent.com/79903008/131254759-878c36e2-3bb1-4b24-ae2f-a96cdb087825.png)

## Prerequisites

- NodeJS (v12+ should be fine)
- Running the back-end API with `npm run run-backend`

## Let's get started 🚀

In order to run the front-end app, please reproduce the following steps :

1. Dependencies

##### `npm install`

##### `npm install -g serve`

2. Run app

#### Production (faster speed)

##### `npm run build`

##### `npm run serve-prod`

#### Development (optional)

##### `npm run start`

3. Access app

#### Main page

Open a web browser and access http://localhost:3000/.

#### Specific pages (routing)

- You can access a realtor from URL with `http://localhost:3000/realtors/{REALTOR_ID}`. Example : http://localhost:3000/realtors/101

- You can access a realtor and a specific message with `http://localhost:3000/realtors/{REALTOR_ID}/messages/{MESSAGE_ID}`. Example : http://localhost:3000/realtors?/101/messages/10171



3. Run tests

##### `npm run test` (Tests)

## Structure 🧱

The sources are composed of multiple folders :

-   `__tests__` (Unit tests)
-   `app` (Root component of the app)
-   `components` (Folders of all components of the app)
-   `constants` (Constants of actions, api)
-   `redux` (Store, actions & reducers)
-   `utils` (Common functions & tools)

The project is composed of 3 main components :

- `Messages` (= list of messages of a realtor)
- `MessageDetails` (= the details for a specific message)
- `Header` (where you can change realtor))

Logic is separated from view.


## Styles 👁️

Graphic elements are managed with SASS preprocessor and SCSS. It is responsive for wide & small screens. The responsive style is applied for a screen width < 800px. Global variables and mixins are defined in the App.scss file.

![Responsive](https://user-images.githubusercontent.com/79903008/131255286-bdaef48d-fbb2-4a7c-9c66-cc1fa569d823.png)

I created a return button for going back to the messages list.


## Redux ⚛️

Redux is used to manage actions & data persistency.
There are 3 main reducers :

- user : contains realtors of the user
- realtor : contains details of the current selected realtor (the basic information and the related messages)
- message : contains data of the current selected message

![Reducers](https://user-images.githubusercontent.com/79903008/131255347-7cd08248-a2a6-4a4a-82e6-f7c2b7f54719.png)

## Routing strategy 🔀

I used [React Router](https://reactrouter.com/web/guides/quick-start). You can see below a simplified chart, including main components, actions and related urls. Urls changes during navigation are made with the <Link /> element when possible, either with history.push().
To differenciate a manual url change from an automatic change (user click), I compare the action type (push, replace or pop) of history and process my redux actions differently.
![RealtorsAppContainer](https://user-images.githubusercontent.com/79903008/131258248-3b074aa8-bb03-4b16-80d7-9b98ec86fb46.png)


## Unit & functional tests ✔️

Tests have been coded with Jest and are available in the `__tests__` folder.

Most of them are functional tests : dom content is analyzed after rendering components with different props and store data. 

As logic is in a 'container' component, that renders a unique display element, it it possible to test logic & view separately.

-   Logic : Test dom output using a mocked redux initial state (if needed)
-   View : Test dom output using different props value. Also, as callbacks are passed to the display element props, it is pretty easy to test if they're succesfully called after a user interaction.

Also, user actions can be simulated (e.g user click when opening a message). Some libraries/files are mocked to focus the tests on the behaviour of the component itself.

You will find also unit tests (isolated functions tests with different combinaisons of input parameters).


## Performances 📈

This project is made with webpack and babel. A web server is used for development, with hot reload and source maps.
Configuration files have been customized to optimize performances, including management of :

- polyfills (js & jsx)
- stylesheets, images, svg and other files loading/compression
- minification
- code splitting

## SEO, accessibility 🔍

I used specific html attributes and avoid to use divs as much as possible (e.g nav, section, p, button, and also rarer ones like data, time...).

I used Link components (which renders "a' elements) for routing.

Also, few attributes have been added to index.html, in order to take into account SEO.

## Good practices 📋

### Eslint

-   Rules are loaded from the .eslintrc configuration file.

### Formatting

-   Using [prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), automatically after every save (see .vscode/settings.json).

### Github

-   Auto lint fix before commit
-   Auto tests running before push (only allowed if all tests passed)
-   Common template for pull requests (.github/pull_request_template.md)
-   Commits messages standard : Using [commitizen](https://github.com/commitizen/cz-cli)


### React

-   Hooks
-   Logic separated from view

## Useful tools 🔧

### Web extensions

-   [React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
-   [Redux](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### VS Code extensions

Please see recommanded extensions in your extensions tab, loaded from .vscode/extensions.json

## API endpoints 
- Realtor list
  - `curl http://localhost:8080/realtors`

- Realtor details
  - `curl http://localhost:8080/realtors/101`

- Realtor messages list

  - `curl http://localhost:8080/realtors/101/messages`
  - `curl http://localhost:8080/realtors/101/messages?page=2`
  - `curl http://localhost:8080/realtors/101/messages?page=2&page_size=20`
  - `curl http://localhost:8080/realtors/101/messages?page=2&page_size=20&sort=date,desc`

- Single message details
  - `curl http://localhost:8080/realtors/101/messages/1001`
