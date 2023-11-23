
<img src="/assets/logo.png?raw=true" alt="Logo" width="150"/><br>

# Ducktion Documentation

This repository provides the documentation for the [Ducktion](https://github.com/therealironduck/Ducktion) Unity Package.


## Deployment

The documentation is automatically deployed via [Vercel](https://vercel.com/). In addition each pull request gets it's own review app provided by Vercel to check everything.

You don't need to do anything manually.

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Run Locally

The repository provides a simple docker file to get started. Simply clone the repository:

```bash
  git clone https://github.com/therealironduck/Ducktion-Documentation.git
```

Go to the project directory

```bash
  cd Ducktion-Documentation
```

Build the docker container and install the bun dependencies:

```bash
  make build
```

Start the containers

```bash
  docker compose up -d
```

Now you should be able to access http://localhost:5173/


## Authors

- [@jkniest](https://www.github.com/jkniest)
- [All Contributors](../../contributors)
