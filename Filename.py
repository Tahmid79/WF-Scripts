import os

files = os.listdir('./switch-fr-charges-1st')

chargesStr = 'app-process-charges-v2'
newStr = 'app-process-charges-v2'

for file in files:
    if chargesStr in file:
        print(file)


