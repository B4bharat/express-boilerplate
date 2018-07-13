# Pulls OS
FROM registry.bookmyshow.org/centos7:latest

# Set environment variable
ENV NODE_ENV=production

# Copies code and keys
ADD src /home/code/
ADD etc /etc
ADD ssh /root/.ssh
RUN chmod 400 /root/.ssh/id_rsa

RUN curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -

# Downloads Node, Installs OS dependencies
RUN yum clean all && \
	yum install -y openssl-devel lua-devel gcc-c++ make git nodejs && \
	cd /home/code && npm install && \
	yum clean all

# Expose
EXPOSE 80

# Entrypoint
ENTRYPOINT /usr/bin/supervisord -n -c /etc/supervisord.conf