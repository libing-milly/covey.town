import axios, { AxiosResponse } from 'axios';
import assert from 'assert';

/**
 * defaults to the URL at the environmental variable PROFILE_API and USER_API, 
 * or otherwise to the specified url.
 */
const profileAPI = process.env.PROFILE_API || 'https://secure-anchorage-87188.herokuapp.com/api/profiles';
const userAPI = process.env.USER_API || 'https://secure-anchorage-87188.herokuapp.com/api/users';


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
 * Response from server for getting all profiles
 */
export interface GetAllProfilesResponse {
  profiles: [],
  count: string
}
/**
 * Response from server for get profile by user
 */
export interface GetProfileByUserResponse {
  data : ProfileResponse
}

/**
 * Response from server for profile
 */
export interface ProfileResponse {
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

/**
 * A singleton client profile service class. 
 */
export default class ProfileService {
  private static myInstance : ProfileService;
  
  private currentUserId = '';

  private currentProfileId = '';

  private currentUserName = '';

  private isLoggedIn = false;

  /**
   * Construct a new Towns Service API client. Specify a serviceURL for testing, or otherwise
   * defaults to the URL at the environmental variable REACT_APP_ROOMS_SERVICE_URL
   * @param serviceURL
   */
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
  
  /**
   * verify the email and password pair with server, set log in status to true and update current user information
   * @param userName inputted by the user from log in window
   * @param userEmail inputted by the user from log in window
   * @param userPassword inputted by the user from log in window
   */
  async login (userName : string, userEmail : string, userPassword : string) : Promise<number> {
    const res = await axios.post(`${userAPI}/login`, { email: userEmail, password: userPassword });
    this.currentUserId = res.data.response.user._id;
    this.setUserName(userName);
    this.setLoginStatus(true);
    await this.getCurrentUserProfile();
    return res.status;
  };

  /**
   * post a new user to the server, create a default profile for the user, and update current state as logged in
   * @param userName input by the user from sign up window
   * @param email input by the user from sign up window
   * @param password input by the user from sign up window
   * @param question1 input by the user from sign up window
   * @param answer1 input by the user from sign up window
   * @param question2 input by the user from sign up window
   * @param answer2 input by the user from sign up window
   * @param question3 input by the user from sign up window
   * @param answer3 input by the user from sign up window
   */
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

  /**
   * get all the profiles from server
   */
  async getProfiles () : Promise<GetAllProfilesResponse> {
    const res = await axios.get(profileAPI);
    this.isLoggedIn = true;
    return ProfileService.unWrapOrThrowError(res);
  }

  /**
   * get the profile of the current user from server
   */
  async getCurrentUserProfile () : Promise<GetProfileByUserResponse> {
    const res = await axios.get(`${profileAPI}/${this.currentUserId}/profile`);
    this.currentProfileId = res.data.response.data._id;
    return ProfileService.unWrapOrThrowError(res);
  };

  /**
   * cerate a new profile with user inputted username default profile image.
   */
  async createProfile () : Promise<void> {
    await axios.post(`${profileAPI}/${this.currentUserId}/profile`, {
      username: this.currentUserName,
      imageUrl: 'https://avatarfiles.alphacoders.com/125/125254.png',
      selfIntro: '',
      roomId: '',
    });
    
  }; 


  getCurrentUserId () : string { return this.currentUserId; }

  
  /**
   * update the profile of current user
   * @param username the new username as inputted from edit profile window
   * @param imageUrl the new profile image as chosen from edit profile window
   * @param selfIntro the new self introduction as inputted from edit profile window
   */
  async updateProfile (username: string, imageUrl: string, selfIntro: string) : Promise<void> {
    await axios.put(`${profileAPI}/${this.currentProfileId}`, 
    {username, imageUrl, selfIntro});
  };

  /**
   * upate the room id stored in the player's profile, called when player join or leave a room
   * @param roomId the roomId of the room that the player just joined
   */

  async updateRoomId (roomId : string) : Promise<void> {
    if(this.isLoggedIn){
      await this.getCurrentUserProfile();
      await axios.put(`${profileAPI}/${this.currentProfileId}`, { roomId }); 
    }   
  };

  
  /**
   * set log in status to false and clear current user information
   */
  logOut () : void {
    this.currentUserId = '';
    this.currentProfileId = '';
    this.currentUserName = '';
    this.isLoggedIn = false;
  };
}
