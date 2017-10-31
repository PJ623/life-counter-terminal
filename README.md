# life-counter-terminal
A simple terminal-style life counter for Magic: The Gathering.

This web app can be used for other games as well!

# Commands
## Showing the life total: /sh|show/

Enter either 'sh' or 'show' to display the current life total.


## Modifying the life total

Simply enter an operator and an operand into the terminal to modify the life total.
Using the appropriate operator, you may add to, subtract from, multiply, divide, or set, the life total.

Command Regex: /[+-*/=]\d+/

For example, entering '-2' would deduct two life points from the current life total.


## Fixing life-counting mistakes

Simply type 'undo' into the terminal to fix life total related mistakes.

Note that the command 'undo' only reverts life total and not special totals like *infect*.

Command Regex: /undo/

## Rolling a die

Enter 'roll [the die's number of sides]' to roll a die of variable size.

The command 'roll 20' would roll a 20-sided die.

Command Regex: /roll \d+/


## Counting infect

Simply enter '(inf or infect) [operator][operand]' into the terminal to count infect.

For example, the command 'infect =1' would set the infect total to 1.

Command regex: /(inf|infect) [+-*/=]\d+/


## Counting commander damage

Enter '(cmd or command) (to or from) [player name] [operator][operand]' in the terminal to count commander damage.
You can keep track of how much commander damage you take, and how much you deal.

The command 'cmd to Bucky +2' would increase player Bucky's commander damage total by 2 points.

Command Regex: /(cmd|command) (to|from) \S+ [+-*/=]\d+/


## Getting ready for the next game

Entering 'reset' into the terminal resets the game.

Command Regex: /reset/


## Customizing the terminal

Enter 'color [a color of your choosing]' into the terminal to change the terminal's accent color.
Only certain colors are supported at the moment.

Supported colors: red, blue, yellow, white, pink, yellow, green, orange, teal

Command Regex: /color \w+/


## Deleting uneeded infect or commander damage totals

Enter '(del or delete) [property name]' to delete a special life count.

The command 'del infect' would delete the infect property and total.

Command Regex: /del|delete \S+/


## Getting some encouragement

Simply enter 'cheer' into the terminal to get some encouragement!

Do this if you're in a tight spot, and you're a *Love Live!* fan.

Command Regex: /cheer/