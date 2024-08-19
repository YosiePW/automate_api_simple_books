import {faker} from '@faker-js/faker';

let data;

describe('API GET', () => {

  beforeEach(() => {
    cy.fixture('example').then((fixtureData) => {
      data = fixtureData;
  })
  })
  it('user get data', () => {
    cy.api({
      method: "GET",
      url: "https://simple-books-api.glitch.me/books/2"
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('id')
    })
  })

  it('Login', () => {
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
  });

  it('Add data', () => {
    cy.api({
      method: "POST",
      url: "https://simple-books-api.glitch.me/orders",
      headers: {
        Authorization: `Bearer ${data.accessToken}`
      },
      body: {
        "bookId": '1',
        "customerName": faker.person.fullName()
      }
    }).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body).to.have.property('orderId')
      cy.readFile('cypress/fixtures/example.json').then((dataFile) => {
        dataFile.orderId = response.body.orderId
        cy.writeFile('cypress/fixtures/example.json', dataFile);
      });
    })
  });

})