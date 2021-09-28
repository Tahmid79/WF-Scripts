import os

folderDir = './FAS/Designation/Apps/'
folderStr = folderDir + 'switch-fr-fas-designation-1st'

oldname = 'app-process-allocation-fas-vtwo'
newname = 'switch-fr-fas-designation-1st'

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









