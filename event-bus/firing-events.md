# Firing Events

Any event you want to fire must implement the `IEvent` interface. This interface is empty, so you can use any class you
want as an event. The only requirement is that the class implements `IEvent`.

You can fire events from anywhere in your code, as long as you have a reference to the event bus. You can get a 
reference to the event bus by calling `Ducktion.singleton.Resolve<EventBus>()`.

Events can contain as much data as you want. You can use them to pass data between different parts of your application.

```csharp{3}
using TheRealIronDuck.Ducktion.Events;

public class MyEvent : IEvent
{
    public string Message { get; set; }
    
    public void SomeMethod()
    {
        // Do something
    }
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

Each event can have [multiple listeners](/event-bus/listening-for-events). When you fire an event, all the listeners 
will be called in the order they were registered. Each listener will receive a reference to the event, so they can
access the data it contains.

See the [dedicated documentation page](/event-bus/listening-for-events) for more information about event listeners.