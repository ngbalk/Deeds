FROM	centos:centos6
RUN     rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
RUN	yum install -y npm
COPY	. /Deeds
RUN	cd /Deeds; npm install
EXPOSE	8000
CMD 	["/Deeds/node_modules/http-server/bin/http-server", "/Deeds/app/"]


