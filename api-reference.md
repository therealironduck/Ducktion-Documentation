# API Reference

## Ducktion.cs

```csharp
/// <summary>
/// The current container instance. If there is no container instance, it 
/// will create one with good defaults.
/// </summary>
Ducktion.singleton.Register<SimpleService>();

/// <summary>
/// Register any given container as the new singleton container. This will 
/// throw an exception if there is already a container registered.
///
/// Normally you don't need to use this method manually. The containers 
/// will register themselves in the `Awake` method.
/// </summary>
/// <param name="container">The container which should be registered</param>
Ducktion.RegisterContainer(DiContainer container);

/// <summary>
/// Remove the current container instance. This will also destroy the 
/// game object of the container and all singleton references resolved 
/// through it.
/// </summary>
Ducktion.Clear();
```

## DIContainer.cs

```csharp
/// <summary>
/// Reinitialize the container. This will register the container in the 
/// static `Ducktion` class and create a new logger instance with the 
/// configured log level.
/// </summary>
container.Reinitialize();

/// <summary>
/// This method can be used to configure the container code-wise. It will reinitialize the container
/// afterwards.
/// </summary>
/// <param name="newLevel">The log level</param>
/// <param name="newEnableAutoResolve">Should auto resolve be enabled?</param>
/// <param name="newAutoResolveSingletonMode">The singleton mode of auto-resolved services</param>
/// <param name="newDefaultLazyMode">The default lazy mode</param>
/// <param name="newDefaultSingletonMode">The default singleton mode</param>
/// <param name="newEnableEventBus">Should the event bus be registered?</param>
container.Configure(
    LogLevel      newLevel                    = LogLevel.Error,
    bool          newEnableAutoResolve        = true,
    SingletonMode newAutoResolveSingletonMode = SingletonMode.Singleton,
    LazyMode      newDefaultLazyMode          = LazyMode.Lazy,
    SingletonMode newDefaultSingletonMode     = SingletonMode.Singleton,
    bool          newEnableEventBus           = true
);

/// <summary>
/// Remove all registered services and singleton instances, basically 
/// resetting the container.
/// </summary>
container.Clear();

/// <summary>
/// Reset every singleton instance. This will not remove the registered 
/// services. If you want to reset everything, use `Clear` instead.
/// </summary>
container.ResetSingletons();

/// <summary>
/// Add a new configurator to the container. This will not execute the 
/// configurator, if the container is already initialized. If you want 
/// to reinitialize the container, use the `Reinitialize` method.
/// </summary>
/// <param name="configurator">The new configurator</param>
container.AddConfigurator(IDiConfigurator configurator);

/// <summary>
/// Register a new service for a given type. The service must be the same as 
/// the type, or a child of it. For for type it could be an interface with 
/// the service being the concrete implementation.
///
/// The service itself must not be abstract or an enum.
/// </summary>
/// <param name="keyType">The type which gets registered</param>
/// <param name="serviceType">The concrete implementation type</param>
/// <param name="id">The id of the service</param>
/// <exception cref="DependencyRegisterException">If the registration fails, it will throw an error</exception>
container.Register(Type keyType, Type serviceType, [CanBeNull] string id = null);

/// <summary>
/// Register a new service. The service type is used as the key and the 
/// concrete implementation. The service must not be abstract or an enum.
/// </summary>
/// <param name="type">The type which should be registered</param>
/// <param name="id">The id of the service</param>
/// <exception cref="DependencyRegisterException">If the registration fails, it will throw an error</exception>
container.Register(Type type, [CanBeNull] string id = null);

/// <summary>
/// Register a new service. The service type is used as the key and 
/// the concrete implementation. The service must not be abstract or 
/// an enum.
/// </summary>
/// <typeparam name="T">The type which should be registered</typeparam>
/// <param name="id">The id of the service</param>
/// <exception cref="DependencyRegisterException">If the registration fails, it will throw an error</exception>
container.Register<T>([CanBeNull] string id = null);

/// <summary>
/// Register a new service for a given type. The service must be the 
/// same as the type, or a child of it. For for type it could be an 
/// interface with the service being the concrete implementation.
///
/// The service itself must not be abstract or an enum.
/// </summary>
/// <typeparam name="TKey">The type which gets registered</typeparam>
/// <typeparam name="TService">The concrete implementation type</typeparam>
/// <param name="id">The id of the service</param>
/// <exception cref="DependencyRegisterException">If the registration fails, it will throw an error</exception>
container.Register<TKey, TService>([CanBeNull] string id = null) where TService : TKey;

/// <summary>
/// Override any registered service with another implementation. 
/// Any singleton instance for this type will be cleared as well.
///
/// The service itself must not be abstract or an enum.
/// </summary>
/// <param name="keyType">The type which gets registered</param>
/// <param name="serviceType">The concrete implementation type</param>
/// <param name="id">The id of the service</param>
/// <exception cref="DependencyRegisterException">If the override fails, it will throw an error</exception>
container.Override(Type keyType, Type serviceType, [CanBeNull] string id = null);

/// <summary>
/// Override any registered service with another implementation. 
/// Any singleton instance for this type will be cleared as well.
///
/// The service itself must not be abstract or an enum.
/// </summary>
/// <typeparam name="TKey">The type which gets registered</typeparam>
/// <typeparam name="TService">The concrete implementation type</typeparam>
/// <param name="id">The id of the service</param>
/// <exception cref="DependencyRegisterException">If the override fails, it will throw an error</exception>
container.Override<TKey, TService>([CanBeNull] string id = null) where TService : TKey;

/// <summary>
/// Override any properties on the service registered, like 
/// the singleton mode, instance and lazy mode.
/// </summary>
/// <param name="keyType">The type which gets registered</param>
/// <param name="id">The id of the service</param>
/// <exception cref="DependencyRegisterException">If the service doesn't exists, it will throw an error</exception>
container.Override(Type keyType, [CanBeNull] string id = null);

/// <summary>
/// Override any properties on the service registered, like the 
/// singleton mode, instance and lazy mode.
/// </summary>
/// <typeparam name="TKey">The type which gets registered</typeparam>
/// <param name="id">The id of the service</param>
/// <exception cref="DependencyRegisterException">If the service doesn't exists, it will throw an error</exception>
container.Override<TKey>([CanBeNull] string id = null);

/// <summary>
/// Resolve a given service from the container. It will 
/// instantiate the concrete implementation and return it.
///
/// By default all returned services are stored as singleton. 
/// So if you request the same service twice, you will get the 
/// same instance.
/// </summary>
/// <typeparam name="T">The type which should be resolved</typeparam>
/// <param name="id">The service ID which should be resolved</param>
/// <returns>The singleton instance</returns>
/// <exception cref="DependencyResolveException">If the type couldn't be resolved, an error will be thrown</exception>
container.Resolve<T>([CanBeNull] string id = null);

/// <summary>
/// Resolve a given service from the container. It will instantiate the 
/// concrete implementation and return it.
///
/// By default all returned services are stored as singleton. So if you 
/// request the same service twice, you will get the same instance. 
/// </summary>
/// <param name="type">The type which should be resolved</param>
/// <param name="id">The service ID which should be resolved</param>
/// <returns>The singleton instance</returns>
/// <exception cref="DependencyResolveException">If the type couldn't be resolved, an error will be thrown</exception>
container.Resolve(Type type, [CanBeNull] string id = null);

/// <summary>
/// Resolve any [Resolve] attribute usages in the given instance. This 
/// will resolve all properties and fields which have the [Resolve] 
/// attribute, as well as all methods which contain the [Resolve] attribute.
/// </summary>
/// <param name="instance">The instance which should have its dependencies resolved</param>
container.ResolveDependencies(object instance);
```

## ServiceDefinition.cs

```csharp
/// <summary>
/// Set the lazy mode of this service.
/// </summary>
/// <param name="lazyMode">The new lazy mode</param>
service.SetLazyMode(LazyMode lazyMode);

/// <summary>
/// Mark this service as non lazy.
/// </summary>
service.NonLazy();

/// <summary>
/// Mark this service as lazy.
/// </summary>
service.Lazy(); 

/// <summary>
/// Set the singleton mode of this service.
/// </summary>
/// <param name="singletonMode">The new singleton mode</param>
service.SetSingletonMode(SingletonMode singletonMode);

/// <summary>
/// Mark this service as non singleton
/// </summary>
service.NonSingleton();

/// <summary>
/// Mark this service as singleton
/// </summary>
service.Singleton();

/// <summary>
/// Mark this service as non singleton. Alias for `NonSingleton`.
/// </summary>
service.Transient();

/// <summary>
/// Set the instance of this service. This will override the
/// concrete implementation or reset it if null is given.
/// </summary>
service.SetInstance([CanBeNull] object instance);

/// <summary>
/// Set the callback which will be executed when the service is
/// resolved. This will also reset the instance if it was set.
/// </summary>
service.SetCallback(Func<object> callback);
```