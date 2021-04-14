# Covey.Town

Covey.Town provides a virtual meeting space where different groups of people can have simultaneous video calls, allowing participants to drift between different conversations, just like in real life.
Covey.Town was built for Northeastern's [Spring 2021 software engineering course](https://neu-se.github.io/CS4530-CS5500-Spring-2021/), and is designed to be reused across semesters.
You can view our reference deployment of the app at [app.covey.town](https://app.covey.town/).

![Covey.Town Architecture](docs/covey-town-architecture.png)

The figure above depicts the high-level architecture of Covey.Town.
The frontend client (in the `frontend` directory of this repository) uses the [PhaserJS Game Library](https://phaser.io) to create a 2D game interface, using tilemaps and sprites.
The frontend implements video chat using the [Twilio Programmable Video](https://www.twilio.com/docs/video) API, and that aspect of the interface relies heavily on [Twilio's React Starter App](https://github.com/twilio/twilio-video-app-react).

A backend service (in the `services/roomService` directory) implements the application logic: tracking which "towns" are available to be joined, and the state of each of those towns.

## Running this app locally

Running the application locally entails running both the backend service and a frontend.

### Setting up the backend

To run the backend, you will need a Twilio account. Twilio provides new accounts with $15 of credit, which is more than enough to get started.
To create an account and configure your local environment:

1. Go to [Twilio](https://www.twilio.com/) and create an account. You do not need to provide a credit card to create a trial account.
2. Create an API key and secret (select "API Keys" on the left under "Settings")
3. Create a `.env` file in the `services/roomService` directory, setting the values as follows:

| Config Value            | Description                               |
| ----------------------- | ----------------------------------------- |
| `TWILIO_ACCOUNT_SID`    | Visible on your twilio account dashboard. |
| `TWILIO_API_KEY_SID`    | The SID of the new API key you created.   |
| `TWILIO_API_KEY_SECRET` | The secret for the API key you created.   |
| `TWILIO_API_AUTH_TOKEN` | Visible on your twilio account dashboard. |

### Starting the backend

Once your backend is configured, you can start it by running `npm start` in the `services/roomService` directory (the first time you run it, you will also need to run `npm install`).
The backend will automatically restart if you change any of the files in the `services/roomService/src` directory.

### Configuring the frontend

Create a `.env` file in the `frontend` directory, with the line: `REACT_APP_TOWNS_SERVICE_URL=http://localhost:8081` (if you deploy the rooms/towns service to another location, put that location here instead)


### Running the frontend

In the `frontend` directory, run `npm start` (again, you'll need to run `npm install` the very first time). After several moments (or minutes, depending on the speed of your machine), a browser will open with the frontend running locally.
The frontend will automatically re-compile and reload in your browser if you change any files in the `frontend/src` directory.

## Additional features

Our new features provide the a user profile service, allowing user to sign up or log in with his/her account, and edit profile and view the profiles of the players in the same room. Providing a new way for users to express themselves.

You can view our reference deployment of the app with new features at [https://lucid-thompson-d73d99.netlify.app/].

![High-level-design](docs/High-level-design.png)

The figure above depicts the high-level architecture of our new features to Covey.Town.



The app with new features is currently deployed at `https://lucid-thompson-d73d99.netlify.app/`. The frontend git repository can be accessed at `https://github.com/libing-milly/covey.town`. No modification is made to the original backend in the `services/roomService` directory. Instead, we have our backend under `services/userService` directory. 
To deploy the app with the new feature, you will need a mongoDB account.

### Additional steps to set up the backend

1. To run the backend, you will need a MongoDB account. For your convinience, we have provided you an account below.

2. Create a `.env` file in the `services/userService` directory, setting the values as follows:

| Config Value            | Description                               |
| ----------------------- | ----------------------------------------- |
| `MONGO_USERNAME`    | Visible on your mongoDB account dashboard. |
| `MONGO_PASSWORD`    | Visible on your mongoDB account dashboard.   |
| `MONGO_URL` | Visible on your mongoDB databse by click on 'connect' button   |

for your convinience, we have provided you with an account:

MONGO_USERNAME=zhiyuan_luo

MONGO_PASSWORD=000000Lzy!

MONGO_URL=cluster0.wi0mo.mongodb.net/project?retryWrites=true&w=majority

### Starting the backend

Once your backend is configured, you can start it by running `npm start` in the `services/userService` directory (the first time you run it, you will also need to run `npm install`).

### Additional step to configure the frontend

Create a `.env` file in the `frontend` directory if you haven't done it already.

Modify your `.env` file to as follows:

`REACT_APP_TOWNS_SERVICE_URL=http://localhost:8081` (if you deploy the rooms/towns service to another location, put that location here instead)

`REACT_APP_PROFILE_API=http://localhost:3000/api/profiles` (if you deploy the rooms/user service to another location, put that location here instead and add `/api/profiles` at the end))

`REACT_APP_USER_API=http://localhost:3000/api/users` (if you deploy the rooms/user service to another location, put that location here instead and add `/api/users` at the end)

### Running the frontend

In the `frontend` directory, run `npm start` (again, you'll need to run `npm install` the very first time). After several moments (or minutes, depending on the speed of your machine), a browser will open with the frontend running locally.
The frontend will automatically re-compile and reload in your browser if you change any files in the `frontend/src` directory.


