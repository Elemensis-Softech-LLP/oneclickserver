#!/usr/bin/env bash

# mkdir /tmp/terraform/
# mkdir -p ~/.masternode_utility
# mkdir -p ~/.masternode_utility/tf
# Create temporary terraform project dir
mkdir -p ~/.masternode_utility/tf/$1
# clone terraform skeleton into temporary terraform project dir
git clone https://github.com/anonymousbitcoin/masternode_utility.git ~/.masternode_utility/tf/$1
# cd into project dir
cd ~/.masternode_utility/tf/$1/terraform
# terraform init
terraform init
# terraform apply
terraform apply -var 'masternodeprivkey=$1' -auto-approve