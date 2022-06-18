const terminal = document.getElementById('terminal')
const currentDirectory = document.getElementById('dir')
const input = document.getElementById('input')
let inputCounter=0;

function Ternimal_Input(event){
	const focusElement = document.activeElement.className;
	//const Text=document.querySelector(".Ter_Input").clientWidth;

	const isTyping = (focusElement == "Ter_Input");
    let isPrintableKey = event.key.length === 1;
	if(isTyping){
		if(event.code == 'Backspace'){
			if(inputCounter > 0){
				inputCounter = inputCounter-1;
				document.querySelector(".Blink").style.transform= "translateX("+(inputCounter*12).toString()+"px)";
			}
			
		}
		else if(isPrintableKey){
			inputCounter=inputCounter+1;
			document.querySelector(".Blink").style.transform= "translateX("+(inputCounter*12).toString()+"px)";
		}
	}
}

const addLine = (text, className) => {
    
    let t = "";
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
        t += "&nbsp;&nbsp;";
        i++;
      } else {
        t += text.charAt(i);
      }
    }

    let tag = document.createElement("p");
    tag.className = className || 'new-line'
    //let text = document.createTextNode(t);
    //tag.appendChild(text);
    tag.innerHTML = t
    terminal.append(tag)
}

const addMultiLine = (command, className) => {
    command.map((line) => addLine(line, className))
}

const addOldCommandLine = () => {
    let tag = document.createElement("div");
    tag.className = 'title'
    
    let guestDiv = document.createElement('div')
    let guestText = document.createTextNode('guest\u00A0');
    guestDiv.appendChild(guestText)
    guestDiv.className = 'yellow'

    let inDiv = document.createElement('div')
    let inText = document.createTextNode(`in\u00A0`);
    inDiv.appendChild(inText)

    let folderDiv = document.createElement('div')
    let folderText = document.createTextNode(currentDirectory.innerText);
    folderDiv.appendChild(folderText)
    folderDiv.className = 'blue'

    tag.appendChild(guestDiv);
    tag.appendChild(inDiv)
    tag.appendChild(folderDiv)

    let tag2 = document.createElement("div");
    tag2.className = 'title'

    let arrowDiv = document.createElement('div')
    let arrowText = document.createTextNode('❯\u00A0');
    arrowDiv.appendChild(arrowText)
    arrowDiv.className = 'green'

    let commandDiv = document.createElement('div')
    let commandText = document.createTextNode(`${input.value}`);
    commandDiv.appendChild(commandText)
    //commandDiv.className = 'blue'

    tag2.appendChild(arrowDiv)
    tag2.appendChild(commandDiv)


    terminal.append(tag)
    terminal.append(tag2)
}

const resetCommand = () => {
    input.value = ''
    document.querySelector(".Blink").style.transform= "translateX("+(1).toString()+"px)";
    inputCounter=0;
}

//command functions
const clear = () => {
    terminal.innerHTML = ``
    document.querySelector('.presentation').innerHTML = ``
    document.querySelector('.presentation-text').innerHTML = ``
}

// const cd = () => {
    
// }

const checkForCommand = () => {

    if(input.value.split(" ")[0] === 'cd') {
        if(ls.split(" ").includes(input.value.split(" ")[1]) && currentDirectory.innerText === '~/') {
            currentDirectory.innerText = `~/${input.value.split(" ")[1]}`
        } else if(input.value === 'cd') {
            currentDirectory.innerText = '~/'
        } else {
            addLine('You are probably using cd wrong...', 'new-line')
        }
    } else {
        switch(input.value){
            case "whois":
                addMultiLine(whois, 'new-line')
                break;
            case "clear":
                clear()
                break
            case "help":
                addMultiLine(help, 'new-line')
                break
            case "theme":
                addMultiLine(theme, 'new-line')
                break
            case "ls":
                if(currentDirectory.innerText === '~/') {
                    addLine(ls + `  ${articles}`, 'bold-blue')
                } else if(currentDirectory.innerText === '~/socials') {
                    addLine(lsSocials, 'bold-blue')
                } else if(currentDirectory.innerText === '~/code') {
                    addLine('NO FOLDERS HERE', 'bold-red')
                    addLine(lsCode)
                }
                break
            default:
                addLine('Check the list of commands with "help"', 'new-line')
        }
    }

}

window.addEventListener("keydown", function (e) {
    if (e.code === "Enter") { 
        addOldCommandLine()
        checkForCommand();
        resetCommand();
    }
});

window.addEventListener('keydown',Ternimal_Input);
