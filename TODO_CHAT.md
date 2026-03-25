## chatd

### continuous
- lorsque le token est expiré, je n'ai pas l'event correspondant à l'action, et donc pas l'information
- ajout d'une discussion
- ajout d'un message chat
- recevoir un message ?? (a tester)

## design
soucis hauteur de page si on réduit la largeur et que le titre passe sur 2 lignes
fixer la max heigth !!

j'ai mis istruncated au titre
mais je remarque que la largeur des messages dépassent la largeur de la page également

### ReactSelect
- l'ajout de groupe de discussion entraine beaucoup de requêtes:
usersPresenceGet	@	presences.js:34
on pourrait croire qi'il y a une boucle, mais ça s'arrète au bout d'un moment.
- quand je recherche une discussion, ouvrir les accordion
- modifier la façon dont le badge de notification est retiré ??
si j'ai déjà la discussion il me faut cliquer sur une autre pour le faire partir
il faudrait pouvoir le faire partir au focus du chatForm par exemple ou en recliquant dessus

### Chat
manque de endpoint et de fonctionnalités:
https://wazo-platform.discourse.group/t/chatd-des-trous-dans-lapi/1335
- permettre de quitter un groupe
- permettre de modifier un groupe (ajouter une personne)
- attention, que ce passe-t-il si le groupe devient identique à une discussion ?
normalement, pas le même uuid, donc ça fonctionne ...

### chat client
- tester matrix 
https://github.com/element-hq/synapse
- créer un client matrix
https://github.com/element-hq/element-web

That's one way to integrate another chat platform, through a backend component completely exterior to the wazo codebase,
interacting with wazo apis and the chat platform APIs(i.e. a bridge).

Another way is to do it client side, simply integrating a chat platform client into a wazo client app. 

More complex integrations may involve a wazo-webhookd plugin or subscriptions to integrate wazo events(e.g.
sending out presence notifications to an external system based on wazo presence events,
or sending out chat messages to an external platform based on wazo chat events, ...).

Le plus simple serait de faire un client Matrix, mais il faut gérer les comptes:
- creation
- edition
- suppression
- connexion
- status