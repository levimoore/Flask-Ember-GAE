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
  this.route('contacts',  function() {
    this.route('new', {path: '/new'});
  this.route('contact', { path: '/:contact_id' });
  this.route('edit', {path: '/:contact_id'});
  });
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

App.EditRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('contact', params.contact_id);
  }
})

App.ContactsRoute = Ember.Route.extend({
  model: function(){
    return this.store.findAll('contact');
    model.reload();
  }
});

App.ContactsNewRoute = Ember.Route.extend({
});
//Controllers
App.ContactsNewController = Ember.ObjectController.extend({
  content: {},
  actions: {
    save: function() {
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      var bday = this.get('bday');
      var zodiac = this.get('zodiac');
      var _this = this;

      var contact = this.store.createRecord('contact', {
        firstName: firstName,
        lastName: lastName,
        bday: bday,
        zodiac: zodiac
      });

      this.set('firstName', '');
      this.set('lastName', '');
      this.set('bday', '');
      this.set('zodiac');
      contact.save();

      Ember.$.ajax('http://localhost:<add the port assigned you by GAELauncher here>/api/contacts', {
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({firstName: firstName, lastName: lastName, bday: bday, zodiac: zodiac}),
      });
        _this.transitionToRoute('contacts');
  }
}
});

App.ContactsEditController = Ember.ObjectController.extend({
  actions: {
    update: function() {
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      var bday = this.get('bday');
      var zodiac = this.get('zodiac');
      var id = this.get('id');
      var _this = this;

      Ember.$.ajax('http://localhost:<add the port assigned you by GAELauncher here>/api/contacts'+ id, {
        type: 'PUT',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({firstName: firstName, lastName: lastName, bday: bday, zodiac: zodiac}),
      });
        _this.transitionToRoute('contacts');
  }
}
});