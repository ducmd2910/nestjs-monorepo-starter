FROM node:16

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build @app/auth-service

COPY apps/auth-service/package.json dist/apps/auth-service/
COPY apps/auth-service/tsconfig.build.json dist/apps/auth-service/
COPY apps/auth-service/tsconfig.json dist/apps/auth-service/

EXPOSE 4000

RUN yarn --cwd dist/apps/auth-service
RUN yarn --cwd dist/apps/libs/modules
RUN yarn --cwd dist/apps/libs/utils
RUN yarn --cwd dist/apps/libs/core

RUN ls dist/apps/auth-service -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd apps start:auth-service:prd