# life-counter-terminal
A simple terminal-style life counter for Magic: The Gathering.

This web app can be used for other games as well!


# Commands


## Changing the starting life total

Enter **'start [number]'** to change the inital life total.
This new total persists even after life counter resets.

For example, the command **'start 40'** would change the initial life total to 40.

**Command regex:** /start \d+/


## Showing the life total

Enter either **'sh'** or **'show'** to display the current life total as well as any special life totals (such as infect or commander damage).

**Command regex:** /sh|show/


## Modifying the life total

Simply enter an operator and an operand into the terminal to modify the life total.
Using the appropriate operator, you may add to, subtract from, multiply, divide, or set, the life total.

For example, entering **'-2'** would deduct two life points from the current life total.

**Command regex:** /[+-*/=]\d+/


## Fixing life-counting mistakes

Simply type **'un'** or **'undo'** into the terminal to fix life total related mistakes.

Note that this command only reverts life total and not special totals like infect or commander damage.

**Command regex:** /un|undo/

## Rolling a die

Enter **'roll [the die's number of sides]'** to roll a die of variable size.

The command **'roll 20'** would roll a 20-sided die.

**Command regex:** /roll \d+/


## Counting infect

Simply enter **'(inf or infect) [operator][operand]'** into the terminal to track or modify the infect total.

For example, the command **'infect =1'** would set the infect total to 1.

**Command regex:** /(inf|infect) [+-*/=]\d+/


## Counting commander damage

Enter **'(cmd or command) (to or from) [player name] [operator][operand]'** in the terminal to track or modify commander damage.
You can keep track of how much commander damage you take, and how much you deal.

The command **'cmd fr Bucky +2'** would increase the commander damage total that Bucky has dealt to you by 2 points.

**Command regex:** /(cmd|command) (to|from|fr) \S+ [+-*/=]\d+/


## Getting ready for the next game

Entering **'reset'** into the terminal resets the game.

**Command regex:** /reset/


## Customizing the terminal

Enter **'color [color]'** into the terminal to change the terminal's accent color.
Only certain colors are supported at the moment.

The command **'color red'** would change the terminal's font color to red.

Supported colors: red, blue, yellow, white, pink, yellow, green, orange, teal

**Command regex:** /color \w+/


## Deleting uneeded infect or commander damage totals

Enter **'(del or delete) [property name]'** to delete a special life count.

Keep in mind that property names need to be spelled out *exactly* as they are displayed using the **'sh'** command.

Also note that the 'life' property (the property used for tracking the main life total) cannot be deleted.

The command **'del infect'** would delete the 'infect' property and infect total.

Take another example. The command **'del Lyn(cmd-fr)'** would delete the 'Lyn(cmd-fr)' property and the command damage total Lyn has dealt.

**Command regex:** /del|delete \S+/


## Getting some encouragement

Simply enter **'cheer'** into the terminal to get some encouragement!

Do this if you're in a tight spot, and you're a *Love Live!* fan.

**Command regex:** /cheer/