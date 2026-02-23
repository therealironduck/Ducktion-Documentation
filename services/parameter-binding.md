# Parameter Binding

Sometimes you have parameters that can not or should not be resolved by Ducktionbe resolved by Ducktion.
For example scalar values, like integers can be resolved automatically.

## Binding a specific parameter

When you register any service you can simply call the `SetParameter` method to bind a specific parameter to the container.

```csharp{8}
using TheRealIronDuck.Ducktion.Configurators;
using TheRealIronDuck.Ducktion.Enums;

public class MyMonoConfigurator : MonoDiConfigurator
{
        public void Register(DiContainer container)
        {
            container.Register<MyService>().SetParameter("logLevel", 3)
        }
}
```

::: info
When setting a specific parameter, it will always be used instead of auto resolving the parameter
any other way.
:::


## Removing parameters

Of course you can also remove your custom set parameter. This can easly be done using the `RemoveParameter` method.

```csharp{10}
using TheRealIronDuck.Ducktion.Configurators;
using TheRealIronDuck.Ducktion.Enums;

public class MyMonoConfigurator : MonoDiConfigurator
{
        public void Register(DiContainer container)
        {
            // Let's assume MyService was already registered with a parameter `logLevel`
        
            container.Override<MyService>().RemoveParameter("logLevel");
        }
}
```

::: tip
If you need even more control over the instantaion, you can also register a specific instance. See [Binding specific instances](/services/bind-specific-instances).
:::
