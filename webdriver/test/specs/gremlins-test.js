function loadScript(callback) {
  var s = document.createElement('script');
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
  if (s.addEventListener) {
    s.addEventListener('load', callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

function unleashGremlins(ttl, callback) {
  function stop() {
    horde.stop();
    callback();
  }
  var horde = window.gremlins.createHorde()
  .gremlin(gremlins.species.formFiller().canFillElement(function(element) {
    var type = element.type.toLowerCase();
    return  type == 'email' || type == 'number' || type == 'password' ||
            type == 'tel'   || type == 'text';
  }))
  .gremlin(gremlins.species.clicker().clickTypes(['click']).canClick(function(element) {
    return element.tagName == 'BUTTON' || element.tagName == 'A' ;
  }));

  horde.strategy(gremlins.strategies.distribution()
  .delay(10) // wait 50 ms between each action
  .distribution([0.1, 0.9]) // the first three gremlins have more chances to be executed than the last
)
  horde.seed(4321);

  horde.after(callback);
  window.onbeforeunload = stop;
  setTimeout(stop, ttl);
  horde.unleash();
}

describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('/');
    browser.click('button=Cerrar');

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' ')[2]);
    });
  });

});
