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
            return _super.call(this) || this;
        }
        Preloader.prototype.updateRaster = function () {
            var _this = this;
            this.raster.y = this.game.rnd.integerInRange(-500, 0);
            if (this.loadingBar.visible)
                this.game.time.events.add(50, function () { return _this.updateRaster(); }, this);
        };
        Preloader.prototype.preload = function () {
            var _this = this;
            this.game.load.onLoadStart.add(function () { }, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(function () {
                _this.loadingBar.visible = false;
                _this.loadingPerc.visible = false;
                _this.startBtn.visible = true;
                _this.game.input.onDown.addOnce(function () { z89.goState("GameCity", _this.game); }, _this);
            }, this);
            //raster
            //--------------------------
            this.raster = this.game.add.tileSprite(0, 0, 1024, 1768, "raster");
            this.raster.y = -500;
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
            this.loadAssets();
            this.game.load.script('webfont', 'js/libs/webfonts.js');
            this.updateRaster();
        };
        Preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this.loadingPerc.text = progress + "%";
        };
        Preloader.prototype.loadAssets = function () {
            var _this = this;
            //Assets Load
            //--------------------------	
            // IMAGES		
            gameData.assets.images.forEach(function (element) {
                _this.game.load.image(element.name, element.path);
            });
            // SPRITESHEETS	
            gameData.assets.spritesheets.forEach(function (element) {
                _this.game.load.spritesheet(element.name, element.path, element.width, element.height, element.frames);
            });
            //bitmap fonts
            gameData.assets.bitmapfont.forEach(function (element) {
                _this.game.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
            });
            // SOUNDS
            gameData.assets.sounds.forEach(function (element) {
                _this.game.load.audio(element.name, element.paths);
            });
            this.game.load.shader("noise", "js/game/fragments/noise.frag");
            this.game.load.shader("convergence", "js/game/fragments/convergence.frag");
            this.game.load.shader("gray", "js/game/fragments/gray.frag");
            this.game.load.shader("ripple", "js/game/fragments/ripple.frag");
            this.game.load.shader("ripple2", "js/game/fragments/ripple2.frag");
            this.game.load.shader("test", "js/game/fragments/test.frag");
            this.game.load.shader("water", "js/game/fragments/water.frag");
        };
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
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 340, 5);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('baloonBorder', bmd);
            bmd = this.game.add.bitmapData(25, 25);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.moveTo(0, 12.5);
            bmd.ctx.lineTo(25, 12.5);
            bmd.ctx.lineTo(12.5, 25);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('baloonPin', bmd);
            bmd = this.game.add.bitmapData(40, 40);
            bmd.ctx.fillStyle = '#00ff00';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 40, 40);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('arrow', bmd);
            bmd = this.game.add.bitmapData(400, 200);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 400, 200);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('contents', bmd);
            bmd = this.game.add.bitmapData(265, 50);
            bmd.ctx.fillStyle = '#00ff00';
            bmd.ctx.beginPath();
            bmd.ctx.moveTo(265, 50);
            bmd.ctx.arcTo(0, 50, 0, 0, 10);
            bmd.ctx.arcTo(0, 0, 50, 0, 10);
            bmd.ctx.arcTo(265, 0, 265, 50, 10);
            bmd.ctx.arcTo(265, 50, 0, 50, 10);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('roundedBtn', bmd);
            this.game.load.image("raster", "assets/images/game/raster.png");
        };
        Boot.prototype.create = function () {
            if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
                z89.setDevice(true);
            }
            else {
                z89.setDevice(false);
            }
            /*var fragmentSrc = [
                "precision mediump float;",
                // Incoming texture coordinates.
                'varying vec2 vTextureCoord;',
                // Incoming vertex color
                'varying vec4 vColor;',
                // Sampler for a) sprite image or b) rendertarget in case of game.world.filter
                'uniform sampler2D uSampler;',
    
                "uniform vec2      resolution;",
                "uniform float     time;",
                "uniform vec2      mouse;",
    
                "void main( void ) {",
                //"colorRGBA = (y % 2) * texel(u,v);",
                //"gl_FragColor = mod(gl_FragCoord.y,2.0) * texture2D(uSampler, vTextureCoord);",
    
               "gl_FragColor = vColor(0.0, 0.58, 0.86, 1.0);",
                "}"
            ];
            
            var filter = new Phaser.Filter(this.game, null,fragmentSrc);
            this.game.stage.filters = [filter];
*/
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
    var _089Data;
    function setFirstTime(_val) { _firstTime = _val; }
    z89.setFirstTime = setFirstTime;
    function getFirstTime() { return _firstTime; }
    z89.getFirstTime = getFirstTime;
    function setZero89Data(_values) { _089Data = _values; }
    z89.setZero89Data = setZero89Data;
    function getZero89Data() { return _089Data; }
    z89.getZero89Data = getZero89Data;
    function getScore() { return _playerScore; }
    z89.getScore = getScore;
    function setScore(val) { _playerScore = val; }
    z89.setScore = setScore;
    function setGame(game) { _game = game; }
    z89.setGame = setGame;
    function getGame() { return _game; }
    z89.getGame = getGame;
    function isSaved() { return true; }
    z89.isSaved = isSaved;
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
            if (width != undefined)
                this.width = width;
            if (height != undefined)
                this.height = height;
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
            this.getContents();
        }
        initGame.prototype.startLoading = function () {
            this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, "", null, false, true);
            this.game.state.add("Boot", z89.Boot, false);
            this.game.state.add("Preloader", z89.Preloader, false);
            this.game.state.add("GameCity", z89.GameCity, false);
            this.game.state.start("Boot");
        };
        initGame.prototype.getContents = function () {
            $.ajax({
                url: "http://www.zero89.it/api/jsonp/api/core.aspx",
                dataType: "jsonp",
                type: "GET",
                data: {
                    token: "047078118106073053084083117049077089110099113107120099081115118116110050110084081047084055082118122117081052079104113103107108052054043071051118068084098077105105071106104110050101084108106119071069078121085067085071073067085112119117049101108115051116120119061061",
                    format: "json"
                },
            }).done(function (data) { setZero89Data(data.values.value); _newGame.startLoading(); })
                .fail(function (xhr) { console.log('error', xhr); });
        };
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
        }
        else if (this._align === 'center') {
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
            }
            else {
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
        "A coke can, what else!",
        "Some coins...",
        "I already have this!",
        "Select an ACTION first!",
        "I'm not stupid!",
        "Michele",
        "He is Mike. Founder of DEV DAY Salerno.",
        "Hey, Mike! What's up.",
        "Hey, Francesco, it's ok. Don't forget our next meetup.",
        "Sure! Where and when?",
        "Saturday 16th September at Puntolingue. We'll talk about blockchain and bitcoins",
        "AMAZING!!!",
        "Here the Devday team organize montly tech meetups!!!",
        "@##@ @##@!!!",
        "Gerardo",
        "Daniele",
        "Davide",
        "He is Gerardo. Founder of DEV DAY Avellino.",
        "Chain",
        "A broken chain",
        "Block",
        "A concrete block",
        "DevDay in Bits",
        "A bunch of bits",
        "Blockchain",
        "A blockchain",
        "Bitcoin",
        "A bitcoin",
        "Devday pass",
        "Devday pass",
    ]
};
var currentLang = "en";
var gameData = {
    chapters: [
        {
            title: "Chapter one",
            completed: false,
            tasks: [
                {}
            ]
        }
    ],
    ingame: {
        // 0-PUSH, 1-PULL, 2-GIVE, 3-OPEN, 4-CLOSE, 5-EXAMINE, 6-USE, 7-PICKUP, 8-TALKTO
        //game logic
        conversations: {
            EXAMINE_12: [{
                    text: "Here is where the DEVDAY Team organize montly meeting...",
                    isItem: false,
                    fork: true,
                    options: [{ option: "Devday website", link: "http://www.devday.it" }]
                }],
            TALKTO_15: [{
                    text: z89.getLabel(33),
                    isItem: false,
                    next: 2000,
                },
                {
                    text: z89.getLabel(34),
                    isItem: true,
                    next: 2000,
                },
                {
                    text: z89.getLabel(35),
                    isItem: false,
                    next: 2000,
                },
                {
                    text: z89.getLabel(36),
                    isItem: true,
                    next: 5000,
                },
                {
                    text: z89.getLabel(37),
                    isItem: false,
                    end: 2000
                },
            ],
            TALKTO_custom: [
                {
                    text: "OK! ora puoi entrare!",
                    isItem: true,
                    next: 2000,
                },
                {
                    text: "@##@ @##@!!!",
                    isItem: false,
                    end: 2000,
                }
            ],
            TALKTO_13: [
                {
                    text: "Ciao Daniele, e' iniziato l'evento?",
                    isItem: false,
                    next: 3000,
                },
                {
                    text: "Hai prenotato il biglietto?",
                    isItem: true,
                    next: 3000,
                },
                {
                    text: "No! Ma io sono Francesco del Devday Salerno!!!",
                    isItem: false,
                    next: 4000,
                },
                {
                    text: "No Biglietto! No Meetup!",
                    isItem: true,
                    end: 3000,
                }
            ]
        },
        logic: {
            //use money on drink machine
            USE_8_1: function (currentState) {
                currentState.player.play("use");
                currentState.removeInventoryItems();
                currentState.addDelay(2000, function () { currentState.addItem(7); });
            },
            USE_24_23: function (currentState) {
                console.log("use");
                currentState.player.play("use");
                currentState.removeInventoryItems();
                currentState.addDelay(1000, function () { currentState.getItemSpriteId(22).start(); });
            },
            //use coin o coin
            USE_8_15: function (currentState) {
                console.log("coin on coins");
                currentState.removeInventoryItems();
                currentState.addItem(7);
                currentState.addInventoryItem(currentState.getItemSpriteId(7));
            },
            //use coin o coin
            USE_8_28: function (currentState) {
                console.log("block on chain");
                currentState.playerBaloon.showBaloon("I GOT BLOCKCHAIN!");
                currentState.removeInventoryItems();
                currentState.addItem(30);
                currentState.addInventoryItem(currentState.getItemSpriteId(30));
            },
            //use bit o coin
            USE_29_15: function (currentState) {
                console.log("bit on coin");
                currentState.playerBaloon.showBaloon("I GOT A BITCOIN!");
                currentState.removeInventoryItems();
                currentState.addItem(32);
                currentState.addInventoryItem(currentState.getItemSpriteId(32));
            },
            USE_30_32: function (currentState) {
                console.log("bitcoin on blockchain");
                currentState.playerBaloon.showBaloon("I GOT DEVDAY PASS!");
                currentState.removeInventoryItems();
                currentState.addItem(31);
                currentState.addInventoryItem(currentState.getItemSpriteId(31));
            },
            GIVE_31_13: function (currentState) {
                console.log("pass to daniele");
                currentState.player.play("use");
                currentState.removeInventoryItems();
                var convObj = {
                    key: "TALKTO_custom",
                    action: null,
                    inventory: null,
                    item: currentState.currentItem
                };
                currentState.addDelay(1000, function () {
                    currentState.conversationBaloon.setUpConversation(convObj);
                });
            }
        },
        //items logic
        items: [
            {
                id: 1,
                type: 1,
                sprite: "drink-machine",
                name: z89.getLabel(0),
                x: 1100,
                y: 724,
                onStart: true,
                interactive: true,
                firstMessage: [z89.getLabel(15)],
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },
                    1: { action: false, answer: [z89.getLabel(2)] },
                    2: { action: false, answer: [z89.getLabel(3)] },
                    3: { action: false, answer: [z89.getLabel(4)] },
                    4: { action: false, answer: [z89.getLabel(5)] },
                    5: { action: true, janswer: [z89.getLabel(6), z89.getLabel(14)] },
                    6: { action: true, answer: [z89.getLabel(7)] },
                    7: { action: false, answer: [z89.getLabel(8)] },
                    8: { action: false, answer: [z89.getLabel(22)] },
                    9: { action: false, answer: [z89.getLabel(9)] }
                },
                logic: {
                    PUSH: function (currentState) {
                        currentState.returnMessage();
                    },
                    PULL: function (currentState) {
                        currentState.returnMessage();
                    },
                    GIVE: function (currentState) {
                        currentState.returnMessage();
                    },
                    OPEN: function (currentState) {
                        currentState.returnMessage();
                    },
                    CLOSE: function (currentState) {
                        currentState.returnMessage();
                    },
                    EXAMINE: function (currentState) {
                        currentState.returnMessage();
                    },
                    USE: function (currentState) {
                        currentState.returnMessage();
                    },
                    PICKUP: function (currentState) {
                        currentState.returnMessage();
                    },
                    DROP: function (currentState) {
                        currentState.returnMessage();
                    },
                    TALKTO: function (currentState) {
                        currentState.returnMessage();
                    }
                },
                offsetX: 70,
                fixedToCamera: true,
                checkIntersect: true
            },
            {
                id: 2,
                type: 1,
                onStart: true,
                sprite: "phoneNotWork",
                animations: [{ name: "idle", frames: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4], rate: 5, loop: true }],
                name: z89.getLabel(12),
                x: 1214,
                y: 644,
                interactive: true,
                offsetX: 50,
                coins: 0,
                fixedToCamera: false,
                checkIntersect: false
            },
            {
                id: 3,
                type: 1,
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
                type: 1,
                onStart: true,
                sprite: "trash",
                name: z89.getLabel(16),
                x: 500,
                y: 649,
                interactive: true,
                firstMessage: [z89.getLabel(18)],
                offsetX: 50,
                fixedToCamera: false,
                checkIntersect: false
            },
            {
                id: 5,
                type: 1,
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
                type: 1,
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
                type: 1,
                sprite: "coke",
                onStart: false,
                name: z89.getLabel(10),
                x: 1000,
                y: 745,
                interactive: true,
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },
                    5: { action: false, answer: [z89.getLabel(26)] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); },
                    DROP: function (currentState) { currentState.dropInventoryItem(); },
                    EXAMINE: function (currentState) { currentState.returnMessage(); }
                },
                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: true
            },
            {
                id: 8,
                type: 1,
                sprite: "chain",
                onStart: false,
                name: z89.getLabel(44),
                x: 1000,
                y: 745,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(45)] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); },
                    DROP: function (currentState) { currentState.dropInventoryItem(); },
                    EXAMINE: function (currentState) { currentState.returnMessage(); },
                },
                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false
            },
            {
                id: 9,
                type: 1,
                sprite: "coins",
                onStart: false,
                name: z89.getLabel(23),
                x: 350,
                y: 660,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(27)] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); },
                },
                offsetX: 30,
                fixedToCamera: false,
                checkIntersect: false
            },
            {
                id: 10,
                type: 1,
                sprite: "block",
                onStart: false,
                name: z89.getLabel(46),
                x: 380,
                y: 740,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(47)] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); },
                },
                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false
            },
            {
                id: 11,
                type: 1,
                sprite: "bit",
                onStart: false,
                name: z89.getLabel(48),
                x: 570,
                y: 650,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(49)] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); },
                },
                offsetX: 30,
                fixedToCamera: false,
                checkIntersect: false
            },
            {
                id: 12,
                type: 1,
                sprite: "blockchain",
                onStart: false,
                name: z89.getLabel(50),
                x: 550,
                y: 650,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(51)] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); },
                },
                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false
            },
            {
                id: 13,
                type: 1,
                sprite: "invite",
                onStart: false,
                name: z89.getLabel(54),
                x: 550,
                y: 650,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(55)] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); },
                },
                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false
            },
            {
                id: 14,
                type: 1,
                sprite: "bitcoin",
                onStart: false,
                name: z89.getLabel(52),
                x: 550,
                y: 650,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(53)] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); },
                },
                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false
            },
            {
                id: 15,
                type: 1,
                onStart: false,
                sprite: "travolta",
                animations: [{ name: "idle", frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], rate: 15, loop: true }],
                name: "John",
                x: 1050,
                y: 610,
                interactive: true,
                offsetX: 80,
                scale: .55,
                fixedToCamera: false,
                checkIntersect: false,
                actions: {
                    5: { action: false, answer: [z89.getLabel(43)] },
                },
                logic: {
                    TALKTO: function (currentState) { currentState.startConversation(); },
                    EXAMINE: function (currentState) { currentState.returnMessage(); },
                },
            },
            {
                id: 16,
                type: 1,
                onStart: false,
                sprite: "arete",
                animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 4, loop: true }],
                name: z89.getLabel(40),
                x: 600,
                y: 650,
                interactive: true,
                offsetX: 80,
                fixedToCamera: false,
                checkIntersect: false,
                actions: {
                    5: { action: false, answer: [z89.getLabel(43)] },
                },
                logic: {
                    TALKTO: function (currentState) { currentState.startConversation(); },
                    EXAMINE: function (currentState) { currentState.returnMessage(); },
                },
            },
            {
                id: 17,
                type: 1,
                onStart: false,
                sprite: "daniele",
                animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5, loop: true }],
                name: z89.getLabel(41),
                x: 650,
                y: 650,
                turnLeft: true,
                interactive: true,
                offsetX: 80,
                fixedToCamera: false,
                checkIntersect: false,
                actions: {
                    5: { action: false, answer: [z89.getLabel(32)] },
                },
                logic: {
                    TALKTO: function (currentState) { currentState.startConversation(); },
                    EXAMINE: function (currentState) { currentState.returnMessage(); },
                },
            },
            {
                id: 18,
                type: 1,
                onStart: false,
                sprite: "davide",
                animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5.5, loop: true }],
                name: z89.getLabel(42),
                x: 950,
                y: 650,
                interactive: true,
                offsetX: 80,
                fixedToCamera: false,
                checkIntersect: false,
                actions: {
                    5: { action: false, answer: [z89.getLabel(32)] },
                },
                logic: {
                    TALKTO: function (currentState) { currentState.startConversation(); },
                    EXAMINE: function (currentState) { currentState.returnMessage(); },
                },
            },
            {
                id: 19,
                type: 1,
                onStart: false,
                sprite: "michele",
                animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5, loop: true }],
                name: z89.getLabel(31),
                x: 600,
                y: 650,
                interactive: true,
                offsetX: 80,
                fixedToCamera: false,
                checkIntersect: false,
                actions: {
                    5: { action: false, answer: [z89.getLabel(32)] },
                },
                logic: {
                    TALKTO: function (currentState) { currentState.startConversation(); },
                    EXAMINE: function (currentState) { currentState.returnMessage(); },
                },
            },
            {
                id: 20,
                type: 2,
                onStart: false,
                sprite: "truck-empty",
                name: "",
                x: 0,
                y: 680,
                interactive: false,
                offsetX: 50,
                fixedToCamera: false,
                checkIntersect: true
            },
            {
                id: 21,
                type: 1,
                onStart: true,
                animations: [{ name: "idle", frames: [0, 1], rate: 1, loop: true }],
                sprite: "devday",
                name: "DEV DAY PALACE",
                x: 869,
                y: 198,
                interactive: true,
                offsetX: 0,
                fixedToCamera: false,
                checkIntersect: false,
                actions: {
                    5: { action: false, answer: [z89.getLabel(38)], options: [{ option: "DEVDAY galaxy", link: "http://dd.zero89.it" }, { option: "DEVDAY WEBSITE", link: "http://www.devday.it" }] },
                },
                logic: {
                    EXAMINE: function (currentState) { currentState.returnMessageExtra(); },
                }
            },
            {
                id: 22,
                type: 3,
                onStart: true,
                sprite: "newsbg",
                name: "Dev day events",
                x: 866,
                y: 339,
                interactive: true,
                offsetX: 0,
                fixedToCamera: false,
                contexts: ["gamedev", "phaser"]
            },
            {
                id: 23,
                type: 1,
                sprite: "cable",
                onStart: true,
                name: "Broken cable",
                x: 650,
                y: 600,
                interactive: true,
                actions: {},
                logic: {},
                offsetX: 30,
                fixedToCamera: false,
                checkIntersect: false
            },
            {
                id: 24,
                type: 1,
                sprite: "scotch",
                onStart: true,
                name: "Scotch",
                x: 450,
                y: 700,
                interactive: true,
                actions: {
                    5: { action: false, answer: ["Scotch"] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); },
                    DROP: function (currentState) { currentState.dropInventoryItem(); },
                },
                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false
            },
        ]
    },
    assets: {
        spritesheets: [
            { name: "player", path: "assets/images/game/player.png", width: 126, height: 126, frames: 64 },
            { name: "phoneWork", path: "assets/images/game/items/phoneWork.png", width: 56, height: 132, frames: 2 },
            { name: "phoneNotWork", path: "assets/images/game/items/phoneNotWork.png", width: 52, height: 132, frames: 5 },
            { name: "arete", path: "assets/images/game/people/arete.png", width: 65, height: 138, frames: 4 },
            { name: "daniele", path: "assets/images/game/people/daniele.png", width: 65, height: 138, frames: 4 },
            { name: "davide", path: "assets/images/game/people/davide.png", width: 65, height: 138, frames: 4 },
            { name: "michele", path: "assets/images/game/people/michele.png", width: 65, height: 138, frames: 4 },
            { name: "inventory", path: "assets/images/game/inventory.png", width: 70, height: 70, frames: 2 },
            { name: "icons", path: "assets/images/game/icons/icons.png", width: 50, height: 50, frames: 3 },
            { name: "beam", path: "assets/images/game/beam.png", width: 200, height: 200, frames: 12 },
            { name: "devday", path: "assets/images/game/items/devday.png", width: 320, height: 87, frames: 2 },
            { name: "explosion", path: "assets/images/game/explosion.png", width: 80, height: 80, frames: 28 },
            { name: "meteor", path: "assets/images/game/meteor.png", width: 80, height: 109, frames: 9 },
            { name: "travolta", path: "assets/images/game/people/travolta2.png", width: 248, height: 200, frames: 25 },
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
            { name: "truck", path: "assets/images/game/items/truck.png" },
            { name: "truck-wheel", path: "assets/images/game/items/truck-wheel.png" },
            { name: "truck-empty", path: "assets/images/game/items/truck-empty.png" },
            { name: "hack", path: "assets/images/game/items/hack.png" },
            { name: "chain", path: "assets/images/game/items/chain.png" },
            { name: "block", path: "assets/images/game/items/block.png" },
            { name: "bit", path: "assets/images/game/items/bit.png" },
            { name: "blockchain", path: "assets/images/game/items/blockchain.png" },
            { name: "bitcoin", path: "assets/images/game/items/bitcoin.png" },
            { name: "invite", path: "assets/images/game/items/invite.png" },
            { name: "newsbg", path: "assets/images/game/items/news-bg.png" },
            { name: "triangleBtn", path: "assets/images/game/triangle-btn.png" },
            { name: "cable", path: "assets/images/game/items/cable.png" },
            { name: "scotch", path: "assets/images/game/items/scotch.png" },
            { name: "spinner", path: "assets/images/game/spinner.png" },
        ],
        sounds: [],
        bitmapfont: [
            { name: "commodore", imgpath: "assets/fonts/carrier_command.png", xmlpath: "assets/fonts/carrier_command.xml" }
        ]
    },
    menuBlink: [
        { name: "HOME", frame: 0, to: 100, x: -130, y: -290 },
        { name: "DevDay", frame: 2, to: 875, x: -130, y: -220 },
        { name: "News", frame: 0, to: 1354, x: -60, y: -220 },
        { name: "Cake", frame: 0, to: 1590, x: 10, y: -220 },
        { name: "Arcade", frame: 1, to: 2100, x: 80, y: -220 },
        { frame: 0, to: 2580, x: -130, y: -150 },
        { frame: 0, to: 3170, x: -60, y: -150 },
        { frame: 0, to: 4000, x: 10, y: -150 },
        { frame: 0, to: 4500, x: 80, y: -150 }
    ]
};
var gameData = {
    chapters: [
        {
            title: "Chapter one",
            completed: false,
            tasks: [
                {}
            ]
        }
    ],
    ingame: {
        // 0-PUSH, 1-PULL, 2-GIVE, 3-OPEN, 4-CLOSE, 5-EXAMINE, 6-USE, 7-PICKUP, 8-TALKTO
        //game logic
        conversations: {
            TALKTO_custom: [
                {
                    text: "OK! ora puoi entrare!",
                    isItem: true,
                    next: 2000,
                },
                {
                    text: "@##@ @##@!!!",
                    isItem: false,
                    end: 2000,
                }
            ],
            TALKTO_13: [
                {
                    text: "Ciao Daniele, e' iniziato l'evento?",
                    isItem: false,
                    next: 3000,
                },
                {
                    text: "Hai prenotato il biglietto?",
                    isItem: true,
                    next: 3000,
                },
                {
                    text: "No! Ma io sono Francesco del Devday Salerno!!!",
                    isItem: false,
                    next: 4000,
                },
                {
                    text: "No Biglietto! No Meetup!",
                    isItem: true,
                    end: 3000,
                }
            ]
        },
        logic: {
            //use money on drink machine
            USE_8_1: function (currentState) {
                currentState.player.play("use");
                currentState.removeInventoryItems();
                currentState.addDelay(2000, function () { currentState.addItem(7); });
            },
            USE_24_23: function (currentState) {
                console.log("use");
                currentState.player.play("use");
                currentState.removeInventoryItems();
                currentState.addDelay(1000, function () { currentState.getItemSpriteId(22).start(); });
            },
            //use coin o coin
            USE_8_15: function (currentState) {
                console.log("coin on coins");
                currentState.removeInventoryItems();
                currentState.addItem(7);
                currentState.addInventoryItem(currentState.getItemSpriteId(7));
            },
            //use coin o coin
            USE_8_28: function (currentState) {
                console.log("block on chain");
                currentState.playerBaloon.showBaloon("I GOT BLOCKCHAIN!");
                currentState.removeInventoryItems();
                currentState.addItem(30);
                currentState.addInventoryItem(currentState.getItemSpriteId(30));
            },
            //use bit o coin
            USE_29_15: function (currentState) {
                console.log("bit on coin");
                currentState.playerBaloon.showBaloon("I GOT A BITCOIN!");
                currentState.removeInventoryItems();
                currentState.addItem(32);
                currentState.addInventoryItem(currentState.getItemSpriteId(32));
            },
            USE_30_32: function (currentState) {
                console.log("bitcoin on blockchain");
                currentState.playerBaloon.showBaloon("I GOT DEVDAY PASS!");
                currentState.removeInventoryItems();
                currentState.addItem(31);
                currentState.addInventoryItem(currentState.getItemSpriteId(31));
            },
            GIVE_31_13: function (currentState) {
                console.log("pass to daniele");
                currentState.player.play("use");
                currentState.removeInventoryItems();
                var convObj = {
                    key: "TALKTO_custom",
                    action: null,
                    inventory: null,
                    item: currentState.currentItem
                };
                currentState.addDelay(1000, function () {
                    currentState.conversationBaloon.setUpConversation(convObj);
                });
            }
        },
        //items logic
        items: [
            {
                id: 23,
                type: 1,
                sprite: "cable",
                onStart: true,
                name: "Broken cable",
                x: 650,
                y: 600,
                interactive: true,
                actions: {},
                logic: {},
                offsetX: 30,
                fixedToCamera: false,
                checkIntersect: false
            },
            {
                id: 24,
                type: 1,
                sprite: "scotch",
                onStart: true,
                name: "Scotch",
                x: 450,
                y: 700,
                interactive: true,
                actions: {
                    5: { action: false, answer: ["Scotch"] },
                },
                logic: {
                    PICKUP: function (currentState) { currentState.addInventoryItem(); },
                    DROP: function (currentState) { currentState.dropInventoryItem(); },
                },
                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false
            },
        ]
    },
    assets: {
        spritesheets: [
            { name: "player", path: "assets/images/game/player.png", width: 126, height: 126, frames: 64 },
            { name: "phoneWork", path: "assets/images/game/items/phoneWork.png", width: 56, height: 132, frames: 2 },
            { name: "phoneNotWork", path: "assets/images/game/items/phoneNotWork.png", width: 52, height: 132, frames: 5 },
            { name: "arete", path: "assets/images/game/people/arete.png", width: 65, height: 138, frames: 4 },
            { name: "daniele", path: "assets/images/game/people/daniele.png", width: 65, height: 138, frames: 4 },
            { name: "davide", path: "assets/images/game/people/davide.png", width: 65, height: 138, frames: 4 },
            { name: "michele", path: "assets/images/game/people/michele.png", width: 65, height: 138, frames: 4 },
            { name: "inventory", path: "assets/images/game/inventory.png", width: 70, height: 70, frames: 2 },
            { name: "icons", path: "assets/images/game/icons/icons.png", width: 50, height: 50, frames: 3 },
            { name: "beam", path: "assets/images/game/beam.png", width: 200, height: 200, frames: 12 },
            { name: "devday", path: "assets/images/game/items/devday.png", width: 320, height: 87, frames: 2 },
            { name: "explosion", path: "assets/images/game/explosion.png", width: 80, height: 80, frames: 28 },
            { name: "meteor", path: "assets/images/game/meteor.png", width: 80, height: 109, frames: 9 },
            { name: "travolta", path: "assets/images/game/people/travolta2.png", width: 248, height: 200, frames: 25 },
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
            { name: "truck", path: "assets/images/game/items/truck.png" },
            { name: "truck-wheel", path: "assets/images/game/items/truck-wheel.png" },
            { name: "truck-empty", path: "assets/images/game/items/truck-empty.png" },
            { name: "hack", path: "assets/images/game/items/hack.png" },
            { name: "chain", path: "assets/images/game/items/chain.png" },
            { name: "block", path: "assets/images/game/items/block.png" },
            { name: "bit", path: "assets/images/game/items/bit.png" },
            { name: "blockchain", path: "assets/images/game/items/blockchain.png" },
            { name: "bitcoin", path: "assets/images/game/items/bitcoin.png" },
            { name: "invite", path: "assets/images/game/items/invite.png" },
            { name: "newsbg", path: "assets/images/game/items/news-bg.png" },
            { name: "triangleBtn", path: "assets/images/game/triangle-btn.png" },
            { name: "cable", path: "assets/images/game/items/cable.png" },
            { name: "scotch", path: "assets/images/game/items/scotch.png" },
            { name: "spinner", path: "assets/images/game/spinner.png" },
        ],
        sounds: [],
        bitmapfont: [
            { name: "commodore", imgpath: "assets/fonts/carrier_command.png", xmlpath: "assets/fonts/carrier_command.xml" }
        ]
    },
    menuBlink: [
        { name: "HOME", frame: 0, to: 100, x: -130, y: -290 },
        { name: "DevDay", frame: 2, to: 875, x: -130, y: -220 },
        { name: "News", frame: 0, to: 1354, x: -60, y: -220 },
        { name: "Cake", frame: 0, to: 1590, x: 10, y: -220 },
        { name: "Arcade", frame: 1, to: 2100, x: 80, y: -220 },
        { frame: 0, to: 2580, x: -130, y: -150 },
        { frame: 0, to: 3170, x: -60, y: -150 },
        { frame: 0, to: 4000, x: 10, y: -150 },
        { frame: 0, to: 4500, x: 80, y: -150 }
    ]
};
var z89;
(function (z89) {
    var saveGame = (function () {
        function saveGame() {
            this.playerX = 0;
            this.playerY = 0;
            this.isSaved = false;
            this.checkSaved();
        }
        saveGame.prototype.updatePlayerPosition = function (x, y) {
            this.playerX = x;
            this.playerY = y;
            this.updateSaveObj();
        };
        saveGame.prototype.updatePlayerInventory = function (inventory) {
            this.inventory = inventory;
            this.updateSaveObj();
        };
        saveGame.prototype.updateItems = function (_items) {
            var _itemsObj = [];
            //console.log(_items);
            _items.forEach(function (element) {
                if (element.itemObj != undefined) {
                    _itemsObj.push(element.itemObj);
                }
            });
            //console.log(_itemsObj)
            this.items = _itemsObj;
            this.updateSaveObj();
        };
        saveGame.prototype.gameIsSaved = function () {
            return this.isSaved;
        };
        saveGame.prototype.setSaved = function (obj) {
            this.savedObj = obj;
            localStorage.setItem('savedObj', JSON.stringify(this.savedObj));
        };
        saveGame.prototype.clearSaved = function () {
            this.savedObj = null;
            localStorage.removeItem("savedObj");
        };
        saveGame.prototype.getSaved = function () { return this.savedObj; };
        saveGame.prototype.checkSaved = function () {
            var _obj = JSON.parse(localStorage.getItem("savedObj"));
            // console.log(_obj)
            if (_obj != null) {
                this.savedObj = _obj;
                this.inventory = this.savedObj.inventory;
                this.items = this.savedObj.items;
                this.playerX = this.savedObj.position.x;
                this.playerY = this.savedObj.position.y;
                this.isSaved = true;
            }
            else {
                this.savedObj = null;
                this.isSaved = false;
            }
        };
        saveGame.prototype.updateSaveObj = function () {
            var obj;
            obj = {
                position: { x: this.playerX, y: this.playerY },
                inventory: this.inventory,
                items: this.items
            };
            console.log(obj);
            this.setSaved(obj);
        };
        return saveGame;
    }());
    z89.saveGame = saveGame;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var conversationBaloon = (function (_super) {
        __extends(conversationBaloon, _super);
        // this.game.time.events
        function conversationBaloon(game, x, y) {
            var _this = _super.call(this, game) || this;
            _this.currentState = _this.game.state.getCurrentState();
            _this.isSkippable = true;
            _this.isPlaying = false;
            _this.baloonBg = _this.game.add.image(0, 20, _this.game.cache.getBitmapData("baloonBg"));
            _this.baloonBg.anchor.set(0.5, 1);
            _this.baloonBg.alpha = .8;
            _this.baloonBg.inputEnabled = true;
            _this.baloonBg.events.onInputDown.add(function () {
                _this.skip();
            }, _this);
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
            _this.forkBtns = _this.game.add.group();
            _this.add(_this.forkBtns);
            _this.game.add.existing(_this);
            return _this;
        }
        conversationBaloon.prototype.skip = function () {
            if (!this.isSkippable)
                return;
            this.hideBaloon();
            this.game.time.events.remove(this.timeEvent);
            this.currentStep++;
            var _obj = this.conversationObj[this.currentStep];
            if (_obj != undefined) {
                this.displayStep();
            }
            else {
                this.isPlaying = false;
            }
            //console.log(_obj)
            //if(_obj.next!=undefined ){ this.displayStep(); }
        };
        conversationBaloon.prototype.showBaloon = function (_text) {
            if (_text == undefined)
                return;
            //this.baloonText.tint = 0x00ff00;
            this.baloonText.text = _text;
            this.fixSize();
            this.game.add.tween(this).to({ y: this.y + 10, alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () { }, this);
        };
        conversationBaloon.prototype.hideBaloon = function () {
            this.game.add.tween(this).to({ y: this.y - 10, alpha: 0 }, 200, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
        };
        conversationBaloon.prototype.stopConversation = function () {
            var _this = this;
            this.forkBtns.removeAll();
            this.baloonText.y = 0;
            this.isPlaying = false;
            this.hideBaloon();
            this.baloonX = this.baloonTarget.x;
            this.baloonY = this.baloonTarget.y - this.baloonTarget.height - 50;
            this.showBaloon(z89.getLabel(39));
            this.game.time.events.add(1500, function () { _this.hideBaloon(); }, this);
        };
        conversationBaloon.prototype.setUpConversation = function (_actionObj) {
            this.isPlaying = true;
            this.currentStep = 0;
            this.setItemTarget(_actionObj.item);
            this.setConversationKey(_actionObj.key);
            this.setConversationObj(_actionObj.key);
            this.startConversation();
        };
        conversationBaloon.prototype.setItemTarget = function (item) { this.baloonTarget = item; };
        conversationBaloon.prototype.setConversationKey = function (key) { this.conversationKey = key; };
        conversationBaloon.prototype.setConversationObj = function (key) { if (gameData.ingame.conversations[key] != undefined)
            this.conversationObj = gameData.ingame.conversations[key]; };
        conversationBaloon.prototype.fixSize = function () {
            this.x = this.baloonX;
            this.y = this.baloonY;
            this.baloonBg.height = this.baloonText.height + 40;
        };
        conversationBaloon.prototype.startConversation = function () {
            if (this.currentState.player.x < this.baloonTarget.x) {
                this.baloonTarget.turnLeft();
            }
            else {
                this.baloonTarget.turnRight();
            }
            this.hideBaloon();
            this.displayStep();
        };
        conversationBaloon.prototype.displayStep = function () {
            var _this = this;
            this.baloonText.y = 0;
            this.forkBtns.removeAll();
            this.isSkippable = true;
            if (!this.isPlaying) {
                return;
            }
            ;
            var _obj = this.conversationObj[this.currentStep];
            if (_obj == undefined) {
                this.hideBaloon();
                return;
            }
            if (_obj.isItem) {
                this.baloonText.tint = 0xffffff;
                this.baloonBorder.tint = 0xffffff;
                this.baloonPin.tint = 0xffffff;
                this.baloonX = this.baloonTarget.x;
                this.baloonY = this.baloonTarget.y - this.baloonTarget.height - 50;
            }
            else {
                this.baloonText.tint = 0x00ff00;
                this.baloonBorder.tint = 0x00ff00;
                this.baloonPin.tint = 0x00ff00;
                this.baloonX = this.currentState.player.x;
                this.baloonY = this.currentState.player.y - this.currentState.player.height - 50;
            }
            if (_obj.next != undefined) {
                this.timeEvent = this.game.time.events.add(_obj.next, function () { _this.currentStep++; _this.displayStep(); }, this);
            }
            if (_obj.end != undefined) {
                this.timeEvent = this.game.time.events.add(_obj.end, function () { _this.currentStep = 0; _this.hideBaloon(); _this.isPlaying = false; }, this);
            }
            if (_obj.fork != undefined) {
                this.isSkippable = false;
                this.showOptions(_obj);
                return;
            }
            this.showBaloon(_obj.text);
        };
        conversationBaloon.prototype.showOptions = function (_obj) {
            var _this = this;
            if (_obj == undefined)
                return;
            this.x = this.baloonX;
            this.y = this.baloonY;
            var _btn;
            var _btnText;
            var _nextPos = 0;
            var _totHeight = 0;
            _obj.options.forEach(function (element, index) {
                _btn = _this.game.add.sprite(0, _nextPos, _this.game.cache.getBitmapData("forkBtn"));
                _btn.inputEnabled = true;
                _btn.anchor.set(.5, 1);
                _btn.events.onInputDown.add(function (a, b, c) {
                    //console.log(this.goToLabel(c));
                    if (c.goto != undefined) {
                        _this.currentStep = _this.goToLabel(c.goto);
                    }
                    if (c.link != undefined) {
                        _this.currentStep++;
                        window.open(c.link, "_blank");
                    }
                    if (c.function != undefined) {
                        c.function(_this.currentState, _this.baloonTarget);
                        _this.hideBaloon();
                        return;
                    }
                    _this.displayStep();
                }, _this, null, element);
                _btnText = _this.game.add.bitmapText(0, _nextPos, "commodore", element.option, 18);
                _btnText.maxWidth = 300;
                _btnText.anchor.set(.5, 1);
                if (_obj.isItem) {
                    _btn.tint = 0x333333;
                    _btnText.tint = 0xfefefe;
                }
                else {
                    _btn.tint = 0x0d3700;
                    _btnText.tint = 0x00ff00;
                }
                _btn.height = _btnText.height + 20;
                _nextPos = _nextPos - (_btnText.height + 20) - 20;
                _totHeight = _totHeight + _btnText.height + 40;
                _this.forkBtns.add(_btn);
                _this.forkBtns.add(_btnText);
            });
            if (_obj.text != undefined && _obj.text != "") {
                this.baloonText.text = _obj.text;
                this.baloonText.y = _nextPos + 10;
                _totHeight += this.baloonText.height + 15;
            }
            this.baloonBg.height = _totHeight + 15;
            this.game.add.tween(this).to({ y: this.y + 10, alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
        };
        conversationBaloon.prototype.goToLabel = function (label) {
            var _index = 0;
            this.conversationObj.forEach(function (element, index) {
                if (element.label != undefined && element.label == label) {
                    _index = index;
                }
            });
            return _index;
        };
        conversationBaloon.prototype.isConversationActive = function () {
            return this.isPlaying;
        };
        conversationBaloon.prototype.update = function () { };
        return conversationBaloon;
    }(Phaser.Group));
    z89.conversationBaloon = conversationBaloon;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var Items = (function (_super) {
        __extends(Items, _super);
        function Items(game, itemObj) {
            var _this = 
            //console.log(itemObj)
            _super.call(this, game, itemObj.x, itemObj.y, itemObj.sprite) || this;
            if (itemObj.animations != undefined) {
                itemObj.animations.forEach(function (element) {
                    _this.animations.add(element.name, element.frames, element.rate, element.loop);
                    _this.play(element.name);
                });
            }
            _this.currentState = _this.game.state.getCurrentState();
            _this.anchor.set(0.5, 1);
            if (itemObj.scale != undefined)
                _this.scale.set(itemObj.scale);
            _this.id = itemObj.id;
            _this.itemObj = itemObj;
            _this.inputEnabled = true;
            _this.name = itemObj.name;
            _this.input.priorityID = 1;
            _this.interactive = itemObj.interactive;
            _this.fixedToCamera = itemObj.fixedToCamera;
            if (itemObj.turnLeft != undefined)
                _this.turnLeft();
            _this.events.onInputDown.add(function () {
                var _currentItem = _this.currentState.getCurrentItem();
                // if (this.currentState.playerActions.IsOpen() && _currentItem != undefined && _currentItem.id != this.id) this.currentState.playerActions.hide();
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
        Items.prototype.turnLeft = function () {
            this.scale.x = -1;
        };
        Items.prototype.turnRight = function () {
            this.scale.x = 1;
        };
        return Items;
    }(Phaser.Sprite));
    z89.Items = Items;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var ItemsContent = (function (_super) {
        __extends(ItemsContent, _super);
        function ItemsContent(game, itemObj) {
            var _this = 
            //console.log(itemObj)
            _super.call(this, game, itemObj.x, itemObj.y, itemObj.sprite) || this;
            _this.currentIndex = 0;
            _this.isAnimating = false;
            _this.isStarted = false;
            _this.currentState = _this.game.state.getCurrentState();
            _this.anchor.set(0.5);
            if (itemObj.scale != undefined)
                _this.scale.set(itemObj.scale);
            _this.id = itemObj.id;
            _this.itemObj = itemObj;
            _this.inputEnabled = true;
            _this.name = itemObj.name;
            _this.input.priorityID = 1;
            _this.interactive = itemObj.interactive;
            _this.contexts = itemObj.contexts;
            _this.fixedToCamera = itemObj.fixedToCamera;
            _this.contents = _this.currentState.getContentsBycontexts(_this.contexts);
            console.log(_this.contents);
            _this.events.onInputDown.add(function () {
                //let _currentItem: Items = this.currentState.getCurrentItem();
                console.log("item down");
            }, _this);
            _this.contentImage = _this.game.add.image(0, 0, itemObj.sprite);
            //  this.contentText = this.game.add.image(0, 0, itemObj.sprite);
            _this.contentImage.x = -_this.contentImage.width / 2;
            _this.contentImage.y = -_this.contentImage.height / 2;
            _this.contentImage.alpha = 0;
            /* let mask = game.add.graphics(0, 0);
 
             //	Shapes drawn to the Graphics object must be filled.
             mask.beginFill(0xffffff);
             mask.drawRect(-200, -100, 400, 200);
 
             this.addChild(mask);
             this.contentImage.mask = mask;
             */
            _this.addChild(_this.contentImage);
            var _style = { font: 'normal 20px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            _this.contentText = _this.game.add.text(-180, -70, "", _style);
            _this.contentText.font = 'Press Start 2P';
            _this.contentText.anchor.set(0);
            _this.contentText.wordWrap = true;
            _this.contentText.wordWrapWidth = 380;
            _this.addChild(_this.contentText);
            _this.spinner = _this.game.add.sprite(0, 0, "spinner");
            _this.spinner.anchor.set(.5);
            _this.spinner.alpha = 0;
            _this.addChild(_this.spinner);
            _this.arrowLeft = _this.game.add.sprite(-30, 0, "triangleBtn");
            _this.arrowLeft.anchor.set(.5);
            _this.arrowLeft.inputEnabled = true;
            _this.arrowLeft.input.priorityID = 3;
            _this.arrowLeft.scale.set(2);
            _this.arrowLeft.angle = -90;
            _this.arrowLeft.tint = 0x222222;
            _this.addChild(_this.arrowLeft);
            _this.arrowRight = _this.game.add.sprite(30, 0, "triangleBtn");
            _this.arrowRight.anchor.set(.5);
            _this.arrowRight.inputEnabled = true;
            _this.arrowRight.input.priorityID = 3;
            _this.arrowRight.scale.set(2);
            _this.arrowRight.angle = 90;
            _this.arrowRight.tint = 0x222222;
            _this.addChild(_this.arrowRight);
            _this.contentImage.tint = 0x555555;
            _this.game.add.existing(_this);
            var cropRect = new Phaser.Rectangle(0, 0, 400, 200);
            _this.contentImage.crop(cropRect);
            _this.filtersArr = [];
            _this.filtersArr.push(new grayShader(_this.game));
            // this.filtersArr.push(new noiseShader(this.game));
            _this.filtersArr.push(new convergenceShader(_this.game));
            return _this;
            //
            //  this.start();
        }
        ItemsContent.prototype.start = function () {
            var _this = this;
            this.game.add.tween(this.arrowRight).to({ x: 210 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            this.game.add.tween(this.arrowLeft).to({ x: -210 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                _this.isStarted = true;
                _this.game.add.tween(_this.arrowRight).to({ x: _this.arrowRight.x + 10 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
                _this.arrowLeft.events.onInputDown.add(function () { _this.arrowLeft.tint = 0x00FF00; _this.goPrev(); }, _this);
                _this.arrowLeft.events.onInputUp.add(function () { _this.arrowLeft.tint = 0xFFFFFF; }, _this);
                _this.currentState.tweenTint(_this.arrowLeft, 0x222222, 0xffffff, 1000, 0, null);
                _this.currentState.tweenTint(_this.arrowRight, 0x222222, 0xffffff, 1000, 0, null);
                _this.currentState.tweenTint(_this.contentImage, 0x222222, 0xffffff, 1000, 0, null);
                _this.contentImage.filters = [_this.filtersArr[0], _this.filtersArr[1]];
                _this.contentText.filters = [_this.filtersArr[1]];
                _this.spinner.filters = [_this.filtersArr[1]];
                _this.arrowRight.events.onInputDown.add(function () { _this.arrowRight.tint = 0x00FF00; _this.goNext(); }, _this);
                _this.arrowRight.events.onInputUp.add(function () { _this.arrowRight.tint = 0xFFFFFF; }, _this);
                _this.game.add.tween(_this.arrowLeft).to({ x: _this.arrowLeft.x - 10 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
                _this.isAnimating = true;
                _this.loadImage();
            });
        };
        ItemsContent.prototype.update = function () {
            if (this.isStarted) {
                this.filtersArr[1].randomize();
                if (this.isAnimating) {
                    this.spinner.angle += 2;
                }
            }
        };
        ItemsContent.prototype.goNext = function () {
            this.currentIndex++;
            if (this.currentIndex > this.contents.length - 1)
                this.currentIndex = 0;
            this.goTo();
        };
        ItemsContent.prototype.goPrev = function () {
            if (this.isAnimating)
                return;
            this.currentIndex--;
            if (this.currentIndex < 0)
                this.currentIndex = this.contents.length - 1;
            this.goTo();
        };
        ItemsContent.prototype.goTo = function () {
            if (this.isAnimating)
                return;
            this.isAnimating = true;
            // this.hideContent();
            this.loadImage();
        };
        ItemsContent.prototype.isInteractive = function () {
            return this.interactive;
        };
        ItemsContent.prototype.loadImage = function () {
            var _content = this.contents[this.currentIndex];
            if (_content.loaded != undefined && _content.loaded == true) {
                this.hideContent(true);
            }
            else {
                this.isAnimating = true;
                this.hideContent();
                var _obj_1 = {
                    type: 'image',
                    key: '',
                    url: '',
                    data: null,
                    error: false,
                    game: this.game,
                    state: this
                };
                _obj_1.key = "zeroImg" + _content.key;
                _obj_1.url = "http://www.zero89.it/" + _content.c;
                _obj_1.data = new Image();
                _obj_1.data.onload = function () {
                    _content.loaded = true;
                    _obj_1.game.cache.addImage(_obj_1.key, _obj_1.url, _obj_1.data);
                    _obj_1.state.contentImage.loadTexture("zeroImg" + _obj_1.state.contents[_obj_1.state.currentIndex].key);
                    _obj_1.state.showContent();
                };
                _obj_1.data.onerror = function () { _content.error = true; };
                _obj_1.data.crossOrigin = '';
                _obj_1.data.src = _obj_1.url;
            }
        };
        ItemsContent.prototype.hideContent = function (preloaded) {
            var _this = this;
            this.isAnimating = true;
            this.game.add.tween(this.spinner).to({ alpha: 1 }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false);
            this.game.add.tween(this.contentText).to({ alpha: 0, y: this.contentText.y + 10 }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false);
            this.game.add.tween(this.contentImage).to({ alpha: 0 }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false).onComplete.add(function () {
                if (preloaded) {
                    _this.contentImage.loadTexture("zeroImg" + _this.contents[_this.currentIndex].key);
                    _this.showContent();
                }
            }, this);
        };
        ItemsContent.prototype.showContent = function () {
            var _this = this;
            this.game.add.tween(this.spinner).to({ alpha: 0 }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false);
            this.contentText.text = this.contents[this.currentIndex].t;
            this.game.add.tween(this.contentText).to({ alpha: 1, y: this.contentText.y - 10 }, 500, Phaser.Easing.Quadratic.In, true, 100, 0, false).onComplete.add(function () {
                _this.isAnimating = false;
            }, this);
            this.game.add.tween(this.contentImage).to({ alpha: .8 }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false);
        };
        return ItemsContent;
    }(Phaser.Sprite));
    z89.ItemsContent = ItemsContent;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var ItemsTruck = (function (_super) {
        __extends(ItemsTruck, _super);
        function ItemsTruck(game, itemObj) {
            var _this = this;
            itemObj.x = -1000;
            _this = _super.call(this, game, itemObj) || this;
            _this.wAngle = 0;
            _this.truck = _this.game.add.sprite(0, -5, "truck");
            _this.truck.anchor.set(.5, 1);
            _this.addChild(_this.truck);
            _this.game.add.tween(_this.truck).to({ y: _this.truck.y - 5 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
            _this.wheels = [];
            _this.wheels.push(_this.game.add.sprite(-55, -37, "truck-wheel"));
            _this.wheels.push(_this.game.add.sprite(88, -37, "truck-wheel"));
            _this.wheels[0].anchor.set(.5);
            _this.wheels[1].anchor.set(.5);
            _this.addChild(_this.wheels[0]);
            _this.addChild(_this.wheels[1]);
            _this.action();
            return _this;
        }
        ItemsTruck.prototype.update = function () {
            this.wheels[0].angle += this.wAngle;
            this.wheels[1].angle += this.wAngle;
        };
        ItemsTruck.prototype.render = function () {
            this.game.debug.body(this);
        };
        ItemsTruck.prototype.action = function () {
            var _this = this;
            this.wAngle = 20;
            this.tweenAngle(20, 0, 1000, 7000);
            var _tweenA = this.game.add.tween(this).to({ x: 500 }, 8000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            _tweenA.onComplete.add(function () {
                _this.wAngle = 0;
                var tween = _this.game.add.tween(_this).to({ x: 6000 }, 30000, Phaser.Easing.Quadratic.In, true, 5000, 0, false);
                tween.onStart.add(function () {
                    _this.tweenAngle(0, 15, 15000, 0);
                });
                tween.onComplete.add(function () {
                    console.log("kill");
                    _this.kill();
                    _this.destroy();
                }, _this);
            });
        };
        ItemsTruck.prototype.tweenAngle = function (start, end, duration, delay) {
            var _this = this;
            var _angle = { value: start, end: end };
            console.log("tweenangle", _angle);
            var _tweenA = this.game.add.tween(_angle).to({ value: _angle.end }, duration, Phaser.Easing.Quadratic.InOut, true, delay, 0, false);
            _tweenA.onComplete.add(function () { });
            _tweenA.onUpdateCallback(function (tween) {
                _this.wAngle = _angle.value;
            });
        };
        return ItemsTruck;
    }(z89.Items));
    z89.ItemsTruck = ItemsTruck;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var PlayerStates;
    (function (PlayerStates) {
        PlayerStates[PlayerStates["IDLE"] = 0] = "IDLE";
        PlayerStates[PlayerStates["WALKING"] = 1] = "WALKING";
        PlayerStates[PlayerStates["RUNNING"] = 2] = "RUNNING";
        PlayerStates[PlayerStates["JUMPING"] = 3] = "JUMPING";
    })(PlayerStates = z89.PlayerStates || (z89.PlayerStates = {}));
    var PlayerDirection;
    (function (PlayerDirection) {
        PlayerDirection[PlayerDirection["LEFT"] = 0] = "LEFT";
        PlayerDirection[PlayerDirection["RIGHT"] = 1] = "RIGHT";
        PlayerDirection[PlayerDirection["UP"] = 2] = "UP";
        PlayerDirection[PlayerDirection["DOWN"] = 3] = "DOWN";
        PlayerDirection[PlayerDirection["NONE"] = 4] = "NONE";
    })(PlayerDirection = z89.PlayerDirection || (z89.PlayerDirection = {}));
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game) {
            var _this = _super.call(this, game, 100, 650, "player") || this;
            _this.yMin = 654;
            _this.yMax = 768;
            _this.direction = PlayerDirection.RIGHT;
            _this.playerState = PlayerStates.IDLE;
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
            _this.cursors = game.input.keyboard.createCursorKeys();
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
            if (this.currentState.playerActions.IsOpen() && this.currentState.currentItem != undefined && _item != undefined && this.currentState.currentItem.itemObj.id != _item.itemObj.id)
                this.currentState.playerActions.hide();
            if (this.currentState.conversationBaloon.isConversationActive() && (_x != this.x || _y != this.y - 5)) {
                this.currentState.conversationBaloon.stopConversation();
            }
            this.play("walk");
            if (this.playerTween != undefined)
                this.playerTween.stop();
            if (_item == undefined)
                this.currentState.currentItem = null;
            if (this.direction == PlayerDirection.NONE) { }
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
                _this.currentState.updatePlayerPosition(_player.x, _player.y);
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
                    _this.currentState.doActionSequence(_item);
                    if (_item.isInteractive())
                        _this.currentState.playerActions.show();
                }
                //if (_intersect[0]) this.showBaloon(z89.getLabel(11));
            }, this, null, [this.intersect]);
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
            if (this.currentState.conversationBaloon.isConversationActive()) {
                this.currentState.conversationBaloon.stopConversation();
            }
            this.hideBaloon();
            this.currentState.playerMenu.hide();
            this.currentState.playerActions.hide();
            this.beamOut(_x);
        };
        Player.prototype.beamIn = function (toX) {
            var _this = this;
            this.direction = PlayerDirection.RIGHT;
            this.y = 648;
            this.x = toX;
            this.width = 126;
            this.height = 126;
            this.alpha = 0;
            var beam = this.game.add.sprite(toX, 0, "beam");
            beam.height = 660;
            beam.anchor.set(.5, 0);
            beam.width = 150;
            beam.alpha = 0;
            beam.animations.add("beam", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 15, true).play();
            this.currentState.tweenTint(this, 0x00ff00, 0xffffff, 500, 0, null);
            var tweenBeam = this.game.add.tween(beam).to({ alpha: .5, width: 200 }, 500, Phaser.Easing.Quadratic.InOut, true, 300, 0, false);
            tweenBeam.onComplete.add(function () {
                _this.game.add.tween(_this).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
                _this.game.add.tween(beam).to({ alpha: 0 }, 100, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                    beam.kill();
                    beam.destroy();
                });
            });
        };
        Player.prototype.beamOut = function (toX) {
            var _this = this;
            var beam = this.game.add.sprite(this.x, 0, "beam");
            beam.height = 660;
            beam.width = 100;
            beam.anchor.set(.5, 0);
            beam.alpha = 0;
            beam.animations.add("beam", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 15, true).play();
            var tweenBeam = this.game.add.tween(beam).to({ alpha: .3, width: 150 }, 300, Phaser.Easing.Quadratic.InOut, true, 200, 0, false);
            tweenBeam.onComplete.add(function () {
                _this.game.add.tween(beam).to({ alpha: 0 }, 100, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                    beam.kill();
                    beam.destroy();
                });
            });
            this.currentState.tweenTint(this, 0xffffff, 0x00ff00, 300, 0, null);
            var test = this.game.add.tween(this).to({ height: 30, width: 200 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            test.onComplete.add(function () {
                _this.game.add.tween(_this).to({ width: 20, height: 700, alpha: 0 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                    _this.beamIn(toX);
                }, _this);
            }, this);
        };
        Player.prototype.showBaloon = function (_text) { this.currentState.playerBaloon.showBaloon(_text); };
        Player.prototype.showBaloonExtra = function (_obj) { this.currentState.playerBaloon.showBaloonExtra(_obj); };
        Player.prototype.hideBaloon = function () { this.currentState.playerBaloon.hideBaloon(); };
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            if (this.cursors.left.isDown) {
                this.body.velocity.x = -140;
                if (this.direction != PlayerDirection.LEFT) {
                    this.turnLeft();
                    this.play('walk');
                    this.direction = PlayerDirection.LEFT;
                    this.playerState = PlayerStates.WALKING;
                }
            }
            else if (this.cursors.right.isDown) {
                this.body.velocity.x = 140;
                if (this.direction != PlayerDirection.RIGHT) {
                    this.turnRight();
                    this.play('walk');
                    this.direction = PlayerDirection.RIGHT;
                    this.playerState = PlayerStates.WALKING;
                }
            }
            else if (this.cursors.up.isDown) {
                if (this.y < this.yMin)
                    return;
                this.body.velocity.y = -140;
                if (this.direction != PlayerDirection.UP) {
                    this.play('walk');
                    this.direction = PlayerDirection.UP;
                    this.playerState = PlayerStates.WALKING;
                }
            }
            else if (this.cursors.down.isDown) {
                console.log(this.x, this.cameraOffset.x);
                if (this.y > this.yMax)
                    return;
                this.body.velocity.y = 140;
                if (this.direction != PlayerDirection.DOWN) {
                    this.play('walk');
                    this.direction = PlayerDirection.DOWN;
                    this.playerState = PlayerStates.WALKING;
                }
            }
            else {
                if (this.playerState != PlayerStates.IDLE) {
                    this.animations.stop();
                    this.play("idle");
                    this.playerState = PlayerStates.IDLE;
                    this.direction = PlayerDirection.NONE;
                }
            }
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
            //ACTION buttons
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
                    _this.resetActions();
                    _this.currentAction = btn.z;
                    //this.setText(this.actionList[btn.z]);
                    var _txt = btn.getChildAt(0);
                    _txt.tint = 0x00ff00;
                    _this.currentState.doActionSequence();
                }, _this, null, [_btn]);
                _btn.addChild(_txt);
                _this.buttonGroup.addChild(_btn);
            });
            _this.add(_this.buttonGroup);
            //inventory ICONS
            var _icon;
            var _iconPos = [{ x: 88, y: 600 }, { x: 178, y: 600 }, { x: 88, y: 685 }, { x: 178, y: 685 }];
            for (var index = 0; index < 4; index++) {
                _icon = _this.game.add.sprite(_iconPos[index].x, _iconPos[index].y, "inventory", 0, _this.iconGroup);
                _icon.inputEnabled = true;
                _icon.z = index;
                _icon.input.priorityID = 2;
                _icon.alpha = _this.iconAlpha;
                _icon.events.onInputDown.add(function (icon) {
                    if (icon.children.length == 0)
                        return;
                    if (_this.isInverntoryItemSelected(icon.z) != -1) {
                        if (_this.currentAction == -1) {
                            _this.currentState.player.showBaloon(z89.getLabel(29));
                        }
                        else {
                            icon.frame = 0;
                            _this.currentState.doActionSequence();
                        }
                    }
                    else {
                        if (_this.currentAction == -1) {
                            _this.currentState.player.showBaloon(z89.getLabel(29));
                        }
                        else {
                            icon.frame = 1;
                            _this.inventorySelected.push(icon.z);
                            _this.currentState.doActionSequence();
                        }
                    }
                    ;
                }, _this);
            }
            _this.add(_this.iconGroup);
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
            this.iconGroup.setAll("frame", 0);
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
        PlayerActions.prototype.cleanAction = function () {
            this.buttonGroup.forEach(function (element) {
                var _txt = element.getChildAt(0);
                _txt.tint = 0xffffff;
            }, this);
        };
        PlayerActions.prototype.resetActions = function () {
            //console.log("reset action")
            this.cleanAction();
            this.currentAction = -1;
            this.inventorySelected = [];
            this.iconGroup.setAll("frame", 0);
        };
        PlayerActions.prototype.hide = function () {
            var _this = this;
            if (!this.isOpen)
                return;
            this.game.add.tween(this.cameraOffset).to({ x: -300 }, 200, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                _this.isOpen = false;
                _this.currentAction = -1;
                _this.deselectItems();
                _this.resetActions();
                _this.currentState.setActionObject(null);
                _this.setText("");
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
            //console.log("setText",_string)
            this.actionText.text = _string;
            /* if (this.actionText.tint == 0x00ff00) {
                 this.actionText.tint = 0x00ffff
             } else { this.actionText.tint = 0x00ff00 }
             */
            this.actionText.tint = 0x00ff00;
            if (this.actionTextTween != undefined)
                this.actionTextTween.stop();
            this.actionTextTween = this.game.add.tween(this.actionText).to({ alpha: 1, x: 320 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
        };
        PlayerActions.prototype.removeItems = function (items) {
            var _this = this;
            items.forEach(function (element) {
                _this.removeItem(element);
            });
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
                var _inv = _this.game.add.sprite(35, 35, element.itemObj.sprite);
                _inv.anchor.set(.5);
                _icon.addChild(_inv);
            });
        };
        //remove child items from the inventory icons
        PlayerActions.prototype.cleanInventoryIcons = function () {
            this.iconGroup.forEach(function (icon) {
                if (icon.children.length > 0)
                    icon.removeChildAt(0);
            }, this);
            this.iconGroup.setAll("frame", 0);
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
            this.inventory.push(item);
            var _icon = this.iconGroup.getChildAt(this.inventory.length - 1);
            var _inv = this.game.add.sprite(35, 35, item.itemObj.sprite);
            _inv.anchor.set(.5);
            _icon.addChild(_inv);
            this.currentState.updatePlayerInventory(this.inventory);
        };
        PlayerActions.prototype.isInInventory = function (item) {
            var match = false;
            this.inventory.forEach(function (element) {
                //console.log(item.itemObj.id, element.itemObj.id)
                if (item.itemObj.id == element.itemObj.id)
                    match = true;
            });
            return match;
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
            _this.baloonBorder.tint = 0x00ff00;
            _this.baloonPin.tint = 0x00ff00;
            _this.baloonText = _this.game.add.bitmapText(0, 0, "commodore", "", 18);
            _this.baloonText.maxWidth = 300;
            _this.baloonText.tint = 0x00ff00;
            _this.baloonText.anchor.set(0.5, 1);
            _this.add(_this.baloonText);
            _this.alpha = 0;
            _this.optionsBtns = _this.game.add.group();
            _this.add(_this.optionsBtns);
            _this.game.add.existing(_this);
            return _this;
        }
        PlayerBaloon.prototype.showBaloonExtra = function (_obj) {
            var _this = this;
            if (_obj == undefined)
                return;
            var _btn;
            var _btnText;
            var _nextPos = 0;
            var _totHeight = 0;
            _obj.options.forEach(function (element, index) {
                _btn = _this.game.add.sprite(0, _nextPos, _this.game.cache.getBitmapData("forkBtn"));
                _btn.inputEnabled = true;
                _btn.anchor.set(.5, 1);
                _btn.tint = 0x0d3700;
                _btn.events.onInputDown.add(function (a, b, c) {
                    if (c.link != undefined) {
                        window.open(c.link, "_blank");
                    }
                }, _this, null, element);
                _btnText = _this.game.add.bitmapText(0, _nextPos, "commodore", element.option, 18);
                _btnText.maxWidth = 300;
                _btnText.anchor.set(.5, 1);
                _btnText.tint = 0x00ff00;
                _btn.height = _btnText.height + 20;
                _nextPos = _nextPos - (_btnText.height + 20) - 20;
                _totHeight = _totHeight + _btnText.height + 40;
                _this.optionsBtns.add(_btn);
                _this.optionsBtns.add(_btnText);
            });
            if (_obj.answer != undefined && _obj.answer.length > 0) {
                this.baloonText.text = _obj.answer[this.game.rnd.integerInRange(0, _obj.answer.length - 1)];
                this.baloonText.y = _nextPos + 10;
                _totHeight += this.baloonText.height + 15;
            }
            this.baloonBg.height = _totHeight + 15;
            this.x = this.currentState.player.x;
            this.y = this.currentState.player.y - this.currentState.player.height - 50;
            this.game.add.tween(this).to({ y: this.y + 10, alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            console.log("end");
        };
        PlayerBaloon.prototype.showBaloon = function (_text) {
            if (_text == undefined)
                return;
            this.baloonText.text = _text;
            this.fixSize();
            this.game.add.tween(this).to({ y: this.y + 10, alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () { }, this);
        };
        PlayerBaloon.prototype.hideBaloon = function () {
            this.baloonText.y = 0;
            this.optionsBtns.removeAll();
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
            _this.isOpenOnStart = false;
            _this.fixedToCamera = true;
            _this.currentState = _this.game.state.getCurrentState();
            _this.menuBg = _this.game.add.sprite(512, 450, "menuBg");
            _this.menuBg.alpha = 1;
            _this.menuBg.anchor.set(0.5);
            _this.menuBg.height = 350;
            _this.add(_this.menuBg);
            _this.menuBg.inputEnabled = true;
            _this.menuBg.input.priorityID = 2;
            _this.menuBg.events.onInputDown.add(function () {
                if (!_this.isOpenOnStart)
                    _this.hide();
            }, _this);
            var blinkBtn;
            gameData.menuBlink.forEach(function (element) {
                blinkBtn = _this.game.add.sprite(element.x, element.y, "icons");
                blinkBtn.inputEnabled = true;
                blinkBtn.frame = element.frame;
                blinkBtn.input.priorityID = 3;
                blinkBtn.name = "iconsBtn";
                blinkBtn.events.onInputDown.add(function () {
                    _this.currentState.player.blinkTo(element.to);
                }, _this);
                _this.menuBg.addChild(blinkBtn);
            });
            //action btn
            //+++++++++++++++++++++++++++++++++
            var actionBtn;
            actionBtn = _this.game.add.sprite(-60, -290, "icons");
            actionBtn.inputEnabled = true;
            actionBtn.input.priorityID = 3;
            actionBtn.name = "iconsBtn";
            actionBtn.events.onInputDown.add(function () {
                _this.currentState.playerActions.show();
                _this.hide();
            }, _this);
            _this.menuBg.addChild(actionBtn);
            //new game btn
            //+++++++++++++++++++++++++++++++++
            var newGame;
            newGame = _this.game.add.sprite(-130, -290, _this.game.cache.getBitmapData("roundedBtn"));
            newGame.name = "startBtn";
            newGame.inputEnabled = true;
            newGame.input.priorityID = 3;
            newGame.tint = 0x2a7600;
            newGame.events.onInputDown.add(function () {
                _this.isOpenOnStart = false;
                _this.hide();
            }, _this);
            var newGameText = _this.game.add.bitmapText(265 / 2, 30, "commodore", "NEW GAME", 20);
            newGameText.anchor.set(.5);
            newGame.addChild(newGameText);
            _this.menuBg.addChild(newGame);
            //no game btn
            //+++++++++++++++++++++++++++++++++
            var noGame;
            noGame = _this.game.add.sprite(-130, -220, _this.game.cache.getBitmapData("roundedBtn"));
            noGame.name = "startBtn";
            noGame.inputEnabled = true;
            noGame.input.priorityID = 3;
            noGame.tint = 0x2a7600;
            noGame.events.onInputDown.add(function () {
                _this.isOpenOnStart = false;
                _this.hide();
            }, _this);
            var noGameText = _this.game.add.bitmapText(265 / 2, 30, "commodore", "NO GAME", 20);
            noGameText.anchor.set(.5);
            noGame.addChild(noGameText);
            _this.menuBg.addChild(noGame);
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
                this.showIcons();
                this.show();
            }
        };
        PlayerMenu.prototype.openOnStart = function () {
            this.isOpenOnStart = true;
            this.hideIcons();
            this.show();
        };
        PlayerMenu.prototype.hideIcons = function () {
            this.menuBg.children.forEach(function (element) {
                if (element.name == "iconsBtn") {
                    element.alpha = 0;
                    element.inputEnabled = false;
                }
                else {
                    element.alpha = 1;
                    element.inputEnabled = true;
                }
            }, this);
        };
        PlayerMenu.prototype.showIcons = function () {
            this.menuBg.children.forEach(function (element) {
                if (element.name == "iconsBtn") {
                    element.alpha = 1;
                    element.inputEnabled = true;
                    element.input.priorityID = 3;
                }
                else {
                    element.alpha = 0;
                    element.inputEnabled = false;
                }
            }, this);
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
var convergenceShader = (function (_super) {
    __extends(convergenceShader, _super);
    function convergenceShader(game) {
        var _this = this;
        var uniforms = {
            rand: { type: '1f', value: 0.5 },
            dimensions: { type: '4fv', value: [0, 0, 0, 0] }
        };
        _this = _super.call(this, game, uniforms, game.cache.getShader("convergence")) || this;
        return _this;
    }
    convergenceShader.prototype.randomize = function () {
        this.uniforms.rand.value = this.game.rnd.realInRange(0, .25);
    };
    return convergenceShader;
}(Phaser.Filter));
var grayShader = (function (_super) {
    __extends(grayShader, _super);
    function grayShader(game) {
        var _this = this;
        var uniforms = {
            gray: { type: '1f', value: 1.0 }
        };
        _this = _super.call(this, game, uniforms, game.cache.getShader("gray")) || this;
        return _this;
    }
    grayShader.prototype.randomize = function () {
        //  this.uniforms.rand.value = this.game.rnd.realInRange(0, 1);
        //  this.uniforms.strength.value = this.game.rnd.realInRange(0, .25);
    };
    return grayShader;
}(Phaser.Filter));
var noiseShader = (function (_super) {
    __extends(noiseShader, _super);
    function noiseShader(game) {
        var _this = this;
        var uniforms = {
            rand: { type: '1f', value: 1.5 },
            strength: { type: '1f', value: 0.25 },
            dimensions: { type: '4fv', value: [0, 0, 0, 0] }
        };
        _this = _super.call(this, game, uniforms, game.cache.getShader("noise")) || this;
        return _this;
    }
    noiseShader.prototype.randomize = function () {
        this.uniforms.rand.value = this.game.rnd.realInRange(0, 1);
        this.uniforms.strength.value = this.game.rnd.realInRange(0, .25);
    };
    return noiseShader;
}(Phaser.Filter));
var rippleShader = (function (_super) {
    __extends(rippleShader, _super);
    function rippleShader(game) {
        var _this = this;
        var uniforms = {
            //resolution      : { type: '2f', value: { x: 1, y: 1 }},
            resolution: { type: '4fv', value: [1024, 768, 0, 0] },
            time: { type: '1f', value: .0 },
            mouse: { type: '2f', value: { x: 100.0, y: 100.0 } },
        };
        _this = _super.call(this, game, uniforms, game.cache.getShader("ripple")) || this;
        return _this;
    }
    rippleShader.prototype.randomize = function () {
        //this.uniforms.rand.value = this.game.rnd.realInRange(0, 1);
        //this.uniforms.strength.value = this.game.rnd.realInRange(0, .25);
    };
    return rippleShader;
}(Phaser.Filter));
var ripple2Shader = (function (_super) {
    __extends(ripple2Shader, _super);
    function ripple2Shader(game) {
        var _this = this;
        var uniforms = {
            //resolution      : { type: '2f', value: { x: 1, y: 1 }},
            resolution: { type: '4fv', value: [1024, 768, 0, 0] },
            time: { type: '1f', value: .0 },
            mouse: { type: '2f', value: { x: 100.0, y: 100.0 } },
        };
        _this = _super.call(this, game, uniforms, game.cache.getShader("ripple2")) || this;
        return _this;
    }
    ripple2Shader.prototype.randomize = function () {
        //this.uniforms.rand.value = this.game.rnd.realInRange(0, 1);
        //this.uniforms.strength.value = this.game.rnd.realInRange(0, .25);
    };
    return ripple2Shader;
}(Phaser.Filter));
var testShader = (function (_super) {
    __extends(testShader, _super);
    function testShader(game) {
        var _this = this;
        var uniforms = {
            //resolution      : { type: '2f', value: { x: 1, y: 1 }},
            resolution: { type: '4fv', value: [1024, 768, 0, 0] },
            time: { type: '1f', value: 0 },
        };
        _this = _super.call(this, game, uniforms, game.cache.getShader("test")) || this;
        return _this;
    }
    testShader.prototype.randomize = function () {
        //this.uniforms.rand.value = this.game.rnd.realInRange(0, 1);
        //this.uniforms.strength.value = this.game.rnd.realInRange(0, .25);
    };
    return testShader;
}(Phaser.Filter));
var waterShader = (function (_super) {
    __extends(waterShader, _super);
    function waterShader(game, image, mask) {
        var _this = this;
        var uniforms = {
            time: { type: '1f', value: 0 },
            iChannel0: { type: 'sampler2D', value: image.texture },
            iChannel1: { type: 'sampler2D', value: mask.texture }
        };
        _this = _super.call(this, game, uniforms, game.cache.getShader("water")) || this;
        return _this;
    }
    waterShader.prototype.randomize = function () {
        this.uniforms.time.value += 0.02;
        // this.uniforms.rand.value = this.game.rnd.realInRange(0, 1);
        // this.uniforms.strength.value = this.game.rnd.realInRange(0, .25);
    };
    return waterShader;
}(Phaser.Filter));
var z89;
(function (z89) {
    var c64ColorsStates;
    (function (c64ColorsStates) {
        c64ColorsStates[c64ColorsStates["black"] = "#000000"] = "black";
        c64ColorsStates[c64ColorsStates["white"] = "#ffffff"] = "white";
        c64ColorsStates[c64ColorsStates["red"] = "#68372b"] = "red";
        c64ColorsStates[c64ColorsStates["light_red"] = "#9A6759"] = "light_red";
        c64ColorsStates[c64ColorsStates["cyan"] = "#70A4B2"] = "cyan";
        c64ColorsStates[c64ColorsStates["purple"] = "#6F3D86"] = "purple";
        c64ColorsStates[c64ColorsStates["green"] = "#588D43"] = "green";
        c64ColorsStates[c64ColorsStates["light_green"] = "#9AD284"] = "light_green";
        c64ColorsStates[c64ColorsStates["blue"] = "#352879"] = "blue";
        c64ColorsStates[c64ColorsStates["yellow"] = "#B8C76F"] = "yellow";
        c64ColorsStates[c64ColorsStates["orange"] = "#6F4F25"] = "orange";
        c64ColorsStates[c64ColorsStates["brown"] = "#433900"] = "brown";
        c64ColorsStates[c64ColorsStates["dark_grey"] = "#444444"] = "dark_grey";
        c64ColorsStates[c64ColorsStates["grey"] = "#6C6C6C"] = "grey";
        c64ColorsStates[c64ColorsStates["light_blue"] = "#6C5EB5"] = "light_blue";
        c64ColorsStates[c64ColorsStates["light_grey"] = "#959595"] = "light_grey";
    })(c64ColorsStates = z89.c64ColorsStates || (z89.c64ColorsStates = {}));
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
            this.game.cache.getBitmapFont("commodore").font.lineHeight = 45;
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
            this.conversationBaloon = new z89.conversationBaloon(this.game, 0, 0);
            this.groupBaloon.add(this.conversationBaloon);
            this.playerActions = new z89.PlayerActions(this.game);
            this.groupAction.add(this.playerActions);
            this.playerMenu = new z89.PlayerMenu(this.game);
            this.groupMenu.add(this.playerMenu);
            this.ground = this.game.add.sprite(0, 644, this.game.cache.getBitmapData("ground"));
            this.ground.inputEnabled = true;
            this.ground.input.priorityID = 0;
            this.ground.fixedToCamera = true;
            this.ground.alpha = 0;
            this.ground.events.onInputDown.add(function (ground) {
                if (!_this.gameInteracion)
                    return;
                if (_this.playerActions.IsOpen())
                    _this.playerActions.hide();
                _this.player.goTo(_this.game.input.x + _this.game.camera.x, _this.game.input.y);
            }, this, null, [this.ground]);
            this.saveGameObj = new z89.saveGame();
            //console.log(this.saveGameObj.gameIsSaved())
            //if game is saved
            if (this.saveGameObj.gameIsSaved()) {
                //retrive games obj from saved obj
                this.processSavedGame();
            }
            else {
                //display default start objects
                gameData.ingame.items.forEach(function (element) {
                    if (element.onStart) {
                        _this.addItem(element.id);
                    }
                });
                this.updatePlayerPosition(this.player.x, this.player.y);
                this.playerMenu.openOnStart();
            }
            this.game.time.events.repeat(2000, 10, this.updateItems, this);
            // this.game.time.events.add()
            //this.addInventoryItem(this.getItemSpriteId(31));
            //this.addInventoryItem(this.getItemSpriteId(15));
            //this.meteor(null);
            //this.shootFromHigh([10,13], null, null)
            //let bmd = this.game.make.bitmapData(400, 256);
            //bmd.draw('zeroImg210');
            //let _img:Phaser.Sprite = this.game.add.sprite(0,0,bmd)
            /*
           _img.width = 800;
           _img.height = 600;

           */
            //this.filters[0].setResolution(this.game.width,this.game.height);
            /*
            //_img.filters = [this.filters[0]];

           
*/
            //this.player.filters = [this.filters[0]];
            /*
            let _item: Items = this.getItemSpriteId(10);
            _item.filters = [this.filters[0]];

            let _item2: Items = this.getItemSpriteId(20);
            _item2.filters = [this.filters[1]];
            
            let _item2: Items = this.getItemSpriteId(33);
            _item2.filters = [this.filters[0]];
           */
            /*
            //test filter
            this.filters = [];
             this.filters.push(new testShader(this.game));
             this.game.stage.filters=[this.filters[0]];
               */
            // this.game.add.sprite(100,100,this.game.cache.getBitmapData("roundedBtn"))
        };
        GameCity.prototype.update = function () {
            //this.filters[0].randomize();
            //this.filters[0].update();
            if (this.gameInteracion) {
                this.bg.tilePosition.x = this.camera.x * -0.2;
                this.bg2.tilePosition.x = this.camera.x * -0.7;
                this.street.tilePosition.x = this.camera.x * -1.1;
                this.front.tilePosition.x = this.camera.x * -1.25;
                this.groupAll.sort('y', Phaser.Group.SORT_ASCENDING);
            }
        };
        GameCity.prototype.processSavedGame = function () {
            var _this = this;
            var _saved = this.saveGameObj.getSaved();
            console.log(_saved);
            this.player.x = _saved.position.x;
            this.player.y = _saved.position.y;
            if (_saved.items != undefined) {
                _saved.items.forEach(function (element) {
                    _this.addItem(element.id);
                });
            }
            if (_saved.inventory != undefined && _saved.inventory.length > 0) {
                _saved.inventory.forEach(function (element) {
                    var item;
                    // console.log(element.type )
                    switch (element.type) {
                        case 2:
                            _this.groupAll.add(new z89.ItemsTruck(_this.game, element));
                            break;
                        case 3:
                            _this.groupAll.add(new z89.ItemsContent(_this.game, element));
                            break;
                        default:
                            _this.groupAll.add(new z89.Items(_this.game, element));
                            break;
                    }
                    //console.log(element,this.getItemSpriteId(element))
                    _this.addInventoryItem(_this.getItemSpriteId(element.id));
                });
            }
        };
        GameCity.prototype.updateItems = function () {
            console.log("update items");
            this.saveGameObj.updateItems(this.groupAll.children);
        };
        //save player position in localstorage
        GameCity.prototype.updatePlayerPosition = function (x, y) {
            this.saveGameObj.updatePlayerPosition(x, y);
        };
        //save Player inventory in localstorage
        GameCity.prototype.updatePlayerInventory = function (inventory) {
            var _inventory = [];
            inventory.forEach(function (item) {
                _inventory.push(item.itemObj);
            });
            this.saveGameObj.updatePlayerInventory(_inventory);
        };
        GameCity.prototype.addDelay = function (delay, callback) {
            this.game.time.events.add(delay, callback);
        };
        GameCity.prototype.addItem = function (id) {
            var _itemObj = this.getItembyId(id);
            if (_itemObj != undefined) {
                switch (_itemObj.type) {
                    case 2:
                        this.groupAll.add(new z89.ItemsTruck(this.game, _itemObj));
                        break;
                    case 3:
                        this.groupAll.add(new z89.ItemsContent(this.game, _itemObj));
                        break;
                    default:
                        this.groupAll.add(new z89.Items(this.game, _itemObj));
                        break;
                }
            }
        };
        GameCity.prototype.getItembyId = function (id) {
            var _itemObj;
            gameData.ingame.items.forEach(function (element) { if (element.id == id)
                _itemObj = element; });
            return _itemObj;
        };
        GameCity.prototype.getItemSpriteId = function (id) {
            var _itemObj;
            this.groupAll.forEach(function (element) {
                if (element.id == id)
                    _itemObj = element;
            }, this);
            return _itemObj;
        };
        GameCity.prototype.render = function () {
            //this.game.debug.cameraInfo(this.game.camera, 500, 232);
            //this.game.debug.spriteCoords(this.player, 32, 32);
            //this.game.debug.bodyInfo(this.player, 32, 32);
            //this.game.debug.body(this.player.myArea)
        };
        GameCity.prototype.startConversation = function () {
            var _actionObj = this.getActionObject();
            this.conversationBaloon.setUpConversation(_actionObj);
        };
        GameCity.prototype.doActionSequence = function (_item) {
            var _this = this;
            // console.log("checkActions");
            this.createActionObject(); //create the action object based on action/inventory/items selection
            this.createActionText(); //create the action text based on the above selection
            var _actionObj = this.getActionObject();
            if (_actionObj.action != -1 && (_actionObj.inventory.length > 0 || _actionObj.item != null)) {
                if (this.executeActionLogic(_item)) {
                    this.saveGame();
                    this.resetActions();
                    this.setActionObject(null);
                    this.game.time.events.add(3000, function () { _this.playerActions.setText(""); });
                }
            }
        };
        GameCity.prototype.saveGame = function () {
            console.log("game saved");
        };
        GameCity.prototype.createActionObject = function (_itemSelected) {
            // console.log("createActionObject");
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
        GameCity.prototype.createActionText = function () {
            //console.log("createActionText")
            var _actionObj = this.getActionObject();
            var _actionText = "";
            if (_actionObj == null) {
                if (this.getCurrentItem() != undefined)
                    _actionText = this.getCurrentItem().name;
            }
            else {
                var _destText = "";
                if (_actionObj.action == z89.PlayerActionList.GIVE) {
                    _destText = " to ";
                }
                else if (_actionObj.action == z89.PlayerActionList.USE) {
                    _destText = " on ";
                }
                if (_actionObj.inventory.length == 0 && _actionObj.item == null) {
                    //console.log("case 1")
                    _actionText = this.getCurrentActionLabel();
                }
                else if (_actionObj.action != -1 && _actionObj.inventory.length == 0 && _actionObj.item != null) {
                    //console.log("case 2")
                    _actionText = this.getCurrentActionLabel() + " " + _actionObj.item.name;
                }
                else if (_actionObj.inventory.length > 0 && _actionObj.item == null) {
                    //console.log("case 3")
                    //console.log(_actionObj.inventory.length)
                    if (_actionObj.inventory.length == 1) {
                        _actionText = this.getCurrentActionLabel() + " " + _actionObj.inventory[0].name + _destText;
                    }
                    else if (_actionObj.inventory.length == 2) {
                        _actionText = this.getCurrentActionLabel() + " " + _actionObj.inventory[0].name + _destText + _actionObj.inventory[1].name;
                    }
                }
                else if (_actionObj.inventory.length > 0 && _actionObj.item != null) {
                    //console.log("case 4")
                    if (_actionObj.inventory.length == 1) {
                        _actionText = this.getCurrentActionLabel() + " " + _actionObj.inventory[0].name + _destText + _actionObj.item.name;
                    }
                }
                else if (_actionObj.key == "noAction" && _actionObj.item != null) {
                    //console.log("case 5", _actionObj.item.name);
                    _actionText = _actionObj.item.name;
                }
            }
            //console.log(_actionText);
            this.setActionText(_actionText);
        };
        GameCity.prototype.checkCombinedItems = function () {
            var _actionObj = this.getActionObject();
            if (_actionObj.inventory.length == 2) {
                var _key = this.getCurrentActionLabel() + "_" + _actionObj.inventory[0].id + "_" + _actionObj.inventory[1].id;
                // console.log(_key)
                if (gameData.ingame.logic[_key] != undefined)
                    return true;
                _key = this.getCurrentActionLabel() + "_" + _actionObj.inventory[1].id + "_" + _actionObj.inventory[0].id;
                if (gameData.ingame.logic[_key] != undefined)
                    return true;
                // console.log(_key)
            }
            return false;
        };
        GameCity.prototype.checkCombinedItemsKey = function () {
            var _actionObj = this.getActionObject();
            if (_actionObj.inventory.length == 2) {
                var _key = this.getCurrentActionLabel() + "_" + _actionObj.inventory[0].id + "_" + _actionObj.inventory[1].id;
                // console.log(_key)
                if (gameData.ingame.logic[_key] != undefined)
                    return _key;
                _key = this.getCurrentActionLabel() + "_" + _actionObj.inventory[1].id + "_" + _actionObj.inventory[0].id;
                if (gameData.ingame.logic[_key] != undefined)
                    return _key;
                // console.log(_key)
            }
            return "";
        };
        GameCity.prototype.executeActionLogic = function (_item) {
            //console.log("executeActionLogic");
            var _actionObj = this.getActionObject();
            //console.log(this.checkCombinedItems())
            if (_actionObj.inventory.length > 0 && _actionObj.item == null) {
                // console.log(_actionObj);
                if (_actionObj.inventory.length == 1 && _actionObj.inventory[0].itemObj.logic[this.getCurrentActionString()] != undefined) {
                    //console.log("logic 1")
                    _actionObj.inventory[0].itemObj.logic[this.getCurrentActionString()](this);
                    return true;
                }
                else if (_actionObj.inventory.length == 2 && this.checkCombinedItems()) {
                    // console.log("logic item on item", _actionObj.key);
                    gameData.ingame.logic[this.checkCombinedItemsKey()](this);
                    return true;
                }
            }
            else if (_actionObj.inventory.length == 0 && _actionObj.item != null) {
                //console.log("logic 2", _actionObj.item)
                if (_actionObj.item.itemObj.logic != undefined && _actionObj.item.itemObj.logic[this.getCurrentActionString()] != undefined) {
                    _actionObj.item.itemObj.logic[this.getCurrentActionString()](this);
                    return true;
                }
            }
            else if (_actionObj.inventory.length > 0 && _actionObj.item != null && gameData.ingame.logic[_actionObj.key] != undefined) {
                //console.log("logic 3", _actionObj.key)
                gameData.ingame.logic[_actionObj.key](this);
                return true;
            }
            return false;
        };
        GameCity.prototype.resetActions = function () {
            //console.log("resetActions ")
            this.playerActions.resetActions();
            this.currentItem = null;
        };
        GameCity.prototype.returnMessage = function () {
            var _currActionObj = this.getActionObject();
            var _item;
            if (_currActionObj.item == null) {
                _item = _currActionObj.inventory[0];
            }
            else {
                _item = _currActionObj.item;
            }
            var _mess = _item.itemObj.actions[_currActionObj.action].answer[this.game.rnd.integerInRange(0, _item.itemObj.actions[_currActionObj.action].answer.length - 1)];
            this.player.showBaloon(_mess);
        };
        GameCity.prototype.returnMessageExtra = function () {
            var _currActionObj = this.getActionObject();
            var _item;
            if (_currActionObj.item == null) {
                _item = _currActionObj.inventory[0];
            }
            else {
                _item = _currActionObj.item;
            }
            var _obj = _item.itemObj.actions[_currActionObj.action];
            this.player.showBaloonExtra(_obj);
        };
        GameCity.prototype.setCurrentItem = function (_item) { this.currentItem = _item; };
        GameCity.prototype.getCurrentItem = function () { return this.currentItem; };
        GameCity.prototype.getInventory = function () { return this.playerActions.getInventory(); };
        GameCity.prototype.getInventorySelected = function () { return this.playerActions.getInventorySelected(); };
        GameCity.prototype.setActionText = function (_text) {
            // console.log("setActionText: " + _text); 
            this.playerActions.setText(_text);
        };
        GameCity.prototype.getActionObject = function () { return this.logicCombination; };
        GameCity.prototype.setActionObject = function (value) { this.logicCombination = value; };
        GameCity.prototype.getCurrentAction = function () { return this.playerActions.getCurrentAction(); };
        GameCity.prototype.getCurrentActionString = function () { return this.playerActions.getCurrentActionString(); };
        GameCity.prototype.getCurrentActionLabel = function () { return this.playerActions.getCurrentActionLabel(); };
        GameCity.prototype.getSprites = function () { return this.groupAll; };
        GameCity.prototype.disableInteraction = function () { this.gameInteracion = false; };
        GameCity.prototype.enableInteraction = function () { this.gameInteracion = true; };
        GameCity.prototype.addInventoryItem = function (item) {
            if (item != undefined) {
                // console.log(item);
                this.playerActions.addItem(item);
                this.groupAll.remove(item);
            }
            else {
                var _currActionObj = this.getActionObject();
                var _item = void 0;
                if (_currActionObj.item == null) {
                    _item = _currActionObj.inventory[0];
                }
                else {
                    _item = _currActionObj.item;
                }
                //console.log(this.playerActions.isInInventory(_item));
                if (this.playerActions.isInInventory(_item)) {
                    this.player.showBaloon(z89.getLabel(28));
                }
                else {
                    this.player.play("pickdrop");
                    this.playerActions.addItem(_item);
                    this.groupAll.remove(_item);
                    this.setCurrentItem(null);
                }
            }
        };
        GameCity.prototype.removeInventoryItems = function () { this.playerActions.removeItems(this.getActionObject().inventory); };
        GameCity.prototype.dropInventoryItem = function () {
            console.log("drop in");
            var _currActionObj = this.getActionObject();
            var _item;
            if (_currActionObj.item == null) {
                _item = _currActionObj.inventory[0];
            }
            else {
                _item = _currActionObj.item;
            }
            if (!this.playerActions.isInInventory(_item)) {
                return;
            }
            if (this.player.y >= 705) {
                _item.itemObj.fixedToCamera = true;
                var _x = this.player.x * 1.08;
                _item.itemObj.x = _x;
                _item.itemObj.y = this.player.y;
            }
            else {
                _item.itemObj.fixedToCamera = false;
            }
            var _newItem = new z89.Items(this.game, _item.itemObj);
            if (!_item.itemObj.fixedToCamera) {
                _newItem.x = this.player.x;
                _newItem.y = this.player.y + 10;
            }
            this.groupAll.add(_newItem);
            this.playerActions.removeItem(_item);
            _item.destroy();
            //his.updateItems();
            this.player.play("pickdrop");
        };
        GameCity.prototype.getContentsBycontexts = function (contexts) {
            var _arr = z89.getZero89Data();
            var _con;
            var _result = [];
            var ele = false;
            _arr.forEach(function (element) {
                _con = element.contexts;
                if (_con != undefined) {
                    _con.forEach(function (_context) {
                        ele = false;
                        _context.c.forEach(function (tag) {
                            contexts.forEach(function (ctag) {
                                if (ctag == tag.t && ele == false) {
                                    ele = true;
                                    _result.push(element);
                                }
                            });
                        });
                    });
                }
            });
            return _result;
        };
        GameCity.prototype.tweenTint = function (obj, startColor, endColor, time, delay, callback) {
            if (time === void 0) { time = 250; }
            if (delay === void 0) { delay = 0; }
            if (callback === void 0) { callback = null; }
            // check if is valid object
            if (obj) {
                // create a step object
                var colorBlend_1 = { step: 0 };
                // create a tween to increment that step from 0 to 100.
                var colorTween = this.game.add.tween(colorBlend_1).to({ step: 100 }, time, Phaser.Easing.Linear.None, delay);
                // add an anonomous function with lexical scope to change the tint, calling Phaser.Colour.interpolateColor
                colorTween.onUpdateCallback(function () {
                    obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend_1.step, null);
                });
                // set object to the starting colour
                obj.tint = startColor;
                // if you passed a callback, add it to the tween on complete
                if (callback) {
                    colorTween.onComplete.add(callback, this);
                }
                // finally, start the tween
                colorTween.start();
            }
        };
        GameCity.prototype.shootFromHigh = function (targets, shot, callback) {
            var _this = this;
            //console.log(target);
            // obj example
            shot = {
                delay: 1000,
                missile: { name: "meteor", animation: { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], rate: 5, loop: true } },
                explosion: { name: "explosion", animation: { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], rate: 25, loop: false } }
            };
            var _shot;
            var _explosion;
            targets.forEach(function (element, index) {
                _this.groupAll.forEach(function (sprite) {
                    if (sprite.id == element) {
                        //console.log(sprite);
                        _shot = _this.game.add.sprite(sprite.x, -100, shot.missile.name);
                        _shot.anchor.set(.5, 1);
                        _shot.animations.add("run", shot.missile.animation.frames, shot.missile.animation.rate, shot.missile.animation.loop).play();
                        _this.game.add.tween(_shot).to({ y: sprite.y }, 1000, Phaser.Easing.Quadratic.In, true, shot.delay * index, 0, false).onComplete.add(function (shoot) {
                            _this.game.camera.flash();
                            _explosion = _this.game.add.sprite(sprite.x, sprite.y, "explosion");
                            _explosion.anchor.set(.5, 1);
                            _explosion.scale.set(2);
                            _this.groupAll.remove(_this.getItemSpriteId(sprite.id));
                            _explosion.animations.add("run", shot.explosion.animation.frames, shot.explosion.animation.rate, shot.explosion.animation.loop).play().onComplete.add(function (explosion) {
                                explosion.kill();
                                if (index == targets.length - 1) {
                                    console.log("callaback");
                                }
                            }, _explosion);
                            shoot.kill();
                        }, _this);
                    }
                }, _this);
            });
            /*
            _meteor.anchor.set(.5);
            _meteor.animations.add("run", [0, 1, 2, 3, 4, 5, 6, 7, 8], 5, true).play();
            this.game.add.tween(_meteor).to({ y: 600 }, 1000, Phaser.Easing.Quadratic.In, true, 0, 0, false).onComplete.add((a, b, c: Phaser.Sprite) => {

                    this.game.camera.flash();
                    this.groupAll.remove(this.getItemSpriteId(16));
                    let exp = this.game.add.sprite(600, 600, "explosion");
                    exp.anchor.set(.5);
                    exp.scale.set(2);
                    exp.animations.add("run", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 25, false).play().onComplete.add((a, b, c) => {

                            a.kill();
                            this.playerBaloon.showBaloon("Noooooooooo!!!! :D");

                    }, exp);


                    c.kill()


            }, this, null, _meteor);

            */
        };
        GameCity.prototype.meteor2 = function (target) {
            //console.log(target);
            var _this = this;
            var _meteor = this.game.add.sprite(this.player.x, -100, "meteor");
            _meteor.anchor.set(.5);
            _meteor.animations.add("run", [0, 1, 2, 3, 4, 5, 6, 7, 8], 5, true).play();
            this.game.add.tween(_meteor).to({ y: 600 }, 1000, Phaser.Easing.Quadratic.In, true, 0, 0, false).onComplete.add(function (a, b, c) {
                _this.game.camera.flash();
                _this.player.kill();
                var exp = _this.game.add.sprite(_this.player.x, _this.player.y - 50, "explosion");
                exp.anchor.set(.5);
                exp.scale.set(2);
                exp.animations.add("run", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 25, false).play().onComplete.add(function (sprite) {
                    sprite.kill();
                    // this.playerBaloon.showBaloon("Noooooooooo!!!! :D");
                    _this.conversationBaloon.setUpConversation({
                        key: "TALKTO_custom",
                        action: null,
                        inventory: null,
                        item: target
                    });
                }, exp);
                c.kill();
            }, this, null, _meteor);
        };
        return GameCity;
    }(Phaser.State));
    z89.GameCity = GameCity;
})(z89 || (z89 = {}));
