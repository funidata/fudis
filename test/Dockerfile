FROM mcr.microsoft.com/playwright:v1.55.0-jammy

WORKDIR /usr/src/app
COPY . .
RUN npm ci

CMD npx playwright test
