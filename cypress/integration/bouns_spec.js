describe('First Scenario', () => {

    it('Visits the Project Link', () => {
        cy.visit('http://localhost:8080')    
    })

    it('Check the Get Requests Employees', () => {
        cy.request({
          url: 'https://fe-task.getsandbox.com/employees',
          method: 'GET',
        })
    })

    it('Check if the employees data is Appearing', () => {
       cy.get('.c-users-list__body').should('be.visible');
    })

    it('Check If the page contain the href for home and Team performance', () => {
        cy.url()
           .should('include', '/') 
        cy.contains('Team performance chart page').click()
        cy.url()
           .should('include', '/team-performance')  
    })
  })

  describe('Second  Scenario', () => {
  
    it('Visits the Project Link', () => {
       cy.visit('http://localhost:8080')    
    })

    it('Check the Get Requests Employees', () => {
        cy.request({
          url: 'https://fe-task.getsandbox.com/employees',
          method: 'GET',
        })
    })
  
    it('Check the loader in clicked', () => {
          cy.get('button').click()    
    })

    it('Check Params', () => {
        cy.intercept('https://fe-task.getsandbox.com/employees*', { hostname: 'localhost' }, (req) => {
            console.log(req);
        })
    })
  })