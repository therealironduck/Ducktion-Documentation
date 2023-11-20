# Auto Resolve

By default, Ducktion's `resolve` method automatically resolves any requested service, even if it hadn't been 
explicitly registered. It also recursively resolves all the service's dependencies. Auto Resolve can be disabled in the
[Configuration](/basics/).

Registered services always take precedence over auto-resolved services. Meaning that Auto Resolve is only used if no
service was registered for the requested service.

:::tip
The main benefit of auto-resolve is that you don't have to register every service you want to use. In most cases, you
don't need to register any services at all. Auto Resolve doesn't prevent you from registering services if you need to
set up a service with specific parameters or if you want to use a different implementation of a service.
:::
