FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /usr/src/app
COPY . .
RUN npm ci

CMD npx playwright test
