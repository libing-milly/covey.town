import axios, { AxiosResponse } from 'axios';
import assert from 'assert';

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



/**
 * Response from server for signing up
 */
export interface SignUpResponse {
  _id: string,
  email: string,
  password: string,
  question1: string,
  answer1: string,
  question2: string,
  answer2: string,
  question3: string,
  answer3: string
}


/**
 * Response from server for logging in
 */
export interface GetAllProfilesResponse {
  profiles: [],
  count: string
}

/**
 * Response from server for get profile by user
 */
export interface GetProfileByUserResponse {
  _id: string,
  userId : string,
  username : string,
  imageUrl : string,
  selfIntro : string,
  roomId : string
}

/**
 * Envelope that wraps any response from the server
 */
export interface ResponseEnvelope<T> {
  isOK: boolean;
  message?: string;
  response?: T;
}



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

  static unWrapOrThrowError<T>(response: AxiosResponse<ResponseEnvelope<T>>): T {
    if (response.data.isOK) {
      assert(response.data.response);
      return response.data.response;
    } 
    
    throw new Error(`Error processing request: ${response.data.message}`);
    
    
  }

  getUserName () : string { return this.currentUserName;}

  setUserName (userName : string) : void {
    this.currentUserName = userName;
  }

  getLoginStatus () : boolean { return this.isLoggedIn; }

  setLoginStatus (loggedIn : boolean) : void {
    this.isLoggedIn = loggedIn;
  }

  async login (userName : string, userEmail : string, userPassword : string) : Promise<number> {
    const res = await axios.post(`${userAPI}/login`, { email: userEmail, password: userPassword });
    this.currentUserId = res.data.response.user._id;
    this.setUserName(userName);
    this.setLoginStatus(true);
    await this.getCurrentUserProfile();
    return res.status;
  };

  async signUp (userName: string, email : string, password : string, 
    question1 : string, answer1 : string, 
    question2 : string, answer2 : string, 
    question3 : string, answer3 : string) : Promise<void> {
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
    this.currentUserId = res.data.response.user._id;
    this.currentUserName = userName;
    await this.createProfile();
    this.setLoginStatus(true);
    await this.getCurrentUserProfile();
  };

  async getProfiles () : Promise<GetAllProfilesResponse> {
    const res = await axios.get(profileAPI);
    this.isLoggedIn = true;
    return ProfileService.unWrapOrThrowError(res);
  }

  async getCurrentUserProfile () : Promise<GetProfileByUserResponse> {
    const res = await axios.get(`${profileAPI}/${this.currentUserId}/profile`);
    this.currentProfileId = res.data.response.data._id;
    return ProfileService.unWrapOrThrowError(res);
  };

  async createProfile () : Promise<void> {
    await axios.post(`${profileAPI}/${this.currentUserId}/profile`, {
      username: this.currentUserName,
      imageUrl: 'choose a profile picture',
      selfIntro: 'enter your self introduction',
      roomId: '',
    });
    
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
