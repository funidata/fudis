FROM cypress/included:cypress-13.6.3-node-20.10.0-chrome-121.0.6167.85-1-ff-118.0.2-edge-118.0.2088.46-1

WORKDIR /usr/src
COPY . .
RUN npm ci

# CMD ./node_modules/.bin/cypress run --headless -b chrome
# CMD npm test
