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
                return;
            })
        });
    })

    describe('After login', () => {
        describe('GET /', () => {
            it('should return all bookmarked games for the current user', async () => {
                return;
            });
        });

        describe('PUT /:gameid/add', () => {
            it('should save the selected game ID to the user\'s bookmarks', async () => {
                return;
            });

            it('should not add a duplicate and return normally if the game is already added', async () => {
                return;
            })
        })

        describe('PUT /:gameid/remove', () => {
            it('should remove the selected game ID from the user\'s bookmarks', async () => {
                return;
            })

            it('should return normally if the game does not exist in the user\'s bookmarks', async () => {
                return;
            })
        });

    })
})