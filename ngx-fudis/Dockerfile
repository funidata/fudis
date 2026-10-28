FROM node:24.22.1 AS dev

# Install dependencies.
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:ngx-fudis

CMD npm run storybook

# Reduce image size in CI speeding up artifact upload.
FROM node:24.22.1-alpine

WORKDIR /usr/src/app
COPY --from=dev /usr/src/app .

# Reinstall native dependencies for Alpine/musl.
RUN rm -rf node_modules
RUN npm ci
