import re
from pathlib import Path

def string_found(string1, string2):
   if re.search(r"\b" + re.escape(string1) + r"\b", string2):
      return True
   return False

entityPath = './entity.txt'
entity = Path(entityPath).read_text()


propertyPath = './properties.txt'
propertyList = Path(propertyPath).read_text()
propertyList = propertyList.split('\n')

matches = 0

for prop in propertyList:
   if string_found(prop, entity):
      matches += 1

print(matches)