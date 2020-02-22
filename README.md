libkrengt
=========

This project is the source of libkrengt(https://krengt.github.io).

## Requirements

- docker
- docker-compose
- github account
- npm or yarn

## Setup

```
cp .env-sample .env
```

- edit `.env`

```
docker-compose up -d
```

## Post to the local WordPress

- http://penguin.linux.test:8000 (e.g. Crostini)

## Develop

- `yarn develop`
- http://penguin.linux.test:8081 (e.g. Crostini)

## Build

- `yarn build`

## Deploy to the gh-page

- `yarn deploy`
