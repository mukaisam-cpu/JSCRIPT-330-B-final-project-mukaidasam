import request from 'supertest';

import server from '../server';
import * as testUtils from '../testUtils';

describe('/auth', () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    describe('before signup', () => {
        describe('POST /', () => {
            it('should return 401 without token', () => {
                const res = await request(server).get('/auth/');
                expect(res.statusCode).toEqual(401);
            })
        });

        describe('PUT /password', () => {
            it('should return 401 without token', () => {
                const res = await request(server).get('/auth/');
                expect(res.statusCode).toEqual(401);
            })
        });

        describe('POST /logout', () => {
            it('should return 401 without token', () => {
                const res = await request(server).get('/auth/');
                expect(res.statusCode).toEqual(401);
            })
        })
    });

    // describe('after signup', () => {
    //     describe('POST /signup', () => {
            
    //     })
    // })

    // TODO: Tests involving user data go here
});