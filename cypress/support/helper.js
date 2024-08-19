class helper {

    getApi(url){
        return cy.api({
            method: 'GET',
            url: Cypress.env('base_url') + url,
        })
    }

    postApi(url, postData, token){
        return cy.api({
            method: 'POST',
            url: Cypress.env('base_url') + url,
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: postData
        })
    }
}

export default helper;