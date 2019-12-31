describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Niina Latvala',
      username: 'zxcvb',
      password: 'qwerty'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('login page can be opened', function() {
    cy.contains('Log in to application')
  })

  it('user can login', function () {
    cy.get('#username')
      .type('zxcvb')
    cy.get('#password')
      .type('qwerty')
    cy.contains('login')
      .click()
    cy.contains('Niina Latvala logged in')
  })
})

describe('Logged in user can add a new blog and delete it', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Niina Latvala',
      username: 'zxcvb',
      password: 'qwerty'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    cy.get('#username')
      .type('zxcvb')
    cy.get('#password')
      .type('qwerty')
    cy.contains('login')
      .click()
    cy.contains('Niina Latvala logged in')
  })

  it('blog page can be opened after logging in', function () {
    cy.contains('blogs')
  })

  it('logged in user can add new blog', function () {
    cy.contains('create new blog')
      .click()
    cy.get('#title')
      .type('Test Tytle Cypress')
    cy.get('#author')
      .type('Test Author Cypress')
    cy.get('#url')
      .type('Test URL Cypress')
    cy.get('#create')
      .click()
    cy.contains('Test Tytle Cypress Test Author Cypress')
  })
  it('user can log out', function () {
    cy.contains('logout')
      .click()
    cy.contains('Log in to application')
  })
})

describe('Logged in user can comment, add likes and delete own blog', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Niina Latvala',
      username: 'zxcvb',
      password: 'qwerty'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
    cy.contains('Log in to application')
    cy.get('#username')
      .type('zxcvb')
    cy.get('#password')
      .type('qwerty')
    cy.contains('login')
      .click()
    cy.contains('Niina Latvala logged in')
    cy.contains('create new blog')
      .click()
    cy.get('#title')
      .type('Test Tytle Cypress')
    cy.get('#author')
      .type('Test Author Cypress')
    cy.get('#url')
      .type('Test URL Cypress')
    cy.get('#create')
      .click()
    cy.contains('Test Tytle Cypress Test Author Cypress')
  })

  it('logged in user can add comment for a blog', function () {
    cy.get('#blog')
      .click()
    cy.get('#comment')
      .type('Test comment')
    cy.get('#addComment')
      .click()
    cy.contains('Test comment')
  })

  it('logged in user can add like for a blog and delete it', function () {
    cy.get('#blog')
      .click()
    cy.get('#likesNumber')
    cy.contains(0)
    cy.get('#like')
      .click()
    cy.get('#likesNumber')
    cy.contains(1)
    cy.get('#delete')
      .click()
    cy.should('not.contain', 'Test Tytle Cypress')
  })
})