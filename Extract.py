from pathlib import Path

pth = 'source.txt'

substring = 'ng-model="vm.formData.'
model = []

content = Path(pth).read_text()

words = content.split(" ")

for word in words:
    if substring in word:
        word = word.replace('\n', '')
        word = word.replace(substring, '')
        word = word.replace('"', '')
        model.append(word)


propList = ''


for prop in model:
    propList += prop + '\n'


with open('properties', 'w') as f:
    f.write(propList)




