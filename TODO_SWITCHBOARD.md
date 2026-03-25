# switchboards
- implementation sans possibilité de pause l'appel dans le switchboard

// si callSession.callId == callSession.switchboard.operatorCallId ??

## hold a call
i test switchboard call from internal user.
so caller and callee are connected to the app and receive switchboard events.
when i hold a call, 
- the caller (queued call) lost his callSession (hanged up)
- the callee (operator call) still have the callSession as paused call, and have the hold call in the switchboard.
