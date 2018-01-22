/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>


module z89 {

    let _newGame: initGame;
    let _playerScore: number = 0;
    let _firstTime: boolean = true;
    let _level: number = 2;
    let _game: Phaser.Game;
    let _gameSetup: boolean = false;
    let _gameSounds: Array<Phaser.Sound> = [];
    let _ismobile: boolean = true;
    let _089Data: any;
    let _c64Colors: Array<number> = [0x000000, 0xffffff, 0x68372b, 0x9A6759, 0x70A4B2, 0x6F3D86, 0x588D43, 0x9AD284, 0x352879, 0xB8C76F, 0x6F4F25, 0x433900, 0x444444, 0x6C6C6C, 0x6C5EB5, 0x959595];
    let _gameName:string;

    export enum c64ColorsEnum {
        black = 0x000000,
        white = 0xffffff,
        red = 0x68372b,
        light_red = 0x9A6759,
        cyan = 0x70A4B2,
        purple =  0x6F3D86,
        green = 0x588D43,
        light_green = 0x9AD284,
        blue = 0x352879,
        yellow = 0xB8C76F,
        orange = 0x6F4F25,
        brown = 0x433900,
        dark_grey = 0x444444,
        grey = 0x6C6C6C,
        light_blue = 0x6C5EB5,
        light_grey = 0x959595
    }

    
    export function getGameName():string{
        
                return _gameName
        
            }
        
    export function setGameName(game:Phaser.Game):void{

    
        let games:Array<string>=[
            "ZERO89.IT",
            "COMMANDO +2 / FLT",
            "ACCOLADE COMICS / TYC"

        ];

        let index:number=game.rnd.integerInRange(0,games.length-1);
      
        _gameName = games[index];
       

    }

    export function getC64Color(_index:number): number {
        return _c64Colors[_index];
    }

    export function setFirstTime(_val: boolean): void { _firstTime = _val; }
    export function getFirstTime(): boolean { return _firstTime; }

    export function setZero89Data(_values: any): void { _089Data = _values; }
    export function getZero89Data(): any { return _089Data; }

    export function getScore(): number { return _playerScore; }
    export function setScore(val: number): void { _playerScore = val; }

    export function setGame(game: Phaser.Game) { _game = game; }
    export function getGame(): Phaser.Game { return _game; }


    export function isSaved(): boolean { return true; }


    export function getSound(_sound: gameSound): Phaser.Sound {

        return _gameSounds[_sound];

    }

    export function playSound(_sound: gameSound): void {

        _gameSounds[_sound].play();

    }

    export function stopSound(_sound: gameSound): void {

        _gameSounds[_sound].stop();

    }

    export function pauseSound(_sound: gameSound): void {

        _gameSounds[_sound].stop();

    }

    export function setSoundVolume(_sound: gameSound, _volume: number): void {

        _gameSounds[_sound].volume = _volume;

    }

    export enum gameSound {
        intro,
        menu,
        lightsaber,
        tieShot,
        ingame,
        engine,
        explosion,
        bonus,
        colliderSound,
        yeahh,
        gameover,
        attacksequence,
        stayfocused,
        watchenemy,
        theforce,
        stayontarget,
        tiefly,
        usetheforce
    }

    export function setUpGame(_game: Phaser.Game): void {

        if (!_gameSetup) {

            //console.log("gameSetup");
            setGame(_game);
           
          

            var _sound: Phaser.Sound;
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                _sound = _game.add.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].volume, gameData.assets.sounds[i].loop);
                _sound.allowMultiple = true;
                _gameSounds.push(_sound);
            }
            _gameSetup = true;

        }

    }

    export function isMobile(): boolean {

        return _ismobile;
    }

    export function setDevice(isMobile: boolean): void {

        _ismobile = isMobile;
    }

    export function getUrlParameter(sParam: string): any {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };


    export function goState(_state: string, _game: Phaser.Game): void {

        var st = <Phaser.Plugin.StateTransition>_game.plugins.add(Phaser.Plugin.StateTransition);
        if (isMobile()) {

            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0 }
            });

        } else {
            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
            });

        }


        st.to(_state);

    }

    export function getLabel(_index: number): string {
        return languages[currentLang][_index];
    }



    export class initGame {


        private game: Phaser.Game;
        private width: number;
        private height: number;

        constructor(width?: number, height?: number) {

            

            var dpr: number = 1;
            if (width != undefined) this.width = width;
            if (height != undefined) this.height = height;

            try {
                if (devicePixelRatio != undefined) {
                    dpr = devicePixelRatio || 1;


                    if (!width) {
                        width = screen.width * dpr;
                    }
                    if (!height) {
                        height = screen.height * dpr;
                    }

                }

            } catch (err) { }

            this.getContents();


        }

        startLoading() {

            this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, "my-game", null, true, true);
            setGameName(this.game);
            this.game.state.add("Boot", Boot, false);
            this.game.state.add("Preloader", Preloader, false);
            this.game.state.add("GameCity", GameCity, false);
            this.game.state.start("Boot");

            setUpGame(this.game);
            

        }

        getContents() {

            $.ajax({
                url: "http://www.zero89.it/api/jsonp/api/core.aspx",
                dataType: "jsonp",
                type: "GET",
                data: {
                    token: "047078118106073053084083117049077089110099113107120099081115118116110050110084081047084055082118122117081052079104113103107108052054043071051118068084098077105105071106104110050101084108106119071069078121085067085071073067085112119117049101108115051116120119061061",
                    format: "json"
                },
            }).done(function (data) { setZero89Data(data.values.value); _newGame.startLoading(); })
                .fail(function (xhr) { console.log('error', xhr);
            
                _newGame.startLoading();
            });
        }

    }


    window.onresize = () => { }

    window.onload = () => { _newGame = new initGame(1080, 720); }


}

