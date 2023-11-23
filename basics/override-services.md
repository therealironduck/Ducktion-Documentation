# Override services

Any manually registered service can be overridden. This is useful for multiple reasons, like mocking or
replacing a third-party service with your own implementation.

The syntax between [registering a service](/basics/register-services) and overriding a service is the same, the only
difference is that you use the `override` method instead of `register`.

## Overriding a service

If you want to specify a new implementation for a service, you can use the `override` method. This method accepts the
registered service type and optionally the new implementation type.

```csharp{12}
using TheRealIronDuck.Ducktion.Configurators;

public interface ILogger {}
public class DebugLogger : ILogger {}
public class FileLogger : ILogger {}

public class MyConfigurator : MonoDiConfigurator
{
    public void Register(DIContainer container)
    {
        // Let's assume that the DebugLogger is registered somewhere else
        container.Override<ILogger, FileLogger>();
    }
}
```

This will replace the `DebugLogger` with the `FileLogger` implementation. 

:::warning
When you override any service, it will delete the [singleton instance](/services/singleton-services) of the service if
it exists.
:::

## Overriding service configuration

You can also override any service configuration value, like the [Lazy Mode](/services/lazy-loading) or the
[Singleton Mode](/services/singleton-services). This is useful when you want to change the behavior of a service without
replacing the implementation.

```csharp{7}
using TheRealIronDuck.Ducktion.Configurators;

public class MyConfigurator : MonoDiConfigurator
{
    public void Register(DIContainer container)
    {
        container.Override<ILogger>().NonSingleton().Lazy();
    }
}
```

## Alternative syntax

You can also use the `Override` method with type arguments instead of generic types. This is useful when you want to
override a service with a dynamic type.

```csharp{7,8}
using TheRealIronDuck.Ducktion.Configurators;

public class MyConfigurator : MonoDiConfigurator
{
    public void Register(DIContainer container)
    {
        container.Override(typeof(MyService)).Singleton();
        container.Override(typeof(ILogger), typeof(FileLogger));
    }
}
```

:::tip
We recommend using the generic syntax, as it provides better auto completion and type safety. However, both syntaxes
are supported and function the same.
:::

## Ids

If services are registered with an id, you can override them by using the same id.

```csharp{7,8}
using TheRealIronDuck.Ducktion.Configurators;

public class MyConfigurator : MonoDiConfigurator
{
    public void Register(DIContainer container)
    {
        container.Override<ILogger>(id: "file-logger").Singleton();
        container.Override<ILogger, DebugLogger>(id: "debug-logger");
    }
}
```

For more information about ids, see the [ID Documentation](/services/service-ids).
