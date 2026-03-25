# Contacts
- il manque les events relatifs aux contacts
- https://wazo-dev.atlassian.net/jira/software/c/projects/WAZO/issues?jql=project%20%3D%20WAZO%20AND%20textfields%20~%20%22contact%20events%22%20ORDER%20BY%20created%20DESC&selectedIssue=WAZO-3969

## contact personnel
- pagination disponible (pas de search parameter)
- contactsPersonalPageGet a ajouter au provider
- pas / peu d'intérêt et il faut retirer search des props

## personal contacts
- il y a la propriété mobile, mais elle est impossible à éditer
- il y a number qui contient le numéro, et numbers qui contient un array de number
{label: 'primary', number: '0102030405'}
mais sans savoir comment en ajouter plus

## contact annuaire
- lorsque j'ajoute / supprime / modifie un contact d'un annuaire, celui ci ne se met pas à jour dans les clients,
cela à cause du manque d'event

## contact google et office
se baser sur le typage
https://github.com/wazo-platform/wazo-js-sdk/blob/master/src/domain/Contact.ts

## contacts LDAP
- contacts Ldap Get ne fait rien
- j'ai bien une source avec "backend": "ldap"
- mais il n'existe pas d'endpoint "/backends/ldap" pour faire des requêtes sur ce backend

## Events contact favorite
- onContactsFavoriteDeleted, suppression du console.log
  - simplifier la fonction contactsFavoritesRemove et recharger les favoris via contactsFavoritesGet
- onContactsFavoriteAdded, ne fait rien
  - simplifier la fonction contactsFavoritesAdd et recharger les favoris via contactsFavoritesGet

pouvoir être synchro si favoris gérer depuis plusieurs téléphone / application
onFavoriteAdded
onFavoriteDeleted
la réponse est très pauvre et demande donc de retrouver les infos du contact avant de l'ajouter ou supprimer du tableau favoris
{
  "tenant_uuid": "958ac4de-d279-4f63-882a-b0e4f8347e56",
  "name": "favorite_deleted",
  "user_uuid:3b4711bf-1227-4222-86ef-68d15b102f99": true,
  "required_access": "event.favorite_deleted",
  "required_acl": "events.directory.3b4711bf-1227-4222-86ef-68d15b102f99.favorite.deleted",
  "origin_uuid": "1cc60e03-8a2c-4f53-9ecc-193c0ce4b7ea",
  "timestamp": "2024-04-09T10:50:25.054168",
  "data": {
    "xivo_uuid": "1cc60e03-8a2c-4f53-9ecc-193c0ce4b7ea",
    "user_uuid": "3b4711bf-1227-4222-86ef-68d15b102f99",
    "source": "personal",
    "source_entry_id": "5d370ac0-b35b-4301-b6ff-1427e292c550"
  }
}

https://wazo-platform.discourse.group/t/gestion-favoris-par-events/1472

contactsFavoritesAdd
si phonebook, on recharge les favoris via requête
voir pour gérer localement

## contact et favoris
actions sur card
soucis avec les champs non commun (fax, mobile, birthday)
https://wazo-platform.discourse.group/t/champ-du-contact-personnel-et-partage-de-contacts/1442/2

Voir pour ajouter son numéro mobile sur contact interne
dans Wazo.confd.updateUser: (userUuid: string, profile: Profile) => Promise<boolean>;
cela me semble réservé à l'admin et demande à réup le profil entier,
pas satisfaisant !

https://github.com/wazo-platform/wazo-js-sdk/blob/master/src/domain/Contact.ts
l'API permet un tableau d'objets
mais le SDK retourne selon le typage

## Contacts
getDirdSource et defaultSource ne prend pas en compte si plusieurs source wazo
utilisé dans 
usersPresenceGet

on peut avoir les sources autres que default via l'api dird profiles
dird/0.1/profiles?recurse=true&offset=0'

tester en wazo 23.14 et sdk en 0.39.11
Soucis a faire remonter sur le forum !
il n'existe pas fetchPhonebookSource("default")
il est possible d'avoir plusieurs sources
il n'existe pas d'appel pour lister si il y a différentes sources !
Wazo.dird.fetchSourcesFor("default") permet de lister pour une seule source, mais pas de connaitre les sources autre que celle par défaut !

il est possible d'avoir plusieurs annuaire backend Wazo, quel intérêt ?
Si c'est se connecter à un autre Wazo (si on a deux serveurs par exemple)
comment faire pour que cela fonctionne ?
il faut rapatrier la key de l'autre serveur sur celui-ci ?
possible de détailler ?