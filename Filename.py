import os

folderDir = './FAS/Designation/Apps/'
folderStr = folderDir + 'switch-fr-charges-4th'

oldname = 'app-process-charges-v2'
newname = 'switch-fr-charges-4th'

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









