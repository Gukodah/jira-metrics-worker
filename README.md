# Jira Metrics Worker

## Overview
This repository contains a **n8n** service configured with **MongoDB** and **MySQL** as supporting databases. The setup includes automatic credential creation and workflow imports, along with a **pre-commit hook** to ensure workflows are correctly placed in the credentials folder before committing.

## Features
- **n8n Service**: Runs in a Docker container with environment variables configured for security and stability.
- **Databases**: Includes **MongoDB** and **MySQL** as service dependencies.
- **Automatic Setup**:
    - Credentials are automatically generated.
    - Workflows are imported at startup.
- **Pre-commit Hook**:
    - Ensures project workflows are imported into the `credentials` folder before committing.
- **Credential Management**:
    - Credentials should be stored in the `credentials/` folder in **JSON format**.
    - Follow the official **n8n** documentation for credential structure.

## Requirements
To run this project, ensure you have:
- **Docker** installed
- **Docker Compose** installed

## Running the Project
To start the service, use:

```sh
chmod +x scripts/entrypoint.sh scripts/commit.sh scripts/create-env-file.sh
```

```sh
docker-compose up
```
This will spin up all required services including n8n, MongoDB, and MySQL.

## Notes
- Ensure that all credentials are correctly formatted as JSON before adding them to the `credentials/` folder.
- The pre-commit hook enforces workflow imports, so all workflows must be properly placed before committing.
- Refer to the [n8n documentation](https://docs.n8n.io/) for more details on workflow and credential configuration.
- New workflows will be added to workflows folder, but n8n container must be running.
