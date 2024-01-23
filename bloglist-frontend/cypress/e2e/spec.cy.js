describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) 

    const userDiego = {
      name: 'Diego Nina',
      username: 'diego',
      password: 'nina'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, userDiego) 
  })

  it('Login form is shown', function() {
    cy.contains('Log in to app')
  })

  it('login form can be opened', function() {
    cy.contains('Login').click()
  })

  it('user can log in', function() {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Matti Luukkainen logged in')
  })

  it('login fails with wrong password', function() {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('invalid username or password')
    cy.get('.messageError')
    .should('contain', 'invalid username or password')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('Test blog')
      cy.get('#author').type('Test author')
      cy.get('#url').type('www.test.url.com')
      cy.contains('create').click()
      cy.contains('Test blog')
      cy.contains('Test author')
    })

    describe('create note', function () {
      beforeEach(function () {
        cy.createNote({
          title: 'Test blog',
          author: "Test author",
          url: 'www.test1.url.com'
        })
        cy.createNote({
          title: 'Segundo blog',
          author: "Segundo author",
          url: 'www.test2.url.com'
        })
        cy.createNote({
          title: 'Tercer blog',
          author: "Tercer author",
          url: 'www.test3.url.com'
        })
      })

      it('it can like blogs', function () {
        cy.contains('Test blog').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.contains('Like').click()
        cy.contains('Likes: 1')
      })

      it('it can delete blogs', function () {
        cy.contains('Test blog').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.contains('delete').click()
        cy.get('html').should('not.contain', 'Test blog')
      })

      it.only('it shows most liked blog first', function () {

        cy.contains('Segundo blog').parent().find('button').click();
        cy.contains('Test blog').parent().find('button').click();
        cy.contains('Tercer blog').parent().find('button').click();

        cy.contains('www.test2.url.com').parent().find('button.like-button').as('theButton2');
        cy.get('@theButton2').click().contains('Like').click().wait(100).click().wait(100).click().wait(100);

        cy.contains('www.test3.url.com').parent().find('button.like-button').as('theButton3');
        cy.get('@theButton3').click().contains('Like').click().wait(100).click().wait(100);
  
        cy.contains('www.test1.url.com').parent().find('button.like-button').as('theButton1');
        cy.get('@theButton1').click().contains('Like').click();
        // Verificar el orden de los blogs
        cy.get('.blog').eq(0).should('contain', 'Segundo author');
        cy.get('.blog').eq(1).should('contain', 'Tercer blog');
        cy.get('.blog').eq(2).should('contain', 'Test blog');
      });

      describe('another user loggind note', function () {
        beforeEach(function () {
          cy.contains("logout").click()
          cy.login({ username: 'diego', password: 'nina' })
        })
  
        it('it cant delete blogs', function () {
          cy.contains('Test blog').parent().find('button').as('theButton')
          cy.get('@theButton').click()
          cy.get('html').should('not.contain', 'delete')
        })
      })
    })
  })
})