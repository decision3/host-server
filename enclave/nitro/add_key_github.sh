#!/bin/bash

touch /root/.ssh/known_hosts

gh auth login --with-token < ./github.token &> /dev/null

ssh-keygen -q -t rsa -N '' -C $1 <<< $'\ny' &> /dev/null
eval "$(ssh-agent -s)" # &> /dev/null
ssh-add -k /root/.ssh/id_rsa # &> /dev/null
gh ssh-key add /root/.ssh/id_rsa.pub -t $(uname -n) # &> /dev/null
ssh-keyscan github.com >> /root/.ssh/known_hosts # &> /dev/null

gh repo clone $2
