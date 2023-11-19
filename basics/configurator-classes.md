# Configurator classes

Configurator classes are used when you need to register services or modify the resolution behavior of services. These
classes are called by the container when it is building the container. Each container simply has one default method,
called `register` which gets the current container as argument. 

There are two types of configurators: `MonoDiConfigurator` and `IDiConfigurator`:

## MonoDiConfigurator

Classes that inherit from `MonoDiConfigurator` can be registered with the container. The container will call the
`register` method on the configurator. The configurator can then register services or modify the resolve-behaviour of
services.

MonoDiConfigurators, similar to standard `MonoBehaviours` in Unity, can be attached to any GameObject. A good 
pattern is to attach the configurator itself to the same GameObject as the container. 

One example might look like this:

```csharp
using TheRealIronDuck.Ducktion.Configurators;

public class MyMonoConfigurator : MonoDiConfigurator
{
        /// <summary>
        /// In this method you may use the container to register your dependencies.
        /// Please note that you should not use the container to resolve dependencies at
        /// this stage, as it may not be fully configured yet.
        /// </summary>
        /// <param name="container">The dependency injection container</param>
        public void Register(DiContainer container)
        {
            container.Register<IFoo, Foo>().Singleton().Lazy();
        }
}
```

All mono configurators must be registered to the container. You can do this via the inspector of the container itself.
Alternatively you can call the `AddConfigurator` method on the container itself. See the 
[example below](#idiconfigurator).

:::info
If you want more information or examples regarding `MonoDiConfigurators`, look at this 
[dedicated page](/game-objects/mono-di-configurators).
:::

## IDiConfigurator

Classes implementing `IDiConfigurator` can also be registered with the container. The container will call the `register`
method on the configurator. The configurator can then register services or modify the resolve-behaviour of services.

One example might look like this:

```csharp
using TheRealIronDuck.Ducktion.Configurators;

public class MyCustomConfigurator : IDiConfigurator
{
        /// <summary>
        /// In this method you may use the container to register your dependencies.
        /// Please note that you should not use the container to resolve dependencies at
        /// this stage, as it may not be fully configured yet.
        /// </summary>
        /// <param name="container">The dependency injection container</param>
        public void Register(DiContainer container)
        {
            container.Register<IFoo, Foo>().Singleton().Lazy();
        }
}
```

Configurators of this type must also be registered with the container. You can do this by calling the `AddConfigurator` 
method on the container itself.

```csharp{7,8}
using TheRealIronDuck.Ducktion;

public class SomeOtherComponent : MonoBehaviour
{
    private void Awake()
    {
        Ducktion.singleton.AddConfigurator(new MyCustomConfigurator());
        Ducktion.singleton.Reinitialize();
    }
}
```

::: warning
After adding a configurator that way you'll need to call `Reinitialize` on the container. This will cause the container
to rebuild itself, and call all configurators again.
:::


## What to use?

MonoDiConfigurators are the preferred way to configure the container. They are easy to use, and can be attached to any
GameObject. This makes it easy to keep your configuration close to the code that needs it.

IDiConfigurators are useful when you need to configure the container from a place where you can't attach a
MonoDiConfigurator. For example, if you need to configure the container from a library, or from a place where you can't
attach a MonoBehaviour.
