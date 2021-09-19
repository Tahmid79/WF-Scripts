import os

oldname = 'app-process-charges-v2'
newname = 'switch-fr-charges-2nd'

folderStr = './switch-fr-charges-2nd'
controllerStr = folderStr + '/controller'
viewStr = folderStr + '/view'


def changeFileName(folderPath, oldname , newname):
    folder = os.listdir(folderPath)
    for file in folder:
        if oldname in file:
            source = folderStr + '/' + file
            destination = source.replace(oldname, newname)
            os.rename(source, destination)
    

changeFileName(folderStr, oldname, newname)
changeFileName(controllerStr, oldname, newname)
changeFileName(viewStr, oldname, newname)












