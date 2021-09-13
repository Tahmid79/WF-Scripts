import os

files = os.listdir('./switch-fr-charges-1st')

chargesStr = 'app-process-charges-v2'
newStr = 'switch-fr-charges-1st'

for file in files:
    if chargesStr in file:
        newStr = file.replace(chargesStr, newStr)
        os.rename(file, newStr)




