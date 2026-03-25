## Conferences

- pour qu'un utilisateur puisse voir les conférences, il doit avoir une acl en plus:
  - confd.conferences.read
- pour pouvoir créer, modifier, supprimer une conférence, il doit avoir les acls
  - confd.conferences.#
  - confd.extensions.read (pour lister les extensions disponibles) / a vérifier en détail

- permettre la connexion à une conférence
```js
const room = await Wazo.Room.connect({ extension: '8000' });
// doit permettre de taper le code pin si il y a
```