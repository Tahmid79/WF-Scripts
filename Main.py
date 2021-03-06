from pathlib import Path

def replace(o1 , o2, view='view.txt', result='result.txt'):
    o1 = Path(o1).read_text()
    o2 = Path(o2).read_text()
    content = Path(view).read_text()

    o1 = o1.split("\n")
    o2 = o2.split("\n")

    for i in range(len(o1)):
        content = content.replace(o1[i], o2[i])

    with open(result, 'w') as f:
        f.write(content)


replace('Outputs/output.txt', 'Outputs/output4.txt')
replace('NA/current4.txt' , 'Na/na4.txt' , 'result.txt')




