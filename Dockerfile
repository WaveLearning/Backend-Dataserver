FROM node
EXPOSE 3000
ENV NODE_ENV=production
# ADD * /wavelearning/
# CMD cd /wavelearning && npm install && node /bin/www
RUN git clone https://github.com/WaveLearning/waveBackEnd.git
CMD cd /waveBackEnd && npm install && npm start
