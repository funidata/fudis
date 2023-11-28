FROM node:18.18.2

# Install dependencies.
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build:ngx-fudis

CMD npm run storybook
