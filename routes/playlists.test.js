import request from 'supertest';

import server from '../server';
import * as testUtils from '../testUtils';
import models from '../models';

describe('/playlists', () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    const testPlaylists = [
        {
            name: "test1",
            games: [1, 2, 3]
        },
        {
            name: "test2",
            games: [4, 5, 6]
        }, {
            name: "test3",
            games: [7, 8, 9]
        }
    ]

    describe('Before login', () => {
        describe('GET /', () => {
            it('should return an error without a token', async () => {
                const res = await request(server).get('/playlists');
                expect(res.statusCode).toEqual(401);
            })
        });

        describe('GET /:id', () => {
            it('should return an error without a token', async () => {
                const res = await request(server).get('/playlists/1');
                expect(res.statusCode).toEqual(401);
            })
        });

        describe('POST /', () => {
            it('should return an error without a token', async () => {
                const res = await request(server).post('/playlists');
                expect(res.statusCode).toEqual(401);
            })
        });

        describe('DELETE /:id', () => {
            it('should return an error without a token', async () => {
                const res = await request(server).delete('/playlists/1');
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

        describe('POST /', () => {
            it('should save the selected playlist', async () => {

                const res = await request(server).post(`/playlists`)
                    .set('Authorization', `Bearer ${token0}`)
                    .send({ ...testPlaylists[0] });

                const newPlaylist = await models.Playlist.findOne({ name: testPlaylists[0].name })
                expect(newPlaylist.name).toEqual(testPlaylists[0].name);
                expect(newPlaylist.games).toEqual(testPlaylists[0].games);
            });

            it('should return the ID in the response', async () => {
                const res = await request(server).post(`/playlists`)
                    .set('Authorization', `Bearer ${token0}`)
                    .send({ ...testPlaylists[0] });
                expect(res._body._id).toBeDefined();
            });
        });

        describe('GET /', () => {
            it('should return all playlists for the current user', async () => {
                for (let i = 0; i < testPlaylists.length; i++) {
                    const postRes = await request(server).post(`/playlists`)
                        .set('Authorization', `Bearer ${token0}`)
                        .send({ ...testPlaylists[i] });
                }

                const getRes = await request(server).get(`/playlists`)
                    .set('Authorization', `Bearer ${token0}`);
                const resBody = getRes._body;
                for (let i = 0; i < testPlaylists.length; i++) {
                    expect(testPlaylists[i].name).toEqual(resBody[i].name);
                    expect(testPlaylists[i].games).toEqual(resBody[i].games);
                }
            });

            it('Should not return playlists created by other users', async () => {
                const postRes1 = await request(server).post(`/playlists`)
                    .set('Authorization', `Bearer ${token0}`)
                    .send({ ...testPlaylists[0] });
                const postRes2 = await request(server).post(`/playlists`)
                    .set('Authorization', `Bearer ${token1}`)
                    .send({ ...testPlaylists[1] });
                const getRes = await request(server).get(`/playlists`)
                    .set('Authorization', `Bearer ${token0}`);
                expect(getRes._body.length).toEqual(1);
            })
        });

        describe('GET /:id', () => {
            it('should return the specified playlist if it was created by the user', async () => {
                const postRes = await request(server).post(`/playlists`)
                    .set('Authorization', `Bearer ${token0}`)
                    .send({ ...testPlaylists[0] });

                const savedPlaylistId = postRes._body._id;
                const getRes = await request(server).get(`/playlists/${savedPlaylistId}`)
                    .set('Authorization', `Bearer ${token0}`)

                expect(testPlaylists[0].name).toEqual(getRes._body.name);
                expect(testPlaylists[0].games).toEqual(getRes._body.games);
            });

            it('should return an error if the playlist does not belong to the user', async () => {
                const postRes1 = await request(server).post(`/playlists`)
                    .set('Authorization', `Bearer ${token0}`)
                    .send({ ...testPlaylists[0] });
                const postRes2 = await request(server).post(`/playlists`)
                    .set('Authorization', `Bearer ${token1}`)
                    .send({ ...testPlaylists[1] });

                const savedPlaylistId = postRes2._body._id;
                const getRes = await request(server).get(`/playlists/${savedPlaylistId}`)
                    .set('Authorization', `Bearer ${token0}`)
                expect(getRes.status).toEqual(404);
            });
        });

        describe('DELETE /:id', () => {
            it('should delete the selected playlist and return 200', async () => {
                const postRes = await request(server).post(`/playlists`)
                    .set('Authorization', `Bearer ${token0}`)
                    .send({ ...testPlaylists[0] });
                const deleteRes = await request(server).delete(`/playlists/${postRes._body._id}`)
                    .set('Authorization', `Bearer ${token0}`);

                const playlistThatShouldNotExist = await models.Playlist.findById(postRes._body._id);
                expect(playlistThatShouldNotExist).toEqual(null);
            });

            it('should not delete playlists for other users', async () => {
                const postRes1 = await request(server).post(`/playlists`)
                    .set('Authorization', `Bearer ${token0}`)
                    .send({ ...testPlaylists[0] });
                const postRes2 = await request(server).post(`/playlists`)
                    .set('Authorization', `Bearer ${token1}`)
                    .send({ ...testPlaylists[1] });

                const savedPlaylistId = postRes2._body._id;
                const deleteRes = await request(server).delete(`/playlists/${savedPlaylistId}`)
                    .set('Authorization', `Bearer ${token0}`)
                expect(deleteRes.status).toEqual(404);
            })
        })
    })
})