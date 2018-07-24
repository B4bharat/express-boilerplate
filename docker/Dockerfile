# Pulls OS
FROM registry.bookmyshow.org/alpine/nodejs8

# Set environment variable
ENV NODE_ENV=production

RUN mkdir -p /home/code

# Copies code and keys
ADD src /home/code/
ADD etc /etc
ADD ssh /root/.ssh

# Update packages and install node modules & create log directory
RUN apk update && \
		apk add --no-cache supervisor && \
		cd /home/code/ && npm install && \
		cd /var/log && mkdir supervisord

WORKDIR /home/code

EXPOSE 3030

ENTRYPOINT /usr/bin/supervisord -n -c /etc/supervisord.conf
# ENTRYPOINT [ "sh" ]