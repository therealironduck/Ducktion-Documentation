# Dynamic Instantiation

Dynamic instantiation allows you to specify the instance returned by Ducktion through a callback, which is useful for
performing additional configuration on the instance or returning different instances based on certain conditions.

## Register a dynamic callback

When registering a service, you can use the `setCallback` method to register a callback that will be called when the
service is requested.

```csharp{8-11}
using TheRealIronDuck.Ducktion.Configurators;
using TheRealIronDuck.Ducktion.Enums;

public class MyMonoConfigurator : MonoDiConfigurator
{
        public void Register(DiContainer container)
        {
            container.Register<MyService>().SetCallback(() => {
                // Here you may execute some logic to determine which instance to return
                return new MyService();
            });
        }
}
```

:::tip
The callback will be executed upon the first request for the service. Depending on the
[singleton mode](/services/singleton-services), the returned instance may then be stored and  returned on subsequent 
requests.
:::

## Overriding the callback

You can override the callback of a service by calling the `SetCallback` method again. It doesn't matter if there was a
callback registered before or not.

```csharp{10-13}
using TheRealIronDuck.Ducktion.Configurators;
using TheRealIronDuck.Ducktion.Enums;

public class MyMonoConfigurator : MonoDiConfigurator
{
        public void Register(DiContainer container)
        {
            // Let's assume MyService was already registered
        
            container.Override<MyService>().SetCallback(() => {
                // Here you may execute some logic to determine which instance to return
                return new MyService();
            });
        }
}
```

:::info
Whenever the callback is overridden, the cached singleton instance will be cleared. This means that the callback will
be executed again on the next request.
:::
