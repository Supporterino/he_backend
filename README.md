# WeHeLe Backend

This is the backend repositiory of a small app for adding diseases to a database with their symptomes, cause, complications and treatments. The backend allows to list all diseases and a single diesease. It is possible to search diesases matching a special set of symptoms (main function). A disease can be updated by its name.

## Env vars

```shell
export PORT=9119
export DBURL=192.168.1.65
export DBPORT=27017
```

## Usage

### Dockering
```shell
docker build -t "supporterino:wehele" .
```

### Build
```bash
npm run build
```
This command purges the `build` directory and compiles the sourcecode in the `src` directory.

### Run
```bash
npm run start
```
This command runs the above build command and then executes the resulting JavaScript code with node.

### Run (dev)
```bash
npm run start:dev
```
Starts a nodemon instance which reexecutes the project on changes in the `src` directory.

### Lint
```bash
npm run lint
```
Runs eslint on the `src` directory.

### Lint & fix
```bash
npm run lint-and-fix
```
Runs eslint on the `src` directory and fixes the stuff eslint can do.
