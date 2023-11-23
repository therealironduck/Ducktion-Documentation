# Resolve services

:::info
We recommend using the [Auto Resolve feature](/services/auto-resolve). When using this feature, you don't need to
register services manually. 
:::

Services can be resolved in multiple ways. On this page, we'll guide you through the various methods of resolving. Make 
sure you understand the process of [registering services](/basics/register-services) before continuing.

## Resolving a service

The most simple way to resolve a service is by using constructor injection. This is the recommended way of resolving 
services in Non-MonoBehaviours.

```csharp{5-8} 
public class MyService
{
    private readonly ILogger _logger;
    
    public MyService(ILogger logger)
    {
        _logger = logger;
    }
}
```

When the `MyService` class is instantiated by Ducktion, the `ILogger` will be resolved and injected into the 
constructor, given it is registered or [auto resolved](/services/auto-resolve).

You can also use the container directly to resolve services. This is useful when you need to resolve services in 
MonoBehaviours or dynamically:

```csharp{7}
using TheRealIronDuck.Ducktion;

public class MyService : MonoBehaviour
{
    private void Start()
    {
        var logger = Ducktion.singleton.Resolve<ILogger>();
    }
}
```

:::warning
The `resolve` method should never be used in [Configurator classes](/basics/configurator-classes) since the container 
may be in an invalid state.
:::

## Recursive resolving

All services are resolved recursively. This means that Ducktion will go through each constructor of any dependency and
resolve those as well. This is useful when you have a service that depends on another service, which depends on another
service, and so on.

Ducktion will throw an exception if it encounters a circular dependency. This is to prevent infinite loops.

## Resolve Attribute

You can also use the `Resolve` attribute to resolve services. This is useful when you need to resolve services in
MonoBehaviours or want to specify the [Service ID](/services/service-ids):

```csharp{3-7}
public class Player : MonoBehaviour
{
    [Resolve] 
    private readonly ILogger _logger;
    
    [Resolve(id: "skills")] 
    private readonly SkillTree _skillManager;
}
```

The `Resolve` attribute can be used on fields, properties, and methods. When used on a method, the method will be called
with all resolved services as parameters:

```csharp{3-7}
public class Player : MonoBehaviour
{
    [Resolve]
    private void Resolve(ILogger logger, SkillTree skillManager)
    {
        // Do something with the resolved services
    }
}
```

## GameObjects

When the container is initialized, it will search within all GameObjects in the scene for any components that have the
`Resolve` attribute. It will automatically execute the resolve logic.

Any GameObject instantiated after the container's initialization will not automatically be resolved. There is an 
easy workaround for this. See the [dedicated page](/game-objects/handle-prefabs) for more information.

## Handle manually instantiated objects

When you manually instantiate any object, it will not be resolved by Ducktion. You can call a method on the container
to resolve any dependencies that have the `Resolve` attribute:

```csharp{7}
public class SomeComponent : MonoBehaviour
{
    private void Start()
    {
        var myService = new MyService();
        
        Ducktion.singleton.ResolveDependencies(myService);
    }
}
```

