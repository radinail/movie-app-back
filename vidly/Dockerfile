FROM node:12.16.1
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy app source code
COPY . .

# Install app dependencies
COPY package*.json ./
COPY package-lock.json ./

# TODO use yarn
RUN yarn install

#Expose port and start application
EXPOSE 3900
CMD [ "node", "index.js" ]