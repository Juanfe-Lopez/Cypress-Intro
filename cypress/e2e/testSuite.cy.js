/// <reference types="Cypress" />


describe('Test suite', () => {
    it('config modal', ()=>{
        cy.visit('https://reverb.com/')

        //Enter configuration of modal
        cy.get("button[class='rc-button rc-button--muted rc-button--main rc-button--medium']").click()

        //Select Colombia
        cy.get('#locale_picker_shipping_region_code_field').select('Colombia')
        //Select Español
        cy.get('#locale_picker_language_field').select('Español')
        //Select currency
        cy.get('#locale_picker_currency_field').select('MEX$ Mexican Peso')
        //Save
        cy.get('.reverb-modal__actions__save').click()

        //Assert text is in spanish
        cy.get("p[class='toggled-site-banner__subheading']").should('have.text', 'Consigue más de lo que te gusta por menos')
    })

    it('Add product to cart', ()=> {
        cy.visit('https://reverb.com/')
        //Variable to store assertion text
        let guitarName=''
        
        //Accept popup message
        cy.get("button[class='rc-button rc-button--filled rc-button--main rc-button--medium']").click()

        //Click the guitar button on the navbar
        cy.get("button[data-header-category='guitars']").eq(0).click()
        cy.get("a[href='/cat/electric-guitars/solid-body--11']").click()

        //Accept popup message again
        cy.get("button[class='rc-button rc-button--filled rc-button--main rc-button--medium']").click()
        //Wait for products to load
        cy.wait(5000)
        //Select the first product and make it open in the same tab
        cy.get("a[class='rc-listing-card__title']").eq(0).invoke('removeAttr','target').click()

        //Save name of guitar for future assertion
        cy.get('h1').eq(0).invoke('text').as('guitarName')
        cy.get('@guitarName').then((name) => {
            guitarName= name
            cy.log('Guitar: ' + name) //prints name
          })

          //Accept popup message agaain
        cy.get("button[class='rc-button rc-button--filled rc-button--main rc-button--medium']").click({ multiple: true, force: true })
        //Click add to cart 
        cy.get('.add-to-cart-button').click()
        //cy.get("p a").eq(1).should('have.text', cy.get('@guitarName'))

        //assert that the item in cart was the one selected
        cy.get('@guitarName').then((name) => {
            cy.get("p a").eq(1).should('have.text', guitarName)
          })
    })
    it('Search for a guitar', () =>{
        cy.visit('https://reverb.com/')

        //Accept modal message
        cy.get("button[class='rc-button rc-button--filled rc-button--main rc-button--medium']").click()
        //Type query un searchbar
        cy.get('.site-search__controls__input').type('Electric guitar')
        //Click search icon
        cy.get('.site-search__controls__submit').click()
        //Accept modal message again
        cy.get("button[class='rc-button rc-button--filled rc-button--main rc-button--medium']").click()
        //Assert results include query
        cy.get("h3[class='csp-square-card__title']").eq(0).should('contain.text',"Electric Guitar")
        
    })
})
