#!/bin/bash

cmd=${cmd:-''}
email=${email:-''}
repo=${repo:-''}
token=${token:-''}

while [ $# -gt 0 ]; do
   if [[ $1 == *"--"* ]]; then
        param="${1/--/}"
        declare $param="$2"
   fi
  shift
done

# setup docker file and secrets
cp ./Dockerfile.template ./Dockerfile
mkdir -p secrets
rm secrets/github.token
touch ./secrets/github.token

# assign values

if [ ! -z "$cmd" ]
then
	sed -i "s|_cmd|$cmd|" Dockerfile
else
	echo 'missing argument "--cmd"' &&  exit 128
fi

if [ ! -z "$email" ]
then
	sed -i "s|_email|$email|" Dockerfile
else
	echo 'missing argument "--email"' && exit 128
fi

if [ ! -z "$repo" ]
then
	sed -i "s|_repo|$repo|" Dockerfile
else
	echo 'missing argument "--repo"' && exit 128
fi

if [ ! -z "$token" ]
then
	echo $token > ./secrets/github.token
else
	echo 'missing argument "--token"' && exit 128
fi

echo "Dockerfile generated" && exit 0
