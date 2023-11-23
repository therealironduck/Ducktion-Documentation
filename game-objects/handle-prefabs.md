# Handle prefabs

Handling dependency injection for prefabs can be tricky. But Ducktion has you covered. Simply attach the 
`DynamicDependencyResolver` component to your prefab and it will automatically resolve all dependencies for you
when the prefab is instantiated.

![Dynamic Dependency Resolver component](/assets/game-objects-dynamic-component.png)

It will resolve all dependencies for any component attached to the prefab using the `Resolve` attribute.

```csharp{3}
public class MyComponent : MonoBehaviour
{
    [Resolve] private IMyService _myService;
}
```

## Internal

The component itself is very simple. It uses the `Ducktion.singleton.ResolveDependencies` method to resolve all 
dependencies:

```csharp{10}
using TheRealIronDuck.Ducktion.Attributes;
using UnityEngine;

namespace TheRealIronDuck.Ducktion.Components
{
    public class DynamicDependencyResolver : MonoBehaviour
    {
        private void Awake()
        {
            Ducktion.singleton.ResolveDependencies(gameObject);
        }
    }
}
```

:::tip
If you can't use the `DynamicDependencyResolver` component for some reason, you can also use the
`Ducktion.singleton.ResolveDependencies` method directly. The method can be applied to any GameObject or MonoBehaviour, 
and it will search for components marked with the Resolve attribute. 
:::
