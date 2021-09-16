import os
from pathlib import Path

def WriteStringToFile(path , str):
    with open(path, 'w') as f:
        f.write(str)

def ReplaceStringInAllFiles(folderPath, oldString, newString):
    folder = os.listdir(folderPath)
    for file in folder:
        if newAppName in file:
            pth = folderPath + '/' + file
            content = Path(pth).read_text()
            content = content.replace(oldString, newString)
            WriteStringToFile(pth, content)

oldAppName = 'app-process-charges-v2'
newAppName = 'switch-fr-charges-1st'

oldLang = 'APP_PROCESS_CHARGES_V2'
newLang = 'SWITCH_FR_CHARGES_1ST'

folderPath = './switch-fr-charges-1st'
controllerPath = folderPath + '/controller'
viewPath = folderPath + '/view'
langPath = folderPath + '/i18n'

# This is for replacing the app name
ReplaceStringInAllFiles(folderPath , oldAppName , newAppName)
ReplaceStringInAllFiles(controllerPath , oldAppName , newAppName)
ReplaceStringInAllFiles(viewPath , oldAppName , newAppName)
ReplaceStringInAllFiles(langPath , oldAppName , newAppName)

# This is for replacing the language
ReplaceStringInAllFiles(folderPath , oldLang , newLang)
ReplaceStringInAllFiles(controllerPath , oldLang , newLang)
ReplaceStringInAllFiles(viewPath , oldLang , newLang)
ReplaceStringInAllFiles(langPath , oldLang , newLang)





























