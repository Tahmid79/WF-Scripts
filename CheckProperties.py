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

didNotMatch = []

for prop in propertyList:
   if string_found(prop, entity):
      matches += 1
   else:
      didNotMatch.append(prop)


print('Matches ' , matches)

if len(propertyList) == matches:
   print('All properties present')
else:
   print('Some properties not present in Entity')
   print(didNotMatch)
