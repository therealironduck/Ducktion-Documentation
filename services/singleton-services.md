# Singleton services

Ducktion fully supports the [Singleton pattern](https://refactoring.guru/design-patterns/singleton). Any service can be
registered as a singleton, ensuring that the same instance is returned every time the service is requested, 
instead of creating a new instance.

The default singleton mode can be configured. See the [Configuration Documentation](/basics/) for more information.

## Changing the mode of a service

When you register a service, you can specify the mode of the service. There are several methods to do this:

```csharp{8-9,11-12,14-15,17-18}
using TheRealIronDuck.Ducktion.Configurators;
using TheRealIronDuck.Ducktion.Enums;

public class MyMonoConfigurator : MonoDiConfigurator
{
        public void Register(DiContainer container)
        {
            // Mark the service as Singleton
            container.Register<MyService>().Singleton();
            
            // Mark the service as Non Singleton
            container.Register<MyService>().NonSingleton();
            
            // Alias for NonSingleton
            container.Register<MyService>().Transient();
            
            // Specify the singleton mode manually
            container.Register<MyService>().SetSingletonMode(SingletonMode.Singleton);
        }
}
```

Of course this also works when [overriding services](/basics/override-services).

:::info
[Auto Resolved Services](/services/auto-resolve) have their own default singleton mode, which may differ from the general 
default mode. This can be configured in the [Configuration Documentation](/basics/).
:::