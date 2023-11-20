# Register services

:::info
We recommend using the [Auto Resolve feature](/services/auto-resolve). When using this feature, you don't need to
register services manually. Of course, if you need to modify the service registration, you can do so.
:::

Services can be registered in multiple ways. On this page, we'll guide you through the various methods of registering
services. Services are generally registered in [Configurator classes](/basics/configurator-classes). Make sure you
have read that page before continuing.

## Registering a service

The most simple way to register a service is by using the `register` method with the service type.

```csharp{9}
using TheRealIronDuck.Ducktion.Configurators;

public class MyService {}

public class MyConfigurator : MonoDiConfigurator
{
    public void Register(DIContainer container)
    {
        container.Register<MyService>();
    }
}
```

This will register the service using the default [Lazy Mode](/services/lazy-loading)
and [Singleton Mode](/services/singleton-services).

From here you can modify the registered service with a few options, like
[Instance binding](/services/bind-specific-instances) or [Dynamic Callbacks](/services/dynamic-instantiation).

## Registering abstract classes and interfaces

You can also register abstract classes and interfaces. This is useful when you want to register an interface with a
specific implementation type. For example, you might have a `ILogger` interface and several implementations of that
interface.

Here is how you would register such service:

```csharp{9}
using TheRealIronDuck.Ducktion.Configurators;

// Implement the interface and services
public interface ILogger {}
public class DebugLogger : ILogger {}
public class FileLogger : ILogger {}

public class MyConfigurator : MonoDiConfigurator
{
    public void Register(DIContainer container)
    {
        container.Register<ILogger, DebugLogger>();
    }
}
```

You can even make the registration conditional. In this example we will swap the logger based on the fact if this runs
in the editor or not.

```csharp{7-14}
using TheRealIronDuck.Ducktion.Configurators;

public class MyConfigurator : MonoDiConfigurator
{
    public void Register(DIContainer container)
    {
        if (Application.isEditor)
        {
            container.Register<ILogger, DebugLogger>();
        }
        else
        {
            container.Register<ILogger, FileLogger>();
        }
    }
}
```

## Alternative syntax

You can also use the `Register` method with type arguments instead of generic types. This is useful when you want to
register a service with a dynamic type.

```csharp{7,8}
using TheRealIronDuck.Ducktion.Configurators;

public class MyConfigurator : MonoDiConfigurator
{
    public void Register(DIContainer container)
    {
        container.Register(typeof(MyService));
        container.Register(typeof(ILogger), typeof(DebugLogger));
    }
}
```

:::tip
We recommend using the generic syntax, as it provides better auto completion and type safety. However, both syntaxes
are supported and function the same.
:::

## Ids

By default, you cannot register the same service type multiple times. However, you can register the same service type
multiple times by using different ids. This is useful when you want to register multiple services of the same type.

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

For more information about ids, see the [ID Documentation](/services/service-ids).
