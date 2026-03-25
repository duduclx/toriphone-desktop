# Toriphone Desktop

Wazo desktop est un client WebRtc pour [Wazo Plafom](https://wazo-platform.org/).

Wazo desktop n'est pas le produit officiel de Wazo, qui propose un Wazo Desktop pour sa version enterprise.

Cette version est réservée uniquement à l'usage avec Wazo Platform et n'est pas développé par Wazo.

Ce Wazo Desktop est développé par Toriphone.

## developpement

Le projet utilise Vite + react + electron

pour tester l'application, il faut obligatoirement un serveur Wazo Platform fonctionnel et accessible.

télécharger le repo :
```bash
git clone  https://github.com/duduclx/toriphone-desktop.git
```
installer les dépendances :
```bash
cd toriphone-desktop
nmp install
```
lancer le projet :
```bash
npm run dev -- --host
```

Attention, si vous n'avez pas de certificat valide sur le serveur Wazo,
il faudra se rendre sur l'url du serveur et accepter les risques.

## release

Le produit est disponible aux adresses :
- [https://app.toriphone.fr](https://app.toriphone.fr)
- [https://toriphone-desktop.web.app/](https://toriphone-desktop.web.app/)

### web

Lancer la commande :
```bash
npm run build
```
Mettez le contenu de build dans votre serveur Web

Vous pouvez le deployer avec firebase:
```bash
firebase deploy
```

### serveurs apache
fichier .htaccess
```apache
<FilesMatch "\.(html|json)$">
  FileETag None
  <IfModule mod_headers.c>
    Header set Cache-Control "no-store, no-cache, must-revalidate, max-age=0"
  </IfModule>
</FilesMatch>
```

## utilisation des tags
Créer un tag :
```sh
git tag v1.0.0
```

Pousser le tag vers le dépôt distant :
```sh
git push origin v1.0.0
```

supprimer un tag :

```sh
git tag -d v1.0.0
git push origin --delete v1.0.0
```

### electron
La version electron demande à utiliser un server TURN/STUN pour que les appels fonctionnent correctement.

pour tester l'application electron, lancer la commande :
```bash
npm run dev:electron
```

pour obtenir l'installateur, lancer la commande :
```bash
npm run app:build
```

pour installer :
```bash
sudo snap install <package.snap> --dangerous
```

## snapcraft

- se créer un compte sur [snapcraf](https://snapcraft.io/)
- installer snapcraft
```bash
sudo snap install snapcraft --classic
```
- se connecter
```bash
snapcraft login
```
- réserver son nom d'application
```bash
snapcraft register toriphone
```
- publier sur le store
```bash
snapcraft upload --release=beta toriphone-desktop_0.4.8-2413_amd64.snap
snapcraft upload --release=candidate toriphone-desktop_0.4.8-2413_amd64.snap
snapcraft upload --release=stable toriphone-desktop_0.4.8-2413_amd64.snap
```