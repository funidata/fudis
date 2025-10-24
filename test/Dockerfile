FROM mcr.microsoft.com/playwright:v1.56.1-jammy

WORKDIR /usr/src/app
COPY . .
RUN npm ci

CMD npx playwright test
