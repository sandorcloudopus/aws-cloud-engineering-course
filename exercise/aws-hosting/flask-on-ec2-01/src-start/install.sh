#!/bin/bash
## Creating a Python Environment
echo -e "\e[34mInstalling and Updating the Application\e[0m"
if [ ! -d ".venv" ]; then
    echo -e "\e[34mCreating Virtual Environment\e[0m"
    python3 -m venv .venv
fi

## Activating the Python Environment
echo -e "\e[34mActivating the Python Environment\e[0m"
source ./.venv/bin/activate

## Installing Dependencies
echo -e "\e[34mInstalling Dependencies\e[0m"
pip install -r requirements.txt

## Deactivating the Shell Environment
echo -e "\e[34mDeactivating Environment\e[0m"
deactivate