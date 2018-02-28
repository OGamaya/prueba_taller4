describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        randomEvent(10);
        //randomClick(10);
    })
})
function randomClick(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then(($links) => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            console.log(randomLink);
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            setTimeout(randomClick, 1000, monkeysLeft);
        })
    }
}

function randomEvent(monkeysLeft) {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
      switch(getRandomInt(0,3)) {
        case 0:
           cy.get('a').then($links => {
              var randomLink = $links.get(getRandomInt(0, $links.length));
              if(!Cypress.dom.isHidden(randomLink)) {
                  cy.wrap(randomLink).click({force: true});
                  monkeysLeft = monkeysLeft - 1;
              }
              setTimeout(randomEvent, 1000, monkeysLeft);
           })


           break;
        case 1:
           cy.get('input[type="text"]').then($texts => {
              var randomText = $texts.get(getRandomInt(0, $texts.length));
              if(!Cypress.dom.isHidden(randomText)) {
                  cy.wrap(randomText).type('2345678',{force: true});
                  monkeysLeft = monkeysLeft - 1;
              }
              setTimeout(randomEvent, 1000, monkeysLeft);
           })
           break;
        case 2:
           cy.get('select').then($select => {
              var randomSelect = $select.get(getRandomInt(0, $select.length));
              if(!Cypress.dom.isHidden(randomSelect)) {
                  var value = randomSelect.children[getRandomInt(0, randomSelect.children.length)].value
                  cy.wrap(randomSelect).select(value)
                  monkeysLeft = monkeysLeft - 1;
              }
              setTimeout(randomEvent, 1000, monkeysLeft);
           })

           break;
        case 3:
           cy.get('button').then($button => {
              var randomButton = $button.get(getRandomInt(0, $button.length));
              if(!Cypress.dom.isHidden(randomButton)) {
                  cy.wrap(randomButton).click({force: true});
                  monkeysLeft = monkeysLeft - 1;
              }
              setTimeout(randomEvent, 1000, monkeysLeft);
           })

           break;
        default:
           break;
        }
    }
}
