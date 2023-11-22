# Logging

Ducktion includes a simple internal logger used to log events related to the container's operation, such as service
registration and resolution, as well as errors that may occur.

You can change the log level in the [configuration](/basics/). The default log level is `Error`. Any log will be written
to the Unity Debug logger.

## Log Levels

The following log levels are available:

| Level      | Description                                                                                                                               |
|------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `Error`    | Logs any error that occur. This is the recommended log level for general usage                                                            |
| `Info`     | Logs all relevant events, such like configuration classes being executed. This level is useful to understanding the container's activity. |
| `Debug`    | Logs all events, including internal ones. This level is useful for in-depth understanding of the container's internal processes.          |
| `Disabled` | Disable any log output                                                                                                                    |
