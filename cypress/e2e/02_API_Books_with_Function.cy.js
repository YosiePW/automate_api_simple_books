import login from '../support/login.js'
import helper from '../support/helper.js'

const LoginPage = new login();
const HelperPage = new helper();

let data;

describe('V2', ()=>{

    beforeEach(()=>{
        LoginPage.login()
        cy.fixture('example').then((fixtureData) => {
            data = fixtureData;
        })
    })
    it('add book', () => {
        HelperPage.postApi(data.url, data.dataPost, data.accessToken).then((response)=>{
            expect(response.status).to.eq(201)
        })
    });
})