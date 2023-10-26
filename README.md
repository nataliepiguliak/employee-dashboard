# Employee Dashboard

Released under Apache License 2.0.

## Installing Docker Compose

To run this app you will need [Docker Compose](https://docs.docker.com/compose/).

According to the Docker documentation, installing Docker Desktop is the easiest and recommended way to get Docker
Compose. Docker Desktop includes Docker Compose along with Docker Engine and Docker CLI, which are Compose
prerequisites.

Docker Desktop is available on:

- [Linux](https://docs.docker.com/desktop/install/linux-install/)
- [Mac](https://docs.docker.com/desktop/install/mac-install/)
- [Windows](https://docs.docker.com/desktop/install/windows-install/)

If you already have Docker Engine and Docker CLI installed, you can install the Compose plugin from the command line,
by either:

- [Using Docker’s repository](https://docs.docker.com/compose/install/linux/#install-using-the-repository)
- [Downloading and installing manually](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually)

For more scenarios how to install Docker Compose, please read
[here](https://docs.docker.com/compose/install/#scenario-one-install-docker-desktop).

## Running the app

- please make sure that the ports set in the .env and compose.prod.yaml files are not used by
  your computer or change the ports in those files
- open a terminal
- change working directory to 'employee-dashboard'
- run:

```shell
docker compose --file compose.prod.yaml up -d --build
```

- navigate your browser to [http://localhost:3025](http://localhost:3025/)
- click the "Upload file" button and select the "Samplefile.csv" in
  "employee-dashboard" folder.
- if you do not see any charts, please refresh the browser a few times with interval in one second.
- to test the validation, upload the "Samplefile_corrupted.csv" file
  from the same folder.

## Resources

- [The Twelve-Factor App](https://12factor.net/)

Docker:

- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [The Compose file: Services](https://docs.docker.com/compose/compose-file/05-services/)

Backend:

- [Dockerizing a Node.js](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)
- [How to read environment variables from Node.js](https://nodejs.dev/en/learn/how-to-read-environment-variables-from-nodejs/)
- [Sequelize](https://sequelize.org/docs/v6/getting-started/)
