const initialLife = 40;
let commandLine = document.getElementById('command-line');
let history = document.getElementById('history');

let undoArr = [];

let player = {
    life: initialLife
}

commandLine.onkeydown = function(e){
    if(e.keyCode == 13)
        submit();
}

function submit(){
    let command = commandLine.value;
    displayCommand(command);
    
    if(command.match(/^[\-\+\*\/\=]\d+$/)){
        undoArr.push(player.life);
        modifyLife('life', command);
        displayStatus();
    }else if(command == ''){
        // Do nothing.
    }else if(command.match(/^reset$/i)){
        reset();
        displayStatus();
    }else if(command.match(/^undo$/i)){
        undo();
        displayStatus();
    }else if(command.match(/^cheer$/i)){
        cheer();
    }else if(command.match(/^color\s+\w+$/i)){
        changeColor(command);
    }else if(command.match(/^(inf|infect)\s+[\-\+\*\/\=]\d+$/i)){
        modifyLife('infect', command);
        displayStatus();
    }else if(command.match(/^(cmd|command)\s+(to|from)\s+\S+\s+[\-\+\*\/\=]\d+$/i)){
        let customLife = command.match(/^(cmd|command)\s+(to|from)\s+(\S+)/i);
        customLife = customLife[3] + '(' + customLife[2] + '/cmd)';
        modifyLife(customLife, command);
        displayStatus();
    }else if(command.match(/^roll\s+\d+$/i)){
        roll(command);
    }else if(command.match(/^(show|sh)$/i)){
        displayStatus();
    }else if(command.match(/^(delete|del)\s+\S+$/)){
        deleteProperty(command);
    }else{
        let invalidCommandMessage = "Command \'" + command + "\' is invalid.";
        displayCommand(invalidCommandMessage);
    }
    history.scrollTop = history.scrollHeight;
}

function deleteProperty(command){
    property = command.match(/\s+(\S+)$/)[1];

    if(player.hasOwnProperty(property) && property != 'life')
        delete player[property];
    else if(property == 'life')
        displayCommand("Property \'" + property + "\' cannot be deleted.");
    else 
        displayCommand("Property \'" + property + "\' does not exist.");
}

function displayCommand(command){
    let item = document.createElement('DIV');

    item.innerHTML = command;
    history.appendChild(item);
    clear(commandLine);
}

function displayStatus(){
    let item = document.createElement('DIV');
    let status = '';
    
    for(let prop in player)
        status = status.concat(prop + ': ' + player[prop] + '<br>');

    item.innerHTML = status;
    history.appendChild(item);	
    clear(commandLine);	
}

function modifyLife(type, command){
    let operator = command.match(/[\-\+\*\/\=]/)[0];
    let operand = Number(command.match(/\d+$/)[0]);
    
    if(!player.hasOwnProperty(type))
        player[type] = 0;
    
    switch(operator){
        case '-':
            player[type] -= operand;
            break;
        case '+':
            player[type] += operand;
            break;
        case '/':
            player[type] /= operand;
            break;
        case '*':
            player[type] *= operand;
            break;
        case '=':
            player[type] = operand;
            break;
    }
}

function reset(){
    player.life = initialLife;
    for(let prop in player){
        if(prop != 'life')
            delete player[prop];
    }
    undoArr = [];
    divider = document.createElement('HR');
    history.appendChild(divider);
}

// Only affects life. Expand to affect custom life counts?
function undo(){
    if(undoArr.length == 0)
        player.life = initialLife;
    else
        player.life = undoArr.pop();
}

function cheer(){
    let cheerAudio = new Audio('assets/sounds/honoka-faito-dayo.mp3');

    cheerAudio.play();
}

function clear(ele){
    ele.value = '';
}

function changeColor(command){
    tried = command.match(/^color\s+(\w+)$/i)[1];
    color = command.match(/red|blue|yellow|white|pink|yellow|green|orange|teal/);

    if(color != null){
        color = color[0];
        document.getElementById('container').style.color = color;
    } else {
        displayCommand("Color \'" + tried + "\' is not available.");
    }
}

function roll(command){
    let dice = command.match(/\d+/)[0];
    let rolled = Math.floor((Math.random() * dice) + 1);
    
    displayCommand('You rolled: ' + rolled);
}
// secret waifu background

//START		
displayStatus();