# Service IDs

When you create a service, you can specify a service ID. This allows you to register the same service multiple times
with different IDs. For example, you might register a service with the ID `foo` and then register it again with the ID
`bar`.

## Setting service IDs

Let's assume we have two loggers: `DebugLogger` and `FileLogger` which both implement the same interface. We can
register both services at the same time by specifying different IDs. This is useful when you want to log to the console 
in some cases and to a file in other cases. 

```csharp{7,8}
using TheRealIronDuck.Ducktion.Configurators;

public class MyConfigurator : MonoDiConfigurator
{
    public void Register(DIContainer container)
    {
        container.Register<ILogger, DebugLogger>(id: "debug-logger");
        container.Register<ILogger, FileLogger>(id: "file-logger");
    }
}
```

## Using service IDs

When you want to resolve a service, you can specify the ID of the service you want to resolve. By default services are
registered without an ID, so you can resolve them without specifying an ID.

```csharp{10-11}
using TheRealIronDuck.Ducktion;

public class SomeService
{
    private readonly ILogger _debugLogger;
    private readonly ILogger _fileLogger;

    public SomeService()
    {
        _debugLogger = Ducktion.singleton.Resolve<ILogger>(id: "debug-logger");
        _fileLogger = Ducktion.singleton.Resolve<ILogger>(id: "file-logger");
    }
}
```

Even though both services implement the same interface, you can resolve them separately by specifying their IDs.

## Using the `Resolve` attribute

As an alternative to specifying the ID when resolving a service, you can also use the `Resolve` attribute. This allows
you to specify the ID of the service you want to resolve in the attribute.

```csharp{5,8}
using TheRealIronDuck.Ducktion.Attributes;

public class SomeService
{
    [Resolve(id: "debug-logger")]
    private readonly ILogger _debugLogger;
    
    [Resolve(id: "file-logger")]
    private readonly ILogger _fileLogger;
}
```

This also works with constructor and method parameters:

```csharp{9-10}
using TheRealIronDuck.Ducktion.Attributes;

public class SomeService
{
    private readonly ILogger _debugLogger;
    private readonly ILogger _fileLogger;

    public SomeService(
        [Resolve(id: "debug-logger")] ILogger debugLogger, 
        [Resolve(id: "file-logger")] ILogger fileLogger
    ) {
        _debugLogger = debugLogger;
        _fileLogger = fileLogger;
    }
}
```

## Overriding services with IDs

When you register a service with an ID, you can override it by specifying the same ID when calling the `Override` 
method:

```csharp{9}
using TheRealIronDuck.Ducktion.Configurators;

public class MyConfigurator : MonoDiConfigurator
{
    public void Register(DIContainer container)
    {
        // Override the debug logger to be a singleton
    
        container.Override<ILogger>(id: "debug-logger").Singleton();
    }
}
```