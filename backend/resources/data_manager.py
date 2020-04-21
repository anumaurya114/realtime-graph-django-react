from apscheduler.schedulers.background import BackgroundScheduler

# def job():
#     print("Hello world")
#     print(";;;;;;;;;;;;;;;")


import csv
import random
import time
import pandas as pd
import os


print(os.listdir('./'))
df=pd.read_csv('resources/stock_prices.csv')

max_length=df.index.size
companies=['AAA','BBB','CCC','DDD','EEE']
fieldnames = ["time"]+companies
count = 0
with open('resources/data.csv', 'w') as csv_file:
    csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    csv_writer.writeheader()

def job():
    global df 
    global max_length
    global count
    global fieldnames
    if count==0:
        time.sleep(4)

    





    
    i = 0
    while count<max_length and i<5:

        with open('resources/data.csv', 'a') as csv_file:
            csv_writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

            info={}
            info.update([('time',df.index[count])])
            for x in companies:
                info.update([(x,df[x][count])])

            csv_writer.writerow(info)

            count += 1
            i+=1




from apscheduler.schedulers.blocking import BlockingScheduler
sched = BlockingScheduler(timezone='MST')
sched.add_job(job, 'interval', id='my_job_id', seconds=1)
sched.start()