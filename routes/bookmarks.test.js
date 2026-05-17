describe('/bookmarks', () => {
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
            it('should return all bookmarked games for the current user', async () => {

            });
        });

        describe('PUT /:gameid/add', () => {
            it('should save the selected game ID to the user\'s bookmarks', async () => {

            });

            it('should not add a duplicate and return normally if the game is already added', async () => {

            })
        })

        describe('PUT /:gameid/remove', () => {
            it('should remove the selected game ID from the user\'s bookmarks', async () => {

            })

            it('should return normally if the game does not exist in the user\'s bookmarks', async () => {

            })
        });

    })
})