## callerId
https://support.wazo.io/hc/fr-fr/articles/32823013594253-S%C3%A9lection-du-num%C3%A9ro-d-identification-pour-les-appels-sortants

The user configuration (default, anonymous, <custom>) is superceded by the selection of a caller id by the user before a call(dynamic caller id > preconfigured caller id).

So no, default in the outgoing_caller_id of the user does not mean "associated". It means whatever else is configured for the outcall or otherwise.
https://wazo-platform.org/uc-doc/administration/callerid/#caller-id-for-outgoing-calls-through-a-trunk
https://wazo-platform.org/uc-doc/administration/callerid/#dynamic-caller-id

In order to use a dynamic caller id based on values from /users/<uuid>/callerids/outgoing, you need to include it in a SIP header X-Wazo-Selected-Caller-ID in the application's SIP invite.

As for the caller id name("Caller ID" technically means all of Name <number> that is displayed on a caller id screen), that is not currently supported unfortunately. It should be added to the /users/<uuid>/callerids/outgoing API eventually(we have a ticket for it in our backlog).

For now your application can set the caller id name however you want in combination with one of the numbers from /users/<uuid>/callerids/outgoing.