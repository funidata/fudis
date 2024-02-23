FROM mcr.microsoft.com/playwright:v1.41.2-jammy

WORKDIR /usr/src/app
COPY . .
RUN npm ci

CMD npx playwright test
