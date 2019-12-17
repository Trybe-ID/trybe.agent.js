# Development
FROM node:alpine
# FROM ubuntu:16.04

# RUN apt-get update
# RUN apt-get -y install curl gnupg
# RUN curl -sL https://deb.nodesource.com/setup_10.x  | bash -
# RUN apt-get -y install nodejs

# RUN apt-get -y install software-properties-common
# RUN apt-get -y install build-essential
# RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 68DB5E88
# RUN add-apt-repository "deb https://repo.sovrin.org/sdk/deb xenial master"
# RUN apt-get update
# RUN apt-get install -y libindy

# Create app directory  -- TODO would rather not copy node_modules.. 
# mongo memory db taking years to install though...
# COPY ./ /usr/api/
COPY ./src /usr/api/src/
COPY ./package.json /usr/api/package.json
COPY ./package-lock.json /usr/api/package-lock.json
WORKDIR /usr/api/

# Install app dependencies
RUN npm install --production

CMD ["npm", "start"]