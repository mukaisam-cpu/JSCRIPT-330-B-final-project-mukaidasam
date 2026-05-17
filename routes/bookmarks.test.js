describe('/bookmarks', () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    describe ('Before login', () => {
        describe('GET /', () => {

        });

        describe('POST /', () => {

        });
    })

    describe ('After login', () => {
        describe('GET /', () => {
            it('should return all bookmarked games for the current user', async () => {

            });
        });

        describe('PUT /', () => {
            it('should save the selected game ID to the user\'s bookmarks', async () => {

            });

            it('should remove the selected game ID from the user\'s bookmarks', async () => {

            })
        });

    })
})