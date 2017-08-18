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
var languages = {
    en: [
        "the drink machine",
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
        "the mediacall box",
        "No way!",
        "Nothing strange.",
        "It's really hot! I need something to drink.",
        "the garbage bin",
        "the hydrant",
    ]
};
var currentLang = "en";
var gameData = {
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
    ],
    assets: {
        spritesheets: [
            { name: "deluca", path: "assets/images/game/player.png", width: 126, height: 126, frames: 64 },
            { name: "phoneWork", path: "assets/images/game/items/phoneWork.png", width: 56, height: 132, frames: 2 },
            { name: "phoneNotWork", path: "assets/images/game/items/phoneNotWork.png", width: 52, height: 132, frames: 5 },
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
        sounds: [],
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
                bgItem: true,
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
                bgItem: true,
                sprite: "phoneNotWork",
                animations: [{ name: "idle", frames: [0, 1, 2, 3, 4], rate: 5, loop: true }],
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
                bgItem: true,
                sprite: "phoneWork",
                animations: [{ name: "idle", frames: [0, 1], rate: 3, loop: true }],
                name: z89.getLabel(12),
                x: 1526,
                y: 644,
                interactive: true,
                offsetX: 50,
                fixedToCamera: false,
            },
            {
                id: 4,
                type: 3,
                bgItem: true,
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
                bgItem: true,
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
                bgItem: true,
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
                bgItem: false,
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
                pickupable: true,
            },
        ]
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
                if (_this.currentState.playerActions.IsOpen() && _this.currentState.getCurrentItem().id != _this.id)
                    _this.currentState.playerActions.hide();
                var _playerDest = _this.x;
                if (_this.currentState.player.x < _this.x) {
                    _playerDest -= _this.itemObj.offsetX;
                }
                else {
                    _playerDest += _this.itemObj.offsetX;
                }
                if (_this.currentState.getCurrentItem().id != _this.id) {
                    _this.currentState.player.goTo(_playerDest, _this.y, _this);
                }
                else {
                    _this.currentState.player.executeItemLogic(_this);
                }
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
        Items.prototype.getCurrentAction = function () {
            return this.currentState.playerActions.currentAction();
        };
        Items.prototype.getPlayer = function () {
            return this.currentState.player;
        };
        Items.prototype.returnMessage = function () {
            this.currentState.player.showBaloon(this.itemObj.actions[this.currentState.playerActions.currentAction()].answer[this.game.rnd.integerInRange(0, this.itemObj.actions[this.currentState.playerActions.currentAction()].answer.length)]);
        };
        return Items;
    }(Phaser.Sprite));
    z89.Items = Items;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var ItemsDrink = (function (_super) {
        __extends(ItemsDrink, _super);
        function ItemsDrink(game, itemObj) {
            var _this = _super.call(this, game, itemObj) || this;
            _this._itemObj = itemObj;
            return _this;
        }
        ItemsDrink.prototype.logic = function () {
            //console.log("item logic:" + this._itemObj.id)
            switch (this.getCurrentAction()) {
                // PUSH, PULL, GIVE, OPEN, CLOSE, EXAMINE, USE, PICKUP, TALKTO
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 7:
                case 8:
                    this.returnMessage();
                    break;
                case 6:
                    if (this.getPlayer().getMoney() > 5) {
                        console.log("get coke");
                    }
                    else {
                        this.returnMessage();
                    }
                    break;
            }
        };
        return ItemsDrink;
    }(z89.Items));
    z89.ItemsDrink = ItemsDrink;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var ItemsGarbage = (function (_super) {
        __extends(ItemsGarbage, _super);
        function ItemsGarbage(game, itemObj) {
            var _this = _super.call(this, game, itemObj) || this;
            _this._itemObj = itemObj;
            return _this;
        }
        ItemsGarbage.prototype.logic = function () {
            console.log("item logic:" + this._itemObj.id);
        };
        return ItemsGarbage;
    }(z89.Items));
    z89.ItemsGarbage = ItemsGarbage;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var ItemsHydrant = (function (_super) {
        __extends(ItemsHydrant, _super);
        function ItemsHydrant(game, itemObj) {
            var _this = _super.call(this, game, itemObj) || this;
            _this._itemObj = itemObj;
            return _this;
        }
        ItemsHydrant.prototype.logic = function () {
            console.log("item logic:" + this._itemObj.id);
        };
        return ItemsHydrant;
    }(z89.Items));
    z89.ItemsHydrant = ItemsHydrant;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var ItemsPhones = (function (_super) {
        __extends(ItemsPhones, _super);
        function ItemsPhones(game, itemObj) {
            var _this = _super.call(this, game, itemObj) || this;
            _this._itemObj = itemObj;
            return _this;
        }
        ItemsPhones.prototype.logic = function () {
            console.log("item logic" + this._itemObj.id);
        };
        return ItemsPhones;
    }(z89.Items));
    z89.ItemsPhones = ItemsPhones;
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
            var _this = _super.call(this, game, 100, 650, "deluca") || this;
            _this.yMin = 650;
            _this.yMax = 768;
            _this.direction = PlayerDirection.RIGHT;
            _this.money = 10;
            _this.inventory = [];
            _this.baloon = new z89.PlayerBaloon(game);
            _this.animations.add("idle", [8, 9, 10, 11], 5, true);
            _this.animations.add("walk", [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
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
            this.hideBaloon();
            this.play("walk");
            if (this.playerTween != undefined)
                this.playerTween.stop();
            this.currentItem = null;
            if (_x > this.x) {
                if (this.direction != PlayerDirection.RIGHT)
                    this.changeDirection();
                this.direction = PlayerDirection.RIGHT;
            }
            else {
                if (this.direction != PlayerDirection.LEFT)
                    this.changeDirection();
                this.direction = PlayerDirection.LEFT;
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
            this.playerTween.onComplete.add(function (_player, _tween, _intersect) {
                _this.play("idle");
                if (_item != null) {
                    _this.currentItem = _item;
                    if (_item.isInteractive())
                        _this.currentState.playerActions.show();
                    _this.executeItemLogic(_item);
                    if (_item._itemObj.firstMessage != undefined) {
                        _this.showBaloon(_item._itemObj.firstMessage[_this.game.rnd.integerInRange(0, _item._itemObj.firstMessage.length)]);
                    }
                    _this.currentState.setCurrentItem(_item);
                }
                if (_intersect[0])
                    _this.showBaloon(z89.getLabel(11));
            }, this, null, [this.intersect]);
        };
        Player.prototype.checkIntersect = function (_toPosition) {
            var _obj = { point: null };
            var line1 = new Phaser.Line(_toPosition.x1, _toPosition.y1, this.x, this.y);
            var line2;
            var intersectPoint;
            this.currentState.getSprites().forEach(function (sprite) {
                if (sprite.name != "player") {
                    line2 = new Phaser.Line(sprite.x - (sprite.width / 2) - 10, sprite.y, sprite.x + (sprite.width / 2) + 10, sprite.y);
                    intersectPoint = line1.intersects(line2, true);
                    if (intersectPoint != null) {
                        _obj.point = intersectPoint;
                    }
                }
            }, this);
            return _obj;
        };
        Player.prototype.executeItemLogic = function (_item) {
            if (_item != undefined) {
                _item.logic();
            }
            else if (this.currentItem != undefined) {
                this.currentItem.logic();
            }
        };
        Player.prototype.changeDirection = function () {
            this.scale.x *= -1;
        };
        Player.prototype.blinkTo = function (_x) {
            this.hideBaloon();
            this.currentState.playerMenu.hide();
            this.currentState.playerActions.hide();
            this.y = 650;
            this.x = _x;
        };
        Player.prototype.showBaloon = function (_text) {
            this.baloon.showBaloon(_text);
        };
        Player.prototype.hideBaloon = function () {
            this.baloon.hideBaloon();
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
        PlayerActionList[PlayerActionList["TALKTO"] = 8] = "TALKTO";
    })(PlayerActionList = z89.PlayerActionList || (z89.PlayerActionList = {}));
    var PlayerActions = (function (_super) {
        __extends(PlayerActions, _super);
        function PlayerActions(game) {
            var _this = _super.call(this, game) || this;
            _this.isOpen = false;
            _this.actionList = ["PUSH", "PULL", "GIVE", "OPEN", "CLOSE", "EXAMINE", "USE", "PICK UP", "TALK TO"];
            _this._currentAction = -1;
            _this.fixedToCamera = true;
            _this.currentState = _this.game.state.getCurrentState();
            _this.menuBg = _this.game.add.sprite(0, 0, _this.game.cache.getBitmapData("menuAction"));
            _this.menuBg.alpha = .8;
            _this.menuBg.anchor.set(0);
            _this.add(_this.menuBg);
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
                    _this._currentAction = btn.z;
                    _this.setText(_this.actionList[btn.z] + " " + _this.currentState.getCurrentItem().name);
                    _this.currentState.player.executeItemLogic();
                }, _this, null, [_btn]);
                _btn.addChild(_txt);
                _this.addChild(_btn);
            });
            _this.actionText = _this.game.add.bitmapText(200, 725, "commodore", "", 20);
            _this.actionText.alpha = 0;
            _this.addChild(_this.actionText);
            _this.cameraOffset.x = -300;
            _this.game.add.existing(_this);
            return _this;
        }
        PlayerActions.prototype.update = function () { };
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
            if (this.isOpen)
                return;
            this.currentState.disableInteraction();
            this.actionText.text = "";
            this.game.add.tween(this.cameraOffset).to({ x: -40 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                _this.isOpen = true;
                _this.currentState.enableInteraction();
                _this.setText(_this.currentState.getCurrentItem().name);
            }, this);
        };
        PlayerActions.prototype.hide = function () {
            var _this = this;
            if (!this.isOpen)
                return;
            this.game.add.tween(this.cameraOffset).to({ x: -300 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                _this.isOpen = false;
                _this._currentAction = -1;
            }, this);
            this.game.add.tween(this.actionText).to({ alpha: 0, x: 200 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
        };
        PlayerActions.prototype.IsOpen = function () { return this.isOpen; };
        PlayerActions.prototype.currentAction = function () { return this._currentAction; };
        PlayerActions.prototype.setText = function (_string) {
            this.actionText.text = _string;
            if (this.actionText.tint == 0x00ff00) {
                this.actionText.tint = 0x00ff10;
            }
            else {
                this.actionText.tint = 0x00ff00;
            }
            //this.actionText.tint = 0x2ec517 + this.game.rnd.integerInRange(0, 100);
            this.game.add.tween(this.actionText).to({ alpha: 1, x: 320 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
        };
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
            _this.currentItem = 0;
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
            this.groupFront = this.game.add.group();
            this.groupAction = this.game.add.group();
            this.groupMenu = this.game.add.group();
            this.currentItem = 0;
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
            this.playerActions = new z89.PlayerActions(this.game);
            this.groupAction.add(this.playerActions);
            this.player = new z89.Player(this.game);
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
            this.groupAll.add(this.player);
            this.playerMenu = new z89.PlayerMenu(this.game);
            this.groupMenu.add(this.playerMenu);
            gameData.ingame.items.forEach(function (element) {
                if (element.bgItem) {
                    switch (element.type) {
                        case 1:
                            _this.groupAll.add(new z89.ItemsDrink(_this.game, element));
                            break;
                        case 2:
                            _this.groupAll.add(new z89.ItemsPhones(_this.game, element));
                            break;
                        case 3:
                            _this.groupAll.add(new z89.ItemsGarbage(_this.game, element));
                            break;
                        case 4:
                            _this.groupAll.add(new z89.ItemsHydrant(_this.game, element));
                            break;
                    }
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
                _this.currentItem = 0;
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
        GameCity.prototype.setCurrentItem = function (_item) {
            this.currentItem = _item;
        };
        GameCity.prototype.getCurrentItem = function () {
            return this.currentItem;
        };
        GameCity.prototype.getSprites = function () {
            return this.groupAll;
        };
        GameCity.prototype.disableInteraction = function () {
            this.gameInteracion = false;
            this.groupAll.ignoreChildInput = true;
        };
        GameCity.prototype.enableInteraction = function () {
            this.gameInteracion = true;
            this.groupAll.ignoreChildInput = false;
        };
        return GameCity;
    }(Phaser.State));
    z89.GameCity = GameCity;
})(z89 || (z89 = {}));
