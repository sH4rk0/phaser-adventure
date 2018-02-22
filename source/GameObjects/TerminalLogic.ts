module z89 {

    export enum msgs {
        reset,
        commandList,
        gtw,
        version,
        credits,
        gameList,
        loginError,
        targetAquired,
        t5,
        t4,
        t3,
        t2,
        t1,
        hit,
        processing,
        disconnecting
    }
    export enum shell {
        login,
        gtw,
        call

    }

    export class TerminalLogic {


        private rows: Array<string> = [
            '                                        ', //0
            '    **** COMMODORE 64 BASIC V5 ****     ', //1
            ' 64K RAM SYSTEM    RUNNING IN WOPR MODE ', //2
            'READY.                                  ', //3
            'LIST OF COMMANDS:                       ', //4
            '----------------------------------------', //5
            'help, clear, quit, ver, credits, reset, ', //6
            'dir, load "gamename", run               ', //7
            ' GREETINGS PROFESSOR FALKEN.            ', //8
            ' WELCOME TO,                            ', //9
            ' ###################################### ', //10
            ' #     "GLOBAL THERMONUCLEAR WAR"     # ', //11
            ' PLEASE, ENTER THE LOCATION (LAT,LON)   ', //12
            ' OF FIRST STRIKE! E.g. INTEGER,INTEGER  ', //13
            'MEDIA CONSOLE VERSION 1.0               ', //14
            '(C) FRANCESCO RAIMONDO 2018             ', //15
            'HTTP://WWW.ZERO89.IT                    ', //16
            'CREDIT LIST:                            ', //17
            'CODE: FRANCESO RAIMONDO                 ', //18
            'ART SPRITE: PAUL ROBERTSON              ', //19
            'ART BG: JASON TAMMEMAGI                 ', //20
            'ART MIXING: FRANCESO RAIMONDO           ', //21
            'MUSIC:                                  ', //22
            'ADDITIONAL FX: FRANCESO RAIMONDO        ', //23
            '0 "GAME LIST                  " 32 2A   ', //24
            '0    "BOCCONCINI DEV"              PRG  ', //25
            '0    "XMAS2K16"                    PRG  ', //26
            '0    "THE WRONG DIRECTION"         PRG  ', //27
            '0    "FALKEN\'S MAZE"               PRG  ',//28
            '0    "HWI20YEARS"                  PRG  ', //29
            '0    "GTW"                         PRG  ', //30
            '0 BLOCKS FREE.                     PRG  ', //31
            '?ERROR                                  ', //32
            'ACCESS DENIED!                          ', //33
            'PLEASE, USE YOUR CREDENTIAL TO LOGIN.   ', //34
            'Try with "help" command.                ', //35
            'Type quit to exit.                      ', //36
            ' #          TARGET ACQUIRED!          # ', //37
            '              STRIKE IN...              ', //38
            '              555555555555              ', //39
            '              55                        ', //40
            '              55                        ', //41
            '              555555555555              ', //42
            '                        55              ', //43
            '                        55              ', //44
            '              555555555555              ', //45
            '                      44                ', //46
            '                    4444                ', //47
            '                  44  44                ', //48
            '                44    44                ', //49
            '              444444444444              ', //50
            '                      44                ', //51
            '                      44                ', //52
            '              333333333333              ', //53
            '                        33              ', //54
            '                        33              ', //55
            '              333333333333              ', //56
            '                        33              ', //57
            '                        33              ', //58
            '              333333333333              ', //59
            '              222222222222              ', //60
            '                        22              ', //61
            '                        22              ', //62
            '              222222222222              ', //63
            '              22                        ', //64
            '              22                        ', //65
            '              222222222222              ', //66
            '                    11                  ', //67
            '                  1111                  ', //68
            '                    11                  ', //69
            '                    11                  ', //70
            '                    11                  ', //71
            '                    11                  ', //72
            '                  111111                ', //73
            ' #              TARGET HIT!           # ', //74
            'SEARCHING FOR ',                           //75
            'LOADING                                 ', //76
            'RUNNING A GAME FROM:                    ', //77
            '              ##############            ', //78
            '              # PROCESSING #            ', //79
            'Disconnecting....                       ', //80


        ];

        private msgs: Array<Array<number>> = [
            [0, 1, 0, 2, 0, 3], //reset //0
            [0, 4, 5, 6, 7], //commandList //1
            [0, 8, 0, 9, 0, 10, 11, 10, 0, 12, 13, 0], //gtw //2
            [0, 14, 5, 15, 16, 3], //version //3
            [0, 17, 5, 18, 19, 20, 21, 22, 23, 3], //credits //4
            [0, 24, 25, 26, 27, 28, 29, 30, 31, 3], //gamelist //5
            [0, 33, 34], //loginError //6
            [0, 10, 37, 10, 0, 38], //targetAquired //7
            [0, 39, 40, 41, 42, 43, 44, 45, 0], //t5 //8
            [0, 46, 47, 48, 49, 50, 51, 52, 0], //t4 //9
            [0, 53, 54, 55, 56, 57, 58, 59, 0], //t3 //10
            [0, 60, 61, 62, 63, 64, 65, 66, 0], //t2 //11
            [0, 67, 68, 69, 70, 71, 72, 73, 0], //t1 //12
            [0, 10, 74, 10, 0, 3], //target hit //13
            [0, 78, 79, 78, 0], //processing //14
            [80], //disconnecting //15

        ];


        private emptyString: string = this.rows[0];
        private readyString: string = this.rows[3];


        private errors: Array<string> = [
            'Too many fingers on keyboard error!     ',
            'Syntax Terror!                          ',
            'Something bad happened.                 ',
            'Guru meditation error!                  ',
            'Too much for this terminal.             ',
            'Catastrophic Failure Error!             ',
            'The master of all errors happened!      ',
            'This time, it’s the human’s fault.      ',
            'User fault, it’s not our error!         ',
            'You performed an illegal operation.     ',
            'Kernel Panic!                           ',
            '404 File Not Found!                     ',
            'Error 500 SERVER Not Found!             ',
            'Random error just to annoy you!         ',
            'User error - Replace user!              ',
            'This error should not occour!           ',
            'Run as fast as you can & don’t look back',
            'User error. Go stand in the corner!     ',
        ];

        private clearString: any = { text: this.emptyString, delay: 0 };
        private lettersObj: Array<Phaser.BitmapText> = [];
        private game: Phaser.Game;
        private typeGroup: Phaser.Group;
        private currentElement: number = 0;
        private tint: number = 0x6C5EB5;
        private cursor: Phaser.Sprite;
        private currentRow: number;
        private currentColumn: number;
        private terminal: Terminal;
        private logged: boolean = false;
        private isShell: boolean = false;
        private shellStart: number = 0;
        private shellEnd: number = 0;
        private shellType: number = 0;
        private isShellLogin: boolean = false;
        private login: string = "";
        private gameLoaded: string = "";
        private inputIsDisabled = false;


        constructor(game: Phaser.Game, terminal: Terminal, tint?: number) {

            this.game = game;
            this.typeGroup = this.game.add.group();
            this.terminal = terminal;
            if (tint != null) this.tint = tint;

            this.cursor = this.game.add.sprite(0, 0, "cursor");
            this.cursor.tint = this.tint;
            this.cursor.animations.add("blink", [0, 1], 2, true);
            this.cursor.animations.add("hide", [1], 0, false);
            this.cursor.animations.add("stop", [0], 0, false);
            this.cursor.x = 0;
            this.cursor.y = 0;

            this.cursor.play("blink");
            this.typeGroup.add(this.cursor);

            for (var i = 0; i < 25; i++) {
                this.lettersObj.push(this.game.add.bitmapText(0, (16 * i), "commodore", "", 16, this.typeGroup));
                this.lettersObj[i].tint = this.tint;
            }

            this.terminal.addChild(this.typeGroup);
            this.typeGroup.x = 218;
            this.typeGroup.y = 90;

        }

        reset(): void {

            this.clear();
            this.writeMultiple(this.returnStaticString(msgs.reset, 0));

        };


        enableInput(): void { this.inputIsDisabled = false; this.showCursor(); }
        disableInput(): void { this.inputIsDisabled = true; this.hideCursor(); }
        hideCursor(): void { this.cursor.alpha = 0; }
        showCursor(): void { this.cursor.alpha = 1; }

        returnStaticString(msg: msgs, delay: number): any {

            let _obj: Array<any> = [];
            let elem: any;
            this.msgs[msg].forEach(element => {
                elem = { text: this.rows[element], delay: delay }
                _obj.push(elem);
            });
            return _obj;

        }

        returnReady(txt?: string): any {

            let _ready: any = { text: this.readyString, delay: 0 };
            this.cursor.x = 0;
            // _ready.row = this.currentRow; this.cursor.y = this.currentRow * 16;
            if (txt != undefined) { _ready.text = txt; this.cursor.x = txt.length * 16; }
            this.cursor.play("blink");
            return _ready;

        }

        returnLogin(): any { return this.returnStaticString(msgs.loginError, 0); }
        returnCommands(): any { return this.returnStaticString(msgs.commandList, 0); }
        returnGames(): any { return this.returnStaticString(msgs.gameList, 0); }
        returnVersion(): any { return this.returnStaticString(msgs.version, 0); }
        returnCredits(): Array<any> { return this.returnStaticString(msgs.credits, 0); }
        returnProcessing(): Array<any> { return this.returnStaticString(msgs.processing, 0); }

        returnError(error?: string): Array<any> {

            let _error: string = this.errors[this.game.rnd.integerInRange(0, this.errors.length - 1)];
            if (error != undefined) _error = error;

            return [

                { text: this.emptyString, delay: 0 },
                { text: this.rows[32], delay: 0 },
                { text: _error, delay: 0 },
                { text: this.rows[5], delay: 0 },
                { text: this.rows[35], delay: 0 },
                { text: this.rows[3], delay: 0 }
            ];

        }

        returnLoading(game?: string): Array<any> {

            return [

                { text: this.emptyString, delay: 0 },
                { text: this.rows[75] + game, delay: 0 },
                { text: this.rows[76], delay: 0 },
                { text: this.rows[3], delay: 0 },

            ];

        }

        returnLoginError(error?: string): Array<any> {

            let _error: string = this.errors[this.game.rnd.integerInRange(0, this.errors.length - 1)];
            if (error != undefined) _error = error;

            return [

                { text: this.emptyString, delay: 0 },
                { text: this.rows[32], delay: 0 },
                { text: _error, delay: 0, cDelay: 0 },
                { text: this.rows[5], delay: 0 },
                { text: this.rows[36], delay: 0 }
            ];

        }


        charUp(): void {
            if (this.isShell || this.inputIsDisabled) return;
            let col: number = this.cursor.x / 16;
            let row: number = this.cursor.y / 16;

            if (row > 0) { this.cursor.y = (row * 16) - 16 }

        }
        charDown(): void {
            if (this.isShell || this.inputIsDisabled) return;
            let col: number = this.cursor.x / 16;
            let row: number = this.cursor.y / 16;

            if (row < 24) { this.cursor.y = (row * 16) + 16 } else {


                this.scrollDown();

            }


        }

        charLeft(): void {
            if (this.isShell || this.inputIsDisabled) return;
            let col: number = this.cursor.x / 16;
            let row: number = this.cursor.y / 16;

            if (col == 0) {

                if (row > 0) {


                    this.cursor.y = (row * 16) - 16;
                    this.cursor.x = (39 * 16);
                }

            } else {

                this.cursor.x = (col * 16) - 16;

            }


        }
        charRight(): void {
            if (this.isShell || this.inputIsDisabled) return;
            let col: number = this.cursor.x / 16;
            let row: number = this.cursor.y / 16;

            if (col == 39) {

                this.cursor.y = (row * 16) + 16;
                this.cursor.x = 0;

            } else {

                this.cursor.x = (col * 16) + 16;

            }

        }


        scrollDown(): void {

            for (var i = 0; i < 25; i++) {

                if (i < 24) { this.lettersObj[i].text = this.lettersObj[i + 1].text; } else { this.lettersObj[i].text = this.emptyString; }

            }

        }

        removeChar(): void {
            if (this.inputIsDisabled) return;
            let col: number = this.cursor.x / 16
            let row: number = this.cursor.y / 16;

            if (this.isShell && (this.shellStart < col)) {

                this.lettersObj[row].text = this.replaceAt(this.lettersObj[row].text, col - 1, " ");
                this.cursor.x = (col * 16) - 16;
                this.login = this.login.substr(0, this.login.length - 1);

            } else {

                this.lettersObj[row].text = this.replaceAt(this.lettersObj[row].text, col, " ");
                if (col == 0) {

                    if (row > 0) {

                        this.cursor.y = (row * 16) - 16;
                        this.cursor.x = (39 * 16);
                    }

                } else {

                    this.cursor.x = (col * 16) - 16;

                }

            }

        }


        addChar(key: string): void {

            if (this.inputIsDisabled) return;

            let col: number = this.cursor.x / 16;
            let row: number = this.cursor.y / 16;

            if (this.isShell) {
                if (col == (this.shellStart + this.shellEnd)) return;

                this.login = this.login + key;

                if (this.isShellLogin) key = "*";


            }

            this.lettersObj[row].text = this.replaceAt(this.lettersObj[row].text, col, key);
            this.cursor.x = (col * 16) + 16;
            col++;
            if (col == 40) {
                this.cursor.x = 0;
                this.cursor.y = (row * 16) + 16;
                row++;
                if (row > 24) { this.scrollDown(); this.cursor.y = (row * 16) - 16; }

            }

        }

        addChars(key: string): void {

            for(let i=0; i<key.length; i++){

                this.addChar(key.charAt(i));

            }




        }

        replaceAt(string, index, replace): string {

            return string.substring(0, index) + replace + string.substring(index + 1);
        }


        returnShellError(shellString: string, error: boolean = false) {

            this.login = "";
            this.clear();
            this.writeMultiple(this.returnLogin());
            this.write(this.returnReady(shellString), false);
            this.setCursor(0, this.returnLogin().length + 1);
            if (error) this.writeMultiple(this.returnLoginError("PASSWORD NOT VALID!"));
            this.isShell = true;
            this.shellStart = shellString.length;
            this.shellEnd = 10;
            this.isShellLogin = true;
            this.setCursor(shellString.length, this.returnLogin().length
            );

        }

        /*  returnLogged(error: boolean = false): void {
  
              this.logged = true;
              this.login = "";
              this.clear();
              this.writeMultiple(this.returnStaticString(msgs.gtw, 0));
              this.write(this.returnReady(">:"), false);
              this.setCursor(0, this.returnStaticString(msgs.gtw, 0).length + 1);
              if (error) this.writeMultiple(this.returnLoginError("INVALID COORDINATES"));
              this.isShell = true;
              this.shellStart = 2;
              this.shellEnd = 7;
              this.shellType = shell.gtw;
              this.isShellLogin = false;
              this.setCursor(2, 12);
  
  
          }*/

        checkCoordinates(coordinates: string): number {

            if (coordinates == "quit") return 0;
            if (coordinates.length > 7) return -1;
            let _pos: number = coordinates.indexOf(",");
            if (_pos == -1 || _pos == 0 || _pos == coordinates.length - 1) return -1;
            let _coo: Array<string> = coordinates.split(",");
            if (!this.checkNumber(_coo[0]) || !this.checkNumber(_coo[1])) return -1;

            return 1;

        }

        checkNumber(val: string): boolean {
            var pattern = /^\d+$/;
            return pattern.test(val);
        }

        openGame(url: string): void {

            window.open(url, "_blank");
            this.gameLoaded = "";
            this.writeMultiple([{ text: this.rows[77], delay: 0 }, { text: url, delay: 0 }]);
            this.write(this.returnReady());

        }

        hitTarget(): void {

            //this.terminal.currentState.shootFromHigh([17]);
            //this.terminal.hide();
            //return;

            this.clearShell();
            this.clear();
            this.writeMultiple(this.returnStaticString(msgs.targetAquired, 0));

            for (let i = 0; i < 6; i++) {

                this.game.time.events.add(1000 * i, () => {

                    this.writeMultiple(this.returnStaticString(8 + i, 0));
                    if (i == 5) this.game.time.events.add(1000, () => {
                        this.terminal.hide();
                        this.terminal.currentState.shootFromHigh([27]);
                        
                    }, this);

                }, this);

            }

        }

        submitCommand(): void {

            let row: number = this.cursor.y / 16;
            let command: string = this.lettersObj[row].text.toLowerCase().trim();
            this.cursor.y = (row * 16) + 16;
            row++;
            if (row > 24) { this.scrollDown(); this.cursor.y = (row * 16) - 16; }

            // console.log(command)

            if (this.isShell) {

                // console.log(this.login)

                switch (this.shellType) {


                    case 0: //login

                        switch (this.login) {


                            case "quit":
                                this.clear();
                                this.write(this.returnReady());
                                this.clearShell();

                                break;

                            default:

                                this.ajaxCall({ who: "login", login: this.login });
                                break;

                        }

                        break;


                    case 1: //gtw

                        switch (this.checkCoordinates(this.login)) {

                            case -1:

                                this.returnLogged(this, true);

                                break;

                            case 1:

                                this.ajaxCall({ who: "coordinates", coordinates: this.login });

                                break;

                            case 0:
                                this.clear();
                                this.write(this.returnReady());
                                this.clearShell();

                                break;

                        }

                        break;

                }



            } else {

                this.clearShell();

                switch (command) {

                    case "hit":
                        this.hitTarget();
                        break;

                    case "":

                        break;
                    case "run":
                        if (this.gameLoaded == "") this.writeMultiple(this.returnError("NO GAME LOADED"));

                        switch (this.gameLoaded) {

                            case "bocconcini dev":
                                this.openGame("http://bocconcinidev.zero89.it");
                                break;

                            case "xmas2k16":
                                this.openGame("http://xmas2016.zero89.it");
                                break;

                            case "hwi20years":
                                this.openGame("http://20years.zero89.it");
                                break;

                            case "the wrong direction":
                                this.openGame("http://twd.zero89.it");
                                break;

                        }

                        break;

                    case "version":
                    case "ver":
                        this.writeMultiple(this.returnVersion());
                        break;

                    case "credits":
                    case "cred":
                        this.writeMultiple(this.returnCredits());
                        break;

                    case "load \"bocconcini dev\"":
                        this.writeMultiple(this.returnLoading("BOCCONCINI DEV"));
                        this.gameLoaded = "bocconcini dev";
                        break;

                    case "load \"xmas2k16\"":
                        this.writeMultiple(this.returnLoading("XMAS2K16"));
                        this.gameLoaded = "xmas2k16";
                        break;

                    case "load \"hwi20years\"":
                        this.writeMultiple(this.returnLoading("HWI20YEARS"));
                        this.gameLoaded = "hwi20years";
                        break;

                    case "load \"the wrong direction\"":
                        this.writeMultiple(this.returnLoading("THE WRONG DIRECTION"));
                        this.gameLoaded = "the wrong direction";
                        break;

                    case "load \"gtw\"":
                    case "load":

                        if (!this.logged) {
                            this.shellType = shell.login;
                            this.returnShellError(">:");

                        } else {
                            this.returnLogged(this);
                        }

                        break;

                    case "dir":
                    case "list":
                        this.writeMultiple(this.returnGames());
                        break;

                    case "help":
                        this.writeMultiple(this.returnCommands());
                        break;

                    case "clear":
                        this.clear();
                        this.write(this.returnReady());
                        break;

                    case "quit":
                    case "exit":
                        this.terminal.hide();
                        break;

                    case "reset":
                    case "sys64738":
                        this.reset();
                        break;

                    default:
                        this.writeMultiple(this.returnError());
                        break;

                }
            }
        }


        ajaxCall(data): void {

            this.disableInput();
            this.writeMultiple(this.returnProcessing());
            let _this = this;
            $.ajax({
                url: "http://www.zero89.it/api/script/adventure/core.aspx",
                dataType: "script",
                type: "GET",
                data: data

            }).done(function (data) { _this.enableInput(); }).fail(function (xhr) { });

        }


        clearShell(): void {
            this.isShell = false;
            this.shellStart = 0;
            this.shellEnd = 0;
            this.isShellLogin = false;
            this.shellType = -1;
        }

        setCursor(x, y): void {

            this.cursor.x = x * 16;
            this.cursor.y = y * 16;

        }

        clear(start?: number, end?: number): void {

            let _start = 0;
            let _end = 25;
            if (start != undefined) _start = start;
            if (end != undefined) _end = end;
            this.currentColumn = 0;
            this.currentRow = 0;


            let _clear = this.clearString;
            for (var i = _start; i < _end; i++) {

                _clear.row = i;
                this.lettersObj[i].text = this.emptyString;

            }
            this.cursor.y = 0;
            this.cursor.x = 0;


        }

        removeLines(): void {

            this.lettersObj.forEach(element => {
                element.destroy();
            });
        }

        destroy(): void {
            //console.log("destroy writer")
            this.removeLines();
            this.cursor.destroy();

        }

        writeMultiple(letters: any): void {

            letters.forEach(element => { this.write(element); });

            //this.cursor.y+=16;

        }

        public someLogic(): number {

            return 66
        }

        write(obj: any, cursorNext: boolean = true): void {

            let element: any = obj;
            let textObj: Phaser.BitmapText;
            let cDelay: number = 0;
            let row: number = (this.cursor.y) / 16;

            if (row == 25) {

                this.scrollDown();
                row--;
            }
            textObj = this.lettersObj[row];

            if (element.cursor != undefined) this.cursor.play(element.cursor);
            if (element.cDelay != undefined) cDelay = element.cDelay;
            if (element.tint != undefined) this.tint = element.tint;
            textObj.tint = this.tint;

            textObj.text = element.text;

            if (cursorNext) {
                this.cursor.x = 0;
                this.cursor.y = (row * 16) + 16;
                row = this.cursor.y / 16;
                if (row == 25) { this.scrollDown(); this.cursor.y = (row * 16) - 16; }
            }



            /*  if (cDelay == 0) {
  
                  textObj.text = element.text;
  
                  this.cursor.x=0;
                  this.cursor.y=(row*16)+16;
      
                 
                  
  
              } else {
  
                  let nextText = element.text.substring(0, i);
                  let cursorX: number;
                  for (var i = 0; i <= element.text.length; i++) {
  
                      let nextText = element.text.substring(0, i);
  
                      this.game.time.events.add((cDelay * i) + element.delay, () => {
  
                          textObj.text = nextText;
                          cursorX = nextText.length * 16;
                          this.cursor.y = 16 * row;
  
                          if (cursorX == 640) { cursorX = 0; this.cursor.y += 16; }
                          this.cursor.x = cursorX;
  
                      });
  
                  }
  
                   
   
                   
  
              }
  
              */






        }



    }
}

