import request from 'supertest';
import jwt from 'jsonwebtoken';

import server from '../server';
import * as testUtils from '../testUtils';

import models from '../models';

describe('/auth', () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    const user0 = {
        email: 'user0@mail.com',
        password: 'password1',
    };
    const user1 = {
        email: 'user1@mail.com',
        password: 'password2',
    };

    describe('before signup', () => {
        describe('POST /login', () => {
            it('should return 401 without token', async () => {
                const res = await request(server).post('/auth/login').send(user0);
                expect(res.statusCode).toEqual(401);
            });
        });

        describe('POST /logout', () => {
            it('should return 401 without token', async () => {
                const res = await request(server).post('/auth/logout').send(user0);
                expect(res.statusCode).toEqual(401);
            });
        })

        describe('POST /signup', () => {
            it('Should return 400 without a password', async () => {
                const res = await request(server).post('/auth/signup').send({
                    email: "user@email.com"
                });
                expect(res.statusCode).toEqual(400);
            });

            it('Should return 400 with empty password', async () => {
                const res = await request(server).post('/auth/signup').send({
                    email: "user@email.com",
                    password: "",
                });
                expect(res.statusCode).toEqual(400);
            });

            it('Should return 409 Conflict with repeat signup', async () => {
                let res = await request(server).post('/auth/signup').send(user0);
                expect(res.statusCode).toEqual(200);
                res = await request(server).post('/auth/signup').send(user0);
                expect(res.statusCode).toEqual(409);
            });

            it('Should return 200 on account creation', async () => {
                const res = await request(server).post('/auth/signup').send(user0);
                expect(res.statusCode).toEqual(200);
            });

            it('Should encrypt the password', async () => {
                await request(server).post('/auth/signup').send(user0);
                const users = await models.User.find().lean();
                users.forEach((user) => {
                    expect(Object.values(user)).not.toContain(user0.password);
                });
            });
        })
    });

    describe('after signup', () => {
        beforeEach(async () => {
            const signup = await request(server).post('/auth/signup').send(user0);
        });

        describe('POST /login', () => {
            it("should return 400 when password isn't provided", async () => {
                const res = await request(server).post('/auth/login').send({
                    email: user0.email,
                });
                expect(res.statusCode).toEqual(400);
            });

            it("should return 401 when password doesn't match", async () => {
                const res = await request(server).post('/auth/login').send({
                    email: user0.email,
                    password: 'wrong',
                });
                expect(res.statusCode).toEqual(401);
            });

            it('should return 200 and a token when password matches', async () => {
                const res = await request(server).post('/auth/login').send(user0);
                expect(res.statusCode).toEqual(200);
                expect(typeof res.body.token).toEqual('string');
            });

            it('should return a JWT with user email and id, but not password', async () => {
                const res = await request(server).post('/auth/login').send(user0);
                const { token } = res.body;
                const decodedToken = jwt.decode(token);
                expect(decodedToken.email).toEqual(user0.email);
                expect(decodedToken._id).toMatch(
                    /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i,
                ); // mongo _id regex
                expect(decodedToken.password).toBeUndefined();
            });
        });

        describe('POST /logout', () => {
            let token;
            beforeEach(async () => {
                const login = await request(server).post('/auth/login').send(user0);
                token = login.body.token;
                console.log(token);
            })
            it('should reject bogus token', async () => {
                const res = await request(server)
                    .post('/auth/logout')
                    .set('Authorization', 'Bearer BAD')
                    .send();

                expect(res.statusCode).toEqual(401);
            });

            it("should delete the user's token", async () => {
                const res = await request(server)
                    .post('/auth/logout')
                    .set('Authorization', `Bearer ${token}`)
                    .send();
                const matchingToken = await models.Token.findOne({uuid: token});
                expect(matchingToken).toEqual(null);
            })
        });
    });
});