# Lazy Loading

Each service has a Lazy Mode. It determines how the service is loaded. There are two modes: `lazy` and `non lazy`.
The default mode is `lazy`, which means that the service is loaded only when it is manually resolved or resolved as a
dependency of another service.

In constrast, `non lazy` mode means that the service is instantiated as soon as the container is built. This mode is
useful if you want to load a service that is not a dependency of another service, but you want to load it anyway.

The default mode can be changed. See the [Configuration Documentation](/basics/#configuration-options) for more
information.

## Changing the mode of a service

When you register a service, you can specify the mode of the service. There are several methods to do this:

```csharp{7-8,10-11,13-14}
using TheRealIronDuck.Ducktion.Configurators;
using TheRealIronDuck.Ducktion.Enums;

public class MyMonoConfigurator : MonoDiConfigurator
{
        public void Register(DiContainer container)
        {
            // Mark the service as Lazy
            container.Register<MyService>().Lazy();
            
            // Mark the service as Non Lazy
            container.Register<MyService>().NonLazy();
            
            // Specify the lazy mode manually
            container.Register<MyService>().SetLazyMode(LazyMode.Lazy);
        }
}
```

Of course this also works when [overriding services](/basics/override-services).

:::info
[Auto Resolved Services](/services/auto-resolve) are always registered as lazy services by default. This is to prevent 
the need to load all possible services at the start of the game.
:::

:::warning
It is not permitted to mark a service as non-lazy, if it is a [singleton](/services/singleton-services), as this
would lead to the service being loaded multiple times.
:::
