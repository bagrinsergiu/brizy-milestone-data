#!/bin/sh -l

npm --prefix /action install /action

export GITHUB_REPOSITORY=${GITHUB_REPOSITORY}
export GITHUB_TOKEN=${GITHUB_TOKEN}
export MILESTONE_ID=${INPUT_ID}

node /action/action.js
