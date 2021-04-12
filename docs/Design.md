### Changes on the existing codebase

The change we made on the existing codebase is that we add entries to sign up, login, logout and profile in the TownSelection.tsx, so that the user will be able to sign up, login and log out in the Main page, also after login and select a town to join, he/she will be able to see and change his profile, as well as see other user's profile within the same town.


### New code structure

For the new code, we use Microservice architecture pattern. We add an independent user service. The user service will communicate with the database. All the user information will be stored in a User DB.

Our architecure based on the original one.
![Our Covey.Town Architecture](docs/OurArchitectureForCoveyTown.png)