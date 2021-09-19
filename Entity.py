import os
from pathlib import Path

def findCharacterIndices(s, ch):
    return [i for i, ltr in enumerate(s) if ltr == ch]

filepath = './entity.txt'

content = Path(filepath).read_text()

char = '{'

index = findCharacterIndices(content , char)

first = index[1] + 1
last = index[len(index) - 1]

content = content[first:last]


print(content)

