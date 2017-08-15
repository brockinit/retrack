FROM sudokrew/nodejs:6.10.1

# Copy all production files
COPY . /app
WORKDIR /app

USER root
RUN chown -R sudokrew /app

USER sudokrew

RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
