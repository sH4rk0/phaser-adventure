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
