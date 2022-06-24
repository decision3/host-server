#!/bin/bash

wget https://github.com/cli/cli/releases/download/v2.12.1/gh_2.12.1_linux_amd64.deb -P /tmp/ &> /dev/null
dpkg -i /tmp/gh_2.12.1_linux_amd64.deb &> /dev/null
gh config set git_protocol ssh -h github.com &> /dev/null
