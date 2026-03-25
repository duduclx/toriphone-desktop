# A FAIRE

## external apps -> Avatar
- permettre un chacun d'avoir un avatar (photo de profil), car cela n'existe pas au niveau du user
- lors d'un appel vidéo, si downgrade audio ou caméra off, alors afficher l'icone
- si user n'a pas d'icone, mettre un icone par défaut

## video call
- permettre de choisir sa caméra et son micro

## simplification
remplacer tous les:
```js
window.history.pushState({}, "", "/");
setMeetingRoute(false);
```
par une fonction unique

## dernire version (en dev) permet de loginToQueue / logoffFromQueue
https://github.com/wazo-platform/wazo-js-sdk/compare/0.46.8...0.46.9
- permet de se connecter/déconnecter à une queue définie
- donc, ajouter une liste des queues dont je suis agent, et pouvoir choisir celle où je me dé/connecte
- permet d'avoir le bon retour de l'user contact (a tester avec mobile_phone)

## users/me/externals/contactsGroup
- permettre à l'user de faire des groupes de contact

## conmboboxAsyncUsers de chatGroupAdd
- on peut importer la fonction de recherche et le user directement dans le composant et non dans le parent

## pickup même si target n'est pas dans favoris / chat ou autre
- il faut "forcer" le userPresence pour les users dans user?.profile?.callPickupTargetUsers
- comment est-il fait actuellement ? prend-t-on les contacts internes uniquement ?

## switch
dans voicemailsTableContent.jsx
```js
<Switch.Control bgColor={voicemail.unread ? "red.200" : "blue.200"} />
```
mais cela ne prend pas en compte le thème

## accessibilité
- ajouter aria-label et autres pour l'accessibilité

## userStateBadge
- mettre lorsque user:
- sur téléphone

## conference adhoc
- voir si on peut afficher les caméras de chacun
- ne reçoit pas les events :
  - conference_adhoc_created
  - conference_adhoc_participant_joined
- voir pour avoir plusieurs conferenceAdhoc, à l'aide de conferenceAdhocs

## jabra et webHID
- utiliser webhid pour obtenir les actions du casque audio

## agents pause v25.14
- On peut spécifier une raison pour la pause:
https://api.wazo.io/documentation/api/agent.html#tag/agent/operation/pause_agent_by_number
https://api.wazo.io/documentation/api/agent.html#tag/agent/operation/pause_user_agent
- on peut utiliser les externalapps pour configurer les choix possible et activer cette fonction

## error modal
exemple dans contactPersonal
si erreur lors du modal, on affiche une erreur.
A voir pour mettre ailleurs ??

## wazo.phone
si on se connect sans caméra ni micro, cela ne plante pas l'application
mais plante les appels.
Mettre un système de vérification
et si pas de micro, pas de message
si pas de caméra, connexion sans video et appel vidéo bloqué

## ring and device preferences
si le device enregistré dans les prefs du localStorage n'existe pas, ex; débranché
que se passe-t-il ?
si bug, il faut vérifier que cet id est disponible avant de le paramétrer dans l'appli
et si une fois paramétré je débranche, il faut pouvoir basculer sur le "default"

# Autres

## reset user email (forgot password)
https://support.wazo.io/hc/fr-fr/articles/360044000092-Param%C3%A9trer-l-envoi-de-mail-HT019FR
bloqué à 
postmap sasl_passwd sender_relay
commande inconnue

## wazo install on virtual box
su
nano /etc/network/interfaces auto enp0s3 127.0.0.1 localhost
api_client_name = wazo // ne peut pas être root
api_client_password = superpass // peut être le mot de passe root