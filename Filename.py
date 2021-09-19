import os

chargesStr = 'app-process-charges-v2'
newStr = 'switch-fr-charges-1st'

folderStr = './switch-fr-charges-1st'
controllerStr = folderStr + '/controller'
viewStr = folderStr + '/view'


def changeFileName(folderPath, oldname , newname):
    folder = os.listdir(folderPath)
    for file in folder:
        if oldname in file:
            source = folderStr + '/' + file
            destination = source.replace(oldname, newname)
            os.rename(source, destination)
    

changeFileName(folderStr, chargesStr , newStr)
changeFileName(controllerStr,chargesStr , newStr)
changeFileName(viewStr,chargesStr , newStr)












