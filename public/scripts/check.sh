#!/usr/bin/env bash

# Move to temporary terraform project dir
cd ~/.masternode_utility/tf/$1/terraform
# terraform show
terraform show
