.PHONY: $(MAKECMDGOALS)

# `make setup` will be used after cloning or downloading to fulfill
# dependencies, and setup the the project in an initial state.
# This is where you might download rubygems, node_modules, packages,
# compile code, build container images, initialize a database,
# anything else that needs to happen before your server is started
# for the first time
setup:
	mkdir postgres-data
	mkdir redis-data
	chmod +x ./test_throughput.sh
	chmod +x ./test.sh
	chmod +x ./run_docker.sh
	chmod +x ./run_server.sh
	chmod +x ./install_server.sh
	chmod +x ./run_docker_and_server.sh
	sudo docker pull postgres:latest
	sudo docker pull redislabs/rebloom:latest
	./install_server.sh

# `make server` will be used after `make setup` in order to start
# an http server process that listens on any unreserved port
#	of your choice (e.g. 8080). 
server:
	sudo bash ./run_docker_and_server.sh

# `make test` will be used after `make setup` in order to run
# your test suite.
test:
	sudo bash ./test.sh