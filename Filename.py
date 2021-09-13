import os

list = os.listdir('./switch-fr-charges-1st')
print(list)

old_name = 'hello.txt'
new_name = 'hello_tahmid.txt'

os.rename(new_name, old_name)

