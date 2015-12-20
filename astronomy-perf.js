if (Meteor.isClient) {
  var testEntry = new Entry();
  var testEntryDep = new Tracker.Dependency;

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
    },
    testEntry: function () {
      testEntryDep.depend();
      return testEntry;
    },
    testEntryModified: function () {
      testEntryDep.depend();
      return JSON.stringify(testEntry.getModified(), null, 4);
    },
    testEntryIsModified: function () {
      testEntryDep.depend();
      return testEntry.isModified() ? 'is modified' : 'not modified';
    },
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
    },
    'input input.url': function (e) {
      testEntry.set('request.url', e.currentTarget.value);
      testEntryDep.changed();
    },
  });
}
