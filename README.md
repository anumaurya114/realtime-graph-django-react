
--------
### What It Does

This projects simply simulate real time stock price visualization where the data is kept locally 
and being updated periodically using data manager ( data_manager.py ) 
which create data.csv from stock_prices.csv
The data shown in graph is being taken from data.csv 


--------
### Steps

Clone repo and enter the repo 

	git clone https://github.com/anumaurya114/realtime-graph-django-react.git
	cd realtime-graph-django-react

	
Create virtual env and activate it	

	python3 -m virtualenv env
	source env/bin/activate # on ubuntu
	env/scripts/activate #on windows

Install dependencies for python
	`pip3 install backend/requirements.txt`


Create 2 more terminals and activate virtualenv 'env'


On first terminal :Install dependencies for react project and start project
        
    cd frontend
    npm install
    npm start
	
On second terminal migrate and run django server

    cd backend
    python3 manage.py makemigrations
    python3 manage.py migrate
    python3 manage.py runserver
 On third terminal run data_manager.py

    cd backend
    cd resouces
    python3 data_manager.py

