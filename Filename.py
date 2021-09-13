import os

folderStr = './switch-fr-charges-1st'
folder = os.listdir(folderStr)

chargesStr = 'app-process-charges-v2'
newStr = 'switch-fr-charges-1st'

for file in folder:
    if chargesStr in file:
        source = folderStr + '/' + file
        destination = source.replace(chargesStr, newStr)
        os.rename(source, destination)






