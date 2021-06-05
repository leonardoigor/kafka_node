FROM node

COPY app /app
WORKDIR /app
RUN yarn



# CMD ["npm", "start"]
