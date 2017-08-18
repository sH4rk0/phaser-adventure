/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>


module z89 {

    var _newGame: initGame;
    var _playerScore: number = 0;
    var _firstTime: boolean = true;
    var _level: number = 2;
    var _game: Phaser.Game;
    var _gameSetup: boolean = false;
    var _gameSounds: Array<Phaser.Sound> = [];
    var _ismobile: boolean = true;

    export function setFirstTime(_val: boolean): void { _firstTime = _val; }
    export function getFirstTime(): boolean { return _firstTime; }

    export function getScore(): number { return _playerScore; }
    export function setScore(val: number): void { _playerScore = val; }

    export function setGame(game: Phaser.Game) { _game = game; }
    export function getGame(): Phaser.Game { return _game; }

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


        public game: Phaser.Game;

        constructor(width?: number, height?: number) {

            var dpr: number = 1;
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

            this.game = new Phaser.Game(width, height, Phaser.CANVAS, "", null, false, true);

            this.game.state.add("Boot", Boot, false);
            this.game.state.add("Preloader", Preloader, false);
            this.game.state.add("GameCity", GameCity, false);
            this.game.state.start("Boot");




        }

    }


    window.onresize = () => { }

    window.onload = () => { _newGame = new initGame(1024, 768); }


}

// when the page has finished loading, create our game
const WebFontConfig = {
    active: function () { },
    google: {
        families: ['Press Start 2P']
    }

};
let languages={
        en:[
            "the drink machine",//00
            "It's too heavy!!!",//01
            "No way to pull it!",//02
            "Maybe it accept money!",//03
            "It's closed.",//04
            "It's already closed.",//05
            "Seems to be a standard drink machine.",//06
            "I have no money.",//07
            "Really!?!?!",//08
            "Do you really want to talk with it?",//09
            "Coke",//10
            "Please! Ask the developer to write a better pathfinding function!", //11
            "the mediacall box", //12
            "No way!", //13
            "Nothing strange.", //14
            "It's really hot! I need something to drink.", //15
            "the garbage bin", //16
            "the hydrant", //17

        ]};

let currentLang = "en";

