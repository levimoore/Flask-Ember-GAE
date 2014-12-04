App = Ember.Application.create();
//Data + Models
App.ApplicationStore = DS.Store.extend();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:21080',
  namespace: 'api'
});

App.Contact = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  zodiac: DS.attr('string'),
  bday: DS.attr('string'),
});

// Routes
App.Router.map(function(){
  this.resource('contacts');
  this.resource('contact', { path: '/contact/:contact_id' });
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.ContactRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('contact', params.contact_id);
  }
});

App.ContactsRoute = Ember.Route.extend({
  model: function(){
    return this.store.findAll('contact');
  }
});
//Controllers
