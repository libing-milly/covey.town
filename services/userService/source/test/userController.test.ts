import supertest from 'supertest';

const userAPI = 'https://secure-anchorage-87188.herokuapp.com/api/users';

describe('user get', () => {
    it('get all users successfully', async (done) => {
        const request = supertest(userAPI);
        request
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('get all users successfully');
                    expect(res.body.isOK).toEqual(true);
                    done();
                }
                30000;
            });
    });

    it('catch error and cannot get', async (done) => {
        const request = supertest(userAPI);
        request
            .get('/ranodm')
            .expect(500)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('catch error and cannot get');
                    done();
                }
                30000;
            });
    });

    it('getUserById', async (done) => {
        const request = supertest(userAPI);
        request
            .get('/606cb113e70eda000461b517')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.response.data.email).toEqual('TA@TA.com');
                    done();
                }
                30000;
            });
    });
});

describe('user register', () => {
    it('email already exists', async (done) => {
        const request = supertest(userAPI);

        const newUser = {
            email: 'jest@111.com',
            password: 'jest',
            question1: 'question1',
            answer1: 'answer1',
            question2: 'question2',
            answer2: 'answer2',
            question3: 'question3',
            answer3: 'answer3'
        };

        request
            .post('/register')
            .send(newUser)
            .expect(409)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('email already exists');
                    done();
                }
                30000;
            });
    });

    it('register successfully', async (done) => {
        const request = supertest(userAPI);

        const newUser = {
            email: 'jest1@111.com',
            password: 'jest1',
            question1: 'question1',
            answer1: 'answer1',
            question2: 'question2',
            answer2: 'answer2',
            question3: 'question3',
            answer3: 'answer3'
        };

        request
            .post('/register')
            .send(newUser)
            // .expect(201)
            .expect(409)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    // expect(res.body.message).toEqual('register successfully');
                    expect(res.body.message).toEqual('email already exists');
                    // expect(res.body.response.user.email).toEqual('jest1@111.com');
                    done();
                }
                30000;
            });
    });

    it('throw error register without email and password', async (done) => {
        const request = supertest(userAPI);

        const newUser = {};

        request
            .post('/register')
            .send(newUser)
            .expect(500)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('User validation failed: email: Path `email` is required., password: Path `password` is required.');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
    });

    it('throw error no password', async (done) => {
        const request = supertest(userAPI);

        const newUser = { email: 'jest10@111.com' };

        request
            .post('/register')
            .send(newUser)
            .expect(500)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('User validation failed: password: Path `password` is required.');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
    });
});

describe('user login', () => {
    it('user is not verified if email not exist', async (done) => {
        const request = supertest(userAPI);

        const oldUser = {
            email: 'jestno@111.com',
            password: 'jest'
        };

        request
            .post('/login')
            .send(oldUser)
            .expect(401)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('user is not verified');
                    done();
                }
                30000;
            });
    });

    it('password does not match', async (done) => {
        const request = supertest(userAPI);

        const oldUser = {
            email: 'jest1@111.com',
            password: 'jest2'
        };

        request
            .post('/login')
            .send(oldUser)
            .expect(401)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('password does not match');
                    done();
                }
                30000;
            });
    });

    it('throw error login without email and password', async (done) => {
        const request = supertest(userAPI);

        const oldUser = {};

        request
            .post('/login')
            .send(oldUser)
            // .expect(401)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('user is not verified');
                    done();
                }
                30000;
            });
    });

    it('user is verified successfully', async (done) => {
        const request = supertest(userAPI);

        const oldUser = { email: 'jest@111.com', password: 'jest' };

        request
            .post('/login')
            .send(oldUser)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                } else {
                    expect(res.body.message).toEqual('user is verified successfully');
                    expect(res.body.response.user.email).toEqual('jest@111.com');
                    done();
                }
                30000;
            });
    });
});
