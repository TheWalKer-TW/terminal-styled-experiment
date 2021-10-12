import React, { useRef, useEffect } from 'react'

import "./app.scss"

const App = () => {

    const commands = String.raw`samurai@internal-cdprojektred.com/:~ cd HAX samurai@internal-cdprojektred.com/HAX/:~ ls`;

    const beep = String.raw`


          _____                    _____                    _____                    _____          
         /\    \                  /\    \                  /\    \                  /\    \         
        /::\    \                /::\    \                /::\    \                /::\    \        
       /::::\    \              /::::\    \              /::::\    \              /::::\    \       
      /::::::\    \            /::::::\    \            /::::::\    \            /::::::\    \      
     /:::/\:::\    \          /:::/\:::\    \          /:::/\:::\    \          /:::/\:::\    \     
    /:::/__\:::\    \        /:::/__\:::\    \        /:::/__\:::\    \        /:::/__\:::\    \    
   /::::\   \:::\    \      /::::\   \:::\    \      /::::\   \:::\    \      /::::\   \:::\    \   
  /::::::\   \:::\    \    /::::::\   \:::\    \    /::::::\   \:::\    \    /::::::\   \:::\    \  
 /:::/\:::\   \:::\ ___\  /:::/\:::\   \:::\    \  /:::/\:::\   \:::\    \  /:::/\:::\   \:::\____\ 
/:::/__\:::\   \:::|    |/:::/__\:::\   \:::\____\/:::/__\:::\   \:::\____\/:::/  \:::\   \:::|    |
\:::\   \:::\  /:::|____|\:::\   \:::\   \::/    /\:::\   \:::\   \::/    /\::/    \:::\  /:::|____|
 \:::\   \:::\/:::/    /  \:::\   \:::\   \/____/  \:::\   \:::\   \/____/  \/_____/\:::\/:::/    / 
  \:::\   \::::::/    /    \:::\   \:::\    \       \:::\   \:::\    \               \::::::/    /  
   \:::\   \::::/    /      \:::\   \:::\____\       \:::\   \:::\____\               \::::/    /   
    \:::\  /:::/    /        \:::\   \::/    /        \:::\   \::/    /                \::/____/    
     \:::\/:::/    /          \:::\   \/____/          \:::\   \/____/                  ~~          
      \::::::/    /            \:::\    \               \:::\    \                                  
       \::::/    /              \:::\____\               \:::\____\                                 
        \::/____/                \::/    /                \::/    /                                 
         ~~                       \/____/                  \/____/                                  


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #`;

    const samurai = String.raw`

             ..    ,,,,,,    ,,,,,,      ,,,,, .,,,,     ,,,,, .,,,,,,,,,,,,,    .,,,,,,    ,,,,,  
 #############/   #######.   #######    ###### /####,    (#### /##############   #######.   #####  
 #####((((((((/   ########   ########  ####### /####,    (#### /####*   /#####  *########   #####  
 #####((((*      #########.  ################# /####,    (#### /####*   ######  #########.  #####  
 ############.   #### (####  ################# /####,    (#### /############## *#### #####  (*,..  
 .############  #####  ####. ################# /####,    (##(( *,.    .,*/((##  ####/ #####  ####( 
   /##########*,####,  (###( (,.    .,*/( ##### #####     ####( (###########   #####  *####  ####( 
            (### ####   (#### ##### .###* ##### ######(/######, (####. #####(  ####/   ##### ####( 
            /###.###,    ####.#####  ###  ####( .#############  (####.  #####.(####    /#### ####(
`;

    // let blink = document.querySelector('.blink');
    // const code = document.querySelector('.code');

    let blink = useRef(null);
    const code = useRef(null);

    console.log(code.current)

    const RandomNumber = (min, max) => {
        return Math.floor(Math.random() * max) + min
    };

    const Delay = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time))
    };

    const ResetTerminal = () => {
        code.current.innerHTML = '<span class="blink">█</span>';
        // blink = useRef(null);
    };

    const RenderString = characters => {
        blink.current.insertAdjacentHTML('beforeBegin', characters);
    };

    const TypeString = async characters => {
        for (const character of characters.split('')) {
            await Delay(RandomNumber(100, 200));
            RenderString(character);
        }
    }

    const DrawLines = async (characters, min = 50, max = 500) => {
        for (const line of characters.split('\n')) {
            await Delay(RandomNumber(min, max));
            RenderString(`${line}\n`);
        }
    }

    const DrawCommands = async commands => {
        for (const line of commands.split('\n')) {
            // Seperate the directory and the command
            const [currentDir, command] = line.split(':~ ');

            // Print the directory, type the command and finish with new line
            RenderString(`${currentDir}:~ `);
            await TypeString(command);
            RenderString('\n');
        }
    }

    useEffect(() => {
        (async () => {
            await DrawCommands("/:~ ssh samurai@internal-cdprojektred.com -p 2000");
            await Delay(1000);
            RenderString("samurai@internal-cdprojektred.com password:");
            await Delay(5000);
            RenderString("\n");
            await DrawCommands(commands);
            RenderString('\nbeep.js    samurai.js\n\n');
            await DrawCommands('samurai@internal-cdprojektred.com/HAX:~ node beep.js');
            await DrawLines(beep);
            await TypeString("\n\nSeems you're not among the sheep after all. Wanna play a game? Watch for the beeps.");
            await Delay(3000);
            ResetTerminal();
            await DrawCommands('samurai@internal-cdprojektred.com:~ KEY=3db7ca618243da1ba3bc76ab14bcf07b node samurai.js');
            await DrawLines(samurai);
        })();
    }, []);

    return (
        <div className='intro'>
            <div className='scanline'></div>
            <pre ref={code} className='code'><span ref={blink} className='blink'>█</span></pre>
        </div>
    )
}

export default App
