import os
import re
from pathlib import Path

def findCharacterIndices(s, ch):
    return [i for i, ltr in enumerate(s) if ltr == ch]

def WriteStringToFile(filepath , str):
    with open(filepath, 'w') as f:
        f.write(str)

filepath = './entity.txt'

content = Path(filepath).read_text()

char = '{'

index = findCharacterIndices(content , char)

first = index[1] + 1
last = index[len(index) - 1]

content = content[first:last]


types = [ 'public', 'string' , 'bool' , 'int' , '?' , '{ get; set; }' ,' ']

for type in types:
    content = content.replace(type , '')

content = content.replace('\n' , ',')
content = content[1:]


commaregex = r"(\,)\1\1"

content = re.sub(commaregex, ',' , content)


WriteStringToFile('./propCSV' , content)

