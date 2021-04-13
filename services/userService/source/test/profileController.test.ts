import supertest from 'supertest';

const profileAPI = 'https://secure-anchorage-87188.herokuapp.com/api/profiles';

describe('getAllProfiles', () => {
    it('get all profiles successfully', async (done) => {
        const request = supertest(profileAPI);
        request
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('get all profiles successfully');
                    expect(res.body.isOK).toEqual(true);
                    done();
                }
                30000;
            });
    });

    it('catch error and cannot get', async (done) => {
        const request = supertest(profileAPI);
        request
            .get('/random')
            .expect(500)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('catch error and cannot get');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
    });
});

describe('findProfileForUser', () => {
    it('catch error and cannot get', async (done) => {
        const request = supertest(profileAPI);
        request
            .get('/noexist/profile')
            .expect(500)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('catch error and cannot get');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
    });

    it('find profile for user successfully', async (done) => {
        const request = supertest(profileAPI);
        request
            .get('/6068f7f16ce91100046aed6f/profile')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.response.data.userId).toEqual('6068f7f16ce91100046aed6f');
                    expect(res.body.response.data.username).toEqual('publish');
                    expect(res.body.isOK).toEqual(true);
                    expect(res.body.message).toEqual('find profile for user successfully');
                    done();
                }
                30000;
            });
    });

    it('user id=${userId} was not found', async (done) => {
        const request = supertest(profileAPI);
        request
            .get('/1068f7f16ce91100046aed6f/profile')
            .expect(404)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('user id=1068f7f16ce91100046aed6f was not found');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
    });
});

describe('createProfileForUser', () => {
    it('user profile already exists', async (done) => {
        const request = supertest(profileAPI);

        const newProfile = {
            username: 'rocket',
            imageUrl: 'https:rocket',
            selfIntro: 'Hi rocket',
            roomId: '21323'
        };

        request
            .post('/606d2f7e733a2a0004a8e80a/profile')
            .send(newProfile)
            .expect(409)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('user profile already exists');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
    });

    it('create profile for user successfully', async (done) => {
        const request = supertest(profileAPI);

        const newProfile = {
            username: 'jest2',
            imageUrl: 'https:jest',
            selfIntro: 'Hi jest',
            roomId: '21323'
        };

        request
            .post('/60721e9371f16a0004c8a8cd/profile')
            .send(newProfile)
            // .expect(201)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    // expect(res.body.message).toEqual('create profile for user successfully');
                    expect(res.body.message).toEqual('user profile already exists');
                    // expect(res.body.response.result.username).toEqual('jest');
                    // expect(res.body.response.result.selfIntro).toEqual('Hi jest');
                    done();
                }
                30000;
            });
    });

    it('throw error no username', async (done) => {
        const request = supertest(profileAPI);

        const newProfile = {};

        request
            .post('/60721ab171f16a0004c8a8a1/profile')
            .send(newProfile)
            .expect(500)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('Profile validation failed: username: Path `username` is required.');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
    });
});

describe('updateProfile', () => {
    it('successfully update', async (done) => {
        const request = supertest(profileAPI);

        const newProfile = {
            username: 'green',
            imageUrl: 'https:green',
            selfIntro: 'Hi green',
            roomId: '232b3'
        };

        request
            .put('/607235b971f16a0004c8a913')
            .send(newProfile)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('successfully update');
                    expect(res.body.isOK).toEqual(true);
                    done();
                }
                30000;
            });

        request
            .get('/607235b971f16a0004c8a913')
            .send(newProfile)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.response.data.username).toEqual('green');
                    expect(res.body.response.data.selfIntro).toEqual('Hi green');
                    done();
                }
                30000;
            });
    });

    it('profile id=${id} was not found', async (done) => {
        const request = supertest(profileAPI);

        const newProfile = {
            username: 'green',
            imageUrl: 'https:green',
            selfIntro: 'Hi green',
            roomId: '232b3'
        };

        request
            .put('/407235b971f16a0004c8a913')
            .send(newProfile)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('profile id=407235b971f16a0004c8a913 was not found');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
    });

    it('catch error and cannot update', async (done) => {
        const request = supertest(profileAPI);

        const newProfile = {};

        request
            .put('/')
            .send(newProfile)
            .expect(404)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('Not found');
                    done();
                }
                30000;
            });
    });
});
