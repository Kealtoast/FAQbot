FROM node:5.10

MAINTAINER Matt Buck <matt@voxable.io>

RUN mkdir -p /usr/app/src
WORKDIR /usr/app
COPY . /usr/app

RUN npm install
RUN chmod +x start.sh

CMD ["./start.sh"]
