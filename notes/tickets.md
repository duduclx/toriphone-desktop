## js sdk lib simple dird functions
https://wazo-dev.atlassian.net/browse/WAZO-3872

In the SDK some functions doesn’t return usefull responses for a better front app.

Wazo.dird.markAsFavorite(contact.source, contact.sourceId) 

return a boolean but should return the contact with is methods.

Wazo.dird.fetchPhonebookContacts(source)

does not return if is favorited, but should to limit api request.

Wazo.dird.listPersonalContacts() 

does not return the methods normaly attached to internal contacts ( eg: seprateName() ) and dont' return if is favorited.

Wazo.dird.addContact(contact) 

should return the contact with methods and if is favorited


Not sure about the last point, but there is no export / import / share the personal contacts.
As a user, i want to share a personal contact with another member of my team.
it could be done by a basic export / import feature, or a share feature.