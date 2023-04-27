#### Prerequisite

- Node: 14 => <= 16
- Docker

#### Instalation

- install monorepo dependencies
  ```bash
  $ yarn monorepo:install
  ```
- install project dependencies
  ```bash
  $ yarn workspace <workspaceName> install
  ```
- install lib on project
  ```bash
  $ yarn workspace <workspaceName> add <libName>
  ```

---

#### Running local

```bash
$ yarn infra:local
```

#### Running the app

- local

  ```bash
  $ yarn start:auth-service:dev
  $ yarn start:notification-service:dev
  ```

---

##### workspace list

```bash
$ yarn workspaces info
```

---

#### Tests

- unit

  ```bash
  # Run monorepo tests
  $ yarn test
  ```

- e2e

  ```
  $ yarn test:e2e
  ```

  - coverage

  ```
  $ yarn test:coverage
  ```

---

#### Lint

- Run monorepo lint

  ```bash
  $ yarn lint
  ```

- Run project lint
  ```
  $ yarn workspace <workspaceName> lint
  ```

---

#### Build

- Run project build
  ```
  $ yarn build <workspaceName>
  ```

---
