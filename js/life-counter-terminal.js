function LifeCounter(initialLife) {

    let commandControls = document.createElement('DIV');
    commandControls.className = 'command-controls';

    let styleSpan = document.createElement('SPAN');
    styleSpan.innerHTML = '>';

    let commandLine = document.createElement('INPUT');
    commandLine.type = 'text';
    commandLine.className = 'command-line';
    commandLine.placeholder = 'Tap here to issue a command.';

    commandControls.appendChild(styleSpan);
    commandControls.appendChild(commandLine);

    let history = document.createElement('DIV');
    history.className = 'history';
    history.style.maxHeight = (window.innerHeight * .80) + 'px';

    let container = document.createElement('DIV');
    container.className = 'life-counter-container';

    container.appendChild(history);
    container.appendChild(commandControls);

    //document.body.appendChild(container);

    let undoArr = [];

    let player = {
        life: initialLife
    }

    commandLine.onkeydown = function (e) {
        if (e.keyCode == 13)
            submit();
    }

    let submit = function () {
        let command = commandLine.value.trim();
        displayCommand(command);

        if (command.match(/^[-+*/=]\d+$/)) {
            undoArr.push(player.life);
            modifyLife('life', command);
            displayStatus();
        } else if (command == '') {
            // Do nothing.
        } else if (command.match(/^reset$/i)) {
            reset();
            displayStatus();
        } else if (command.match(/^(un|undo)$/i)) {
            undo();
            displayStatus();
        } else if (command.match(/^cheer$/i)) {
            cheer();
        } else if (command.match(/^color\s+\w+$/i)) {
            changeColor(command);
        } else if (command.match(/^(cmd|command|inf|infect)\s+(to|from|fr)\s+\S+\s+[-+*/=]\d+$/i)) {
            let customLife = command.match(/^(cmd|command|inf|infect)\s+(to|from|fr)\s+(\S+)/i);

            switch (customLife[1]) {
                case 'infect':
                    customLife[1] = 'inf';
                    break;
                case 'command':
                    customLife[1] = 'cmd';
                    break;
            }

            if (customLife[2] == 'from')
                customLife[2] = 'fr';

            customLife = customLife[3] + '(' + customLife[1] + '-' + customLife[2] + ')';
            modifyLife(customLife, command);
            displayStatus();
        } else if (command.match(/^roll\s+\d+$/i)) {
            roll(command);
        } else if (command.match(/^(show|sh)$/i)) {
            displayStatus();
        } else if (command.match(/^(delete|del)\s+\S+$/)) {
            deleteProperty(command);
            displayStatus();
        } else if (command.match(/^start\s+\d+$/i)) {
            initialLife = Number(command.match(/\d+/)[0]);
            reset();
            displayStatus();
        } else {
            let invalidCommandMessage = "Command \'" + command + "\' is invalid.";
            displayCommand(invalidCommandMessage);
        }

        history.scrollTop = history.scrollHeight;
    }

    let deleteProperty = function (command) {
        property = command.match(/\s+(\S+)$/)[1];

        if (player.hasOwnProperty(property) && property != 'life')
            delete player[property];
        else if (property == 'life')
            displayCommand("Property \'" + property + "\' cannot be deleted.");
        else
            displayCommand("Property \'" + property + "\' does not exist.");
    }

    let displayCommand = function (command) {
        let item = document.createElement('DIV');

        item.innerHTML = command;
        history.appendChild(item);
        clear(commandLine);
    }

    let displayStatus = function () {
        let item = document.createElement('DIV');
        let status = '';

        for (let prop in player)
            status = status.concat(prop + ': ' + player[prop] + '<br>');

        item.innerHTML = status;
        history.appendChild(item);
        clear(commandLine);
    }

    let modifyLife = function (type, command) {
        let operator = command.match(/[-+*/=]/)[0];
        let operand = Number(command.match(/\d+$/)[0]);

        if (!player.hasOwnProperty(type))
            player[type] = 0;

        switch (operator) {
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

    let reset = function () {
        player.life = initialLife;
        for (let prop in player) {
            if (prop != 'life')
                delete player[prop];
        }
        undoArr = [];
        divider = document.createElement('HR');
        history.appendChild(divider);
    }

    let undo = function () {
        if (undoArr.length == 0)
            player.life = initialLife;
        else
            player.life = undoArr.pop();
    }

    let cheer = function () {
        let cheerAudio = new Audio('assets/sounds/honoka-faito-dayo.mp3');

        cheerAudio.play();
    }

    function clear(ele) {
        ele.value = '';
    }

    let changeColor = function (command) {
        tried = command.match(/^color\s+(\w+)$/i)[1];
        color = tried.match(/red|blue|yellow|white|pink|yellow|green|orange|teal/);

        if (color != null) {
            color = color[0];
            container.style.color = color;
        } else {
            displayCommand("Color \'" + tried + "\' is not available.");
        }
    }

    let roll = function (command) {
        let dice = command.match(/\d+/)[0];
        let rolled = Math.floor((Math.random() * dice) + 1);

        displayCommand('You rolled: ' + rolled);
    }

    displayStatus();
    //commandLine.focus();
    // add in secret waifu background function?
    // add in cheer select?
    //console.log(window.innerHeight);
    //console.log(window.outerHeight);
    // change background color
    // expand undo() to affect custom life counts?
    return container;
}

//START		
//let myLifeTotal = new LifeCounter(20);
document.body.appendChild(new LifeCounter(20));
//let myOtherLifeTotal = new LifeCounter(30);