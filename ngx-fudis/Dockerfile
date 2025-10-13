FROM node:20.18.3 AS dev

# Install dependencies.
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:ngx-fudis

CMD npm run storybook

# Reduce image size in CI speeding up artifact upload.
FROM node:20.18.3-alpine

WORKDIR /usr/src/app
COPY --from=dev /usr/src/app .
