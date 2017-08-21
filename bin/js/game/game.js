var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var z89;
(function (z89) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Preloader.prototype.preload = function () {
            this.game.load.onLoadStart.add(function () { }, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(function () {
                this.loadingBar.visible = false;
                this.loadingPerc.visible = false;
                this.startBtn.visible = true;
                this.game.input.onDown.addOnce(function () { z89.goState("GameCity", this.game); }, this);
            }, this);
            //start button
            //--------------------------
            this.startBtn = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('startBtn'));
            this.startBtn.anchor.setTo(0.5);
            var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            this.startBtn.addChild(_spriteText);
            this.startBtn.visible = false;
            // this.loadingContainer.addChild(this.startBtn);
            //Loading container
            //--------------------------
            this.loadingBar = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('loadingBar'));
            this.loadingBar.anchor.setTo(0.5);
            this.loadingPerc = this.game.add.text(0, 0, '0%', { wordWrap: true, wordWrapWidth: this.loadingBar.width, fill: '#ffffff', stroke: '#0096ff', strokeThickness: 5 });
            this.loadingPerc.anchor.set(0.5);
            this.loadingBar.addChild(this.loadingPerc);
            this.game.load.setPreloadSprite(this.loadingBar);
            //Assets Load
            //--------------------------	
            // IMAGES		
            for (var i = 0; i < gameData.assets.images.length; i++) {
                this.game.load.image(gameData.assets.images[i].name, gameData.assets.images[i].path);
            }
            // SPRITESHEETS		
            for (var i = 0; i < gameData.assets.spritesheets.length; i++) {
                this.game.load.spritesheet(gameData.assets.spritesheets[i].name, gameData.assets.spritesheets[i].path, gameData.assets.spritesheets[i].width, gameData.assets.spritesheets[i].height, gameData.assets.spritesheets[i].frames);
            }
            //bitmap fonts
            for (var i = 0; i < gameData.assets.bitmapfont.length; i++) {
                this.game.load.bitmapFont(gameData.assets.bitmapfont[i].name, gameData.assets.bitmapfont[i].imgpath, gameData.assets.bitmapfont[i].xmlpath);
            }
            // SOUNDS
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                this.game.load.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].paths);
            }
            this.game.load.script('webfont', 'js/libs/webfonts.js');
        };
        Preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) { this.loadingPerc.text = progress + "%"; };
        return Preloader;
    }(Phaser.State));
    z89.Preloader = Preloader;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Boot.prototype.preload = function () {
            var bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('loadingBar', bmd);
            bmd = this.game.add.bitmapData(1024, 260);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1024, 260);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('ground', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('startBtn', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('button', bmd);
            bmd = this.game.add.bitmapData(50, 50);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 50, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('btn', bmd);
            bmd = this.game.add.bitmapData(300, 768);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 300, 768);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('menuAction', bmd);
            bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('menuActionBtn', bmd);
            bmd = this.game.add.bitmapData(50, 100);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 50, 100);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('hitArea', bmd);
            bmd = this.game.add.bitmapData(340, 50);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 340, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('baloonBg', bmd);
            bmd = this.game.add.bitmapData(340, 5);
            bmd.ctx.fillStyle = '#00ff00';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 340, 5);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('baloonBorder', bmd);
            bmd = this.game.add.bitmapData(25, 25);
            bmd.ctx.fillStyle = '#00ff00';
            bmd.ctx.beginPath();
            bmd.ctx.moveTo(0, 12.5);
            bmd.ctx.lineTo(25, 12.5);
            bmd.ctx.lineTo(12.5, 25);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('baloonPin', bmd);
            bmd = this.game.add.bitmapData(70, 70);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 70, 70);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('inventoryIconBg', bmd);
        };
        Boot.prototype.create = function () {
            if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
                z89.setDevice(true);
            }
            else {
                z89.setDevice(false);
            }
            this.game.stage.backgroundColor = '#000000';
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.stage.smoothed = false;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.state.start('Preloader');
        };
        return Boot;
    }(Phaser.State));
    z89.Boot = Boot;
})(z89 || (z89 = {}));
/// <reference path="Lib/phaser.d.ts"/>
/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/firebase.d.ts"/>
/// <reference path="States/Preloader.ts"/>
/// <reference path="States/Boot.ts"/>
var z89;
(function (z89) {
    var _newGame;
    var _playerScore = 0;
    var _firstTime = true;
    var _level = 2;
    var _game;
    var _gameSetup = false;
    var _gameSounds = [];
    var _ismobile = true;
    function setFirstTime(_val) { _firstTime = _val; }
    z89.setFirstTime = setFirstTime;
    function getFirstTime() { return _firstTime; }
    z89.getFirstTime = getFirstTime;
    function getScore() { return _playerScore; }
    z89.getScore = getScore;
    function setScore(val) { _playerScore = val; }
    z89.setScore = setScore;
    function setGame(game) { _game = game; }
    z89.setGame = setGame;
    function getGame() { return _game; }
    z89.getGame = getGame;
    function getSound(_sound) {
        return _gameSounds[_sound];
    }
    z89.getSound = getSound;
    function playSound(_sound) {
        _gameSounds[_sound].play();
    }
    z89.playSound = playSound;
    function stopSound(_sound) {
        _gameSounds[_sound].stop();
    }
    z89.stopSound = stopSound;
    function pauseSound(_sound) {
        _gameSounds[_sound].stop();
    }
    z89.pauseSound = pauseSound;
    function setSoundVolume(_sound, _volume) {
        _gameSounds[_sound].volume = _volume;
    }
    z89.setSoundVolume = setSoundVolume;
    var gameSound;
    (function (gameSound) {
        gameSound[gameSound["intro"] = 0] = "intro";
        gameSound[gameSound["menu"] = 1] = "menu";
        gameSound[gameSound["lightsaber"] = 2] = "lightsaber";
        gameSound[gameSound["tieShot"] = 3] = "tieShot";
        gameSound[gameSound["ingame"] = 4] = "ingame";
        gameSound[gameSound["engine"] = 5] = "engine";
        gameSound[gameSound["explosion"] = 6] = "explosion";
        gameSound[gameSound["bonus"] = 7] = "bonus";
        gameSound[gameSound["colliderSound"] = 8] = "colliderSound";
        gameSound[gameSound["yeahh"] = 9] = "yeahh";
        gameSound[gameSound["gameover"] = 10] = "gameover";
        gameSound[gameSound["attacksequence"] = 11] = "attacksequence";
        gameSound[gameSound["stayfocused"] = 12] = "stayfocused";
        gameSound[gameSound["watchenemy"] = 13] = "watchenemy";
        gameSound[gameSound["theforce"] = 14] = "theforce";
        gameSound[gameSound["stayontarget"] = 15] = "stayontarget";
        gameSound[gameSound["tiefly"] = 16] = "tiefly";
        gameSound[gameSound["usetheforce"] = 17] = "usetheforce";
    })(gameSound = z89.gameSound || (z89.gameSound = {}));
    function setUpGame(_game) {
        if (!_gameSetup) {
            //console.log("gameSetup");
            setGame(_game);
            var _sound;
            for (var i = 0; i < gameData.assets.sounds.length; i++) {
                _sound = _game.add.audio(gameData.assets.sounds[i].name, gameData.assets.sounds[i].volume, gameData.assets.sounds[i].loop);
                _sound.allowMultiple = true;
                _gameSounds.push(_sound);
            }
            _gameSetup = true;
        }
    }
    z89.setUpGame = setUpGame;
    function isMobile() {
        return _ismobile;
    }
    z89.isMobile = isMobile;
    function setDevice(isMobile) {
        _ismobile = isMobile;
    }
    z89.setDevice = setDevice;
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)), sURLVariables = sPageURL.split('&'), sParameterName, i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
    z89.getUrlParameter = getUrlParameter;
    ;
    function goState(_state, _game) {
        var st = _game.plugins.add(Phaser.Plugin.StateTransition);
        if (isMobile()) {
            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0 }
            });
        }
        else {
            st.configure({
                duration: 1000,
                ease: Phaser.Easing.Exponential.InOut,
                properties: { alpha: 0, scale: { x: 1.5, y: 1.5 } }
            });
        }
        st.to(_state);
    }
    z89.goState = goState;
    function getLabel(_index) {
        return languages[currentLang][_index];
    }
    z89.getLabel = getLabel;
    var initGame = (function () {
        function initGame(width, height) {
            var dpr = 1;
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
            }
            catch (err) { }
            this.game = new Phaser.Game(width, height, Phaser.CANVAS, "", null, false, true);
            this.game.state.add("Boot", z89.Boot, false);
            this.game.state.add("Preloader", z89.Preloader, false);
            this.game.state.add("GameCity", z89.GameCity, false);
            this.game.state.start("Boot");
        }
        return initGame;
    }());
    z89.initGame = initGame;
    window.onresize = function () { };
    window.onload = function () { _newGame = new initGame(1024, 768); };
})(z89 || (z89 = {}));
// when the page has finished loading, create our game
var WebFontConfig = {
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
var languages = {
    en: [
        "drink machine",
        "It's too heavy!!!",
        "No way to pull it!",
        "Maybe it accept money!",
        "It's closed.",
        "It's already closed.",
        "Seems to be a standard drink machine.",
        "I have no money.",
        "Really!?!?!",
        "Do you really want to talk with it?",
        "Coke",
        "Please! Ask the developer to write a better pathfinding function!",
        "mediacall box",
        "No way!",
        "Nothing strange.",
        "It's really hot! I need something to drink.",
        "garbage bin",
        "hydrant",
        "A stinking garbage bin!",
        "It is illogic!",
        "I won't do that!",
        "Forget it!",
        "I can't drop it!",
        "coins",
        "Quattrocchi, non mi far alterare o ti SCUMM a sangue!!",
        "4eyes",
    ]
};
var currentLang = "en";
var gameData = {
    ingame: {
        // PUSH, PULL, GIVE, OPEN, CLOSE, EXAMINE, USE, PICKUP, TALKTO
        //game logic
        logic: {
            //use money on drink machine
            USE_8_1: function (currentState) {
                currentState.player.play("use");
                currentState.removeInventoryItems();
            },
            USE_9_1: function (currentState) {
                currentState.player.play("use");
                currentState.removeInventoryItems();
            }
        },
        //items logic
        items: [
            {
                id: 1,
                type: 1,
                sprite: "drink-machine",
                name: z89.getLabel(0),
                x: 500,
                y: 744,
                onStart: true,
                interactive: true,
                firstMessage: [z89.getLabel(15)],
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },
                    1: { action: false, answer: [z89.getLabel(2)] },
                    2: { action: false, answer: [z89.getLabel(3)] },
                    3: { action: false, answer: [z89.getLabel(4)] },
                    4: { action: false, answer: [z89.getLabel(5)] },
                    5: { action: true, answer: [z89.getLabel(6), z89.getLabel(14)] },
                    6: { action: true, answer: [z89.getLabel(7)] },
                    7: { action: false, answer: [z89.getLabel(8)] },
                    8: { action: false, answer: [z89.getLabel(22)] },
                    9: { action: false, answer: [z89.getLabel(9)] }
                },
                logic: {
                    PUSH: function (currentState) {
                        currentState.currentItem.returnMessage();
                    },
                    PULL: function (currentState) {
                        currentState.currentItem.returnMessage();
                    },
                    GIVE: function (currentState) {
                        currentState.currentItem.returnMessage();
                    },
                    OPEN: function (currentState) {
                        currentState.currentItem.returnMessage();
                    },
                    CLOSE: function (currentState) {
                        currentState.currentItem.returnMessage();
                    },
                    EXAMINE: function (currentState) {
                        currentState.currentItem.returnMessage();
                    },
                    USE: function (currentState) {
                        currentState.currentItem.returnMessage();
                    },
                    PICKUP: function (currentState) {
                        currentState.currentItem.returnMessage();
                    },
                    DROP: function (currentState) {
                        currentState.currentItem.returnMessage();
                    },
                    TALKTO: function (currentState) {
                        currentState.currentItem.returnMessage();
                    }
                },
                offsetX: 70,
                fixedToCamera: true,
                checkIntersect: true
            },
            {
                id: 2,
                type: 2,
                onStart: true,
                sprite: "phoneNotWork",
                animations: [{ name: "idle", frames: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4], rate: 5, loop: true }],
                name: z89.getLabel(12),
                x: 1114,
                y: 644,
                interactive: true,
                offsetX: 50,
                coins: 0,
                fixedToCamera: false,
                checkIntersect: false
            },
            {
                id: 3,
                type: 2,
                onStart: true,
                sprite: "phoneWork",
                animations: [{ name: "idle", frames: [0, 1], rate: 3, loop: true }],
                name: z89.getLabel(12),
                x: 1526,
                y: 644,
                interactive: true,
                offsetX: 50,
                fixedToCamera: false,
                checkIntersect: false
            },
            {
                id: 4,
                type: 3,
                onStart: true,
                sprite: "trash",
                name: z89.getLabel(16),
                x: 650,
                y: 649,
                interactive: true,
                firstMessage: [z89.getLabel(18)],
                offsetX: 50,
                fixedToCamera: false,
                checkIntersect: false
            },
            {
                id: 5,
                type: 4,
                onStart: true,
                sprite: "hydrant",
                name: z89.getLabel(17),
                x: 852,
                y: 712,
                interactive: true,
                offsetX: 50,
                fixedToCamera: true,
                checkIntersect: true
            },
            {
                id: 6,
                type: 4,
                onStart: true,
                sprite: "hydrant",
                name: z89.getLabel(17),
                x: 1809,
                y: 712,
                interactive: true,
                offsetX: 50,
                fixedToCamera: true,
                checkIntersect: true
            },
            {
                id: 7,
                type: 5,
                sprite: "coke",
                onStart: true,
                name: z89.getLabel(10),
                x: 400,
                y: 650,
                interactive: true,
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },
                },
                logic: {
                    PICKUP: function (currentState) {
                        currentState.addInventoryItem();
                        currentState.player.play("pickdrop");
                    },
                    DROP: function (currentState) {
                    },
                },
                offsetX: 30,
                fixedToCamera: false,
                checkIntersect: true
            },
            {
                id: 8,
                type: 6,
                sprite: "coins",
                onStart: true,
                name: z89.getLabel(23),
                x: 300,
                y: 654,
                interactive: true,
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); currentState.player.play("pickdrop"); },
                    DROP: function (currentState) { },
                },
                offsetX: 30,
                fixedToCamera: false,
                checkIntersect: false
            },
            {
                id: 9,
                type: 6,
                sprite: "coins",
                onStart: true,
                name: z89.getLabel(23),
                x: 300,
                y: 700,
                interactive: true,
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); currentState.player.play("pickdrop"); },
                    DROP: function (currentState) { },
                },
                offsetX: 30,
                fixedToCamera: false,
                checkIntersect: false
            },
            {
                id: 3,
                type: 2,
                onStart: true,
                sprite: "4eyes",
                animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 4, loop: true }],
                name: z89.getLabel(25),
                x: 700,
                y: 650,
                interactive: true,
                offsetX: 50,
                fixedToCamera: false,
                checkIntersect: false
            },
        ]
    },
    assets: {
        spritesheets: [
            { name: "player", path: "assets/images/game/player.png", width: 126, height: 126, frames: 64 },
            { name: "phoneWork", path: "assets/images/game/items/phoneWork.png", width: 56, height: 132, frames: 2 },
            { name: "phoneNotWork", path: "assets/images/game/items/phoneNotWork.png", width: 52, height: 132, frames: 5 },
            { name: "4eyes", path: "assets/images/game/people/4eyes.png", width: 65, height: 138, frames: 4 },
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
            { name: "coins", path: "assets/images/game/items/coins.png" },
            { name: "4eyes", path: "assets/images/game/people/4eyes.png" },
        ],
        sounds: [],
        bitmapfont: [
            { name: "commodore", imgpath: "assets/fonts/carrier_command.png", xmlpath: "assets/fonts/carrier_command.xml" }
        ]
    },
    menuBlink: [
        { icon: "", to: 100, x: -130, y: -290 },
        { icon: "", to: 700, x: -130, y: -220 },
        { icon: "", to: 1254, x: -60, y: -220 },
        { icon: "", to: 1590, x: 10, y: -220 },
        { icon: "", to: 1900, x: 80, y: -220 },
        { icon: "", to: 2580, x: -130, y: -150 },
        { icon: "", to: 3170, x: -60, y: -150 },
        { icon: "", to: 4000, x: 10, y: -150 },
        { icon: "", to: 4500, x: 80, y: -150 }
    ]
};
var z89;
(function (z89) {
    var Items = (function (_super) {
        __extends(Items, _super);
        function Items(game, itemObj) {
            var _this = _super.call(this, game, itemObj.x, itemObj.y, itemObj.sprite) || this;
            if (itemObj.animations != undefined) {
                itemObj.animations.forEach(function (element) {
                    _this.animations.add(element.name, element.frames, element.rate, element.loop);
                    _this.play(element.name);
                });
            }
            _this.currentState = _this.game.state.getCurrentState();
            _this.anchor.set(0.5, 1);
            _this.id = itemObj.id;
            _this.itemObj = itemObj;
            _this.inputEnabled = true;
            _this.name = itemObj.name;
            _this.input.priorityID = 1;
            _this.interactive = itemObj.interactive;
            _this.fixedToCamera = itemObj.fixedToCamera;
            _this.events.onInputDown.add(function () {
                var _currentItem = _this.currentState.getCurrentItem();
                if (_this.currentState.playerActions.IsOpen() && _currentItem != undefined && _currentItem.id != _this.id)
                    _this.currentState.playerActions.hide();
                var _playerDest = _this.x;
                if (_this.currentState.player.x < _this.x) {
                    _playerDest -= _this.itemObj.offsetX;
                }
                else {
                    _playerDest += _this.itemObj.offsetX;
                }
                _this.currentState.player.goTo(_playerDest, _this.y, _this);
            }, _this);
            _this.game.add.existing(_this);
            return _this;
        }
        Items.prototype.update = function () {
            if (this.fixedToCamera)
                this.cameraOffset.x = (this.currentState.camera.x * -1.1) + this.itemObj.x;
        };
        Items.prototype.isInteractive = function () {
            return this.interactive;
        };
        Items.prototype.getItemObj = function () {
            return this.itemObj;
        };
        Items.prototype.getPlayer = function () {
            return this.currentState.player;
        };
        Items.prototype.returnMessage = function () {
            var currAction = this.currentState.playerActions.getCurrentAction();
            var _mess = this.itemObj.actions[currAction].answer[this.game.rnd.integerInRange(0, this.itemObj.actions[currAction].answer.length - 1)];
            //console.log(currAction,_mess, this.itemObj.actions[currAction].answer.length)
            this.currentState.player.showBaloon(_mess);
        };
        Items.prototype.logic = function () {
            //console.log(this.getCurrentActionString())
            if (this.currentState.getCurrentActionString() != undefined && this.itemObj.logic != undefined && this.itemObj.logic[this.currentState.getCurrentActionString()] != undefined) {
                this.itemObj.logic[this.currentState.getCurrentActionString()](this.currentState);
            }
            else {
                if (this.currentState.getCurrentActionString() != undefined)
                    this.currentState.player.illogicAction();
            }
        };
        return Items;
    }(Phaser.Sprite));
    z89.Items = Items;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var PlayerStates;
    (function (PlayerStates) {
        PlayerStates[PlayerStates["IDLE"] = 0] = "IDLE";
        PlayerStates[PlayerStates["RUNNING"] = 1] = "RUNNING";
        PlayerStates[PlayerStates["JUMPING"] = 2] = "JUMPING";
    })(PlayerStates = z89.PlayerStates || (z89.PlayerStates = {}));
    var PlayerDirection;
    (function (PlayerDirection) {
        PlayerDirection[PlayerDirection["LEFT"] = 0] = "LEFT";
        PlayerDirection[PlayerDirection["RIGHT"] = 1] = "RIGHT";
    })(PlayerDirection = z89.PlayerDirection || (z89.PlayerDirection = {}));
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game) {
            var _this = _super.call(this, game, 100, 650, "player") || this;
            _this.yMin = 650;
            _this.yMax = 768;
            _this.direction = PlayerDirection.RIGHT;
            _this.money = 10;
            _this.inventory = [];
            _this.illogicText = [z89.getLabel(19), z89.getLabel(20), z89.getLabel(13), z89.getLabel(21)];
            _this.animations.add("idle", [8, 9, 10, 11], 5, true);
            _this.animations.add("walk", [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
            _this.animations.add("punch", [12, 13, 14, 15], 7, false).onComplete.add(function () { _this.play("idle"); }, _this);
            _this.animations.add("pickdrop", [16, 17, 18, 19], 7, false).onComplete.add(function () { _this.play("idle"); }, _this);
            _this.animations.add("use", [19, 20, 21, 20, 19], 7, false).onComplete.add(function () { _this.play("idle"); }, _this);
            _this.play("idle");
            _this.currentState = _this.game.state.getCurrentState();
            _this.anchor.set(0.5, 1);
            _this.scale.set(1);
            _this.name = "player";
            _this.money = 0;
            _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
            _this.body.collideWorldBounds = true;
            //this.cursors = game.input.keyboard.createCursorKeys();
            _this.myArea = _this.game.add.sprite(0, -30, _this.game.cache.getBitmapData("hitArea"));
            _this.myArea.anchor.set(.5, 1);
            _this.myArea.inputEnabled = true;
            _this.myArea.input.priorityID = 2;
            _this.myArea.alpha = 0;
            _this.myArea.height = _this.height;
            _this.myArea.events.onInputDown.add(function () { _this.currentState.playerMenu.toggle(); }, _this);
            _this.addChild(_this.myArea);
            _this.game.add.existing(_this);
            return _this;
        }
        Player.prototype.goTo = function (_x, _y, _item) {
            var _this = this;
            // console.log(_item);
            this.hideBaloon();
            this.play("walk");
            if (this.playerTween != undefined)
                this.playerTween.stop();
            if (_item == undefined)
                this.currentState.currentItem = null;
            if (_x > this.x) {
                if (this.direction != PlayerDirection.RIGHT)
                    this.changeDirection();
            }
            else {
                if (this.direction != PlayerDirection.LEFT)
                    this.changeDirection();
            }
            this.intersect = false;
            var _intersect = this.checkIntersect({ x1: _x, y1: _y + 1 });
            if (_intersect.point != null) {
                var _offset = 0;
                if (this.y < _intersect.point.y) {
                    _offset = -5;
                }
                else {
                    _offset = +5;
                }
                _x = _intersect.point.x;
                _y = _intersect.point.y + _offset;
                _item = null;
                this.intersect = true;
            }
            if (_y > this.yMax)
                _y = this.yMax;
            if (_y < this.yMin)
                _y = this.yMin;
            var distance;
            var distanceX = Phaser.Math.distance(this.x, 0, _x, 0);
            var distanceY = Phaser.Math.distance(0, this.y, 0, _y);
            if (distanceX > distanceY) {
                distance = distanceX;
            }
            else {
                distance = distanceY;
            }
            this.playerTween = this.game.add.tween(this).to({ x: _x, y: _y + 1 }, 7.5 * distance, Phaser.Easing.Default, true, 0, 0, false);
            //moving player tween end
            this.playerTween.onComplete.add(function (_player, _tween, _intersect) {
                _this.play("idle");
                //check if an item is passed as destination
                if (_item != null) {
                    _this.currentState.setCurrentItem(_item);
                    if (_this.x < _item.x) {
                        if (_this.direction == PlayerDirection.LEFT)
                            _this.changeDirection();
                    }
                    else {
                        if (_this.direction == PlayerDirection.RIGHT)
                            _this.changeDirection();
                    }
                    _this.currentState.checkActions();
                    _this.executeItemLogic(_item);
                    _this.currentState.setActionText();
                    _this.currentState.resetActions();
                    _this.currentState.setActionObject(null);
                    console.log(_this.currentState.getActionObject());
                    console.log("-------------------------------------------");
                    if (_item.isInteractive())
                        _this.currentState.playerActions.show();
                }
                //if (_intersect[0]) this.showBaloon(z89.getLabel(11));
            }, this, null, [this.intersect]);
        };
        Player.prototype.executeItemLogic = function (_item) {
            //let _actionObj: any = this.currentState.checkActions(_item);
            var _this = this;
            console.log("executeItemLogic");
            var _actionObj = this.currentState.getActionObject();
            console.log(_actionObj);
            if (_actionObj != null && gameData.ingame.logic[_actionObj.key] != undefined) {
                console.log("logic 1");
                gameData.ingame.logic[_actionObj.key](this.currentState);
            }
            else {
                if (_item != undefined) {
                    console.log("logic 2");
                    _item.logic();
                }
                else if (this.currentState.getCurrentItem() != undefined) {
                    console.log("logic 3");
                    this.currentState.getCurrentItem().logic();
                }
                else if (_item.itemObj.firstMessage != undefined) {
                    console.log("logic 4");
                    this.showBaloon(_item.itemObj.firstMessage[this.game.rnd.integerInRange(0, _item.itemObj.firstMessage.length - 1)]);
                }
            }
            this.game.time.events.add(3000, function () { _this.currentState.playerActions.hideText(); }, this);
        };
        Player.prototype.changeDirection = function () {
            if (this.direction == PlayerDirection.RIGHT) {
                this.turnLeft();
            }
            else {
                this.turnRight();
            }
        };
        Player.prototype.illogicAction = function () {
            this.currentState.player.showBaloon(this.illogicText[this.game.rnd.integerInRange(0, this.illogicText.length - 1)]);
        };
        Player.prototype.turnLeft = function () {
            this.scale.x = -1;
            this.direction = PlayerDirection.LEFT;
        };
        Player.prototype.turnRight = function () {
            this.scale.x = 1;
            this.direction = PlayerDirection.RIGHT;
        };
        Player.prototype.checkIntersect = function (_toPosition) {
            var _obj = { point: null };
            var line1 = new Phaser.Line(_toPosition.x1, _toPosition.y1, this.x, this.y);
            var line2;
            var intersectPoint;
            this.currentState.getSprites().forEach(function (sprite) {
                if (sprite.name != "player" && sprite.itemObj.checkIntersect) {
                    line2 = new Phaser.Line(sprite.x - (sprite.width / 2) - 10, sprite.y, sprite.x + (sprite.width / 2) + 10, sprite.y);
                    intersectPoint = line1.intersects(line2, true);
                    if (intersectPoint != null) {
                        _obj.point = intersectPoint;
                    }
                }
            }, this);
            return _obj;
        };
        Player.prototype.blinkTo = function (_x) {
            this.hideBaloon();
            this.currentState.playerMenu.hide();
            this.currentState.playerActions.hide();
            this.y = 650;
            this.x = _x;
        };
        Player.prototype.showBaloon = function (_text) {
            this.currentState.playerBaloon.showBaloon(_text);
        };
        Player.prototype.hideBaloon = function () {
            this.currentState.playerBaloon.hideBaloon();
        };
        Player.prototype.getMoney = function () {
            return this.money;
        };
        Player.prototype.setMoney = function (_money) {
            this.money = _money;
        };
        Player.prototype.update = function () {
            /*
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            if (this.cursors.left.isDown) {
                // card.x -= 4;
                this.body.velocity.x = -120;
            }
            else if (this.cursors.right.isDown) {
                // card.x += 4;
                this.body.velocity.x = 120;
            }

            if (this.cursors.up.isDown) {
                // card.y -= 4;
                if (this.y < this.yMin) return;
                this.body.velocity.y = -120;
            }
            else if (this.cursors.down.isDown) {
                // card.y += 4;
                if (this.y > this.yMax) return;
                this.body.velocity.y = 120;
            }
            */
        };
        return Player;
    }(Phaser.Sprite));
    z89.Player = Player;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var PlayerActionList;
    (function (PlayerActionList) {
        PlayerActionList[PlayerActionList["PUSH"] = 0] = "PUSH";
        PlayerActionList[PlayerActionList["PULL"] = 1] = "PULL";
        PlayerActionList[PlayerActionList["GIVE"] = 2] = "GIVE";
        PlayerActionList[PlayerActionList["OPEN"] = 3] = "OPEN";
        PlayerActionList[PlayerActionList["CLOSE"] = 4] = "CLOSE";
        PlayerActionList[PlayerActionList["EXAMINE"] = 5] = "EXAMINE";
        PlayerActionList[PlayerActionList["USE"] = 6] = "USE";
        PlayerActionList[PlayerActionList["PICKUP"] = 7] = "PICKUP";
        PlayerActionList[PlayerActionList["DROP"] = 8] = "DROP";
        PlayerActionList[PlayerActionList["TALKTO"] = 9] = "TALKTO";
    })(PlayerActionList = z89.PlayerActionList || (z89.PlayerActionList = {}));
    var PlayerActions = (function (_super) {
        __extends(PlayerActions, _super);
        function PlayerActions(game) {
            var _this = _super.call(this, game) || this;
            _this.isOpen = false;
            _this.actionList = ["PUSH", "PULL", "GIVE", "OPEN", "CLOSE", "EXAMINE", "USE", "PICK UP", "DROP", "TALK TO"];
            _this.actionListFunctions = ["PUSH", "PULL", "GIVE", "OPEN", "CLOSE", "EXAMINE", "USE", "PICKUP", "DROP", "TALKTO"];
            _this.currentAction = -1;
            _this.inventory = [];
            _this.inventorySelected = [];
            _this.iconAlpha = .8;
            _this.currentState = _this.game.state.getCurrentState();
            _this.fixedToCamera = true;
            _this.menuBg = _this.game.add.sprite(0, 0, _this.game.cache.getBitmapData("menuAction"));
            _this.menuBg.alpha = .8;
            _this.menuBg.anchor.set(0);
            _this.add(_this.menuBg);
            _this.buttonGroup = _this.game.add.group();
            _this.iconGroup = _this.game.add.group();
            var _icon;
            var _iconPos = [{ x: 60, y: 600 }, { x: 150, y: 600 }, { x: 60, y: 685 }, { x: 150, y: 685 }];
            for (var index = 0; index < 4; index++) {
                _icon = _this.game.add.sprite(_iconPos[index].x, _iconPos[index].y, _this.game.cache.getBitmapData("inventoryIconBg"), 0, _this.iconGroup);
                _icon.inputEnabled = true;
                _icon.z = index;
                _icon.input.priorityID = 2;
                _icon.alpha = _this.iconAlpha;
                _icon.events.onInputDown.add(function (icon) {
                    if (icon.children.length == 0)
                        return;
                    if (_this.isInverntoryItemSelected(icon.z) != -1) {
                        icon.alpha = _this.iconAlpha;
                    }
                    else {
                        icon.alpha = 1;
                        _this.inventorySelected.push(icon.z);
                    }
                    ;
                    _this.currentState.checkActions();
                    _this.setActionText();
                }, _this);
            }
            _this.add(_this.iconGroup);
            var _btn;
            var _txt;
            _this.actionList.forEach(function (element, index) {
                _btn = _this.game.add.sprite(70, index * 60, _this.game.cache.getBitmapData("menuActionBtn"));
                _btn.name = element;
                _btn.z = index;
                _btn.anchor.set(0);
                _txt = _this.game.add.bitmapText(100, 15, "commodore", element, 20);
                _txt.anchor.set(.5, 0);
                _txt.tint = 0xffffff;
                _btn.inputEnabled = true;
                _btn.input.priorityID = 2;
                _btn.events.onInputDown.add(function (btn) {
                    //this.currentState.setCurrentLogicCombination(null);
                    _this.currentAction = btn.z;
                    _this.setText(_this.actionList[btn.z]);
                    /*if (this.currentState.getCurrentItem() != null) {
                        this.setText(this.actionList[btn.z]);
                        this.setText(this.actionList[btn.z] + " " + this.currentState.getCurrentItem().name);
                        this.currentState.currentItem.logic();

                    }*/
                    var _txt = btn.getChildAt(0);
                    _txt.tint = 0x00ff00;
                    _this.currentState.checkActions();
                    _this.setActionText();
                }, _this, null, [_btn]);
                _btn.addChild(_txt);
                _this.buttonGroup.addChild(_btn);
            });
            _this.add(_this.buttonGroup);
            _this.actionText = _this.game.add.bitmapText(320, 725, "commodore", "", 20);
            _this.actionText.alpha = 0;
            _this.addChild(_this.actionText);
            _this.cameraOffset.x = -300;
            _this.game.add.existing(_this);
            return _this;
        }
        PlayerActions.prototype.update = function () { };
        PlayerActions.prototype.isInverntoryItemSelected = function (itemIndex) {
            var _itemAt = this.inventorySelected.indexOf(itemIndex);
            if (_itemAt != -1) {
                this.inventorySelected.splice(_itemAt, 1);
                return _itemAt;
            }
            return -1;
        };
        PlayerActions.prototype.deselectItems = function () {
            this.inventorySelected = [];
            this.iconGroup.setAll("alpha", this.iconAlpha);
        };
        PlayerActions.prototype.getInventory = function () {
            return this.inventory;
        };
        PlayerActions.prototype.getInventorySelected = function () {
            var _this = this;
            var _selectedItems = [];
            this.inventorySelected.forEach(function (element) {
                _selectedItems.push(_this.inventory[element]);
            });
            return _selectedItems;
        };
        PlayerActions.prototype.toggle = function () {
            if (this.isOpen) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        PlayerActions.prototype.show = function () {
            var _this = this;
            //console.log("show")
            if (!this.isOpen) {
                this.currentState.disableInteraction();
                this.game.add.tween(this.cameraOffset).to({ x: -40 }, 200, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                    _this.isOpen = true;
                    _this.currentState.enableInteraction();
                }, this);
            }
        };
        PlayerActions.prototype.resetActions = function () {
            console.log("reset Actions");
            this.buttonGroup.forEach(function (element) {
                var _txt = element.getChildAt(0);
                _txt.tint = 0xffffff;
            }, this);
            this.currentAction = -1;
            this.inventorySelected = [];
            this.iconGroup.setAll("alpha", this.iconAlpha);
        };
        PlayerActions.prototype.setActionText = function () {
            console.log("setActionText");
            var _actionObj = this.currentState.getActionObject();
            console.log(_actionObj);
            if (_actionObj == null) {
                if (this.currentState.getCurrentItem() != undefined)
                    this.setText(this.currentState.getCurrentItem().name);
            }
            else {
                if (_actionObj.inventory.length == 0 && _actionObj.item == null) {
                    console.log("case 1");
                    this.setText(this.getCurrentActionLabel());
                }
                else if (_actionObj.action != -1 && _actionObj.inventory.length == 0 && _actionObj.item != null) {
                    console.log("case 2");
                    this.setText(this.getCurrentActionLabel() + " " + _actionObj.item.name);
                }
                else if (_actionObj.inventory.length > 0 && _actionObj.item == null) {
                    console.log("case 3");
                    if (_actionObj.inventory.length == 1) {
                        this.setText(this.getCurrentActionLabel() + " " + _actionObj.inventory[0].name + " on ");
                    }
                }
                else if (_actionObj.inventory.length > 0 && _actionObj.item != null) {
                    console.log("case 4");
                    if (_actionObj.inventory.length == 1) {
                        this.setText(this.getCurrentActionLabel() + " " + _actionObj.inventory[0].name + " on " + _actionObj.item.name);
                    }
                }
                else if (_actionObj.key == "noAction" && _actionObj.item != null) {
                    console.log("case 5", _actionObj.item.name);
                    this.setText(_actionObj.item.name);
                }
            }
        };
        PlayerActions.prototype.hide = function () {
            var _this = this;
            if (!this.isOpen)
                return;
            this.game.add.tween(this.cameraOffset).to({ x: -300 }, 200, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                _this.isOpen = false;
                _this.currentAction = -1;
                _this.deselectItems();
            }, this);
            this.hideText();
        };
        PlayerActions.prototype.hideText = function () {
            var _this = this;
            if (this.actionTextTween != undefined)
                this.actionTextTween.stop();
            this.actionTextTween = this.game.add.tween(this.actionText).to({ alpha: 0, x: 500 }, 200, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            this.actionTextTween.onComplete.add(function () { _this.actionText.x = 200; }, this);
        };
        PlayerActions.prototype.IsOpen = function () { return this.isOpen; };
        PlayerActions.prototype.getCurrentAction = function () { return this.currentAction; };
        PlayerActions.prototype.getCurrentActionString = function () { return this.actionListFunctions[this.currentAction]; };
        PlayerActions.prototype.getCurrentActionLabel = function () { return this.actionList[this.currentAction]; };
        PlayerActions.prototype.setText = function (_string) {
            console.log("setText", _string);
            this.actionText.text = _string;
            /* if (this.actionText.tint == 0x00ff00) {
                 this.actionText.tint = 0x00ffff
             } else { this.actionText.tint = 0x00ff00 }
             */
            this.actionText.tint = 0x00ff00 + this.game.rnd.integerInRange(0, 20);
            if (this.actionTextTween != undefined)
                this.actionTextTween.stop();
            this.actionTextTween = this.game.add.tween(this.actionText).to({ alpha: 1, x: 320 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
        };
        PlayerActions.prototype.removeItems = function (items) {
            this.cleanInventoryIcons();
            // console.log("items to remove:", items);
            // console.log("start inventory", this.inventory);
            this.cleanInventoryFromItems(items);
            // console.log("new inventory", this.inventory);
            this.remapInventoryItemsIndex();
            // console.log(this.inventory);
            this.assignItemToIcon();
        };
        PlayerActions.prototype.removeItem = function (item) {
            this.cleanInventoryIcons();
            this.cleanInventoryFromItem(item);
            this.remapInventoryItemsIndex();
            this.assignItemToIcon();
        };
        PlayerActions.prototype.assignItemToIcon = function () {
            var _this = this;
            var _icon;
            this.inventory.forEach(function (element, index) {
                _icon = _this.iconGroup.getChildAt(index);
                _icon.addChild(_this.game.add.sprite(0, 0, element.itemObj.sprite));
            });
        };
        //remove child items from the inventory icons
        PlayerActions.prototype.cleanInventoryIcons = function () {
            this.iconGroup.forEach(function (icon) {
                if (icon.children.length > 0)
                    icon.removeChildAt(0);
            }, this);
            this.iconGroup.setAll("alpha", this.iconAlpha);
        };
        // remove itemes from inventory array
        PlayerActions.prototype.cleanInventoryFromItems = function (items) {
            var _this = this;
            items.forEach(function (element) {
                _this.inventory.splice(element.inventoryIndex, 1);
            });
        };
        // remove itemes from inventory array
        PlayerActions.prototype.cleanInventoryFromItem = function (item) {
            this.inventory.splice(item.inventoryIndex, 1);
        };
        PlayerActions.prototype.remapInventoryItemsIndex = function () {
            this.inventory.forEach(function (element, index) { element.inventoryIndex = index; });
        };
        PlayerActions.prototype.addItem = function (item) {
            item.inventoryIndex = this.inventory.length;
            this.inventory.push(this.currentState.currentItem);
            var _icon = this.iconGroup.getChildAt(this.inventory.length - 1);
            _icon.addChild(this.game.add.sprite(0, 0, this.currentState.currentItem.itemObj.sprite));
            this.setText("");
        };
        PlayerActions.prototype.dropItem = function () { };
        return PlayerActions;
    }(Phaser.Group));
    z89.PlayerActions = PlayerActions;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var PlayerBaloon = (function (_super) {
        __extends(PlayerBaloon, _super);
        function PlayerBaloon(game) {
            var _this = _super.call(this, game) || this;
            _this.currentState = _this.game.state.getCurrentState();
            _this.baloonBg = _this.game.add.image(0, 20, _this.game.cache.getBitmapData("baloonBg"));
            _this.baloonBg.anchor.set(0.5, 1);
            _this.baloonBg.alpha = .8;
            _this.add(_this.baloonBg);
            _this.baloonBorder = _this.game.add.image(0, 20, _this.game.cache.getBitmapData("baloonBorder"));
            _this.baloonBorder.anchor.set(0.5, 1);
            _this.add(_this.baloonBorder);
            _this.baloonPin = _this.game.add.image(0, 30, _this.game.cache.getBitmapData("baloonPin"));
            _this.baloonPin.anchor.set(0.5, 1);
            _this.add(_this.baloonPin);
            _this.baloonText = _this.game.add.bitmapText(0, 0, "commodore", "", 18);
            _this.baloonText.maxWidth = 300;
            _this.baloonText.anchor.set(0.5, 1);
            _this.add(_this.baloonText);
            _this.alpha = 0;
            _this.game.add.existing(_this);
            return _this;
        }
        PlayerBaloon.prototype.showBaloon = function (_text) {
            if (_text == undefined)
                return;
            if (this.baloonText.tint == 0x00ff00) {
                this.baloonText.tint = 0x00ff10;
            }
            else {
                this.baloonText.tint = 0x00ff00;
            }
            this.baloonText.text = _text;
            this.fixSize();
            this.game.add.tween(this).to({ y: this.y + 10, alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () { }, this);
        };
        PlayerBaloon.prototype.hideBaloon = function () {
            this.alpha = 0;
        };
        PlayerBaloon.prototype.fixSize = function () {
            this.x = this.currentState.player.x;
            this.y = this.currentState.player.y - this.currentState.player.height - 50;
            this.baloonBg.height = this.baloonText.height + 40;
        };
        PlayerBaloon.prototype.update = function () {
        };
        return PlayerBaloon;
    }(Phaser.Group));
    z89.PlayerBaloon = PlayerBaloon;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var PlayerMenu = (function (_super) {
        __extends(PlayerMenu, _super);
        function PlayerMenu(game) {
            var _this = _super.call(this, game) || this;
            _this.isOpen = false;
            _this.fixedToCamera = true;
            _this.currentState = _this.game.state.getCurrentState();
            _this.menuBg = _this.game.add.sprite(512, 450, "menuBg");
            _this.menuBg.alpha = 1;
            _this.menuBg.anchor.set(0.5);
            _this.menuBg.height = 350;
            _this.add(_this.menuBg);
            _this.menuBg.inputEnabled = true;
            _this.menuBg.events.onInputDown.add(function () {
                this.hide();
            }, _this);
            var blinkBtn;
            gameData.menuBlink.forEach(function (element) {
                blinkBtn = _this.game.add.sprite(element.x, element.y, _this.game.cache.getBitmapData("btn"));
                blinkBtn.inputEnabled = true;
                blinkBtn.events.onInputDown.add(function () {
                    this.currentState.player.blinkTo(element.to);
                }, _this);
                _this.menuBg.addChild(blinkBtn);
            });
            var actionBtn;
            actionBtn = _this.game.add.sprite(-60, -290, _this.game.cache.getBitmapData("btn"));
            actionBtn.inputEnabled = true;
            actionBtn.events.onInputDown.add(function () {
                this.currentState.playerActions.show();
                this.hide();
            }, _this);
            _this.menuBg.addChild(actionBtn);
            _this.cameraOffset.y = 710;
            _this.game.add.existing(_this);
            return _this;
        }
        PlayerMenu.prototype.update = function () { };
        PlayerMenu.prototype.toggle = function () {
            if (this.isOpen) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        PlayerMenu.prototype.show = function () {
            var _this = this;
            this.currentState.disableInteraction();
            this.game.add.tween(this.cameraOffset).to({ y: 100 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                _this.isOpen = true;
            }, this);
            this.game.add.tween(this.menuBg.scale).to({ y: 1.3, x: 1.3 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            this.game.add.tween(this.menuBg).to({ height: 1000 }, 600, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
        };
        PlayerMenu.prototype.hide = function () {
            var _this = this;
            this.game.add.tween(this.cameraOffset).to({ y: 710 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                _this.isOpen = false;
                _this.currentState.enableInteraction();
            }, this);
            this.game.add.tween(this.menuBg.scale).to({ y: 1, x: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            this.game.add.tween(this.menuBg).to({ height: 350 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
        };
        return PlayerMenu;
    }(Phaser.Group));
    z89.PlayerMenu = PlayerMenu;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var GameCity = (function (_super) {
        __extends(GameCity, _super);
        function GameCity() {
            var _this = _super.call(this) || this;
            _this.gameInteracion = true;
            _this.gameInteracion = true;
            return _this;
        }
        GameCity.prototype.preload = function () {
        };
        GameCity.prototype.create = function () {
            var _this = this;
            this.game.world.setBounds(0, 0, 5000, 768);
            this.groupCity = this.game.add.group();
            this.groupStreet = this.game.add.group();
            this.groupAll = this.game.add.group();
            this.groupBaloon = this.game.add.group();
            this.groupFront = this.game.add.group();
            this.groupAction = this.game.add.group();
            this.groupMenu = this.game.add.group();
            var sky = this.game.add.image(0, 0, 'sky');
            sky.fixedToCamera = true;
            this.groupCity.add(sky);
            this.bg = this.game.add.tileSprite(0, 0, 1024, 768, 'bg');
            this.bg.fixedToCamera = true;
            this.groupCity.add(this.bg);
            this.bg2 = this.game.add.tileSprite(0, 0, 1024, 768, 'bg2');
            this.bg2.fixedToCamera = true;
            this.groupCity.add(this.bg2);
            this.groupCity.add(this.game.add.image(0, 0, 'city'));
            this.street = this.game.add.tileSprite(0, 0, 1024, 768, 'streetLvl1');
            this.street.fixedToCamera = true;
            this.groupStreet.add(this.street);
            this.front = this.game.add.tileSprite(0, 0, 1024, 768, 'streetLvl0');
            this.front.fixedToCamera = true;
            this.groupFront.add(this.front);
            this.player = new z89.Player(this.game);
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
            this.groupAll.add(this.player);
            this.playerBaloon = new z89.PlayerBaloon(this.game);
            this.groupBaloon.add(this.playerBaloon);
            this.playerActions = new z89.PlayerActions(this.game);
            this.groupAction.add(this.playerActions);
            this.playerMenu = new z89.PlayerMenu(this.game);
            this.groupMenu.add(this.playerMenu);
            gameData.ingame.items.forEach(function (element) {
                if (element.onStart) {
                    _this.groupAll.add(new z89.Items(_this.game, element));
                }
            });
            this.ground = this.game.add.sprite(0, 644, this.game.cache.getBitmapData("ground"));
            this.ground.inputEnabled = true;
            this.ground.input.priorityID = 0;
            this.ground.fixedToCamera = true;
            this.ground.alpha = 0;
            this.ground.events.onInputDown.add(function (ground) {
                /*if (((this.game.input.x > ground.x + 50) || (this.game.input.x < ground.x - 50))
                        && (this.game.input.y > 600)) {

                        this.currentItem = 0;

                        if (this.playerActions.IsOpen()) this.playerActions.Hide();
                        this.player.goTo(this.game.input.x + this.game.camera.x, this.game.input.y);

                }*/
                if (!_this.gameInteracion)
                    return;
                //this.currentItem = 0;
                if (_this.playerActions.IsOpen())
                    _this.playerActions.hide();
                _this.player.goTo(_this.game.input.x + _this.game.camera.x, _this.game.input.y);
            }, this, null, [this.ground]);
        };
        GameCity.prototype.update = function () {
            this.bg.tilePosition.x = this.camera.x * -0.2;
            this.bg2.tilePosition.x = this.camera.x * -0.7;
            this.street.tilePosition.x = this.camera.x * -1.1;
            this.front.tilePosition.x = this.camera.x * -1.25;
            this.groupAll.sort('y', Phaser.Group.SORT_ASCENDING);
        };
        GameCity.prototype.render = function () {
            //this.game.debug.cameraInfo(this.game.camera, 500, 32);
            //this.game.debug.spriteCoords(this.player, 32, 32);
            //               this.game.debug.bodyInfo(this.player, 32, 32);
            //this.game.debug.body(this.player.myArea)
        };
        GameCity.prototype.resetActions = function () {
            this.playerActions.resetActions();
            this.currentItem = null;
        };
        GameCity.prototype.setCurrentItem = function (_item) {
            this.currentItem = _item;
        };
        GameCity.prototype.getCurrentItem = function () {
            return this.currentItem;
        };
        GameCity.prototype.getInventory = function () {
            return this.playerActions.getInventory();
        };
        GameCity.prototype.getInventorySelected = function () {
            return this.playerActions.getInventorySelected();
        };
        GameCity.prototype.checkActions = function (_itemSelected) {
            console.log("checkActions");
            var returnObj = {
                key: null,
                action: null,
                inventory: null,
                item: null
            };
            var _currentAction = this.getCurrentActionString();
            var _currentActionValue = this.getCurrentAction();
            if (_currentAction == undefined) {
                _currentAction = "";
                returnObj.action = _currentActionValue = -1;
            }
            else {
                returnObj.action = _currentActionValue;
            }
            var _currentItem;
            var _inventoryIds = [];
            var _Inventoryitems = "";
            returnObj.inventory = this.getInventorySelected();
            var _Item;
            if (_itemSelected != undefined) {
                _Item = _itemSelected;
            }
            else {
                _Item = this.getCurrentItem();
            }
            var ItemId = "";
            returnObj.item = _Item;
            if (returnObj.item != null)
                ItemId = returnObj.item.id;
            returnObj.inventory.forEach(function (element) { _inventoryIds.push(element.itemObj.id); });
            if (_inventoryIds.length > 0)
                _Inventoryitems = _inventoryIds.join("_");
            if (ItemId != "" && _Inventoryitems != "")
                _Inventoryitems = _Inventoryitems + "_";
            var key = "";
            console.log(_Inventoryitems, ItemId, _currentAction);
            if (_currentAction != "" && _Inventoryitems != "" && ItemId != "") {
                returnObj.key = _currentAction + "_" + _Inventoryitems + ItemId;
            }
            else if (_currentAction != "" && _Inventoryitems != "" && ItemId == "") {
                returnObj.key = _currentAction + "_" + _Inventoryitems;
            }
            else if (_currentAction != "" && _Inventoryitems == "" && ItemId != "") {
                returnObj.key = _currentAction + "_" + ItemId;
            }
            else if (_currentAction != "" && _Inventoryitems == "" && ItemId == "") {
                returnObj.key = _currentAction;
            }
            else if (_currentAction == "") {
                returnObj.key = "noAction";
            }
            this.logicCombination = returnObj;
            return this.logicCombination;
        };
        GameCity.prototype.getActionObject = function () {
            return this.logicCombination;
        };
        GameCity.prototype.setActionObject = function (value) {
            this.logicCombination = value;
        };
        GameCity.prototype.setActionText = function () {
            this.playerActions.setActionText();
        };
        GameCity.prototype.getCurrentAction = function () {
            return this.playerActions.getCurrentAction();
        };
        GameCity.prototype.getCurrentActionString = function () {
            return this.playerActions.getCurrentActionString();
        };
        GameCity.prototype.getCurrentActionLabel = function () {
            return this.playerActions.getCurrentActionLabel();
        };
        GameCity.prototype.getSprites = function () {
            return this.groupAll;
        };
        GameCity.prototype.disableInteraction = function () {
            this.gameInteracion = false;
            //this.groupAll.ignoreChildInput=true;
        };
        GameCity.prototype.enableInteraction = function () {
            this.gameInteracion = true;
            //this.groupAll.ignoreChildInput=false;
        };
        GameCity.prototype.addInventoryItem = function (item) {
            this.playerActions.addItem(this.currentItem);
            this.groupAll.remove(this.currentItem);
            this.setCurrentItem(null);
        };
        GameCity.prototype.removeInventoryItems = function () {
            this.playerActions.removeItems(this.getActionObject().inventory);
        };
        GameCity.prototype.dropInventoryItem = function () {
            this.groupAll.add(this.currentItem);
        };
        return GameCity;
    }(Phaser.State));
    z89.GameCity = GameCity;
})(z89 || (z89 = {}));
