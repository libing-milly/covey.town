## Features of this project

### Sign up


### Log in
When the user click the `Login` button, he/she will see a pop up window, he/she can also click `X` button on the top right corner of the window to close the pop up window.

The user will be able to login to the application by using the email and the password he/she used to sign up, a username is also required when logining. 

If the user entered correct email with the correct password, as well as a username, click the `Login` button, the user will be able to login into the application with successfull message, `You have logged in`.
The headline above the Login button will be changed to `Welcome xxx, you have logged in`.
Otherwise, an error message will popped up and tell the user that he/she needs to input a correct email or password to log in to the application. 
If the user fogot to enter either the email addree or the password, error message will pop up accordingly.

The user can also cancel the login process by clicking the `Cancel` button when the login button is still loading. 


### Log out

If a user is not logged in, this feature will be disabled.

If a user is already logged in, the user can log out by clicking on the `logout` button. A toast message will show once the user is successfully logout. 
The header above the `logout` button will then chang to `Play with a profile?`. And the `login` and `sign up` button will become available again.

### Edit profile

If a user is not logged in, this feature will be disabled.

If a user is logged in and joined a room, the user can edit profile by clicking on the `Edit Profile` button on the bottom right of the menu bar.
After clicking on the `Edit Profile` button, a profile window will pop up containing the current user profile image, username and self intro. 

To update profile image, user can choose the 3 profile image options provided from the drop down menu.

To update user name or self intro, user can directly input the new user name and self intro to the text input area.

After new profile information is inputted, click `update` button and user will receive a toast message about whether the update is successful or not. 

### View other players' profiles

If a user is not logged in, this feature will be disabled.

User can view the profiles of other logged in players in the same room by clicking on the `Players Profile` button on the bottom right of the menu bar.
A side bar will show on the right of the window with a list of username. User can view other players' profiles by clicking on the username. 
