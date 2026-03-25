# changelog

## v0.4.29-2507
- mise en place des réunions

## v0.4.28-2507
- améliorations des webhooks
- mise à jour toriphone-admin-module#v1.1.12-demo

## v0.4.27-2507
- mise à jour toriphone-auth-module#v1.1.12-demo (prise en charge auth ldap)
- mise à jour toriphone-admin-module#v1.1.11-demo
- mise à jour des packages

## v0.4.26-2507
- prise en charge de l'interception d'appel

## v0.4.25-2507
- correction des icônes de status et ajout des status "ringing" et "progressing"

## v0.4.24-2507
- mise en place du standard
- mise à jour des packages

## v0.4.23-2507
- mise à jour toriphone-admin-module#v1.1.10-demo
- améliorations mineures du design
- suppression du menu switchboard, les appels sur le standard sont traité comme un appel classique actuellement

## v0.4.22-2507
- mise à jour packages
- chakra-ui v2 -> v3
- mise à jour toriphone-auth-module#v1.1.11-demo
- mise à jour toriphone-admin-module#v1.1.9-demo
- corrections mineures

## v0.4.21
- fix chat message en double

## v0.4.20
- ajout d'un menu switchboard lorsque la fenêtre est étroite
- correction des images (pas de changement de couleur selon le thème)

## v0.4.19
- fix vérification abonnement starter
- possibilité de passer d'un appel audio à vidéo et vidéo à audio (nécessite une action de chaque interlocuteur)
- amélioration des appels simultannés

## v0.4.18
- amélioration graphique lors des appels
- mise en place du standard (beta)
- mise à jour toriphone-admin-module#v1.1.3
- mise en place de la limitation via abonnement / subscription
- mise en place des apps externes
- mise en place des webhooks
- meilleure prise en charge de la configuration webRtc (stun)

## v0.4.17
- retrait d'un console.log 
- mise à jour de toriphone-auth-module#v1.1.6
- correction du build electron

## V0.4.16
- le localStorage est vidé lorsque l'on se déconnecte via le bouton dédié
- mise à jour de toriphone-auth-module#v1.1.5
- mise à jour de toriphone-admin-module#v1.1.0
- mise à jour des packages (react19)
- amélioration de la vue du chat durant un appel lorsque l'on cache / montre le menu latéral
- amélioration de la video lorsque le chat est ouvert

## v0.4.15
- mise à jour des packages
- mise à jour de toriphone-admin-module#v1.0.8
- réduction de la largueur du chat éphémère (lors des appels, pour une meilleure visibilité)
- fix page qui se ferme lorsqu'on raccroche
- fix appel qui reste visible si on raccroche avant que l'appel aboutisse
- fix mauvais nom de l'appel
- fix erreur lors de la création d'une conférence adoc
- fix fixe de vie d'une conférence adhoc
- fix lorsqu'un participant quitte une conférence adhoc
- correction de la largeur des menus conférences et chat en fonction de la taille de la page

## v0.4.14
- mise à jour de toriphone-auth-module#v1.0.5
- mise à jour de toriphone-admin-module#v1.0.6
- fix traduction
- fix cache
- ajout de plusieurs call events
- vérification / correction de la messagerie éphémère (durant un appel)
- renommage des fonctions de chatd
- fix mauvais rendu de la notification d'appel entrant
- la main levée (signal lors d'un appel) est maintenant affiché partout
- amélioration des cartes de contact
- correction d'un bug lors de l'édition de contact parsonnel
- déconnexion lors de la fermeture de la page ou son rafraichissement (coupe les appels en cours)

## v0.4.13
- mise à jour de toriphone-auth-module#v1.0.4
- mise à jour de toriphone-admin-module#v1.0.5
- désactivation du debug de i18next
- ajout traduction sur la page A propos
- fix de l'erreur pageCount NaN
- fix html au niveau du menu du chat

## v0.4.12
- mise à jour des traductions pour la partie admin

## v0.4.11
- mise à jour toriphone-admin-module v1.0.4
- mise à jour toriphone-auth-module v1.0.2
- mise à jour des packages
- ajout lien CGU dans a propos
- refactorisation du chat
- les contacts internes et favoris sont à jour lors de la modification ou suppression d'un utilisateur
- corrections de textes manquants
- ajout des numéros bloqués
- fix traductions manquantes
- meilleur affichage des contacts

## v0.4.10
- mise à jour toriphone-admin-module#v1.0.1
- fix traduction manquante
- modification de l'enregistrement (start / pause / resume / stop)
- ajout du choix de l'identification de l'appel sortant

## v0.4.9
- mise à jour toriphone-admin-module#v1.0.0
- mise à jour toriphone-auth-module#v1.0.0

## v0.4.8
- mise à jour electron
- mise à jour toriphone-admin-module#v0.9.8

## v0.4.7
- mise à jour de toriphone-auth-module#v0.9.8
- suppression de packages inutiles
- mise à jour des packages
- fix double chat message on send
- fix double callLog
- ajout du choix de la langue dans les préférences
- ajout d'un toast lors de l'envoi d'une main levée (signal lors d'un appel)
- fixe la couleur de la notification d'appel vidéo entrant
- code review
- fix localVideo disparait lors de la pause de l'appel vidéo
- fix call menu pause action

## V0.4.6
- allow stun configuration from externalApps endpoint
- update toriphone-auth-module#0.9.5 to match the new toriphone portal
- update toprihpine-admin-module#0.9.7 (externalapps)

## V0.4.5
- update toriphone-admin-module#0.9.6
- remove wazo images from public folder

## v0.4.4
- use toriphone-admin-module#0.9.5

## v0.4.3
- use toriphone-admin-module#0.9.4

## v0.4.2
- use toriphone-auth-module#v0.9.4
- fix wss reconnect

## v0.4.1
- use toriphone-auth-module v0.9.3

## v0.4.0
- sidebarMenu is now responsive, except for admin panel
- fix bad layout when not full screen
- update toriphone-auth-module#0.9.2
- remove LocalStorage to use the one provided by toriphone-auth-module#0.9.2
- update toriphone-admin-module to 0.9.1