# record

## état des lieux
un appel abandonné dispose de 2 records, tous les appels ont des records vides.
actuellement, j'ai des Nan sur les records, et au mieux, j'ai les sounds (attente, notification pause record, greeting busy, etc ...)
je ne commente pas le code, mais ça ne semble pas fonctionner chez moi !

- il faudrait pouvoir accéder à tous les records d'un appel !

## situations
j'ai user A qui est admin
j'ai user B qui est user

- si user A appelle user B, et veut enregistrer:
User does not have permission to handle objects of other users

- si user A appelle user B, et user B enregistre:
https://voip.toriphone.fr/api/calld/1.0/users/me/calls/undefined/record/start 
no such call
donc, bizarrement, pas de callId dans ce sens, alors que ça fonctionne dans l'autre ...
chelou !

- si user B appelle user A, et user A enregistre, pas d'erreur.

- si userB appelle user A, et user B enregistre:
https://voip.toriphone.fr/api/calld/1.0/users/me/calls/1rcloal2h0snjo9l86u3/record/start
no such call

