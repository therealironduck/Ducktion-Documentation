# Using the Event Bus

Ducktion includes a simple, straight-forward event bus that can be used to communicate between different parts of your 
application. The event bus is a singleton, so you can access it from anywhere in your application.

## Quick start

Any event you want to fire must implement the `IEvent` interface. This interface is empty, so you can use any class you
want as an event. The only requirement is that the class implements `IEvent`.

```csharp{3}
using TheRealIronDuck.Ducktion.Events;

public class MyEvent : IEvent
{
    public string Message { get; set; }
}
```

To fire an event, simply call the `Fire` method on the event bus, passing in the event you want to fire.

```csharp{9}
using TheRealIronDuck.Ducktion;
using TheRealIronDuck.Ducktion.Events;

public class SomeService
{
    public void SendEvent()
    {
        var eventBus = Ducktion.singleton.Resolve<EventBus>();
        eventBus.Fire(new MyEvent { Message = "Hello, world!" });
    }
}
```

:::info
You can find more information about firing events in the [dedicated documentation page](/event-bus/firing-events).
:::

To listen for an event, you can simply call the `Listen` method on the event bus, passing in the type of the event
and a callback that will be called when the event is fired.

```csharp{10-12}
using TheRealIronDuck.Ducktion;
using TheRealIronDuck.Ducktion.Events;

public class AnotherService
{
    public AnotherService()
    {
        var eventBus = Ducktion.singleton.Resolve<EventBus>();
        
        eventBus.Listen<MyEvent>((e) => {
            Debug.Log(e.Message);
        });
    }
}
```

:::info
You can find more information about event listeners in the 
[dedicated documentation page](/event-bus/listening-for-events).
:::