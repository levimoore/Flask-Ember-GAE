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
    actions: {
    createContact: function() {
      var firstName = this.get('controller').get('firstName');
      var lastName = this.get('controller').get('lastName');
      var bday = this.get('controller').get('bday');
      var zodiac = this.get('controller').get('zodiac');

      Ember.$.ajax('http://localhost:21080/api/contacts', {
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({firstName: firstName, lastName: lastName, bday: bday, zodiac: zodiac}),
        //data: { firstName: firstName, lastName: lastName, bday: bday, zodiac: zodiac },
        context: this,
        success: function(data) {
          var contact = App.Contact.createRecord(data);
          this.modelFor('contacts').pushObject(contact);
          this.get('controller').set('firstName', '');
          this.get('controller').set('lastName', '');
          this.get('controller').set('bday', '');
          this.get('controller').set('zodiac', '');
          this.transitionTo('contacts', contact);
        },
        error: function() {
          alert('Failed to save artist');
        }
      });
    }
  }
});
//Controllers
App.NewController = Ember.ArrayController.extend({
  firstName: '',
  lastName: '',
  bday: '',
  zodiac: '',
  disabled: function() {
    return Ember.isEmpty(this.get('firstName', 'lastName', 'bday', 'zodiac'));
  }.property('firstName', 'lastName', 'bday', 'zodiac')
});