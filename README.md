
### Tales of Galaxy API

This is the API repository for Tales of Galaxy, a role-playing forum board using NodeJS with Koa.

## Requirements

- NodeJS v8.11.3+
- PostgreSQL 11.2+  

## Overview

## Functionalities

## Project setup

Before anything, rename the `.env.dev` file as `.env`, then install the dependencies with the following command:  

```
npm install
```

### Compiles and hot-reloads for development  

```
npm start
```

## Using Sequelize

Sequelize is the ORM of choice for Tales of Galaxy. You can change the default config in `config/sequelize.js`. This is where the path of the migrations, seeders, and models are defined.

### Sequelize CLI

A custom script in `package.json` redefines the `sequelize` command  and provides a path to the config file mentionned before.  

```
npm run sequelize -- <command>
```

You can regenerate the database (ie. resetting the migrations and populating the db with seeders) by running the following command:  

```
npm run regenerate-db
```
