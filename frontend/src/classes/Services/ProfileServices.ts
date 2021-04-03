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

/*

type ResponseType = {
  res: AxiosResponse<string>
}
*/



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

  getUserName () : string { return this.currentUserName;}

  setUserName (userName : string) : void {
    this.currentUserName = userName;
  }

  getLoginStatus () : boolean { return this.isLoggedIn; }

  setLoginStatus (loggedIn : boolean) : void {
    this.isLoggedIn = loggedIn;
  }

  async login (userName : string, userEmail : string, userPassword : string) : Promise<void> {
    const res = await axios.post(`${userAPI}/login`, { email: userEmail, password: userPassword });
    this.currentUserId = res.data.user._id;
    this.setUserName(userName);
    this.setLoginStatus(true);
  };

  // need a return type
  signUp = async(userName: string, email : string, password : string, 
    question1 : string, answer1 : string, 
    question2 : string, answer2 : string, 
    question3 : string, answer3 : string) => {
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
    await this.login(userName, email, password);
    await this.createProfile();
    // console.log('sign up: ' , typeof(res));
    return res;
  };

  // need a return type
  getProfiles = async() => {
    const res = await axios.get(profileAPI);
    this.isLoggedIn = true;
    // console.log('get prof: ' , typeof(res));

    return res;
  }

  // need a return type
  getCurrentUserProfile = async() => {
    const res = await axios.get(`${profileAPI}/${this.currentUserId}/profile`);
    this.currentProfileId = res.data._id;
    // console.log('get cur: ' , typeof res);

    return res;
  };

  async createProfile () : Promise<void> {
    const res = await axios.post(`${profileAPI}/${this.currentUserId}/profile`, {
      username: this.currentUserName,
      imageUrl: 'choose a profile picture',
      selfIntro: 'enter your self introduction',
      roomId: '',
    });
    this.currentProfileId = res.data.profile._id;
  };

  

  getCurrentUserId () : string { return this.currentUserId; }

  

  async updateProfile (username: string, imageUrl: string, selfIntro: string) : Promise<void> {
    await axios.put(`${profileAPI}/${this.currentProfileId}`, 
    {username, imageUrl, selfIntro});
  };

  // also need to clear room id when user disconnect
  async updateRoomId (roomId : string) : Promise<void> {
    if(this.isLoggedIn){
      await this.getCurrentUserProfile();
      await axios.put(`${profileAPI}/${this.currentProfileId}`, { roomId }); 
    }   
  };

  

  logOut () : void {
    this.currentUserId = '';
    this.currentProfileId = '';
    this.currentUserName = '';
    this.isLoggedIn = false;
  };
}
