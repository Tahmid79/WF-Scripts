import os

folderStr = './switch-fr-charges-2nd'

oldname = 'app-process-charges-v2'
newname = 'switch-fr-charges-2nd'

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









