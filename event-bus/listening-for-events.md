# Listening for Events

You can listen to events from anywhere in your code, as long as you have a reference to the event bus. You can get a
reference to the event bus by calling `Ducktion.singleton.Resolve<EventBus>()`.

To listen for an event, you can simply call the `Listen` method on the event bus, passing in the type of the event
and a callback that will be called when the event is fired.

```csharp{11-13}
using TheRealIronDuck.Ducktion;
using TheRealIronDuck.Ducktion.Events;
using UnityEngine;

public class MyService
{
    public MyService()
    {
        var eventBus = Ducktion.singleton.Resolve<EventBus>();
        
        eventBus.Listen<MyEvent>((e) => {
            Debug.Log(e.Message);
        });
    }
}
```

Each event can have multiple listeners. When you fire an event, all the listeners will be called in the order they were
registered. Each listener will receive a reference to the event, so they can access the data it contains.

## Removing listeners

You can remove a listener by calling the `Forget` method on the event bus, passing in the type of the event and the
callback you want to remove.

```csharp{24}
using TheRealIronDuck.Ducktion;
using TheRealIronDuck.Ducktion.Events;
using UnityEngine;

public class MyService
{
    private Action<MyEvent> _callback;
    
    public MyService()
    {
        var eventBus = Ducktion.singleton.Resolve<EventBus>();
        
        _callback = (e) => {
            Debug.Log(e.Message);
        };
        
        eventBus.Listen<MyEvent>(_callback);
    }
    
    public void RemoveListener()
    {
        var eventBus = Ducktion.singleton.Resolve<EventBus>();
        
        eventBus.Forget<MyEvent>(_callback);
    }
}
```

## Removing all listeners

You can remove all listeners for a specific event by calling the `Clear` method on the event bus, passing in the type
of the event.

```csharp{10}
using TheRealIronDuck.Ducktion;
using TheRealIronDuck.Ducktion.Events;

public class MyService
{
    public MyService()
    {
        var eventBus = Ducktion.singleton.Resolve<EventBus>();
        
        eventBus.Clear<MyEvent>();
    }
}
```