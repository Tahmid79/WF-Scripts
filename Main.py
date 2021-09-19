import re
from pathlib import Path

def replace(o1 , o2, view='source.txt', result='result.txt'):
    o1 = Path(o1).read_text()
    o2 = Path(o2).read_text()
    content = Path(view).read_text()

    o1 = o1.split("\n")
    o2 = o2.split("\n")

    for i in range(len(o1)):
        #  content = content.replace(o1[i], o2[i])
        regex = r"\b" + o1[i] + r"\b"
        content = re.sub(regex, o2[i] , content)


    with open(result, 'w') as f:
        f.write(content)


replace('Outputs/output.txt', 'Outputs/output4.txt')
# replace('NA/current.txt' , 'Na/na.txt' , 'result.txt')


