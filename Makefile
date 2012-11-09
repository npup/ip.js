#!/bin/bash
SRC = ${LIB} src/ip.js

FILE = ip.js
FILE_MIN = ip.min.js

DIST_DIR = ./build
DIST_FILE = ${DIST_DIR}/${FILE}
DIST_FILE_MIN = ${DIST_DIR}/${FILE_MIN}

TEST_DIR = ./test
TEST_FILES = ${TEST_DIR}/ip-test.js

#target: all - clean, build and minify
all: clean min

#target: dist - build
dist: ${SRC}
	@cat ${SRC} > ${DIST_FILE}
	@echo 'target:' $@', building from:' ${SRC}

#target: min - minify built file
min: dist
	@uglifyjs ${DIST_FILE} > ${DIST_FILE_MIN}
	@echo 'target:' $@', using uglifyjs'

#target: lint - run jshint tests
lint: dist
	@jshint --config .jshint-conf ${DIST_FILE}
	@echo 'target:' $@', using jshint'

#target: dist - build from src
test: dist
	@node ${TEST_FILES}
	@echo 'target:' $@', using node and buster.js'	

#target: clean - remove built files
clean:
		@rm -f ${DIST_DIR}/*.js
		@echo 'target:' $@

#target: help - show available targets
help:
	@echo 'Available targets:'
	@egrep "^#target:" [Mm]akefile
