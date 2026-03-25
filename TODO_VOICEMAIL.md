# voicemail
comment utiliser les greetings ??
même en utilisant *98 pour configurer, je ne tombe pas sur les messages enregistrés.
suppression en masse des messages lus ?

## activation
- si je désactive la messagerie, elle reste visible dans le menu latéral
- si l'utilisateur peut des/activer sa messagerie, faire un menu dans les paramètres
- elle doit bien rester visible, car elle existe ! mais je dois avoir un statut qui me dit si elle est active.
- par exemple, la couleur rouge de l'icone dans la sidebar ?

l'user ne peut pas enable/disable lui même sa messagerie via api ?
```js
const voicemailToggle = async () => {
    const voicemail = { ...voicemailUser, enabled: !voicemailUser.enabled };
    await voicemailUserEdit(voicemail);
    voicemailUserGet();
  };
```

## filters
https://github.com/wazo-platform/wazo-js-sdk/blob/master/src/domain/Voicemail.ts
on a eut un changement avec l'apparition des folders

voir ce qui a été fait:
- ajouter des filtres  (lus, non lus, +)
- mettre le bouton delete à part, pour que ce soit mieux compréhensible
- pas de params query pour **users/me/voicemails** et **users/me/voicemails/folders/{folder_id}**

{
  "folders": [
    {
      "type": "new",
      "name": "inbox",
      "messages": [],
      "id": 1
    },
    {
      "type": "old",
      "name": "old",
      "messages": [
        {
          "caller_id_num": "1002",
          "timestamp": 1743603023,
          "caller_id_name": "lisa dutilleul",
          "id": "1743603023-00000001",
          "duration": 0
        },
        {
          "caller_id_num": "1002",
          "timestamp": 1743602986,
          "caller_id_name": "lisa dutilleul",
          "id": "1743602986-00000000",
          "duration": 0
        }
      ],
      "id": 2
    },
    {
      "type": "urgent",
      "name": "urgent",
      "messages": [],
      "id": 3
    },
    {
      "type": "other",
      "name": "work",
      "messages": [],
      "id": 4
    },
    {
      "type": "other",
      "name": "family",
      "messages": [],
      "id": 5
    },
    {
      "type": "other",
      "name": "friends",
      "messages": [],
      "id": 6
    }
  ],
  "name": "julien dutilleul",
  "number": "1001",
  "id": 2
}

## voicemails
on a maintenant (25.16)
accesstype = "personal" | "global"
Enum: "personal" "global"
Access type of the voicemail. 'personal' means the voicemail is associated with specific users, 'global' means it is shared across the context. Only one global voicemail can exist per context.
https://api.wazo.io/documentation/api/configuration.html#tag/voicemails/operation/create_user_voicemail

et new event dans calld
- global_voicemail_message_created
- global_voicemail_message_deleted
- global_voicemail_message_updated

you can set a field "accesstype" to "global"  on a voicemail, which will enable user-level events for message notifications, and user-level access to the messages in that voicemail(https://wazo-platform.org/documentation/api/application.html#tag/users/paths/~1users~1me~1voicemails~1messages/get), for all users in your tenant.