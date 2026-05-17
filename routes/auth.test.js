describe('/auth', () => {
    beforeAll(testUtils.connectDB);
    afterAll(testUtils.stopDB);

    afterEach(testUtils.clearDB);

    describe('before signup', () => {
        describe('POST /', () => {

        });

        describe('PUT /password', () => {
            
        });

        describe('POST /logout', () => {
            
        })
    });

    describe('after signup', () => {
        describe('POST /signup', () => {
            
        })
    })

    // TODO: Tests involving user data go here
});