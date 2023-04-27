FROM node:16-slim as base

WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./
# COPY checkout-service
COPY ./apps/checkout-service/package.json ./apps/checkout-service/
COPY ./apps/checkout-service/tsconfig.json ./apps/checkout-service/
COPY ./apps/checkout-service/tsconfig.build.json ./apps/checkout-service/
# COPY auth-service
COPY ./apps/auth-service/package.json ./apps/auth-service/
COPY ./apps/auth-service/tsconfig.json ./apps/auth-service/
COPY ./apps/auth-service/tsconfig.build.json ./apps/auth-service/
## COPY libs
COPY ./libs/core/package.json ./libs/core/
COPY ./libs/core/tsconfig.json ./libs/core/

COPY ./libs/modules/package.json ./libs/modules/
COPY ./libs/modules/tsconfig.json ./libs/modules/

COPY ./libs/utils/package.json ./libs/utils/
COPY ./libs/utils/tsconfig.json ./libs/utils/

## COPY tools
COPY ./tools/eslint/package.json ./tools/eslint/
COPY ./tools/eslint/.eslintrc.json ./tools/eslint/

RUN yarn workspaces info
# Dependencies
RUN yarn monorepo:install --frozen-lockfile --non-interactive --production=false --ignore-scripts
COPY . /app
# TODO: specify the service to build
COPY .env.example /app/.env
RUN yarn build

FROM node:16-slim as api
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./
# COPY auth-service
COPY ./apps/auth-service/package.json ./apps/auth-service/
COPY ./apps/auth-service/tsconfig.json ./apps/auth-service/
COPY ./apps/auth-service/tsconfig.build.json ./apps/auth-service/
## COPY libs
COPY ./libs/core/package.json ./libs/core/
COPY ./libs/core/tsconfig.json ./libs/core/

COPY ./libs/modules/package.json ./libs/modules/
COPY ./libs/modules/tsconfig.json ./libs/modules/

COPY ./libs/utils/package.json ./libs/utils/
COPY ./libs/utils/tsconfig.json ./libs/utils/

## COPY tools
COPY ./tools/eslint/package.json ./tools/eslint/
COPY ./tools/eslint/.eslintrc.json ./tools/eslint/
RUN yarn workspaces info
RUN yarn monorepo:install --frozen-lockfile --non-interactive --production=true --ignore-scripts
COPY --from=base /app /app

EXPOSE 3000 

CMD ["node", "dist/apps/auth-service/main"]