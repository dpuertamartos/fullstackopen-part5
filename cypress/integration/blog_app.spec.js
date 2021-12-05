describe('Blog app', function() {
    function compare(a,b) {
      if (a.likes > b.likes) return -1;
      if (b.likes > a.likes) return 1;

      return 0;
    }
    
    
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

        describe('When several blogs creaded by many people exist', function() {
          beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'mluukkai' })
            cy.contains('New Blog').click()
            cy.get('#title').type('test1')
            cy.get('#author').type('New author')
            cy.get('#url').type('New url')
            cy.contains('create').click()
            cy.contains('New Blog').click()
            cy.get('#title').type('test2')
            cy.get('#author').type('New author')
            cy.get('#url').type('New url')
            cy.contains('create').click()
            cy.contains('New Blog').click()
            cy.get('#title').type('test3')
            cy.get('#author').type('New author')
            cy.get('#url').type('New url')
            cy.contains('create').click()
      
            cy.contains('test1').parent().parent().as('blog1')
            cy.contains('test2').parent().parent().as('blog2')
            cy.contains('test3').parent().parent().as('blog3')
          })
      
          it('Blogs can be liked', function() {
            cy.get('@blog2').contains('view').click()
            cy.get('@blog2').contains('Like').click()
            cy.get('@blog2').contains('Likes: 1')
          })
      
          it('they are ordered by number of likes', function() {
            cy.get('@blog1').contains('view').click()
            cy.get('@blog2').contains('view').click()
            cy.get('@blog3').contains('view').click()
            cy.get('@blog1').contains('Like').as('like1')
            cy.get('@blog2').contains('Like').as('like2')
            cy.get('@blog3').contains('Like').as('like3')
      
            cy.get('@like2').click()
            cy.get('@like1').click()
            cy.get('@like1').click()
            cy.get('@like3').click()
            cy.get('@like3').click()
            cy.get('@like3').click()
      
            cy.get('.blog').then(blogs => {
              cy.wrap(blogs[0]).contains('Likes: 3')
              cy.wrap(blogs[1]).contains('Likes: 2')
              cy.wrap(blogs[2]).contains('Likes: 1')
            })
          })
        })  
        

       
      })
  })


