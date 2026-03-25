## call logs
- ajouter call_status (25.07)

### CallLog

callLogGet:
il manque la recherche de présence
a faire que si backend = "wazo"
Mais le coup me semble important si on recherche beaucoup d'historique d'appels

quand je filtre en recherchant lucas
je trouve des résultats ou source.uuid est null
ce qui fait que j'apparait en correspondant de mon propre appel

il manque la possibilité d'avoir une date de début et de fin, un interval
l'api le permet, mais pas le sdk