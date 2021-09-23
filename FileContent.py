import os
from pathlib import Path

def WriteStringToFile(path , str):
    with open(path, 'w') as f:
        f.write(str)

def ReplaceStringInAllFiles(folderPath, oldString, newString):
    folder = os.listdir(folderPath)
    for file in folder:
        pth = folderPath + '/' + file
        if os.path.isfile(pth):
            content = Path(pth).read_text()
            content = content.replace(oldString, newString)
            WriteStringToFile(pth, content)

oldAppName = 'app-process-allocation-fas-vtwo'
newAppName = 'switch-fr-fas-designation-1st'

oldLang = 'APP_PROCESS_ALLOCATION_FAS_VTWO'
newLang = 'SWITCH_FR_FAS_DESIGNATION_1ST'

folderDir = './FAS/Designation/Apps/'
folderPath = folderDir + 'switch-fr-fas-designation-1st'
controllerPath = folderPath + '/controller'
viewPath = folderPath + '/view'
langPath = folderPath + '/i18n'

# This is for replacing the app name
ReplaceStringInAllFiles(folderPath , oldAppName , newAppName)
ReplaceStringInAllFiles(controllerPath , oldAppName , newAppName)
ReplaceStringInAllFiles(viewPath , oldAppName , newAppName)
# ReplaceStringInAllFiles(langPath , oldAppName , newAppName)

# This is for replacing the language
ReplaceStringInAllFiles(folderPath , oldLang , newLang)
ReplaceStringInAllFiles(controllerPath , oldLang , newLang)
ReplaceStringInAllFiles(viewPath , oldLang , newLang)
# ReplaceStringInAllFiles(langPath , oldLang , newLang)



def changeControllerName():
    mainControllerName = 'slpcAppProcessAllocationFasVtwoController'
    controllerName = 'slpcAppProcessChargesInfoModalController'
    nameSplit = ['slpcAppProcessChargesInfo', 'ModalController']
    names = [nameSplit[0] + str(i) + nameSplit[1] for i in range(2, 15)]
    names.insert(0, controllerName)
    names.insert(0, mainControllerName)

    # print(names)

    newMainControllerName = 'slpcSwitchFrFASDesignation1stController'
    newControllerName = 'slpcSwitchFrCharges4thInfoModalController'
    newNameSplit = ['slpcSwitchFrCharges4thInfo', 'ModalController']
    newNames = [newNameSplit[0] + str(i) + newNameSplit[1] for i in range(2, 15)]
    newNames.insert(0, newControllerName)
    newNames.insert(0, newMainControllerName)

    # print(newNames)

    for i in range(len(newNames)):
        oldstr = names[i]
        newstr = newNames[i]
        ReplaceStringInAllFiles(controllerPath, oldstr, newstr)


changeControllerName()































