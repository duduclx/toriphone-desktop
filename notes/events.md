# Events

## difference between `Wazo.Phone.on` and `Wazo.websocket.on`

The following:
```js
Wazo.Phone.on(Wazo.Phone.ON_CALL_RESUMED, (data) => console.log(data));
```
Will return a callSession object:
```js
data = {
    answertime: "date",
    autoAnswer: false,
    call: undefined,
    callId: undefined,
    callerNumber: undefined,
    cameraEnabled: false,
    conference: false,
    creationTime: "date",
    dialedExtension: "",
    displayName: "firstname lastname",
    endTime: null,
    ignored: false,
    isCaller: false,
    muted: false,
    number: "1002",
    paused: false,
    realDisplayName: undefined,
    recording: false,
    recordingPaused: false,
    ringing: false,
    screensharing: false,
}
```

The following:
```js
Wazo.Websocket.on("call_resumed", (data) => console.log(data));
```
Will return a event object:
```js
data = {
    data: {
        call_id: "1739536114.79",
        user_uuid: "5d4a261a-f147-4289-b8e2-c729c2f139d0"
    },
    name: "call_resumed",
    origin_uuid: "752e515d-2235-46b2-bfb0-78630a131dfc",
    required_access: "event.call_resumed",
    required_acl: "events.calls.5d4a261a-f147-4289-b8e2-c729c2f139d0",
    tenant_uuid: "98358180-86e5-4053-b555-f0af329643ad",
    timestamp: "2025-02-14T13:28:39.129686",
    "user_uuid:5d4a261a-f147-4289-b8e2-c729c2f139d0": true,
}
```

## diffence between `Wazo.Phone.ON_xxxx` and `event_name`

When i use event name:
```js
Wazo.Phone.on("call_answered", onCallAnswered);
```
I get no error for as i get a correct callSession object,

When i use the Wazo.Phone.ON_xxxx
```js
Wazo.Phone.on(Wazo.Phone.ON_CALL_ANSWERED, onCallAnswered);
```
I get error:
`Uncaught TypeError: Cannot read properties of undefined (reading 'call_id')`
as the data is not a callSession object

## Events list

We can find the list of application event:
- https://wazo-platform.org/documentation/events/application/

But their is missing some events related to the application,
and some can be find under `Wazo.Phone.ON_xxxx`
- on_call_muted
- on_call_unmuted
- reinivte
- .. more not listed yet

event i don't know how to trigger
- user_missed_call 