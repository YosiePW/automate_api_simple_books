import {faker} from '@faker-js/faker';
    
class login{

    login(){
        cy.api({
            method: "POST",
            url: "https://simple-books-api.glitch.me/api-clients",
            body: {
              "clientName": faker.person.fullName(),
              "clientEmail": faker.internet.email()
            }
          }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('accessToken')
            cy.readFile('cypress/fixtures/example.json').then((dataFile) => {
              dataFile.accessToken = response.body.accessToken
              cy.writeFile('cypress/fixtures/example.json', dataFile);
            });
          })
    }
}

export default login;