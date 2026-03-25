## funckeys
- mettre en place les funckeys
- il manque plusieurs destinations
- je laisse de côté car cela n'est pas utile pour l'application web, et demande des droits sur l'API
- remettre les appels *get() dans le provider
- remettre le liens dans userLinks

## configuration de ses funckeys ? 
- peut-on synchro son tel soit même
- il n'est pas possible de lister les groups et autres ressources sans acls confd.services.read
- il faut à minima ajouter un group d'acl, car ces droits de lecture ne sont pas présent par défaut

as funckeys use destination type, the end-user need to be able to list:
- groups
- queues
- conferences
- switchboards
- … etc
and so have matching acls, like
- confd.group.read
- confd.queue.read
- confd.conference.read
- confd.switchboard.read
- and so on …

But if we don’t want to change end user’s acls, he still be able to use some destination type like 
- custom
- transfer
- service
- forward
- onlinerec
- user

We can add contact in phonebooks, and then make groups, queues, available like an user destination
But if we try to create a funckey with destination: user and a contact "my group", we got uuid error, as this contact is not an user !