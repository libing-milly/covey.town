## Features of this project
### Front-end Features
### Sign up
When the user click the `Sign up` button, he/she will see a pop up window which has a close button `X` on its top right corner.

The user will be able register his/her own account in this page. The page consists of two parts. In the first part, user need to input their `username`, `Email address` and `Password` to set up their account.
All three fields are required. A `show` button in the right side of the password input box is provided for user to check what they just typed in.
The second part is verification part. It contains three questions as well as answers for user to type in, which will be used to find back account if user forgot their passowrd. All these fields are required too.

After filling all input boxes, the user can click `Sign Up` button to register their account. There will be a pop up message says that `Sign Up Successfully! You have been logged in` 
if nothing goes wrong with the registration procedure, and the user will be logged in automatically. On the contrary, if something goes wrong, there will also be a pop up message says that `Unable to SignUp Your Account` together with other error message to tell you where goes wrong.

The user can also click `Cancel` button to quit.

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

### Back-end features
1. Added MongoDB to store the user account information and the profile information belongs to the user.
2. Implemented a user service as a middle man to connect the front-end with the database
