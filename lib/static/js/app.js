App = Ember.Application.create({
  LOG_TRANSITIONS: true
});
//Data + Models
App.ApplicationStore = DS.Store.extend();

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:<add the port assigned you by GoogleAppEngineLauncher here>',
  namespace: 'api'
});

App.Contact = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  zodiac: DS.attr('string'),
  bday: DS.attr('string'),
  photo: DS.attr(),
});

// Routes
App.Router.map(function(){
  this.resource('contacts', {path: '/contacts'});
  this.resource('contact', { path: '/contact/:contact_id' });
  this.resource('new', { path: '/new'});
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

App.NewRoute = Ember.Route.extend({
    reset: function() {
    this.setProperties({
      firstName: "",
      lastName: "",
      bday: "",
      zodiac: ""
    });
  },
    actions: {
    createContact: function() {
      var firstName = this.get('controller').get('firstName');
      var lastName = this.get('controller').get('lastName');
      var bday = this.get('controller').get('bday');
      var zodiac = this.get('controller').get('zodiac');
      var _this = this;

      Ember.$.ajax('http://localhost:21080/api/contacts', {
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({firstName: firstName, lastName: lastName, bday: bday, zodiac: zodiac}),
      });
        _this.transitionTo('contacts');
    }
  }
});
//Controllers