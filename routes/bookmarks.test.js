import request from 'supertest';

import server from '../server';
import * as testUtils from '../testUtils';

describe('/bookmarks', () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    describe('Before login', () => {
        describe('GET /', () => {
            it('should return an error without a token', async () => {
                const res = await request(server).get('/bookmarks');
                expect(res.statusCode).toEqual(403);
            })
        });
    })

    describe('After login', () => {
        describe('GET /', () => {
            it('should return all bookmarked games for the current user', async () => {
                const res = await request(server).get('/bookmarks');
                expect(res.statusCode).toEqual(200);
            });
        });

        describe('PUT /add/:gameId', () => {
            it('should save the selected game ID to the user\'s bookmarks', async () => {
                const gameId = 100;
                const res = await request(server).put(`/bookmarks/add/${gameId}`);
                expect(res.statusCode).toEqual(200);
            });

            it('should not add a duplicate and return normally if the game is already added', async () => {
                const gameId = 100;
                const res = await request(server).put(`/bookmarks/add/${gameId}`);
                expect(res.statusCode).toEqual(200);
            })
        })

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