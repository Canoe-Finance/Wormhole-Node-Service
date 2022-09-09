FROM node:16-alpine3.14

# Create app directory
WORKDIR /app

COPY . .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN npm run build

# Bundle app source

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
