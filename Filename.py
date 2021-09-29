import os

folderDir = './FAS/Charges/Apps/'
folderStr = folderDir + 'switch-fr-fas-charges-1st'

oldname = 'app-process-specialised-vtwo'
newname = 'switch-fr-fas-charges-1st'

controllerStr = folderStr + '/controller'
viewStr = folderStr + '/view'


def changeFileName(folderPath, oldName , newName):
    folder = os.listdir(folderPath)
    for file in folder:
        if oldName in file:
            source = folderPath + '/' + file
            destination = source.replace(oldName, newName)
            os.rename(source, destination)

changeFileName(folderStr, oldname , newname)
changeFileName(controllerStr , oldname , newname)
changeFileName(viewStr, oldname , newname)









