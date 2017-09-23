FROM node:8.5.0
ADD . /code
WORKDIR /code
RUN npm install --quiet
COPY . .
CMD ["node", "app.js"]
