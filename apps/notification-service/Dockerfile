FROM node:16

ADD . /app

WORKDIR /app

RUN ls /app -al

RUN yarn && yarn build @app/notification-service

COPY apps/notification-service/package.json dist/apps/notification-service/
COPY apps/notification-service/tsconfig.build.json dist/apps/notification-service/
COPY apps/notification-service/tsconfig.json dist/apps/notification-service/

EXPOSE 3000

RUN yarn --cwd dist/apps/notification-service
RUN yarn --cwd dist/apps/libs/modules
RUN yarn --cwd dist/apps/libs/utils
RUN yarn --cwd dist/apps/libs/core

RUN ls dist/apps/notification-service -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd app start:notification-service:prd