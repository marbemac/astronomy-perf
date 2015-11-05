if (Meteor.isClient) {
  Template.body.helpers({
    entries: function () {
      var method = Session.get('loadMethod');
      var now = Date.now();
      var entries;

      if (method === 'plain') {
        entries = Entries.find({}).fetch();
      } else {
        entries = Entry.find({}).fetch();
      }

      Session.set('loadTime', Date.now() - now);

      return entries;
    }
  });

  UI.registerHelper('loadTime',function(input){
    return Session.get('loadTime');
  });

  Template.body.events({
    'click .astronomy': function () {
      Session.set('loadMethod', 'astronomy');
    },
    'click .plain': function () {
      Session.set('loadMethod', 'plain');
    }
  });
}
