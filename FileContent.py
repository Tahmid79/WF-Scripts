import os
from pathlib import Path

def WriteStringToFile(path , str):
    with open(path, 'w') as f:
        f.write(str)

oldAppName = 'app-process-charges-v2'
newAppName = 'switch-fr-charges-1st'

folderPath = './switch-fr-charges-1st'
folder = os.listdir(folderPath)

for file in folder:
    if newAppName in file:
        pth = folderPath + '/' + file
        content = Path(pth).read_text()
        content = content.replace(oldAppName , newAppName)
        WriteStringToFile(pth, content)






