// when the page has finished loading, create our game
const WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }

};

Phaser.BitmapText.prototype.updateText = function () {

    var data = this._data.font;

    if (!data) {
        return;
    }

    var text = this.text;
    var scale = this._fontSize / data.size;
    var lines = [];

    var y = 0;

    this.textWidth = 0;

    do {
        var line = this.scanLine(data, scale, text);

        line.y = y;

        lines.push(line);

        if (line.width > this.textWidth) {
            this.textWidth = line.width;
        }

        y += (data.lineHeight * scale);

        text = text.substr(line.text.length + 1);

    } while (line.end === false);

    this.textHeight = y;

    var t = 0;
    var align = 0;
    var ax = this.textWidth * this.anchor.x;
    var ay = this.textHeight * this.anchor.y;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        if (this._align === 'right') {
            align = this.textWidth - line.width;
        } else if (this._align === 'center') {
            align = (this.textWidth - line.width) / 2;
        }

        for (var c = 0; c < line.text.length; c++) {
            var charCode = line.text.charCodeAt(c);
            var charData = data.chars[charCode];

            if (charData === undefined) {
                charCode = 32;
                charData = data.chars[charCode];
            }

            var g = this._glyphs[t];

            if (g) {
                //  Sprite already exists in the glyphs pool, so we'll reuse it for this letter
                g.texture = charData.texture;
            } else {
                //  We need a new sprite as the pool is empty or exhausted
                g = new PIXI.Sprite(charData.texture);
                g.name = line.text[c];
                this._glyphs.push(g);
            }

            g.position.x = (line.chars[c] + align) - ax;
            g.position.y = (line.y + (charData.yOffset * scale)) - ay;

            g.scale.set(scale);
            g.tint = this.tint;
            g.texture.requiresReTint = true;
            g.cachedTint = 0xFFFFFF;

            if (!g.parent) {
                this.addChild(g);
            }

            t++;
        }
    }

    //  Remove unnecessary children
    //  This moves them from the display list (children array) but retains them in the _glyphs pool
    for (i = t; i < this._glyphs.length; i++) {
        this.removeChild(this._glyphs[i]);
    }

};



/*
var _guserid: string;
var _gname: string;
var _gfriends: string;
var sharing: boolean = false;

function checkLoginStatus(response) {

    //alert("checkLoginStatus")
    if (response.status === 'connected') {

        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;

        FB.api('/me', function (response) {
            if (response && !response.error) {
                _guserid = response.id;
                _gname = response.name;

                FB.api("/me/friends",
                    function (response) {
                        if (response && !response.error) {
                            _gfriends = response.data;

                            //alert("to share")
                            share();

                        }
                    }
                );


            }
        });




    } else if (response.status === 'not_authorized') {
        performLogin()
    } else {
        performLogin()
    }
}

function performLogin() {

    //alert("performLogin")

    FB.login(function (response) {
        //alert(response)
        if (response.authResponse) {
            checkLoginStatus(response);
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, { scope: 'public_profile, email, user_friends' });
}


function getLoginStatus() {

    //alert("getLoginStatus")
    FB.getLoginStatus(function (response) { checkLoginStatus(response); });

}


function anonymous() {

    $.ajax({
        url: "http://www.zero89.it/api/jsonp/scores/core.aspx",
        data: { who: "save", game: "xmas2016", name: "anonymous (" + z89.getLevelLabel() + " level)", callback: "gamescores", score: z89.getScore() },
        dataType: "jsonp",
        jsonpCallback: "gamescores",
        context: document.body
    }).done(function (data) { });

}

function share() {


    if (sharing) return;

    sharing = true;

    $.ajax({
        url: "http://www.zero89.it/api/jsonp/scores/core.aspx",
        data: { who: "save", game: "xmas2016", name: _gname + " (" + z89.getLevelLabel() + " level)", callback: "gamescores", score: z89.getScore() },
        dataType: "jsonp",
        jsonpCallback: "gamescores",
        context: document.body
    }).done(function (data) {


        FB.ui({
            method: 'feed',
            name: 'XMAS RUN 2k16',
            link: 'http://xmas2016.zero89.it/halloffame.html',
            description: 'You score ' + z89.getScore() + " points @ " + z89.getLevelLabel() + " level!",
            caption: "May the FORCE be with you!",
            picture: 'http://xmas2016.zero89.it/assets/images/game/cover.png'
        }, function (response) {

            sharing = false;

        });


    }).fail(function (jqXHR, textStatus, errorThrown) {

        //console.log(jqXHR, textStatus, errorThrown)

    });


};




window.fbAsyncInit = function () {
    FB.init({
        appId: '319545484920372',
        xfbml: true,
        version: 'v2.2'
    });

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

*/
