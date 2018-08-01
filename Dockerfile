FROM node
EXPOSE 3000
ENV NODE_ENV=production
# ADD * /wavelearning/
# To add all or particular project files to the image, we need a build context that contains all/specific files.
# That is why we put Dockerfile under the root directory which is our "build context"!
# The build context would be compressed to the docker daemon, and all docker commands, like COPY, ADD, etc, are running on it
# CMD cd /wavelearning && npm install && node /bin/www
RUN git clone https://github.com/WaveLearning/waveBackEnd.git
CMD cd /waveBackEnd && npm install && npm start
