describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'mluukkai'
        }
      cy.request('POST', 'http://localhost:3001/api/users/', user)   
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
        cy.contains('log in').click()
        cy.get('#login-button').should('contain', 'login')
    })

    it('login fails with wrong password', function() {
        cy.contains('log in').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
    
        cy.get('.error')
          .contains('Wrong credentials')
          .should('have.css', 'color', 'rgb(255, 0, 0)')
          .should('have.css', 'border-style', 'solid')
        
        cy.get('html').should('not.contain', 'Matti Luukkainen logged in')  
      })  

    it('user can login', function () {
        cy.contains('log in').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('mluukkai')
        cy.get('#login-button').click()

        cy.contains('Matti Luukkainen logged-in')
    })    

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'mluukkai' })
        })
    
        it('A blog can be created', function() {
          cy.contains('New Blog').click()
          cy.get('#title').type('New title')
          cy.get('#author').type('New author')
          cy.get('#url').type('New url')
          cy.contains('create').click()
          cy.contains('New title')
        })
        
        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.contains('New Blog').click()
                cy.get('#title').type('New title')
                cy.get('#author').type('New author')
                cy.get('#url').type('New url')
                cy.contains('create').click()
                cy.contains('New title')
            })
      
            it('A blog can be liked', function() {
                cy.contains('view').click()
                cy.contains('Like').click()
                cy.contains('Likes: 1')
                
              })
              
            it('A blog can be deleted by the creator', function() {
              cy.visit('http://localhost:3000')
              cy.contains('view').click()
              cy.contains('Remove').click()
              cy.get('html').should('not.contain', 'New title')  
              
            }) 
        })
        
      })
  })


