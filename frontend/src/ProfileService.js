import axios from 'axios';

/*
profiles: https://secure-anchorage-87188.herokuapp.com/api/profiles
router.post('/:id', controller.createProfile);
router.get('/', controller.getAllProfiles);
router.get('/:id', controller.getProfileById);
router.put('/:id', controller.updateProfile);
router.delete('/:id', controller.deleteProfile);


users: https://secure-anchorage-87188.herokuapp.com/api/users
router.get('/authorized', extractJWT, controller.validateToken);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/', controller.getAllUsers);
router.delete('/:id', controller.deleteUser);
router.put('/resetpassword/:id', extractJWT, controller.resetPassword);
router.post('/forgetpassword', controller.forgetPassword);
*/

const profileAPI = process.env.PROFILE_API;
const userAPI = process.env.USER_API;

export default class ProfileService {
  static myInstance = null;

  static currentUserId = null;

  static getInstance() {
    if (ProfileService.myInstance == null) {
      ProfileService.myInstance = new ProfileService();
    }
    return this.myInstance;
  }

  login = async (userEmail, userPassword) => {
    const res = await axios.post(`${userAPI}/login`, { email: userEmail, password: userPassword });
    this.currentUserId = res.data.user._id;
    return res;
  };

  signUp = async (email, password, question1, answer1, question2, answer2, question3, answer3) => {
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
    this.createProfile();
    return res;
  };

  createProfile = async () => {
    await axios.post(`${profileAPI}/${this.currentUserId}`, {
      username: '',
      imageUrl: '',
      selfIntro: '',
      roomId: '',
    });
  };

  getCurrentUserId = () => this.currentUserId;

  getCurrentUserProfile = async () => {
    const res = await axios.get(`${profileAPI}/${this.currentUserId}`);
    return res;
  };

  updateProfile = async newProfile => {
    await axios.put(`${profileAPI}/${this.currentUserId}`, newProfile);
  };

  updateRoomId = async roomId => {
    await axios.put(`${profileAPI}/${this.currentUserId}`, { roomId });
  };

  logOut = () => {
    this.currentUserId = null;
  };
}
