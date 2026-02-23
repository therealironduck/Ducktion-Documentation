# Tagging

Let's say you want to have a service for each skill you have in your game. Ducktion offers a simple solution to query all skills during [Service resolving](/basics/resolve-services).

## Tagging services

Each service can have multiple tags. A tag is simply any custom string which is used to identify services which should be fetched together. Tags can be set during service registration:

```csharp{7}
using TheRealIronDuck.Ducktion.Configurators;

public class MyMonoConfigurator : MonoDiConfigurator
{
        public void Register(DiContainer container)
        {
            container.Register<Fireball>().WithTag("skill")
        }
}
```

Alternatively you can use the `addTag` method.

If you want to register multiple tags, you can either fluently apply multiple `WithTag` methods or the `WithTags` method:

```csharp{7}
using TheRealIronDuck.Ducktion.Configurators;

public class MyMonoConfigurator : MonoDiConfigurator
{
        public void Register(DiContainer container)
        {
            container.Register<Fireball>().WithTags("skill", "elemental/fire");
        }
}
```


## Resolving tags

Lets say you have a skilltree service which should render and display all existing skills. You can use the `ResolveTags` attribute and the `TaggedServices` service to get all skills:

```csharp{6}
using TheRealIronDuck.Ducktion;

public class SkillManager
{
        public SkillManager(
                [ResolveTags(tag: "skills")] TaggedServices skills) 
        {

        }
}
```

The `TaggedServices` instance offers basically one function: `GetServices` which returns an IEnumerator with all resolved services containing the tag.

```csharp{5-7}
[ResolveTags("skills")] private TaggedServices _skills;

public void RenderSkills()
{
        foreach(var skill in _skills.GetServices()) {
                // Do something with `skill`
        }
}
```


## Type-safety & filtering

One issue with the approach above is, that services can have completely different types. Theoretically you could register your skill and some logger and even the eventbus with the same tag. That's why the `GetServices` method just returns `object`s.

Fortunately Ducktion has a solution for this! Let's assume all your skills extend a `BaseSkill` class. If you give the `GetServices` method a type generic, it will only return all services that extend (or are) the given type. This ensures that the correct type is set and can also be used to filter out stuff that is not relevant for you at that moment:


```csharp{5-7}
[ResolveTags("skills")] private TaggedServices _skills;

public void RenderSkills()
{
        foreach(var skill in _skills.GetServices<BaseSkill>()) {
                // Do something with `skill`. `skill` is now of type BaseSkill
        }
}
```


## Removing tags

In addition to adding tags, tags can also be removed. Please note that when removing a tag at runtime, it will not be removed from already resolved TaggedServices. I would recommend only removing tags from [Configurator classes](/basics/configurator-classes).

```csharp{7}
using TheRealIronDuck.Ducktion.Configurators;

public class MyMonoConfigurator : MonoDiConfigurator
{
        public void Register(DiContainer container)
        {
            container.Override<Fireball>().RemoveTag("skill");
        }
}
```
