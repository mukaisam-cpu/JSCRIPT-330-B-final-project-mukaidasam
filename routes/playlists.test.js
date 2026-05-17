describe('/playlists', () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    describe('Before login', () => {
        describe('GET /', () => {

        });

        describe('POST /', () => {

        });
    })

    describe('After login', () => {
        describe('GET /', () => {
            it('should return all playlists for the current user', async () => {

            });
        });

        describe('GET /:id', () => {
            it('should return the specified playlist if it was created by the user', async () => {

            });

            it('should return an error if the playlist does not belong to the user', async () => {

            });
            // Admin authorization to view all playlists, perhaps?
        });

        describe('PUT /', () => {
            it('should save the selected playlist', async () => {

            });
        });

        describe('DELETE /:id', () => {
            it('should delete the selected playlist', async () => {

            });
        })
    })
})