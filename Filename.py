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

controllerStr = folderStr + '/controller'
controllerFolder = os.listdir(controllerStr)

for file in controllerFolder:
    if chargesStr in file:
        source = controllerStr + '/' + file
        destination = source.replace(chargesStr , newStr)
        os.rename(source, destination)

viewStr = folderStr + '/view'
viewFolder = os.listdir(viewStr)

for file in viewFolder:
    if chargesStr in file:
        source =  viewStr + '/' + file
        destination = source.replace(chargesStr, newStr)
        os.rename(source, destination)










