import axios from 'axios';
/*
profiles: https://secure-anchorage-87188.herokuapp.com/api/profiles
router.post('/:uid/profile', controller.createProfileForUser);
router.get('/:uid/profile', controller.findProfileForUser);
router.get('/', controller.getAllProfiles);
router.get('/:pid', controller.getProfileById);
router.put('/:pid', controller.updateProfile);
router.delete('/:pid', controller.deleteProfile);


users: https://secure-anchorage-87188.herokuapp.com/api/users
router.get('/authorized', extractJWT, controller.validateToken);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/', controller.getAllUsers);
router.delete('/:uid', controller.deleteUser);
router.put('/resetpassword/:uid', extractJWT, controller.resetPassword);
router.post('/forgetpassword', controller.forgetPassword);
router.get('/:uid', controller.getUserById);
*/

const profileAPI = 'https://secure-anchorage-87188.herokuapp.com/api/profiles';
const userAPI = 'https://secure-anchorage-87188.herokuapp.com/api/users';




export default class ProfileService {
  private static myInstance : ProfileService;
  
  private currentUserId = '';

  private currentProfileId = '';

  private currentUserName = '';

  private isLoggedIn = false;

  static getInstance() : ProfileService {
    if (ProfileService.myInstance == null) {
      ProfileService.myInstance = new ProfileService();
    }
    return this.myInstance;
  }

  getUserName = () => this.currentUserName;

  setUserName = (userName : string) => {
    this.currentUserName = userName;
  }

  getLoginStatus = () => this.isLoggedIn;

  serLoginStatus = (loggedIn : boolean) => {
    this.isLoggedIn = loggedIn;
  }

  login = async (userEmail : string, userPassword : string) => {
    const res = await axios.post(`${userAPI}/login`, { email: userEmail, password: userPassword });
    this.currentUserId = res.data.user._id;
    console.log(res);
  };

  signUp = async (email : string, password : string, question1 : string, 
    answer1 : string, question2 : string, answer2 : string, question3 : string, answer3 : string) => {
    const res = await axios.post(`${userAPI}/register`, {
      email,
      password,
      question1,
      answer1,
      question2,
      answer2,
      question3,
      answer3,
    });
    this.currentUserId = res.data.user._id;
    await this.createProfile();
    return res;
  };

  createProfile = async () => {
    const res = await axios.post(`${profileAPI}/${this.currentUserId}/profile`, {
      username: 'default',
      imageUrl: 'default',
      selfIntro: 'default',
      roomId: 'default',
    });
    this.currentProfileId = res.data.profile._id;
  };

  getCurrentUserId = () => this.currentUserId;

  getCurrentUserProfile = async () => {
    const res = await axios.get(`${profileAPI}/${this.currentUserId}/profile`);
    this.currentProfileId = res.data._id;
    return res;
  };

  updateProfile = async (username: string, imageUrl: string, selfIntro: string) => {
    await axios.put(`${profileAPI}/${this.currentProfileId}`, 
    {username, imageUrl, selfIntro});
  };

  // also need to clear room id when user disconnect
  updateRoomId = async (roomId : string) => {
    if(this.isLoggedIn){
      await this.getCurrentUserProfile();
      await axios.put(`${profileAPI}/${this.currentProfileId}`, { roomId }); 
    }   
  };

  getProfiles = async() => {
    const res = await axios.get(profileAPI);
    return res;
    
  }

  logOut = () => {
    this.currentUserId = '';
    this.currentProfileId = '';
    this.currentUserName = '';
    this.isLoggedIn = false;
  };
}
