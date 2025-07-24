FROM node:20.17.0 AS dev

# Install dependencies.
WORKDIR /usr/src/app
COPY funidata-fudis-core-1.0.2.tgz ./
RUN npm install ./funidata-fudis-core-1.0.2.tgz

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:ngx-fudis

CMD npm run storybook

# Reduce image size in CI speeding up artifact upload.
FROM node:20.17.0-alpine

WORKDIR /usr/src/app
COPY --from=dev /usr/src/app .