let gameData = {

    menuBlink:[
        {icon:"",to:100, x:-130, y:-290},

        {icon:"",to:700, x:-130, y:-220},
        {icon:"",to:1254, x:-60, y:-220},
        {icon:"",to:1590, x:10, y:-220},
        {icon:"",to:1900, x:80, y:-220},

        {icon:"",to:2580, x:-130, y:-150},
        {icon:"",to:3170, x:-60, y:-150},
        {icon:"",to:4000, x:10, y:-150},
        {icon:"",to:4500, x:80, y:-150}


    ],

    assets: {
        spritesheets: [

            { name: "deluca", path: "assets/images/game/player.png", width: 126, height: 126, frames: 64 },

            { name: "phoneWork", path: "assets/images/game/items/phoneWork.png", width: 56, height: 132, frames: 2  },
            { name: "phoneNotWork", path: "assets/images/game/items/phoneNotWork.png" , width: 52, height: 132, frames: 5 },

        ],

        images: [
            { name: "city", path: "assets/images/game/cityBW.png" },
            { name: "bg2", path: "assets/images/game/city2.png" },
            { name: "bg", path: "assets/images/game/bgBW.png" },
            { name: "streetLvl1", path: "assets/images/game/streetLvl1BW.png" },
            { name: "streetLvl0", path: "assets/images/game/streetLvl0BW.png" },
            { name: "sky", path: "assets/images/game/skyBW.png" },
            { name: "menuBg", path: "assets/images/game/menu.png" },
            { name: "drink-machine", path: "assets/images/game/items/drink-machine.png" },
            
            { name: "trash", path: "assets/images/game/items/trash.png" },
            { name: "hydrant", path: "assets/images/game/items/hydrant.png" },
            { name: "coke", path: "assets/images/game/items/coke.png" },
        ],

        sounds: [
            /*
                        { name: "intro", paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"], volume: 1, loop: false },
                        { name: "starwars", paths: ["assets/sounds/starwars.ogg", "assets/sounds/starwars.m4a"], volume: 1, loop: true },
                        { name: "lightSaber", paths: ["assets/sounds/lightSaber.ogg", "assets/sounds/lightSaber.m4a"], volume: 1, loop: false },
                        { name: "tieShot", paths: ["assets/sounds/tieShot.ogg", "assets/sounds/tieShot.m4a"], volume: .5, loop: false },
                        { name: "game", paths: ["assets/sounds/gameTheme.ogg", "assets/sounds/gameTheme.m4a"], volume: 1, loop: true },
                        { name: "engine2", paths: ["assets/sounds/engine2.ogg", "assets/sounds/engine2.m4a"], volume: 1, loop: true },
                        { name: "explosion", paths: ["assets/sounds/explosion.ogg", "assets/sounds/explosion.m4a"], volume: 1, loop: false },
                        { name: "bonus", paths: ["assets/sounds/bonus.ogg", "assets/sounds/bonus.m4a"], volume: .5, loop: false },
                        { name: "colliderSound", paths: ["assets/sounds/colliderSound.ogg", "assets/sounds/colliderSound.m4a"], volume: 1, loop: false },
                        { name: "yeahh", paths: ["assets/sounds/yeahh.ogg", "assets/sounds/yeahh.m4a"], volume: 1, loop: false },
                        { name: "final", paths: ["assets/sounds/final.ogg", "assets/sounds/final.m4a"], volume: .5, loop: true },
                        { name: "attackSequence", paths: ["assets/sounds/attackSequence.ogg", "assets/sounds/attackSequence.m4a"], volume: .5, loop: false },
                        { name: "stayFocused", paths: ["assets/sounds/stayFocused.ogg", "assets/sounds/stayFocused.m4a"], volume: .5, loop: false },
                        { name: "watchEnemy", paths: ["assets/sounds/watchEnemy.ogg", "assets/sounds/watchEnemy.m4a"], volume: .5, loop: false },
                        { name: "TheForce", paths: ["assets/sounds/TheForce.ogg", "assets/sounds/TheForce.m4a"], volume: .5, loop: false },
                        { name: "stayOnTarget", paths: ["assets/sounds/stayOnTarget.ogg", "assets/sounds/stayOnTarget.m4a"], volume: .5, loop: false },
                        { name: "tieFly", paths: ["assets/sounds/tieFly.ogg", "assets/sounds/tieFly.m4a"], volume: .5, loop: false },
                        { name: "useTheForce", paths: ["assets/sounds/useTheForce.ogg", "assets/sounds/useTheForce.m4a"], volume: .5, loop: false }
            */
        ],

        bitmapfont: [
            { name: "commodore", imgpath: "assets/fonts/carrier_command.png", xmlpath: "assets/fonts/carrier_command.xml" }
        ]

    },



    ingame: {
         
        // PUSH, PULL, GIVE, OPEN, CLOSE, EXAMINE, USE, PICKUP, TALKTO
        items: [

           

             {
                id: 1,
                type: 1,
                sprite: "drink-machine",
                name: z89.getLabel(0),
                x: 500,
                y: 744,
                bgItem:true,
                interactive: true,
                firstMessage:[z89.getLabel(15)],
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },
                    1: { action: false, answer: [z89.getLabel(2)] },
                    2: { action: false, answer: [z89.getLabel(3)] },
                    3: { action: false, answer: [z89.getLabel(4)] },
                    4: { action: false, answer: [z89.getLabel(5)] },
                    5: { action: true, answer: [z89.getLabel(6),z89.getLabel(14)] },
                    6: { action: true, answer: [z89.getLabel(7)] },
                    7: { action: false, answer: [z89.getLabel(8)] },
                    8: {
                        action: false, answer: [z89.getLabel(9)]
                    }
                },

                offsetX: 70,
                fixedToCamera: true,

            },

            

            {
                id: 2,
                type: 2,
                bgItem:true,
                sprite: "phoneNotWork",
                animations:[{name:"idle",frames:[0,1,2,3,4],rate:5,loop:true}],
                name: z89.getLabel(12),
                x: 1114,
                y: 644,
                interactive: true,
                offsetX: 50,
                coins: 0,
                fixedToCamera: false,

            },

            {
                id: 3,
                type: 2,
                bgItem:true,
                sprite: "phoneWork",
                animations:[{name:"idle",frames:[0,1],rate:3,loop:true}],
                name:  z89.getLabel(12),
                x: 1526,
                y: 644,
                interactive: true,
                offsetX: 50,
                fixedToCamera: false,

            },


            {
                id: 4,
                type: 3,
                bgItem:true,
                sprite: "trash",
                name: z89.getLabel(16),
                x: 400,
                y: 644,
                interactive: true,
                offsetX: 50,
                fixedToCamera: false,

            },


            {
                id: 5,
                type: 4,
                bgItem:true,
                sprite: "hydrant",
                name: z89.getLabel(17),
                x: 852,
                y: 712,
                interactive: true,
                offsetX: 50,
                fixedToCamera: true,

            },


            {
                id: 6,
                type: 4,
                bgItem:true,
                sprite: "hydrant",
                name: z89.getLabel(17),
                x: 1809,
                y: 712,
                interactive: true,
                offsetX: 50,
                fixedToCamera: true,

            },
            {
                id: 7,
                type: 5,
                sprite: "coke",
                bgItem:false,
                name: z89.getLabel(10),
                x: 400,
                y: 745,
                interactive: true,
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },
                    1: { action: false, answer: [z89.getLabel(2)] },
                    2: { action: false, answer: [z89.getLabel(3)] },
                    3: { action: false, answer: [z89.getLabel(4)] },
                    4: { action: false, answer: [z89.getLabel(5)] },
                    5: { action: true, answer: [z89.getLabel(6)] },
                    6: { action: true, answer: [z89.getLabel(7)] },
                    7: { action: false, answer: [z89.getLabel(8)] },
                    8: {
                        action: false, answer: [z89.getLabel(9)]
                    }
                },

                offsetX: 70,
                fixedToCamera: true,
                pickupable:true,

            },




        ]

    


    }









}





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
