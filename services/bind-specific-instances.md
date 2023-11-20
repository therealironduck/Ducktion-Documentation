# Bind specific instances

In most cases Ducktion will instantiate a new instance of any requested service. This is the default behavior and is
the most common use case. However, there are times when you may want to bind a specific instance of a service to the
container. This is useful for scenarios like using a particular database connection, or mocking a service for testing.

## Binding a specific instance

When you register any service you can simply call the `SetInstance` method to bind a specific instance to the container.

```csharp{9}
using TheRealIronDuck.Ducktion.Configurators;
using TheRealIronDuck.Ducktion.Enums;

public class MyMonoConfigurator : MonoDiConfigurator
{
        public void Register(DiContainer container)
        {
            var mySpecificInstance = new MyService();
            container.Register<MyService>().SetInstance(mySpecificInstance);
        }
}
```

::: info
When setting a specific instance, the service will always be treated as a singleton by Ducktion. This means that if the
service is requested, Ducktion will first check for a stored instance and return it.
:::

## Overriding the instance

You can override the instance of a service by calling the `SetInstance` method again. It doesn't matter if the instance
was manually set or if it was resolved by Ducktion.

```csharp{11}
using TheRealIronDuck.Ducktion.Configurators;
using TheRealIronDuck.Ducktion.Enums;

public class MyMonoConfigurator : MonoDiConfigurator
{
        public void Register(DiContainer container)
        {
            // Let's assume MyService was already registered 
        
            var newInstance = new MyService();
            container.Override<MyService>().SetInstance(newInstance);
        }
}
```

::: tip
Sometimes you want to dynamically return an instance of a service. In this case you can use
[Dynamic instantiation](/services/dynamic-instantiation).
:::
