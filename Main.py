from pathlib import Path

o1 = Path('output.txt').read_text()
o2 = Path('output2.txt').read_text()
content = Path('view.txt').read_text()

o1 = o1.split("\n")
o2 = o2.split("\n")

for i in range(len(o1)):
    content = content.replace(o1[i], o2[i])

with open('result.txt', 'w') as f:
    f.write(content)

