import request from 'supertest';

import server from '../server';
import * as testUtils from '../testUtils';

import models from '../models';

describe('/bookmarks', () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    describe('Before login', () => {
        describe('GET /', () => {
            it('should return an error without a token', async () => {
                const res = await request(server).get('/bookmarks');
                expect(res.statusCode).toEqual(401);
            })
        });

        describe('PUT /:id/add', () => {
            it('should return an error without a token', async () => {
                const res = await request(server).put('/bookmarks/12345/add');
                expect(res.statusCode).toEqual(401);
            })
        });

        describe('PUT /:id/remove', () => {
            it('should return an error without a token', async () => {
                const res = await request(server).put('/bookmarks/12345/remove');
                expect(res.statusCode).toEqual(401);
            })
        });
    })

    describe('After login', () => {
        const user0 = {
            email: 'user0@mail.com',
            password: 'password1',
            bookmarks: [1, 2, 3]
        };
        const user1 = {
            email: 'user1@mail.com',
            password: 'password2',
            bookmarks: [4, 5, 6]
        };
        let token0;
        let token1;

        beforeEach(async () => {
            await request(server).post('/auth/signup').send(user0);
            const res0 = await request(server).post('/auth/login').send(user0);
            token0 = res0.body.token;
            await request(server).post('/auth/signup').send(user1);
            const res1 = await request(server).post('/auth/login').send(user1);
            token1 = res1.body.token;
        });

        describe('PUT /add/:gameId', () => {
            it('should save the selected game ID to the user\'s bookmarks', async () => {
                const gameId = 100;
                const res = await request(server).put(`/bookmarks/${gameId}/add`)
                .set('Authorization', `Bearer ${token0}`);

                const user = await models.User.findOne({email: user0.email});
                expect(user.bookmarks).toEqual(["100"]);
            });

            it('should not add a duplicate and return normally if the game is already added', async () => {
                const gameId = 100;
                const res1 = await request(server).put(`/bookmarks/${gameId}/add`)
                .set('Authorization', `Bearer ${token0}`);
                const res2 = await request(server).put(`/bookmarks/${gameId}/add`)
                .set('Authorization', `Bearer ${token0}`);
                const user = await models.User.findOne({email: user0.email});
                expect(user.bookmarks).toEqual(["100"]);
            })
        })

        describe('GET /', () => {
            // TODO: Better validation, might change data returns later
            it('should return all bookmarked games for the current user', async () => {
                const res = await request(server).get('/bookmarks')
                .set('Authorization', `Bearer ${token0}`);
                expect(res.body).toEqual(user0.bookmarks)
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('PUT /:gameid/remove', () => {
            it('should remove the selected game ID from the user\'s bookmarks', async () => {
                const gameId = 100;
                const res = await request(server).put(`/bookmarks/remove/${gameId}`);
                expect(res.statusCode).toEqual(200);
            })

            it('should return normally if the game does not exist in the user\'s bookmarks', async () => {
                const gameId = 100;
                const res = await request(server).put(`/bookmarks/remove/${gameId}`);
                expect(res.statusCode).toEqual(200);
            })
        });

    })
})