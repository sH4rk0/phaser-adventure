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
            var _this = _super.call(this) || this;
            _this.letters = [
                { text: '    **** COMMODORE 64 BASIC V2 ****    ', stringDelay: 0, charDelay: 0, row: 1, obj: 0 },
                { text: ' 64K RAM SYSTEM  38911 BASIC BYTES FREE ', stringDelay: 0, charDelay: 0, row: 3, obj: 1 },
                { text: 'READY.', stringDelay: 0, charDelay: 0, row: 5, obj: 2 },
                { text: 'LOAD"' + z89.getGameName() + '",8', stringDelay: 0, charDelay: 0, row: 6, obj: 3 },
                { text: 'SEARCHING FOR ' + z89.getGameName(), stringDelay: 0, charDelay: 0, row: 8, obj: 4, cursor: "hide" }
            ];
            _this.letters2 = [
                { text: 'READY.', stringDelay: 0, charDelay: 0, row: 10, obj: 0, cursor: "hide" },
                { text: '', stringDelay: 0, charDelay: 0, row: 11, obj: 1, cursor: "blink" },
                { text: '', stringDelay: 1000, charDelay: 0, row: 11, obj: 1 },
                { text: 'RUN', stringDelay: 1000, charDelay: 100, row: 11, obj: 1, callback: function () {
                        _this.loadingPerc.destroy();
                        _this.screens[0].destroy();
                        _this.screens[1].destroy();
                        new z89.c64Typewriter(_this.game, [{ text: '    *** TYPE EVERYWHERE TO START ***   ', stringDelay: 0, charDelay: 25, row: 12, obj: 0, callback: function () { } }], _this.c64Screen);
                        _this.game.input.onDown.addOnce(function () { z89.goState("GameCity", _this.game); }, _this);
                    } }
            ];
            _this.lettersObj = [];
            return _this;
        }
        Preloader.prototype.create = function () { };
        Preloader.prototype.init = function () {
            this.body = document.getElementsByTagName("body")[0];
            this.screens = [];
            this.c64Screen = this.game.add.group();
            //bg
            //--------------------------
            var bg = this.game.add.image(0, 0, this.game.cache.getBitmapData("c64bg"));
            this.c64Screen.addChild(bg);
            this.c64Screen.x = (1080 - 640) / 2;
            this.c64Screen.y = (768 - 400) / 2;
            this.screens[0] = new z89.c64Typewriter(this.game, this.letters, this.c64Screen);
            /*
            let graphic: Phaser.Graphics = this.game.add.graphics(0, 0);

            for (var i = 0; i <= 2048; i += 4) {

                graphic.beginFill(z89.getC64Color(this.game.rnd.integerInRange(0, 15)));
                graphic.drawRect(0, i, this.game.world.width, 4);
                graphic.endFill();

            }

            this.raster = this.game.add.image(0, -200, graphic.generateTexture(), 0, this.c64OutScreen);
            this.raster.alpha = 1;
            graphic.clear();
            graphic.destroy();
            */
            this.loadingPerc = this.game.add.bitmapText(0, 16 * 9, "commodore", '', 16, this.c64Screen);
            this.loadingPerc.tint = 0x6C5EB5;
            //scanlines
            //--------------------------
            //this.scanlines = this.game.add.tileSprite(0, 0, 1024, 768, "scanlines");
            //start button
            //--------------------------
            this.startBtn = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('startBtn'));
            this.startBtn.anchor.setTo(0.5);
            var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });
            _spriteText.anchor.set(0.5);
            this.startBtn.addChild(_spriteText);
            this.startBtn.visible = false;
        };
        Preloader.prototype.preload = function () {
            this.loadAssets();
        };
        Preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this.loadingPerc.text = "LOADING " + progress + "%";
        };
        Preloader.prototype.loadAssets = function () {
            var _this = this;
            this.body.className = "loading";
            this.game.load.onLoadStart.add(function () { console.log("start asset load"); }, this);
            this.game.load.onFileComplete.add(this.fileComplete, this);
            this.game.load.onLoadComplete.add(function () {
                z89.setUpGame(_this.game);
                /* comment this */
                z89.goState("GameCity", _this.game);
                _this.body.className = "";
                _this.screens[1] = new z89.c64Typewriter(_this.game, _this.letters2, _this.c64Screen);
            }, this);
            this.game.load.script('webfont', 'js/libs/webfonts.js');
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
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.letters = [
                { text: '    **** COMMODORE 64 BASIC V2 ****    ', stringDelay: 0, charDelay: 0, row: 1, obj: 0 },
                { text: ' 64K RAM SYSTEM  38911 BASIC BYTES FREE ', stringDelay: 0, charDelay: 0, row: 3, obj: 1 },
                { text: 'READY.', stringDelay: 0, charDelay: 0, row: 5, obj: 2 },
                { text: '', stringDelay: 2000, charDelay: 0, row: 6, obj: 3 },
                { text: 'LOAD"' + z89.getGameName() + '",8', stringDelay: 1000, charDelay: 100, row: 6, obj: 3, },
                { text: 'SEARCHING FOR ' + z89.getGameName(), stringDelay: 1000, charDelay: 0, row: 8, obj: 4, cursor: "hide", callback: function () {
                        //goState("Preloader",this.game)
                        _this.game.state.start("Preloader");
                    } }
            ];
            _this.lettersObj = [];
            return _this;
        }
        Boot.prototype.preload = function () {
            var bmd = this.game.add.bitmapData(200, 50);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 200, 50);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('loadingBar', bmd);
            bmd = this.game.add.bitmapData(1080, 720);
            bmd.ctx.fillStyle = '#0096ff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1080, 720);
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
            bmd = this.game.add.bitmapData(300, 50);
            bmd.ctx.fillStyle = '#00ff00';
            bmd.ctx.beginPath();
            bmd.ctx.moveTo(300, 50);
            bmd.ctx.arcTo(0, 50, 0, 0, 10);
            bmd.ctx.arcTo(0, 0, 50, 0, 10);
            bmd.ctx.arcTo(300, 0, 300, 50, 10);
            bmd.ctx.arcTo(300, 50, 0, 50, 10);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('forkBtn', bmd);
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
            bmd = this.game.add.bitmapData(316, 52);
            bmd.ctx.fillStyle = '#00ff00';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 316, 52);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('skill', bmd);
            bmd = this.game.add.bitmapData(640, 400);
            bmd.ctx.fillStyle = '#000000';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 640, 400);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('terminal', bmd);
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
            bmd = this.game.add.bitmapData(180, 50);
            bmd.ctx.fillStyle = '#00ff00';
            bmd.ctx.beginPath();
            bmd.ctx.moveTo(180, 50);
            bmd.ctx.arcTo(0, 50, 0, 0, 10);
            bmd.ctx.arcTo(0, 0, 50, 0, 10);
            bmd.ctx.arcTo(180, 0, 180, 50, 10);
            bmd.ctx.arcTo(180, 50, 0, 50, 10);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('readmore', bmd);
            bmd = this.game.add.bitmapData(400, 200);
            bmd.ctx.fillStyle = '#ffffff';
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 400, 200);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('contents', bmd);
            bmd = this.game.add.bitmapData(640, 600);
            bmd.ctx.fillStyle = "#352879";
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 640, 400);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('c64bg', bmd);
            bmd = this.game.add.bitmapData(40, 40);
            bmd.ctx.fillStyle = '#00ff00';
            bmd.ctx.beginPath();
            bmd.ctx.moveTo(40, 40);
            bmd.ctx.arcTo(0, 40, 0, 0, 10);
            bmd.ctx.arcTo(0, 0, 40, 0, 10);
            bmd.ctx.arcTo(40, 0, 40, 40, 10);
            bmd.ctx.arcTo(40, 40, 0, 40, 10);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('key', bmd);
            bmd = this.game.add.bitmapData(1080, 150);
            bmd.ctx.fillStyle = "#00ff00";
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 1080, 150);
            bmd.ctx.fill();
            this.game.cache.addBitmapData('keyboard', bmd);
            this.game.load.bitmapFont("commodore", "assets/fonts/64_0.png", "assets/fonts/64.xml");
            this.game.load.bitmapFont("commodore2", "assets/fonts/64x32_0.png", "assets/fonts/64x32.xml");
            this.game.load.spritesheet("cursor", "assets/images/game/terminal/cursor.png", 16, 16, 2);
        };
        Boot.prototype.create = function () {
            this.c64Screen = this.game.add.group();
            var bg = this.game.add.image(0, 0, this.game.cache.getBitmapData("c64bg"));
            this.c64Screen.addChild(bg);
            this.c64Screen.x = (1080 - 640) / 2;
            var destY = (768 - 400) / 2;
            this.c64Screen.y = -400;
            this.c64Screen.alpha = 0;
            new z89.c64Typewriter(this.game, this.letters, this.c64Screen);
            this.game.add.tween(this.c64Screen).to({ y: destY, alpha: 1 }, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false).onComplete.add(function () { });
            if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
                z89.setDevice(true);
            }
            else {
                z89.setDevice(false);
            }
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.stage.smoothed = false;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            //this.game.canvas.style.cursor = 'url(http://triplanetary.github.io/cursor.png),auto';
            /* comment this */
            this.game.state.start("Preloader");
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
var _gamecity;
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
    var _c64Colors = [0x000000, 0xffffff, 0x68372b, 0x9A6759, 0x70A4B2, 0x6F3D86, 0x588D43, 0x9AD284, 0x352879, 0xB8C76F, 0x6F4F25, 0x433900, 0x444444, 0x6C6C6C, 0x6C5EB5, 0x959595];
    var _gameName;
    var c64ColorsEnum;
    (function (c64ColorsEnum) {
        c64ColorsEnum[c64ColorsEnum["black"] = 0] = "black";
        c64ColorsEnum[c64ColorsEnum["white"] = 16777215] = "white";
        c64ColorsEnum[c64ColorsEnum["red"] = 6829867] = "red";
        c64ColorsEnum[c64ColorsEnum["light_red"] = 10119001] = "light_red";
        c64ColorsEnum[c64ColorsEnum["cyan"] = 7382194] = "cyan";
        c64ColorsEnum[c64ColorsEnum["purple"] = 7290246] = "purple";
        c64ColorsEnum[c64ColorsEnum["green"] = 5803331] = "green";
        c64ColorsEnum[c64ColorsEnum["light_green"] = 10146436] = "light_green";
        c64ColorsEnum[c64ColorsEnum["blue"] = 3483769] = "blue";
        c64ColorsEnum[c64ColorsEnum["yellow"] = 12109679] = "yellow";
        c64ColorsEnum[c64ColorsEnum["orange"] = 7294757] = "orange";
        c64ColorsEnum[c64ColorsEnum["brown"] = 4405504] = "brown";
        c64ColorsEnum[c64ColorsEnum["dark_grey"] = 4473924] = "dark_grey";
        c64ColorsEnum[c64ColorsEnum["grey"] = 7105644] = "grey";
        c64ColorsEnum[c64ColorsEnum["light_blue"] = 7102133] = "light_blue";
        c64ColorsEnum[c64ColorsEnum["light_grey"] = 9803157] = "light_grey";
    })(c64ColorsEnum = z89.c64ColorsEnum || (z89.c64ColorsEnum = {}));
    function getGameName() {
        return _gameName;
    }
    z89.getGameName = getGameName;
    function setGameName(game) {
        var games = [
            "ZERO89.IT",
            "COMMANDO +2 / FLT",
            "ACCOLADE COMICS / TYC"
        ];
        var index = game.rnd.integerInRange(0, games.length - 1);
        _gameName = games[index];
    }
    z89.setGameName = setGameName;
    function getC64Color(_index) {
        return _c64Colors[_index];
    }
    z89.getC64Color = getC64Color;
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
    function stopSoundAll() {
        _gameSounds.forEach(function (sound) {
            sound.stop();
        });
    }
    z89.stopSoundAll = stopSoundAll;
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
    })(gameSound = z89.gameSound || (z89.gameSound = {}));
    function setUpGame(_game) {
        if (!_gameSetup) {
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
            this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, "my-game", null, true, true);
            setGameName(this.game);
            this.game.state.add("Boot", z89.Boot, false);
            this.game.state.add("Preloader", z89.Preloader, false);
            _gamecity = this.game.state.add("GameCity", z89.GameCity, false);
            this.game.state.start("Boot");
            //setUpGame(this.game);
        };
        initGame.prototype.getContents = function () {
            $.ajax({
                url: "http://www.zero89.it/api/jsonp/api/core.aspx",
                dataType: "jsonp",
                type: "GET",
                data: {
                    token: "084068108072071097080066109079102085089083089118076100077050122071104076099102057051109090043118048066075117067066050055055111084054050115051084072052113102048070110048110113121084114049112051",
                    format: "json"
                },
            }).done(function (data) { setZero89Data(data.values.value); _newGame.startLoading(); })
                .fail(function (xhr) {
                console.log('error', xhr);
                _newGame.startLoading();
            });
        };
        return initGame;
    }());
    z89.initGame = initGame;
    window.onresize = function () { };
    window.onload = function () { _newGame = new initGame(1080, 720); };
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
        "terminal",
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
        "He is Mike. Founder of DEVDAY Salerno.",
        "Hey, Mike! What's up.",
        "Hey, Francesco, it's ok. Don't forget our next meetup.",
        "Sure! Where and when?",
        "Saturday 16th September at Puntolingue. We'll talk about blockchain and bitcoins",
        "AMAZING!!!",
        "Here the DEVDAY team organize montly tech meetups!!!",
        "@##@ @##@!!!",
        "Gerardo",
        "Daniele",
        "Davide",
        "He is Gerardo. Founder of DEVDAY Avellino.",
        "Chain",
        "A broken chain",
        "Block",
        "A concrete block",
        "DEVDAY in Bits",
        "A bunch of bits",
        "Blockchain",
        "A blockchain",
        "Bitcoin",
        "A bitcoin",
        "DEVDAY pass",
        "Scotch tape",
        "Broken energy box",
        "Fixed energy box",
        "Someone lost a new Scotch tape!",
        "Seems to be broken! I need something to fix it.",
        "The energy box now is fixed.",
        "DEVDAY PALACE",
        "What a stink!",
        "He is Daniele. Founder of DEVDAY Benevento.",
        "He is Davide. Founder of DEVDAY Napoli.",
        "$ git init\n$ git add *.c\n$ git add README\n$ git commit -m 'DEVDAY first commit'",
        "Hi Gerardo! What's up??",
        "Ehmm!! OK! OK!",
        "Hi Mike! What's going on??",
        "Hi Francesco! Big trouble!\nThe advertising screen is not working, i don't know why!\nSo we can't advice the developers about our events!!\nCould you help me?",
        "Sure!",
        "Francesco, any update?",
        "Not yet!",
        "Thanks Francesco! Now the main screen works properly.",
        "You welcome!",
        "The DEVDAY event screen!",
        "DEVDAY ADV screen",
        "Wow! My Skillset!",
        "I live on the third floor!",
        "building",
        "door",
        "Seems to be not connected.",
        "Wow! It\'s connected.",
        "It\'not connected... maybe later!",
        "This is an experimental website!\nI'm trying to mix the standard personal information website with and adventure game logic.\nDo you think it could work?",
        "DO YOU REALLY WANT TO RESTART?",
        "I want to thanks Richard Davey author of Phaser Framework, PAUL ROBERTSON and JASON TAMMEMAGI for their unaware art contribution to this experiment.",
        "Here some options!!",
        "Jukebox",
        "DEVDAY website",
        "Info",
        "I would like to listen...",
        "Woofer",
        "Nothing to do with this!",
        "I have completed this chapter. Would you like to continue?",
        "Tap me to access the menu.",
        "The GOVERNOR",
        "Hi!",
        "I'm the GOVERNOR... and you are nothing!",
    ]
};
var actions = {
    en: ["PUSH", "PULL", "GIVE", "OPEN", "CLOSE", "EXAMINE", "USE", "PICK UP", "DROP", "TALK TO"],
    it: ["SPINGI", "TIRA", "DAI", "APRI", "CHIUDI", "ESAMINA", "USA", "PRENDI", "LASCIA", "PARLA A"]
};
var currentLang = "en";
var gameData = {
    chapters: null,
    ingame: { conversation: null, logic: null, items: null },
    assets: null,
    menuBlink: null,
    skills: [{ s: "phaser", v: 60 }, { s: "javascript", v: 70 }, { s: "html", v: 75 }, { s: "typescript", v: 60 }, { s: "css", v: 65 }, { s: ".net", v: 70 }, { s: "c#", v: 65 }, { s: "gamedev", v: 50 }, { s: "design", v: 60 }, { s: "ux", v: 65 }, { s: "clm", v: 80 }, { s: "tsql", v: 70 }, { s: "firebase", v: 60 }]
};
gameData.assets = {
    spritesheets: [
        { name: "player", path: "assets/images/game/player.png", width: 126, height: 126, frames: 64 },
        { name: "terminal", path: "assets/images/game/items/terminal.png", width: 52, height: 132, frames: 7 },
        { name: "arete", path: "assets/images/game/people/arete.png", width: 65, height: 138, frames: 4 },
        { name: "daniele", path: "assets/images/game/people/daniele.png", width: 65, height: 138, frames: 4 },
        { name: "davide", path: "assets/images/game/people/davide.png", width: 65, height: 138, frames: 4 },
        { name: "michele", path: "assets/images/game/people/michele.png", width: 65, height: 138, frames: 4 },
        { name: "inventory", path: "assets/images/game/inventory.png", width: 70, height: 70, frames: 2 },
        { name: "icons", path: "assets/images/game/icons/icons.png", width: 80, height: 80, frames: 11 },
        { name: "beam", path: "assets/images/game/beam.png", width: 200, height: 200, frames: 12 },
        { name: "devday", path: "assets/images/game/items/devday.png", width: 320, height: 87, frames: 2 },
        { name: "explosion", path: "assets/images/game/explosion.png", width: 80, height: 80, frames: 28 },
        { name: "meteor", path: "assets/images/game/meteor.png", width: 80, height: 109, frames: 9 },
        { name: "travolta", path: "assets/images/game/people/travolta2.png", width: 248, height: 200, frames: 25 },
        { name: "cable", path: "assets/images/game/items/cable.png", width: 30, height: 40, frames: 20 },
        { name: "cake", path: "assets/images/game/items/cake.png", width: 150, height: 177, frames: 9 },
        { name: "drink-machine", path: "assets/images/game/items/drink-machine.png", width: 80, height: 124, frames: 2 },
        { name: "jukebox", path: "assets/images/game/items/jukebox.png", width: 68, height: 136, frames: 8 },
    ],
    images: [
        { name: "bg-level0", path: "assets/images/game/bg-level0.png" },
        { name: "bg-level1", path: "assets/images/game/bg-level1.png" },
        { name: "bg-level2", path: "assets/images/game/bg-level2.png" },
        //{ name: "bg-level3", path: "assets/images/game/bg-level3.png" },
        { name: "street-level1", path: "assets/images/game/street-level1.png" },
        { name: "street-level0", path: "assets/images/game/street-level0.png" },
        { name: "street-level2", path: "assets/images/game/street-level2.png" },
        { name: "menu-phone", path: "assets/images/game/menu-phone.png" },
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
        { name: "skills", path: "assets/images/game/items/skills.png" },
        { name: "newsbg", path: "assets/images/game/items/news-bg.png" },
        { name: "woofer", path: "assets/images/game/items/woofer.png" },
        { name: "triangleBtn", path: "assets/images/game/triangle-btn.png" },
        { name: "scotch", path: "assets/images/game/items/scotch.png" },
        { name: "spinner", path: "assets/images/game/spinner.png" },
        { name: "scanlines", path: "assets/images/game/intro/scanlines.png" },
        { name: "halftone", path: "assets/images/game/halftone.png" },
        { name: "readmore", path: "assets/images/game/readmore.png" },
        { name: "terminalBg", path: "assets/images/game/terminal/terminal.png" },
        { name: "terminalKeyboard", path: "assets/images/game/terminal/keyboard.png" },
        { name: "bg-home", path: "assets/images/game/buildings/home.png" },
        { name: "bg-devday", path: "assets/images/game/buildings/devday.png" },
        { name: "bg-skills", path: "assets/images/game/buildings/skills.png" },
        { name: "bg-cake", path: "assets/images/game/buildings/cake.png" },
        { name: "bg-arcade", path: "assets/images/game/buildings/arcade.png" },
        { name: "bg-aerosol", path: "assets/images/game/buildings/aerosol.png" },
        { name: "bg-contact", path: "assets/images/game/buildings/contact.png" },
    ],
    sounds: [
        { name: "intro", paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"], volume: 1, loop: false },
    ],
    bitmapfont: []
};
gameData.chapters = [
    {
        title: "CHAPTER ONE:\nTHE DEVDAY TROUBLE!",
        completed: false,
        complete: function (cs) {
            cs.removeItem(24);
            cs.updateItemObject(23, "name", z89.getLabel(57));
            cs.gameItemsUtils.getItemById(23).playAnim("fixed");
            cs.gameItemsUtils.getItemById(23).itemObj.fixed = true;
            cs.gameItemsUtils.getItemById(22).start();
            cs.updateItemObject(2, "working", true);
            cs.gameItemsUtils.getItemById(2).playAnim("working");
            cs.updateItemObject(22, "isStarted", true);
            cs.updateItemObject(19, "conversationStatus", 1);
            cs.saveGameObj.updateItems();
        }
    },
    {
        title: "CHAPTER TWO:\nBACK TO HOME!",
        completed: false,
        complete: function (cs) {
            cs.gameItemsUtils.getItemById(50).start();
            cs.updateItemObject(22, "isStarted", true);
            cs.saveGameObj.updateItems();
        }
    }
];
gameData.ingame.conversation = {
    RESTART: [{
            text: z89.getLabel(85),
            isItem: false,
            fork: true,
            options: [
                { option: "YES", action: function (cs, target) { cs.restartGame(); } },
                { option: "NO", action: function (cs, target) { cs.conversationBaloon.hideBaloon(); } }
            ]
        }],
    CHAPTER_COMPLETED: [{
            text: z89.getLabel(94),
            isItem: false,
            fork: true,
            options: [
                { option: "LEAVE THE GAME", action: function (cs, target) {
                        gameData.chapters.forEach(function (element) {
                            if (!element.completed)
                                element.complete(cs);
                        });
                    } },
                { option: "YES", action: function (cs, target) {
                        cs.currentChapter++;
                        cs.displayChapterTitle(cs.currentChapter);
                        cs.playerMenu.hide();
                        cs.playerActions.hide();
                        cs.playerBaloon.hideBaloon();
                        cs.conversationBaloon.hideBaloon();
                    } }
            ]
        }],
    INFO: [{
            label: "info",
            text: z89.getLabel(84),
            isItem: false,
            fork: true,
            options: [
                { option: "Credits", goto: "credits" }
            ]
        },
        {
            label: "credits",
            text: z89.getLabel(86),
            isItem: false,
            fork: true,
            options: [
                { option: "back", goto: "info" }
            ]
        }],
    OPTIONS: [{
            text: z89.getLabel(87),
            isItem: false
        }],
    TALKTO_devday: [
        {
            text: z89.getLabel(89),
            isItem: false,
            fork: true,
            options: [{ option: "DEVDAY website", link: "http://www.devday.it" }, { option: "DEVDAY on youtube", link: "https://www.youtube.com/channel/UCUmykbn_rG5dExSncCgW9Nw" }, { option: "DEVDAY galaxy", link: "http://dd.zero89.it" }]
        }
    ],
    USE_jukebox: [
        {
            text: z89.getLabel(91),
            isItem: false,
            fork: true,
            options: [
                {
                    option: "Nothing", action: function (cs, target) {
                        cs.gameUtils.addDelay(500, function () {
                            var _jukebox = cs.gameItemsUtils.getItemById(11);
                            _jukebox.play("idle");
                            cs.stopSound();
                            var _woofer = cs.gameItemsUtils.getItemById(12);
                            _woofer.tween.pause();
                        });
                        cs.conversationBaloon.hideBaloon();
                        cs.player.play("use");
                    }
                },
                {
                    option: "Some 8bit Tune", action: function (cs, target) {
                        cs.playSound(0);
                        cs.gameUtils.addDelay(500, function () {
                            var _jukebox = cs.gameItemsUtils.getItemById(11);
                            _jukebox.play("play");
                            var _woofer = cs.gameItemsUtils.getItemById(12);
                            _woofer.tween.resume();
                        });
                        cs.conversationBaloon.hideBaloon();
                        cs.player.play("use");
                    }
                }
            ]
        }
    ],
    TALKTO_27: [
        {
            text: z89.getLabel(97),
            isItem: false,
            next: true,
        },
        {
            text: z89.getLabel(98),
            isItem: true,
            next: true,
        },
        {
            text: z89.getLabel(67),
            isItem: false,
            end: true,
        },
    ],
    TALKTO_16: [
        {
            text: z89.getLabel(66),
            isItem: false,
            next: true,
        },
        {
            text: z89.getLabel(65),
            isItem: true,
            next: true,
        },
        {
            text: z89.getLabel(67),
            isItem: false,
            end: true,
        },
    ],
    TALKTO_19_null: [
        {
            text: z89.getLabel(68),
            isItem: false,
            next: true,
        },
        {
            text: z89.getLabel(69),
            isItem: true,
            next: true,
        },
        {
            text: z89.getLabel(70),
            isItem: false,
            end: true,
            callback: function (cs) {
                cs.updateItemObject(19, "conversationStatus", 0);
            }
        }
    ],
    TALKTO_19_0: [
        {
            text: z89.getLabel(71),
            isItem: true,
            next: true,
        },
        {
            text: z89.getLabel(72),
            isItem: false,
            end: true,
        }
    ],
    TALKTO_19_1: [
        {
            text: z89.getLabel(73),
            isItem: true,
            next: true,
        },
        {
            text: z89.getLabel(74),
            isItem: false,
            end: true,
        }
    ]
};
gameData.ingame.items = [
    {
        id: 50,
        type: 4,
        onStart: true,
        sprite: "skills",
        name: z89.getLabel(79),
        x: 1161 + 174,
        y: 4 + 215 - 48,
        interactive: true,
        offsetX: 0,
        isStarted: false,
        fixedToCamera: false,
        checkIntersect: false,
        working: false
    },
    {
        id: 21,
        type: 1,
        onStart: true,
        animations: [{ name: "idle", frames: [0, 1], rate: 1, loop: true }],
        sprite: "devday",
        currentAnimation: "idle",
        name: z89.getLabel(61),
        x: 869,
        y: 218 - 48,
        interactive: true,
        offsetX: 0,
        fixedToCamera: false,
        checkIntersect: false
    },
    {
        id: 22,
        type: 3,
        onStart: true,
        sprite: "newsbg",
        name: z89.getLabel(76),
        x: 866,
        y: 336 - 48,
        interactive: true,
        offsetX: 0,
        fixedToCamera: false,
        isStarted: false,
        contexts: ["devday"],
    },
    {
        id: 4,
        type: 1,
        onStart: true,
        sprite: "trash",
        name: z89.getLabel(16),
        x: 450,
        y: 649 - 48,
        interactive: true,
        firstMessage: [z89.getLabel(18)],
        offsetX: 50,
        fixedToCamera: false,
        checkIntersect: false,
        moved: false
    },
    {
        id: 19,
        type: 1,
        onStart: true,
        sprite: "michele",
        animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5, loop: true }],
        currentAnimation: "idle",
        conversationStatus: null,
        name: z89.getLabel(31),
        x: 800,
        y: 650 - 48,
        interactive: true,
        offsetX: 80,
        fixedToCamera: false,
        checkIntersect: false
    }, {
        id: 17,
        type: 1,
        onStart: true,
        sprite: "daniele",
        animations: [{ name: "idle", frames: [1, 2, 3, 0], rate: 4.5, loop: true }],
        name: z89.getLabel(41),
        currentAnimation: "idle",
        x: 1040,
        y: 650 - 48,
        turnLeft: true,
        interactive: true,
        offsetX: 80,
        fixedToCamera: false,
        checkIntersect: false,
    }, {
        id: 27,
        type: 1,
        onStart: true,
        sprite: "daniele",
        animations: [{ name: "idle", frames: [1, 2, 3, 0], rate: 4.5, loop: true }],
        name: z89.getLabel(96),
        currentAnimation: "idle",
        x: 1440,
        y: 650 - 48,
        turnLeft: true,
        interactive: true,
        offsetX: 80,
        fixedToCamera: false,
        checkIntersect: false,
    },
    {
        id: 18,
        type: 1,
        onStart: true,
        sprite: "davide",
        animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5.5, loop: true }],
        name: z89.getLabel(42),
        currentAnimation: "idle",
        x: 950,
        y: 650 - 48,
        interactive: true,
        offsetX: 80,
        fixedToCamera: false,
        checkIntersect: false
    },
    {
        id: 16,
        type: 1,
        onStart: true,
        sprite: "arete",
        animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5.2, loop: true }],
        name: z89.getLabel(40),
        currentAnimation: "idle",
        x: 720,
        y: 650 - 48,
        interactive: true,
        offsetX: 80,
        fixedToCamera: false,
        checkIntersect: false,
        turnLeft: true,
    },
    {
        id: 23,
        type: 1,
        sprite: "cable",
        onStart: true,
        name: z89.getLabel(56),
        animations: [{ name: "fixed", frames: [9, 8, 7, 6, 5, 4, 3, 2, 1], rate: 15, loop: true }, { name: "broken", frames: [19, 18, 17, 16, 15, 14, 13, 12, 11, 10], rate: 15, loop: true }],
        currentAnimation: "broken",
        x: 650,
        y: 600 - 48,
        interactive: true,
        offsetX: 30,
        fixedToCamera: false,
        checkIntersect: false,
        fixed: false
    },
    {
        id: 24,
        type: 1,
        sprite: "scotch",
        onStart: true,
        name: z89.getLabel(55),
        x: 450,
        y: 648 - 48,
        interactive: true,
        offsetX: 30,
        fixedToCamera: false,
        checkIntersect: false
    }, {
        id: 2,
        type: 1,
        onStart: true,
        sprite: "terminal",
        animations: [{ name: "notWorking", frames: [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4], rate: 5, loop: true }, { name: "working", frames: [5, 6], rate: 1, loop: true }],
        currentAnimation: "notWorking",
        working: false,
        name: z89.getLabel(12),
        x: 1214,
        y: 644 - 48,
        interactive: true,
        offsetX: 50,
        fixedToCamera: false,
        checkIntersect: false
    },
    {
        id: 5,
        type: 1,
        onStart: true,
        sprite: "cake",
        animations: [{ name: "idle", frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], rate: 10, loop: true }],
        currentAnimation: "idle",
        name: "cake",
        x: 1679,
        y: 290 - 48,
        interactive: true,
        offsetX: 50,
        fixedToCamera: false,
        checkIntersect: false
    },
    {
        id: 1,
        type: 1,
        sprite: "drink-machine",
        name: z89.getLabel(0),
        x: 1700,
        y: 724 - 48,
        animations: [{ name: "idle", frames: [0, 1], rate: 1, loop: true }],
        currentAnimation: "idle",
        onStart: true,
        interactive: true,
        offsetX: 70,
        fixedToCamera: true,
        checkIntersect: true
    },
    ,
    {
        id: 11,
        type: 1,
        sprite: "jukebox",
        name: z89.getLabel(88),
        x: 2450,
        y: 650 - 48,
        animations: [{ name: "idle", frames: [0], rate: 1, loop: false }, { name: "play", frames: [1, 2, 3, 4, 5, 6, 7, 2, 4, 6, 3, 1, 6, 3, 4, 6, 5, 7, 2, 5, 3, 4], rate: 14, loop: true }],
        currentAnimation: "play",
        onStart: true,
        interactive: true,
        offsetX: 70,
        fixedToCamera: false,
        checkIntersect: false
    },
    {
        id: 12,
        type: 1,
        sprite: "woofer",
        name: z89.getLabel(92),
        x: 2450,
        y: 650 - 48,
        currentAnimation: "idle",
        onStart: true,
        interactive: false,
        offsetX: 70,
        fixedToCamera: false,
        checkIntersect: false
    }
];
gameData.ingame.logic =
    {
        // examine terminal 
        EXAMINE_2: function (cs) {
            if (cs.gameItemsUtils.getItemById(2).itemObj.working) {
                cs.player.showBaloon(z89.getLabel(82));
            }
            else {
                cs.player.showBaloon(z89.getLabel(81));
            }
        },
        // use terminal
        USE_2: function (cs) {
            if (cs.gameItemsUtils.getItemById(2).itemObj.working) {
                cs.Terminal.show(0);
                cs.playerActions.hide();
            }
            else {
                cs.player.showBaloon(z89.getLabel(83));
            }
        },
        // examine drink machine
        EXAMINE_50: function (cs) {
            cs.player.showBaloon(z89.getLabel(78));
        },
        // examine drink machine
        EXAMINE_1: function (cs) {
            cs.player.showBaloon(z89.getLabel(6));
        },
        // devday palace
        EXAMINE_21: function (cs) {
            cs.player.showBaloon(z89.getLabel(38));
        },
        // devday screen
        EXAMINE_22: function (cs) {
            cs.player.showBaloon(z89.getLabel(75));
        },
        //use devday
        USE_21: function (cs) {
            var convObj = {
                key: "TALKTO_devday",
                action: null,
                inventory: null,
                item: null
            };
            cs.conversationBaloon.setUpConversation(convObj);
        },
        //use jukoxeb
        USE_11: function (cs) {
            var convObj = {
                key: "USE_jukebox",
                action: null,
                inventory: null,
                item: null
            };
            cs.conversationBaloon.setUpConversation(convObj);
        },
        //examine garbage 
        EXAMINE_4: function (cs) {
            cs.player.showBaloon(z89.getLabel(62));
        },
        //push garbage 
        PUSH_4: function (cs) {
            var item = cs.gameItemsUtils.getItemById(4);
            if (!item.itemObj.moved) {
                cs.player.play("use");
                item.itemObj.moved = true;
                if (cs.player.x < 450) {
                    cs.game.add.tween(item).to({ x: 500 }, 500, Phaser.Easing.Quadratic.Out, true, 400, 0, false);
                    item.updateItemObj("x", 500);
                }
                else {
                    cs.game.add.tween(item).to({ x: 400 }, 500, Phaser.Easing.Quadratic.Out, true, 400, 0, false);
                    item.updateItemObj("x", 400);
                }
            }
            else {
                cs.player.showBaloon(z89.getLabel(93));
            }
        },
        //examine scotch tape
        EXAMINE_24: function (cs) { cs.player.showBaloon(z89.getLabel(58)); },
        //examine energy box
        EXAMINE_23: function (cs) {
            if (cs.gameItemsUtils.getItemById(23).itemObj.fixed) {
                cs.player.showBaloon(z89.getLabel(60));
            }
            else {
                cs.player.showBaloon(z89.getLabel(59));
            }
        },
        //pickup scotch
        PICKUP_24: function (cs) { cs.addInventoryItem(cs.gameItemsUtils.getItemById(24)); },
        //drop scotch
        DROP_24: function (cs) { cs.dropInventoryItem(); },
        //use scotch on broken 
        USE_24_23: function (cs) {
            cs.player.play("use");
            cs.removeInventoryItems();
            cs.gameUtils.addDelay(1000, function () {
                cs.updateItemObject(23, "name", z89.getLabel(57));
                cs.gameItemsUtils.getItemById(23).playAnim("fixed");
                cs.gameItemsUtils.getItemById(23).itemObj.fixed = true;
                cs.gameItemsUtils.getItemById(22).start();
                cs.updateItemObject(22, "isStarted", true);
                cs.updateItemObject(19, "conversationStatus", 1);
                cs.updateItemObject(2, "working", true);
                cs.gameItemsUtils.getItemById(2).playAnim("working");
                cs.saveGameObj.updateItems();
                gameData.chapters[cs.currentChapter].completed = true;
                var convObj = {
                    key: "CHAPTER_COMPLETED",
                    action: null,
                    inventory: null,
                    item: null
                };
                cs.conversationBaloon.setUpConversation(convObj);
            });
        },
        //examine gerardo
        EXAMINE_16: function (cs) {
            cs.player.showBaloon(z89.getLabel(43));
        },
        TALKTO_16: function (cs) {
            cs.conversationBaloon.setUpConversation({
                key: "TALKTO_16",
                action: null,
                inventory: null,
                item: cs.currentItem
            });
        },
        TALKTO_27: function (cs) {
            cs.conversationBaloon.setUpConversation({
                key: "TALKTO_27",
                action: null,
                inventory: null,
                item: cs.currentItem
            });
        },
        //examine daniele
        EXAMINE_17: function (cs) {
            cs.player.showBaloon(z89.getLabel(63));
        },
        //examine davide
        EXAMINE_18: function (cs) {
            cs.player.showBaloon(z89.getLabel(64));
        },
        //examine michele
        EXAMINE_19: function (cs) {
            cs.player.showBaloon(z89.getLabel(32));
        },
        //talkto michele
        TALKTO_19: function (cs) {
            var item = cs.gameItemsUtils.getItemById(19);
            var convObj = {
                key: "",
                action: null,
                inventory: null,
                item: cs.currentItem
            };
            //console.log(item.itemObj.conversationStatus)
            switch (item.itemObj.conversationStatus) {
                case null:
                    convObj.key = "TALKTO_19_null";
                    break;
                case 0:
                    convObj.key = "TALKTO_19_0";
                    break;
                case 1:
                    convObj.key = "TALKTO_19_1";
                    break;
            }
            cs.conversationBaloon.setUpConversation(convObj);
        },
    };
/*

gameData.ingame.logic =

    {

        // devday palace
        EXAMINE_21: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(38));
        },
        USE_21: (cs: z89.GameCity) => {

            cs.conversationBaloon.setUpConversation({
                key: "TALKTO_devday",
                action: null,
                inventory: null,
                item: null
            });

            cs.player.showBaloon(z89.getLabel(38));
        },

        // scotch tape
        EXAMINE_24: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(58));
        },

        //broken energy box
        EXAMINE_23: (cs: z89.GameCity) => {

            if (cs.gameItemsUtils.getItemById(23).itemObj.fixed) {

                cs.player.showBaloon(z89.getLabel(60));
            } else {
                cs.player.showBaloon(z89.getLabel(59));

            }


        },

        PICKUP_24: (cs: z89.GameCity) => { cs.addInventoryItem(cs.gameItemsUtils.getItemById(24)); },
        DROP_24: (cs: z89.GameCity) => { cs.dropInventoryItem(); },

        USE_24_23: (cs: z89.GameCity) => {

            cs.player.play("use");
            cs.removeInventoryItems();
            cs.gameUtils.addDelay(1000, () => {
                cs.gameItemsUtils.getItemById(23).updateItemObj("name", z89.getLabel(57));
                cs.gameItemsUtils.getItemById(23).playAnim("fixed");
                cs.gameItemsUtils.getItemById(23).itemObj.fixed = true;
                cs.gameItemsUtils.getItemById(22).start();
                cs.saveGameObj.updateItems();

            });

        },

        //use money on drink machine
        USE_8_1: (cs: z89.GameCity) => {
            cs.player.play("use");
            cs.removeInventoryItems();
            cs.gameUtils.addDelay(2000, () => { cs.gameItemsUtils.addItem(7); });

        },

        //use coin o coin
        USE_8_15: (cs: z89.GameCity) => {
            console.log("coin on coins");
            cs.removeInventoryItems();
            cs.gameItemsUtils.addItem(7);
            cs.addInventoryItem(cs.gameItemsUtils.getItemById(7));

        },

        //use block on chain
        USE_8_28: (cs: z89.GameCity) => {
            console.log("block on chain");
            cs.playerBaloon.showBaloon("I GOT BLOCKCHAIN!");
            cs.removeInventoryItems();
            cs.gameItemsUtils.addItem(30);
            cs.addInventoryItem(cs.gameItemsUtils.getItemById(30));

        },
        //use bit o coin
        USE_29_15: (cs: z89.GameCity) => {
            console.log("bit on coin");
            cs.playerBaloon.showBaloon("I GOT A BITCOIN!");
            cs.removeInventoryItems();
            cs.gameItemsUtils.addItem(32);
            cs.addInventoryItem(cs.gameItemsUtils.getItemById(32));

        },
        USE_30_32: (cs: z89.GameCity) => {
            console.log("bitcoin on blockchain");
            cs.playerBaloon.showBaloon("I GOT DEVDAY PASS!");
            cs.removeInventoryItems();
            cs.gameItemsUtils.addItem(31);
            cs.addInventoryItem(cs.gameItemsUtils.getItemById(31));

        },

        GIVE_31_13: (cs: z89.GameCity) => {
            console.log("pass to daniele");
            cs.player.play("use");
            cs.removeInventoryItems();

            let convObj: any = {
                key: "TALKTO_custom",
                action: null,
                inventory: null,
                item: cs.currentItem
            }
            cs.gameUtils.addDelay(1000, () => {

                cs.conversationBaloon.setUpConversation(convObj);

            });


        }

    }

*/ 
gameData.menuBlink = [
    { name: "Home", frame: 0, to: 100, x: -130, y: -300 },
    { name: "DevDay", frame: 4, to: 875, x: -130, y: -200 },
    { name: "Skills", frame: 5, to: 1354, x: -35, y: -200 },
    { name: "Cake", frame: 6, to: 1590, x: 60, y: -200 },
    { name: "Arcade", frame: 7, to: 2100, x: -130, y: -100 },
    { name: "Aerosol", frame: 8, to: 2580, x: -35, y: -100 },
    { name: "Contact", frame: 9, to: 3300, x: 60, y: -100 },
];
var z89;
(function (z89) {
    var saveGame = (function () {
        function saveGame(game) {
            this.playerX = 0;
            this.playerY = 0;
            this.isSaved = false;
            this.game = game;
            this.currentState = this.game.state.getCurrentState();
            this.checkSaved();
            // this.game.time.events.repeat(5000, 10, this.updateItems, this);
        }
        saveGame.prototype.destroy = function () {
            this.clearSaved();
        };
        saveGame.prototype.updatePlayerPosition = function (x, y) {
            this.playerX = x;
            this.playerY = y;
            this.updateSaveObj();
        };
        saveGame.prototype.updatePlayerInventory = function (inventory) {
            var _inventory = [];
            inventory.forEach(function (item) {
                _inventory.push(item.itemObj);
            });
            this.inventory = _inventory;
            this.updateItems();
            this.updateSaveObj();
        };
        saveGame.prototype.updateItems = function () {
            var _itemsObj = [];
            this.currentState.groupAll.children.forEach(function (element) {
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
            //console.log(obj);
            this.setSaved(obj);
        };
        return saveGame;
    }());
    z89.saveGame = saveGame;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var c64Typewriter = (function () {
        function c64Typewriter(game, letters, group, tint) {
            this.lettersObj = [];
            this.currentElement = 0;
            this.tint = 0x6C5EB5;
            this.ready = { text: '>:', sDelay: 0, cDelay: 25, row: 0, cursor: "blink" };
            this.game = game;
            this.letters = letters;
            this.typeGroup = group;
            if (tint != null)
                this.tint = tint;
            this.cursor = this.game.add.sprite(0, 0, "cursor");
            this.cursor.tint = this.tint;
            this.cursor.animations.add("blink", [0, 1], 2, true);
            this.cursor.animations.add("hide", [1], 0, false);
            this.cursor.animations.add("stop", [0], 0, false);
            this.cursor.play("blink");
            this.typeGroup.add(this.cursor);
            this.typePhrase();
        }
        c64Typewriter.prototype.typePhrase = function () {
            var _this = this;
            var element = this.letters[this.currentElement];
            if (element == undefined)
                return;
            var textObj;
            if (this.lettersObj[element.obj] == undefined) {
                textObj = this.lettersObj[element.obj] = this.game.add.bitmapText(0, 16 * element.row, "commodore", "", 16, this.typeGroup);
            }
            else {
                textObj = this.lettersObj[element.obj];
            }
            if (element.cursor != undefined)
                this.cursor.play(element.cursor);
            this.cursor.y = 16 * element.row;
            if (element.tint != undefined)
                this.tint = element.tint;
            textObj.tint = this.tint;
            if (element.charDelay == 0) {
                textObj.text = element.text;
                this.cursor.x = element.text.length * 16;
                this.game.time.events.add(element.stringDelay, function () {
                    if (element.callback != undefined) {
                        _this.cursor.destroy();
                        element.callback();
                    }
                    else {
                        _this.currentElement++;
                        _this.typePhrase();
                    }
                }, this);
            }
            else {
                var nextText = element.text.substring(0, i);
                var _loop_1 = function () {
                    var nextText_1 = element.text.substring(0, i);
                    this_1.game.time.events.add((element.charDelay * i) + element.stringDelay, function () {
                        _this.cursor.play("stop");
                        textObj.text = nextText_1;
                        _this.cursor.x = nextText_1.length * 16;
                    });
                };
                var this_1 = this;
                for (var i = 0; i <= element.text.length; i++) {
                    _loop_1();
                }
                this.game.time.events.add((element.charDelay * (i + 1)) + element.stringDelay, function () {
                    _this.cursor.play("blink");
                    //textObj.text = nextText;
                    if (element.callback != undefined) {
                        _this.cursor.destroy();
                        element.callback();
                    }
                    else {
                        _this.currentElement++;
                        _this.typePhrase();
                    }
                });
            }
        };
        c64Typewriter.prototype.removeLines = function () {
            this.lettersObj.forEach(function (element) {
                element.destroy();
            });
        };
        c64Typewriter.prototype.destroy = function () {
            this.removeLines();
            this.cursor.destroy();
        };
        return c64Typewriter;
    }());
    z89.c64Typewriter = c64Typewriter;
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
            _this.baloonText = _this.game.add.bitmapText(-140, 0, "commodore", "", 16);
            _this.baloonText.maxWidth = 300;
            _this.baloonText.anchor.set(0, 1);
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
            if (this.baloonTarget != null) {
                this.baloonX = this.baloonTarget.x;
                this.baloonY = this.baloonTarget.y - this.baloonTarget.height - 50;
                this.showBaloon(z89.getLabel(39));
                this.game.time.events.add(1500, function () { _this.hideBaloon(); }, this);
            }
        };
        conversationBaloon.prototype.setUpConversation = function (_actionObj) {
            this.isPlaying = true;
            this.currentStep = 0;
            if (_actionObj.item != null)
                this.setItemTarget(_actionObj.item);
            this.setConversationKey(_actionObj.key);
            this.setConversationObj(_actionObj.key);
            this.startConversation();
        };
        conversationBaloon.prototype.setItemTarget = function (item) { this.baloonTarget = item; };
        conversationBaloon.prototype.setConversationKey = function (key) { this.conversationKey = key; };
        conversationBaloon.prototype.setConversationObj = function (key) { if (gameData.ingame.conversation[key] != undefined)
            this.conversationObj = gameData.ingame.conversation[key]; };
        conversationBaloon.prototype.fixSize = function () {
            this.x = this.baloonX;
            this.y = this.baloonY;
            this.baloonBg.height = this.baloonText.height + 40;
        };
        conversationBaloon.prototype.startConversation = function () {
            if (this.baloonTarget != null) {
                if (this.currentState.player.x < this.baloonTarget.x) {
                    this.baloonTarget.turnLeft();
                }
                else {
                    this.baloonTarget.turnRight();
                }
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
                this.timeEvent = this.game.time.events.add(this.getTime(_obj.text.length), function () { _this.currentStep++; _this.displayStep(); }, this);
            }
            if (_obj.end != undefined) {
                this.timeEvent = this.game.time.events.add(this.getTime(_obj.text.length), function () { _this.currentStep = 0; _this.hideBaloon(); _this.isPlaying = false; }, this);
            }
            if (_obj.callback != undefined) {
                _obj.callback(this.currentState);
            }
            if (_obj.fork != undefined) {
                this.isSkippable = false;
                this.showOptions(_obj);
                return;
            }
            this.showBaloon(_obj.text);
        };
        conversationBaloon.prototype.getTime = function (textLenght) {
            var _time = (textLenght * 1000) / 15;
            if (_time < 1500)
                return 1500;
            return _time;
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
                _btn.input.priorityID = 10;
                _btn.anchor.set(.5, 1);
                _btn.events.onInputDown.add(function (a, b, c) {
                    if (c.goto != undefined) {
                        _this.currentStep = _this.goToLabel(c.goto);
                    }
                    if (c.link != undefined) {
                        _this.currentStep++;
                        window.open(c.link, "_blank");
                    }
                    if (c.action != undefined) {
                        c.action(_this.currentState, _this.baloonTarget);
                        _this.hideBaloon();
                        return;
                    }
                    _this.displayStep();
                }, _this, null, element);
                _btnText = _this.game.add.bitmapText(0, _nextPos - 10, "commodore", element.option, 16);
                _btnText.maxWidth = 290;
                _btnText.anchor.set(.5, 1);
                if (_obj.isItem) {
                    _btn.tint = 0x333333;
                    _btnText.tint = 0xfefefe;
                }
                else {
                    _btn.tint = 0x0f6c0f;
                    _btnText.tint = 0xffffff;
                }
                _btn.height = _btnText.height + 30;
                _nextPos = _nextPos - (_btnText.height + 25) - 20;
                _totHeight = _totHeight + _btnText.height + 50;
                _this.forkBtns.add(_btn);
                _this.forkBtns.add(_btnText);
            });
            if (_obj.text != undefined && _obj.text != "") {
                this.baloonText.text = _obj.text;
                this.baloonText.y = _nextPos;
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
    var GameItemsUtils = (function () {
        function GameItemsUtils(game) {
            this.game = game;
            this.currentState = this.game.state.getCurrentState();
        }
        GameItemsUtils.prototype.addSavedItems = function (_items) {
            var _this = this;
            _items.forEach(function (element) {
                _this.attachItem(element);
            });
        };
        GameItemsUtils.prototype.addItem = function (id) {
            var _itemObj = this.getItemObjById(id);
            this.attachItem(_itemObj);
        };
        GameItemsUtils.prototype.attachItem = function (_itemObj) {
            if (_itemObj != undefined) {
                switch (_itemObj.type) {
                    case 2:
                        this.currentState.groupAll.add(new z89.ItemsTruck(this.game, _itemObj));
                        break;
                    case 3:
                        this.currentState.groupAll.add(new z89.ItemsContent(this.game, _itemObj));
                        break;
                    case 4:
                        this.currentState.groupAll.add(new z89.ItemsSkill(this.game, _itemObj));
                        break;
                    case 5:
                        //console.log("5")
                        this.currentState.groupCity.add(new z89.Items(this.game, _itemObj));
                        break;
                    default:
                        this.currentState.groupAll.add(new z89.Items(this.game, _itemObj));
                        break;
                }
            }
        };
        GameItemsUtils.prototype.getItemObjById = function (id) {
            var _itemObj;
            gameData.ingame.items.forEach(function (element) { if (element.id == id)
                _itemObj = element; });
            return _itemObj;
        };
        GameItemsUtils.prototype.getItemById = function (id) {
            var _itemObj;
            this.currentState.groupAll.forEach(function (element) {
                if (element.id == id)
                    _itemObj = element;
            }, this);
            return _itemObj;
        };
        return GameItemsUtils;
    }());
    z89.GameItemsUtils = GameItemsUtils;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var GameUtils = (function () {
        function GameUtils(game) {
            this.game = game;
            this.currentState = this.game.state.getCurrentState();
        }
        GameUtils.prototype.addDelay = function (delay, callback) {
            this.game.time.events.add(delay, callback);
        };
        GameUtils.prototype.tweenTint = function (obj, startColor, endColor, time, delay, callback) {
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
        return GameUtils;
    }());
    z89.GameUtils = GameUtils;
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
                });
                _this.play(itemObj.currentAnimation);
            }
            _this.currentState = _this.game.state.getCurrentState();
            _this.anchor.set(0.5, 1);
            if (itemObj.scale != undefined)
                _this.scale.set(itemObj.scale);
            _this.id = itemObj.id;
            _this.itemObj = itemObj;
            _this.name = itemObj.name;
            _this.interactive = itemObj.interactive;
            _this.fixedToCamera = itemObj.fixedToCamera;
            if (itemObj.turnLeft != undefined)
                _this.turnLeft();
            if (_this.interactive) {
                _this.inputEnabled = true;
                _this.input.priorityID = 1;
                _this.events.onInputDown.add(function () {
                    if (_this.currentState.isInteractionDisabled())
                        return;
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
            }
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
        Items.prototype.updateItemObj = function (_key, _value) {
            this.itemObj[_key] = _value;
            if (_key == "name")
                this.name = _value;
        };
        Items.prototype.playAnim = function (_anim) {
            this.itemObj.currentAnimation = _anim;
            this.play(_anim);
        };
        Items.prototype.start = function () {
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
            _super.call(this, game, itemObj) || this;
            _this.currentIndex = 0;
            _this.isAnimating = false;
            _this.isStarted = false;
            // super(game, itemObj.x, itemObj.y, itemObj.sprite);
            // this.currentState = <GameCity>this.game.state.getCurrentState();
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
                //console.log("item down")
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
            var _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            _this.contentText = _this.game.add.text(-180, -85, "", _style);
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
            _this.arrowLeft.inputEnabled = false;
            _this.arrowLeft.scale.set(2);
            _this.arrowLeft.angle = -90;
            _this.arrowLeft.tint = 0x222222;
            _this.addChild(_this.arrowLeft);
            _this.arrowRight = _this.game.add.sprite(30, 0, "triangleBtn");
            _this.arrowRight.anchor.set(.5);
            _this.arrowRight.inputEnabled = false;
            _this.arrowRight.scale.set(2);
            _this.arrowRight.angle = 90;
            _this.arrowRight.tint = 0x222222;
            _this.addChild(_this.arrowRight);
            _this.btnGo = _this.game.add.sprite(0, 133, ("readmore"));
            _this.btnGo.anchor.set(.5);
            _this.btnGo.inputEnabled = false;
            _this.btnGo.alpha = 0;
            _style = { font: 'normal 16px', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 };
            var _readMore = _this.game.add.text(0, 5, "READ MORE", _style);
            _readMore.anchor.set(.5);
            _readMore.font = 'Press Start 2P';
            _this.btnGo.addChild(_readMore);
            _this.addChild(_this.btnGo);
            _this.contentImage.tint = 0x555555;
            _this.game.add.existing(_this);
            var cropRect = new Phaser.Rectangle(0, 0, 400, 200);
            _this.contentImage.crop(cropRect);
            _this.filtersArr = [];
            _this.filtersArr.push(new grayShader(_this.game));
            // this.filtersArr.push(new noiseShader(this.game));
            _this.filtersArr.push(new convergenceShader(_this.game));
            //
            if (_this.itemObj.isStarted)
                _this.start();
            return _this;
        }
        ItemsContent.prototype.start = function () {
            var _this = this;
            this.itemObj.isStarted = true;
            this.game.add.tween(this.arrowRight).to({ x: 210 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            this.game.add.tween(this.btnGo).to({ alpha: 1 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                _this.btnGo.inputEnabled = true;
                _this.btnGo.input.priorityID = 3;
                _this.btnGo.events.onInputDown.add(function () { _this.goDetail(); }, _this);
            });
            this.game.add.tween(this.arrowLeft).to({ x: -210 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                _this.isStarted = true;
                _this.game.add.tween(_this.arrowRight).to({ x: _this.arrowRight.x + 10 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
                _this.arrowLeft.inputEnabled = true;
                _this.arrowLeft.input.priorityID = 3;
                _this.arrowLeft.events.onInputDown.add(function () { _this.arrowLeft.tint = 0x00FF00; _this.goPrev(); }, _this);
                _this.arrowLeft.events.onInputUp.add(function () { _this.arrowLeft.tint = 0xFFFFFF; }, _this);
                _this.currentState.gameUtils.tweenTint(_this.arrowLeft, 0x222222, 0xffffff, 1000, 0, null);
                _this.currentState.gameUtils.tweenTint(_this.arrowRight, 0x222222, 0xffffff, 1000, 0, null);
                _this.currentState.gameUtils.tweenTint(_this.contentImage, 0x222222, 0xffffff, 1000, 0, null);
                _this.contentImage.filters = [_this.filtersArr[0], _this.filtersArr[1]];
                _this.contentText.filters = [_this.filtersArr[1]];
                _this.spinner.filters = [_this.filtersArr[1]];
                _this.arrowRight.inputEnabled = true;
                _this.arrowRight.input.priorityID = 3;
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
        ItemsContent.prototype.goDetail = function () {
            //console.log("detail", this.contents[this.currentIndex]);
            window.open(this.contents[this.currentIndex].url, "_blank");
        };
        ItemsContent.prototype.isInteractive = function () {
            return this.interactive;
        };
        ItemsContent.prototype.loadImage = function () {
            var _content = this.contents[this.currentIndex];
            if (_content == undefined)
                return;
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
            this.game.add.tween(this.contentText).to({ alpha: 0, y: this.contentText.y }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false);
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
            var colors = [];
            colors.push(this.contents[this.currentIndex].t.length);
            console.log(colors);
            if (this.contents[this.currentIndex].a != undefined) {
                var _json = JSON.parse(this.contents[this.currentIndex].a);
                if (_json.link != undefined) {
                    this.contents[this.currentIndex].url = _json.link;
                }
                if (_json.dd != undefined) {
                    this.contentText.text = "DEVDAY " + _json.dd + "\n" + this.contentText.text;
                    colors.push(_json.dd.length + 7);
                }
                if (_json.date != undefined)
                    this.contentText.text += "\n\n" + _json.date;
            }
            this.contentText.addColor('#00ff00', 0);
            this.contentText.addColor('#ffffff', colors[1]);
            //this.contentText.addColor('#aaaaaa', colors[0]);
            this.game.add.tween(this.contentText).to({ alpha: 1, y: this.contentText.y }, 500, Phaser.Easing.Quadratic.In, true, 100, 0, false).onComplete.add(function () {
                _this.isAnimating = false;
            }, this);
            this.game.add.tween(this.contentImage).to({ alpha: .8 }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false);
        };
        return ItemsContent;
    }(z89.Items));
    z89.ItemsContent = ItemsContent;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var ItemsSkill = (function (_super) {
        __extends(ItemsSkill, _super);
        function ItemsSkill(game, itemObj) {
            var _this = _super.call(this, game, itemObj) || this;
            _this.isStarted = false;
            _this.skills = [];
            _this.skillsObj = [];
            _this.anchor.set(0.5);
            _this.skills = gameData.skills;
            var _text;
            var _bar;
            var _y = [140, 140 - 96, 140 - 96 - 96, 140 - 96 - 96 - 96];
            for (var i = 0; i < 4; i++) {
                _this.skillsObj.push(_this.game.add.sprite(16 - 174, _y[i], ""));
                _bar = _this.game.add.sprite(0, 0, _this.game.cache.getBitmapData("skill"));
                _bar.width = 4;
                _bar.anchor.set(0);
                _bar.alpha = .4;
                _this.skillsObj[i].addChild(_bar);
                _text = _this.game.add.bitmapText(5, 14, "commodore", "test", 24);
                _text.alpha = 0;
                _text.anchor.set(0);
                _this.skillsObj[i].addChild(_text);
                _this.addChild(_this.skillsObj[i]);
            }
            if (_this.itemObj.isStarted)
                _this.start();
            return _this;
        }
        ItemsSkill.prototype.start = function () {
            this.itemObj.isStarted = true;
            this.rewrite();
            this.game.time.events.repeat(5000, 1000, this.rewrite, this);
        };
        ItemsSkill.prototype.rewrite = function () {
            var _this = this;
            var _arr = this.skills.slice();
            Phaser.ArrayUtils.shuffle(_arr);
            var _text;
            var _bar;
            this.skillsObj.forEach(function (element, index) {
                _bar = element.getChildAt(0);
                _this.game.add.tween(_bar).to({ width: (_arr[index].v * 316) / 100 }, 1000, Phaser.Easing.Elastic.Out, true, 200 * index, 0, false);
                _text = element.getChildAt(1);
                _text.text = _arr[index].s;
                _text.alpha = 0;
                _this.game.add.tween(_text).to({ alpha: 1 }, 500, Phaser.Easing.Default, true, 100 * index, 0, false);
            });
        };
        return ItemsSkill;
    }(z89.Items));
    z89.ItemsSkill = ItemsSkill;
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
            var _this = _super.call(this, game, 300, 650 - 48, "player") || this;
            _this.yMin = 654 - 48;
            _this.yMax = 720;
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
            _this.body.collideWorldBounds = false;
            _this.cursors = game.input.keyboard.createCursorKeys();
            _this.myArea = _this.game.add.sprite(0, -30, _this.game.cache.getBitmapData("hitArea"));
            _this.myArea.anchor.set(.5, 1);
            _this.myArea.inputEnabled = true;
            _this.myArea.input.priorityID = 2;
            _this.myArea.alpha = 0;
            _this.myArea.height = _this.height;
            _this.myArea.events.onInputDown.add(function () {
                if (_this.currentState.isInteractionDisabled())
                    return;
                _this.currentState.playerMenu.toggle();
            }, _this);
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
                _this.currentState.saveGameObj.updatePlayerPosition(_player.x, _player.y);
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
            this.showBaloon(this.illogicText[this.game.rnd.integerInRange(0, this.illogicText.length - 1)]);
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
            this.y = 608;
            this.x = toX;
            this.width = 126;
            this.height = 126;
            this.alpha = 0;
            var beam = this.game.add.sprite(toX, 0, "beam");
            beam.height = 610;
            beam.anchor.set(.5, 0);
            beam.width = 150;
            beam.alpha = 0;
            beam.animations.add("beam", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 15, true).play();
            this.currentState.gameUtils.tweenTint(this, 0x00ff00, 0xffffff, 500, 0, null);
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
            beam.height = this.y;
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
            this.currentState.gameUtils.tweenTint(this, 0xffffff, 0x00ff00, 300, 0, null);
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
            /*
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

                if (this.y < this.yMin) return;
                this.body.velocity.y = -140;
                if (this.direction != PlayerDirection.UP) {
                    this.play('walk');
                    this.direction = PlayerDirection.UP;
                    this.playerState = PlayerStates.WALKING;
                }
            }
            else if (this.cursors.down.isDown) {

                console.log(this.x, this.cameraOffset.x)
                if (this.y > this.yMax) return;
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
            //ACTION buttons
            var _btn;
            var _txt;
            _this.actionList.forEach(function (element, index) {
                _btn = _this.game.add.sprite(70, index * 55, _this.game.cache.getBitmapData("menuActionBtn"));
                _btn.name = element;
                _btn.z = index;
                _btn.anchor.set(0);
                _txt = _this.game.add.bitmapText(100, 15, "commodore", element, 20);
                _txt.anchor.set(.5, 0);
                _txt.tint = 0xffffff;
                _btn.inputEnabled = true;
                _btn.input.priorityID = 2;
                _btn.events.onInputDown.add(function (btn) {
                    if (_this.currentState.isInteractionDisabled())
                        return;
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
            var _iconPos = [{ x: 88, y: 555 }, { x: 178, y: 555 }, { x: 88, y: 640 }, { x: 178, y: 640 }];
            for (var index = 0; index < 4; index++) {
                _icon = _this.game.add.sprite(_iconPos[index].x, _iconPos[index].y, "inventory", 0, _this.iconGroup);
                _icon.inputEnabled = true;
                _icon.z = index;
                _icon.input.priorityID = 2;
                _icon.alpha = _this.iconAlpha;
                _icon.events.onInputDown.add(function (icon) {
                    if (_this.currentState.isInteractionDisabled())
                        return;
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
            _this.actionText = _this.game.add.bitmapText(320, 690, "commodore", "", 20);
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
            this.currentState.saveGameObj.updatePlayerInventory(this.inventory);
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
            this.currentState.saveGameObj.updatePlayerInventory(this.inventory);
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
            _this.menuBg = _this.game.add.sprite(540, 450, "menu-phone");
            _this.menuBg.alpha = 1;
            _this.menuBg.anchor.set(0.5);
            _this.menuBg.height = 350;
            _this.menuBg.scale.set(.7);
            _this.add(_this.menuBg);
            _this.menuBg.inputEnabled = true;
            _this.menuBg.input.priorityID = 2;
            _this.menuBg.events.onInputDown.add(function () {
                if (!_this.isOpenOnStart)
                    _this.hide();
            }, _this);
            //blinks btns
            //+++++++++++++++++++++++++++++++++
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
                blinkBtn.addChild(_this.game.add.bitmapText(0, 80, "commodore", element.name, 12));
                _this.menuBg.addChild(blinkBtn);
            });
            //action btn
            //+++++++++++++++++++++++++++++++++
            var actionBtn;
            actionBtn = _this.game.add.sprite(-35, -300, "icons");
            actionBtn.frame = 1;
            actionBtn.inputEnabled = true;
            actionBtn.input.priorityID = 3;
            actionBtn.name = "iconsBtn";
            actionBtn.events.onInputDown.add(function () {
                console.log("actionBtn");
                _this.currentState.playerActions.show();
                _this.hide();
            }, _this);
            actionBtn.addChild(_this.game.add.bitmapText(0, 80, "commodore", "Menu", 12));
            _this.menuBg.addChild(actionBtn);
            //RESTART btn
            //+++++++++++++++++++++++++++++++++
            var restartBtn;
            restartBtn = _this.game.add.sprite(60, -300, "icons");
            restartBtn.frame = 10;
            restartBtn.inputEnabled = true;
            restartBtn.input.priorityID = 3;
            restartBtn.name = "iconsBtn";
            restartBtn.events.onInputDown.add(function () {
                _this.currentState.conversationBaloon.setUpConversation({
                    key: "RESTART",
                    action: null,
                    inventory: null,
                    item: null
                });
                _this.hide();
            }, _this);
            restartBtn.addChild(_this.game.add.bitmapText(0, 80, "commodore", "Restart", 12));
            _this.menuBg.addChild(restartBtn);
            //info btn
            //+++++++++++++++++++++++++++++++++
            var infoBtn;
            infoBtn = _this.game.add.sprite(-130, 0, "icons");
            infoBtn.frame = 2;
            infoBtn.inputEnabled = true;
            infoBtn.input.priorityID = 3;
            infoBtn.name = "iconsBtn";
            infoBtn.events.onInputDown.add(function () {
                _this.currentState.conversationBaloon.setUpConversation({
                    key: "INFO",
                    action: null,
                    inventory: null,
                    item: null
                });
                _this.hide();
            }, _this);
            infoBtn.addChild(_this.game.add.bitmapText(0, 80, "commodore", "Info", 12));
            _this.menuBg.addChild(infoBtn);
            //credits btn
            //+++++++++++++++++++++++++++++++++
            var optionBtn;
            optionBtn = _this.game.add.sprite(-35, 0, "icons");
            optionBtn.frame = 3;
            optionBtn.inputEnabled = true;
            optionBtn.input.priorityID = 3;
            optionBtn.name = "iconsBtn";
            optionBtn.events.onInputDown.add(function () {
                _this.currentState.conversationBaloon.setUpConversation({
                    key: "OPTIONS",
                    action: null,
                    inventory: null,
                    item: null
                });
                _this.hide();
            }, _this);
            optionBtn.addChild(_this.game.add.bitmapText(0, 80, "commodore", "Options", 12));
            _this.menuBg.addChild(optionBtn);
            //intro btn
            //+++++++++++++++++++++++++++++++++
            var introText = _this.game.add.bitmapText(-130, -290, "commodore", "Welcome to my adventure website experiment.\nComplete the quests to access the website sections... or explore the website without playing!", 16);
            introText.name = "start";
            introText.maxWidth = 300;
            _this.menuBg.addChild(introText);
            //new game btn
            //+++++++++++++++++++++++++++++++++
            var newGame;
            newGame = _this.game.add.sprite(-130, -80, _this.game.cache.getBitmapData("roundedBtn"));
            newGame.name = "start";
            newGame.inputEnabled = true;
            newGame.input.priorityID = 3;
            newGame.tint = 0x2a7600;
            newGame.events.onInputDown.add(function () { _this.newGame(); }, _this);
            var newGameText = _this.game.add.bitmapText(265 / 2, 18, "commodore", "NEW GAME", 16);
            newGameText.anchor.set(0.5, 0);
            newGame.addChild(newGameText);
            _this.menuBg.addChild(newGame);
            //no game btn
            //+++++++++++++++++++++++++++++++++
            var noGame;
            noGame = _this.game.add.sprite(-130, 0, _this.game.cache.getBitmapData("roundedBtn"));
            noGame.name = "start";
            noGame.inputEnabled = true;
            noGame.input.priorityID = 3;
            noGame.tint = 0x2a7600;
            noGame.events.onInputDown.add(function () { _this.noGame(); }, _this);
            var noGameText = _this.game.add.bitmapText(265 / 2, 18, "commodore", "NO GAME", 16);
            noGameText.anchor.set(.5, 0);
            noGame.addChild(noGameText);
            _this.menuBg.addChild(noGame);
            _this.cameraOffset.y = 710;
            _this.game.add.existing(_this);
            return _this;
        }
        PlayerMenu.prototype.update = function () { };
        PlayerMenu.prototype.newGame = function () {
            this.currentState.displayChapterTitle(0);
            this.currentState.playerBaloon.showBaloon(z89.getLabel(95));
            this.isOpenOnStart = false;
            this.hide();
        };
        PlayerMenu.prototype.noGame = function () {
            //console.log("nogame");
            var _this = this;
            gameData.chapters.forEach(function (element) {
                element.complete(_this.currentState);
            });
            this.isOpenOnStart = false;
            this.hide();
        };
        PlayerMenu.prototype.resetGame = function () { };
        PlayerMenu.prototype.toggle = function () {
            if (this.isOpen) {
                this.hide();
            }
            else {
                this.showState("iconsBtn");
                this.show();
            }
        };
        PlayerMenu.prototype.openOnStart = function () {
            this.isOpenOnStart = true;
            this.showState("start");
            this.show();
        };
        PlayerMenu.prototype.showState = function (state) {
            this.menuBg.children.forEach(function (element) {
                if (element.name == state) {
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
            this.game.add.tween(this.menuBg.scale).to({ y: 1, x: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            this.game.add.tween(this.menuBg).to({ height: 774 }, 600, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
        };
        PlayerMenu.prototype.hide = function () {
            var _this = this;
            this.game.add.tween(this.cameraOffset).to({ y: 710 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(function () {
                _this.isOpen = false;
                _this.currentState.enableInteraction();
            }, this);
            this.game.add.tween(this.menuBg.scale).to({ y: .7, x: .7 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            this.game.add.tween(this.menuBg).to({ height: 350 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
        };
        return PlayerMenu;
    }(Phaser.Group));
    z89.PlayerMenu = PlayerMenu;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var Terminal = (function (_super) {
        __extends(Terminal, _super);
        function Terminal(game) {
            var _this = _super.call(this, game) || this;
            _this.keyboard = [];
            //48-57 0-9
            //65-90 a-z
            //13 return
            //32 space
            //50 "
            //188 ,
            //190 .
            //8 backspace
            //38 40 37 49 up down left right
            _this.keys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 13, 44, 32, 8, 38, 40, 37, 39, 188, 190];
            _this.currentState = _this.game.state.getCurrentState();
            _this.addChild(_this.game.add.sprite(0, 0, "terminalBg", _this.terminalGroup));
            _this.addChild(_this.game.add.sprite((1080 - 640) / 2, ((720 - 500) / 2) - 20, _this.game.cache.getBitmapData("terminal"), _this.terminalGroup));
            var closeBtn = _this.game.add.sprite(670, 470, _this.game.cache.getBitmapData("btn"));
            closeBtn.inputEnabled = true;
            closeBtn.input.priorityID = 4;
            closeBtn.events.onInputDown.add(function () {
                _this.hide();
            }, _this);
            closeBtn.alpha = 0;
            _this.addChild(closeBtn);
            //console.log(Phaser.Keyboard.PERIOD,Phaser.Keyboard.A,Phaser.Keyboard.DOWN);
            if (!z89.isMobile()) {
                _this.keys.forEach(function (element, index) {
                    _this.keyboard.push(game.input.keyboard.addKey(element));
                    _this.keyboard[index].onDown.add(_this.addChar, _this, null, _this.keyboard[index]);
                });
            }
            else {
                _this.keys.forEach(function (element, index) {
                    _this.keyboard.push(game.input.keyboard.addKey(element));
                    _this.keyboard[index].onDown.add(_this.addChar, _this, null, _this.keyboard[index]);
                });
            }
            return _this;
        }
        Terminal.prototype.addChar = function (key) {
            //console.log(key);
            //console.log(key.keyCode,key.event.key);
            if (key.keyCode == 13) {
                this.TerminalLogic.submitCommand();
            }
            else if (key.keyCode == 8) {
                this.TerminalLogic.removeChar();
            }
            else if (key.keyCode == 38) {
                this.TerminalLogic.charUp();
            }
            else if (key.keyCode == 40) {
                this.TerminalLogic.charDown();
            }
            else if (key.keyCode == 37) {
                this.TerminalLogic.charLeft();
            }
            else if (key.keyCode == 39) {
                this.TerminalLogic.charRight();
            }
            else {
                this.TerminalLogic.addChar(key.event.key);
            }
        };
        Terminal.prototype.clear = function () { };
        Terminal.prototype.show = function (index) {
            this.game.add.tween(this).to({ alpha: 1 }, 400, Phaser.Easing.Quadratic.In, true, 0, 0, false);
            this.inputEnableChildren = true;
            this.currentState.disableInteraction();
            this.TerminalLogic = new z89.TerminalLogic(this.game, this, 0x00ff00);
            if (z89.isMobile()) {
                this.TerminalKeyboard = new z89.TerminalKeyboard(this.game, this);
            }
            this.TerminalLogic.reset();
        };
        Terminal.prototype.hide = function () {
            var _this = this;
            this.TerminalLogic.writeMultiple(this.TerminalLogic.returnStaticString(z89.msgs.disconnecting, 0));
            this.game.add.tween(this).to({ alpha: 0 }, 400, Phaser.Easing.Quadratic.In, true, 0, 0, false).onComplete.add(function () {
                _this.destroy();
            }, this);
        };
        Terminal.prototype.destroy = function () {
            this.inputEnableChildren = false;
            if (this.TerminalLogic != undefined)
                this.TerminalLogic.destroy();
            if (this.TerminalKeyboard != undefined)
                this.TerminalKeyboard.destroy();
            this.currentState.enableInteraction();
        };
        return Terminal;
    }(Phaser.Group));
    z89.Terminal = Terminal;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var TerminalKeyboard = (function () {
        function TerminalKeyboard(game, terminal) {
            var _this = this;
            this.keys = [
                { v: 'Q', x: 192 + 40 + 6, y: 49, w: 40, h: 40 },
                { v: 'W', x: 192 + (40 * 2) + (6 * 2), y: 49, w: 40, h: 40 },
                { v: 'E', x: 192 + (40 * 3) + (6 * 3), y: 49, w: 40, h: 40 },
                { v: 'R', x: 192 + (40 * 4) + (6 * 4), y: 49, w: 40, h: 40 },
                { v: 'T', x: 192 + (40 * 5) + (6 * 5), y: 49, w: 40, h: 40 },
                { v: 'Y', x: 192 + (40 * 6) + (6 * 6), y: 49, w: 40, h: 40 },
                { v: 'U', x: 192 + (40 * 7) + (6 * 7), y: 49, w: 40, h: 40 },
                { v: 'I', x: 192 + (40 * 8) + (6 * 8), y: 49, w: 40, h: 40 },
                { v: 'O', x: 192 + (40 * 9) + (6 * 9), y: 49, w: 40, h: 40 },
                { v: 'P', x: 192 + (40 * 10) + (6 * 10), y: 49, w: 40, h: 40 },
                { v: 'backspace', x: 192 + (40 * 11) + (6 * 11), y: 49, w: 40, h: 40 },
                { v: '7', x: 192 + (40 * 13) + (6 * 13), y: 49, w: 40, h: 40 },
                { v: '8', x: 192 + (40 * 14) + (6 * 14), y: 49, w: 40, h: 40 },
                { v: '9', x: 192 + (40 * 15) + (6 * 15), y: 49, w: 40, h: 40 },
                { v: 'A', x: 192 + 40 + 6, y: 49 + 51, w: 40, h: 40 },
                { v: 'S', x: 192 + (40 * 2) + (6 * 2), y: 49 + 51, w: 40, h: 40 },
                { v: 'D', x: 192 + (40 * 3) + (6 * 3), y: 49 + 51, w: 40, h: 40 },
                { v: 'F', x: 192 + (40 * 4) + (6 * 4), y: 49 + 51, w: 40, h: 40 },
                { v: 'G', x: 192 + (40 * 5) + (6 * 5), y: 49 + 51, w: 40, h: 40 },
                { v: 'H', x: 192 + (40 * 6) + (6 * 6), y: 49 + 51, w: 40, h: 40 },
                { v: 'J', x: 192 + (40 * 7) + (6 * 7), y: 49 + 51, w: 40, h: 40 },
                { v: 'K', x: 192 + (40 * 8) + (6 * 8), y: 49 + 51, w: 40, h: 40 },
                { v: 'L', x: 192 + (40 * 9) + (6 * 9), y: 49 + 51, w: 40, h: 40 },
                { v: 'enter', x: 192 + (40 * 11) + (6 * 11), y: 49 + 51 + 50, w: 40, h: 90 },
                { v: '4', x: 192 + (40 * 13) + (6 * 13), y: 49 + 51, w: 40, h: 40 },
                { v: '5', x: 192 + (40 * 14) + (6 * 14), y: 49 + 51, w: 40, h: 40 },
                { v: '6', x: 192 + (40 * 15) + (6 * 15), y: 49 + 51, w: 40, h: 40 },
                { v: 'Z', x: 192 + 40 + 6, y: 49 + 51 + 50, w: 40, h: 40 },
                { v: 'X', x: 192 + (40 * 2) + (6 * 2), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: 'C', x: 192 + (40 * 3) + (6 * 3), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: 'V', x: 192 + (40 * 4) + (6 * 4), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: 'B', x: 192 + (40 * 5) + (6 * 5), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: 'N', x: 192 + (40 * 6) + (6 * 6), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: 'M', x: 192 + (40 * 7) + (6 * 7), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: 'doublequote', x: 192 + (40 * 8) + (6 * 8), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: 'comma', x: 192 + (40 * 9) + (6 * 9), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: 'dot', x: 192 + (40 * 10) + (6 * 10), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: '1', x: 192 + (40 * 13) + (6 * 13), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: '2', x: 192 + (40 * 14) + (6 * 14), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: '3', x: 192 + (40 * 15) + (6 * 15), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: 'up', x: 192 + (40 * 16) + (6 * 16), y: 49 + 51 + 50, w: 40, h: 40 },
                { v: 'space', x: 192 + (40 * 2) + (6 * 2), y: 49 + 51 + 50 + 50, w: (40 * 8) + 40, h: 40 },
                { v: '0', x: 192 + (40 * 13) + (6 * 13), y: 49 + 51 + 50 + 50, w: 40, h: 40 },
                { v: 'left', x: 192 + (40 * 15) + (6 * 15), y: 49 + 51 + 50 + 50, w: 40, h: 40 },
                { v: 'down', x: 192 + (40 * 16) + (6 * 16), y: 49 + 51 + 50 + 50, w: 40, h: 40 },
                { v: 'right', x: 192 + (40 * 17) + (6 * 17), y: 49 + 51 + 50 + 50, w: 40, h: 40 },
                { v: 'help', x: 10 + 40 + 6, y: 49, w: 80, h: 40 },
                { v: 'clear', x: 10 + 40 + 6, y: 49 + 51, w: 80, h: 40 },
                { v: 'dir', x: 10 + 40 + 6, y: 49 + 51 + 50, w: 80, h: 40 },
                { v: 'exit', x: 10 + 40 + 6, y: 49 + 51 + 50 + 50, w: 80, h: 40 },
            ];
            this.game = game;
            this.terminal = terminal;
            this.keyGroup = this.game.add.group();
            this.keyGroup.x = 0;
            this.keyGroup.y = 510;
            this.keyboard = this.game.add.sprite(0, 0, "terminalKeyboard", 0, this.keyGroup);
            this.keyboard.anchor.set(0);
            var sprite;
            this.keys.forEach(function (e) {
                sprite = _this.game.add.sprite(e.x, e.y, _this.game.cache.getBitmapData('key'), 0, _this.keyGroup);
                sprite.width = e.w;
                sprite.anchor.set(0, 1);
                sprite.height = e.h;
                sprite.name = e.v;
                sprite.inputEnabled = true;
                sprite.input.priorityID = 3;
                sprite.alpha = .2;
                sprite.tint = 0xff0000;
                sprite.events.onInputDown.add(function (sprite) {
                    _this.pressKey(sprite.name);
                    sprite.alpha = .5;
                }, _this, 3);
                sprite.events.onInputUp.add(function (sprite) {
                    sprite.alpha = .2;
                }, _this, 3);
            });
            this.terminal.addChild(this.keyGroup);
        }
        TerminalKeyboard.prototype.pressKey = function (_key) {
            console.log("press");
            switch (_key) {
                case "enter":
                    this.terminal.TerminalLogic.submitCommand();
                    break;
                case "backspace":
                    this.terminal.TerminalLogic.removeChar();
                    break;
                case "up":
                    this.terminal.TerminalLogic.charUp();
                    break;
                case "down":
                    this.terminal.TerminalLogic.charDown();
                    break;
                case "left":
                    this.terminal.TerminalLogic.charLeft();
                    break;
                case "right":
                    this.terminal.TerminalLogic.charRight();
                    break;
                case "help":
                    this.terminal.TerminalLogic.addChars("help");
                    this.terminal.TerminalLogic.submitCommand();
                    break;
                case "clear":
                    this.terminal.TerminalLogic.addChars("clear");
                    this.terminal.TerminalLogic.submitCommand();
                    break;
                case "exit":
                    this.terminal.TerminalLogic.addChars("exit");
                    this.terminal.TerminalLogic.submitCommand();
                    break;
                case "dir":
                    this.terminal.TerminalLogic.addChars("dir");
                    this.terminal.TerminalLogic.submitCommand();
                    break;
                default:
                    var char = "";
                    switch (_key) {
                        case "doublequote":
                            char = '"';
                            break;
                        case "space":
                            char = ' ';
                            break;
                        case "dot":
                            char = '.';
                            break;
                        case "comma":
                            char = ',';
                            break;
                        default:
                            char = _key;
                            break;
                    }
                    this.terminal.TerminalLogic.addChar(char);
                    break;
            }
        };
        TerminalKeyboard.prototype.destroy = function () {
            this.keyboard.kill();
            this.keyboard.destroy();
            this.keyGroup.destroy();
            console.log("destroy keyboard");
        };
        return TerminalKeyboard;
    }());
    z89.TerminalKeyboard = TerminalKeyboard;
})(z89 || (z89 = {}));
var z89;
(function (z89) {
    var msgs;
    (function (msgs) {
        msgs[msgs["reset"] = 0] = "reset";
        msgs[msgs["commandList"] = 1] = "commandList";
        msgs[msgs["gtw"] = 2] = "gtw";
        msgs[msgs["version"] = 3] = "version";
        msgs[msgs["credits"] = 4] = "credits";
        msgs[msgs["gameList"] = 5] = "gameList";
        msgs[msgs["loginError"] = 6] = "loginError";
        msgs[msgs["targetAquired"] = 7] = "targetAquired";
        msgs[msgs["t5"] = 8] = "t5";
        msgs[msgs["t4"] = 9] = "t4";
        msgs[msgs["t3"] = 10] = "t3";
        msgs[msgs["t2"] = 11] = "t2";
        msgs[msgs["t1"] = 12] = "t1";
        msgs[msgs["hit"] = 13] = "hit";
        msgs[msgs["processing"] = 14] = "processing";
        msgs[msgs["disconnecting"] = 15] = "disconnecting";
    })(msgs = z89.msgs || (z89.msgs = {}));
    var shell;
    (function (shell) {
        shell[shell["login"] = 0] = "login";
        shell[shell["gtw"] = 1] = "gtw";
        shell[shell["call"] = 2] = "call";
    })(shell = z89.shell || (z89.shell = {}));
    var TerminalLogic = (function () {
        function TerminalLogic(game, terminal, tint) {
            this.rows = [
                '                                        ',
                '    **** COMMODORE 64 BASIC V5 ****     ',
                ' 64K RAM SYSTEM    RUNNING IN WOPR MODE ',
                'READY.                                  ',
                'LIST OF COMMANDS:                       ',
                '----------------------------------------',
                'help, clear, quit, ver, credits, reset, ',
                'dir, load "gamename", run               ',
                ' GREETINGS PROFESSOR FALKEN.            ',
                ' WELCOME TO,                            ',
                ' ###################################### ',
                ' #     "GLOBAL THERMONUCLEAR WAR"     # ',
                ' PLEASE, ENTER THE LOCATION (LAT,LON)   ',
                ' OF FIRST STRIKE! E.g. INTEGER,INTEGER  ',
                'MEDIA CONSOLE VERSION 1.0               ',
                '(C) FRANCESCO RAIMONDO 2018             ',
                'HTTP://WWW.ZERO89.IT                    ',
                'CREDIT LIST:                            ',
                'CODE: FRANCESO RAIMONDO                 ',
                'ART SPRITE: PAUL ROBERTSON              ',
                'ART BG: JASON TAMMEMAGI                 ',
                'ART MIXING: FRANCESO RAIMONDO           ',
                'MUSIC:                                  ',
                'ADDITIONAL FX: FRANCESO RAIMONDO        ',
                '0 "GAME LIST                  " 32 2A   ',
                '0    "BOCCONCINI DEV"              PRG  ',
                '0    "XMAS2K16"                    PRG  ',
                '0    "THE WRONG DIRECTION"         PRG  ',
                '0    "FALKEN\'S MAZE"               PRG  ',
                '0    "HWI20YEARS"                  PRG  ',
                '0    "GTW"                         PRG  ',
                '0 BLOCKS FREE.                     PRG  ',
                '?ERROR                                  ',
                'ACCESS DENIED!                          ',
                'PLEASE, USE YOUR CREDENTIAL TO LOGIN.   ',
                'Try with "help" command.                ',
                'Type quit to exit.                      ',
                ' #          TARGET ACQUIRED!          # ',
                '              STRIKE IN...              ',
                '              555555555555              ',
                '              55                        ',
                '              55                        ',
                '              555555555555              ',
                '                        55              ',
                '                        55              ',
                '              555555555555              ',
                '                      44                ',
                '                    4444                ',
                '                  44  44                ',
                '                44    44                ',
                '              444444444444              ',
                '                      44                ',
                '                      44                ',
                '              333333333333              ',
                '                        33              ',
                '                        33              ',
                '              333333333333              ',
                '                        33              ',
                '                        33              ',
                '              333333333333              ',
                '              222222222222              ',
                '                        22              ',
                '                        22              ',
                '              222222222222              ',
                '              22                        ',
                '              22                        ',
                '              222222222222              ',
                '                    11                  ',
                '                  1111                  ',
                '                    11                  ',
                '                    11                  ',
                '                    11                  ',
                '                    11                  ',
                '                  111111                ',
                ' #              TARGET HIT!           # ',
                'SEARCHING FOR ',
                'LOADING                                 ',
                'RUNNING A GAME FROM:                    ',
                '              ##############            ',
                '              # PROCESSING #            ',
                'Disconnecting....                       ',
            ];
            this.msgs = [
                [0, 1, 0, 2, 0, 3],
                [0, 4, 5, 6, 7],
                [0, 8, 0, 9, 0, 10, 11, 10, 0, 12, 13, 0],
                [0, 14, 5, 15, 16, 3],
                [0, 17, 5, 18, 19, 20, 21, 22, 23, 3],
                [0, 24, 25, 26, 27, 28, 29, 30, 31, 3],
                [0, 33, 34],
                [0, 10, 37, 10, 0, 38],
                [0, 39, 40, 41, 42, 43, 44, 45, 0],
                [0, 46, 47, 48, 49, 50, 51, 52, 0],
                [0, 53, 54, 55, 56, 57, 58, 59, 0],
                [0, 60, 61, 62, 63, 64, 65, 66, 0],
                [0, 67, 68, 69, 70, 71, 72, 73, 0],
                [0, 10, 74, 10, 0, 3],
                [0, 78, 79, 78, 0],
                [80],
            ];
            this.emptyString = this.rows[0];
            this.readyString = this.rows[3];
            this.errors = [
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
            this.clearString = { text: this.emptyString, delay: 0 };
            this.lettersObj = [];
            this.currentElement = 0;
            this.tint = 0x6C5EB5;
            this.logged = false;
            this.isShell = false;
            this.shellStart = 0;
            this.shellEnd = 0;
            this.shellType = 0;
            this.isShellLogin = false;
            this.login = "";
            this.gameLoaded = "";
            this.inputIsDisabled = false;
            this.game = game;
            this.typeGroup = this.game.add.group();
            this.terminal = terminal;
            if (tint != null)
                this.tint = tint;
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
        TerminalLogic.prototype.reset = function () {
            this.clear();
            this.writeMultiple(this.returnStaticString(msgs.reset, 0));
        };
        ;
        TerminalLogic.prototype.enableInput = function () { this.inputIsDisabled = false; this.showCursor(); };
        TerminalLogic.prototype.disableInput = function () { this.inputIsDisabled = true; this.hideCursor(); };
        TerminalLogic.prototype.hideCursor = function () { this.cursor.alpha = 0; };
        TerminalLogic.prototype.showCursor = function () { this.cursor.alpha = 1; };
        TerminalLogic.prototype.returnStaticString = function (msg, delay) {
            var _this = this;
            var _obj = [];
            var elem;
            this.msgs[msg].forEach(function (element) {
                elem = { text: _this.rows[element], delay: delay };
                _obj.push(elem);
            });
            return _obj;
        };
        TerminalLogic.prototype.returnReady = function (txt) {
            var _ready = { text: this.readyString, delay: 0 };
            this.cursor.x = 0;
            // _ready.row = this.currentRow; this.cursor.y = this.currentRow * 16;
            if (txt != undefined) {
                _ready.text = txt;
                this.cursor.x = txt.length * 16;
            }
            this.cursor.play("blink");
            return _ready;
        };
        TerminalLogic.prototype.returnLogin = function () { return this.returnStaticString(msgs.loginError, 0); };
        TerminalLogic.prototype.returnCommands = function () { return this.returnStaticString(msgs.commandList, 0); };
        TerminalLogic.prototype.returnGames = function () { return this.returnStaticString(msgs.gameList, 0); };
        TerminalLogic.prototype.returnVersion = function () { return this.returnStaticString(msgs.version, 0); };
        TerminalLogic.prototype.returnCredits = function () { return this.returnStaticString(msgs.credits, 0); };
        TerminalLogic.prototype.returnProcessing = function () { return this.returnStaticString(msgs.processing, 0); };
        TerminalLogic.prototype.returnError = function (error) {
            var _error = this.errors[this.game.rnd.integerInRange(0, this.errors.length - 1)];
            if (error != undefined)
                _error = error;
            return [
                { text: this.emptyString, delay: 0 },
                { text: this.rows[32], delay: 0 },
                { text: _error, delay: 0 },
                { text: this.rows[5], delay: 0 },
                { text: this.rows[35], delay: 0 },
                { text: this.rows[3], delay: 0 }
            ];
        };
        TerminalLogic.prototype.returnLoading = function (game) {
            return [
                { text: this.emptyString, delay: 0 },
                { text: this.rows[75] + game, delay: 0 },
                { text: this.rows[76], delay: 0 },
                { text: this.rows[3], delay: 0 },
            ];
        };
        TerminalLogic.prototype.returnLoginError = function (error) {
            var _error = this.errors[this.game.rnd.integerInRange(0, this.errors.length - 1)];
            if (error != undefined)
                _error = error;
            return [
                { text: this.emptyString, delay: 0 },
                { text: this.rows[32], delay: 0 },
                { text: _error, delay: 0, cDelay: 0 },
                { text: this.rows[5], delay: 0 },
                { text: this.rows[36], delay: 0 }
            ];
        };
        TerminalLogic.prototype.charUp = function () {
            if (this.isShell || this.inputIsDisabled)
                return;
            var col = this.cursor.x / 16;
            var row = this.cursor.y / 16;
            if (row > 0) {
                this.cursor.y = (row * 16) - 16;
            }
        };
        TerminalLogic.prototype.charDown = function () {
            if (this.isShell || this.inputIsDisabled)
                return;
            var col = this.cursor.x / 16;
            var row = this.cursor.y / 16;
            if (row < 24) {
                this.cursor.y = (row * 16) + 16;
            }
            else {
                this.scrollDown();
            }
        };
        TerminalLogic.prototype.charLeft = function () {
            if (this.isShell || this.inputIsDisabled)
                return;
            var col = this.cursor.x / 16;
            var row = this.cursor.y / 16;
            if (col == 0) {
                if (row > 0) {
                    this.cursor.y = (row * 16) - 16;
                    this.cursor.x = (39 * 16);
                }
            }
            else {
                this.cursor.x = (col * 16) - 16;
            }
        };
        TerminalLogic.prototype.charRight = function () {
            if (this.isShell || this.inputIsDisabled)
                return;
            var col = this.cursor.x / 16;
            var row = this.cursor.y / 16;
            if (col == 39) {
                this.cursor.y = (row * 16) + 16;
                this.cursor.x = 0;
            }
            else {
                this.cursor.x = (col * 16) + 16;
            }
        };
        TerminalLogic.prototype.scrollDown = function () {
            for (var i = 0; i < 25; i++) {
                if (i < 24) {
                    this.lettersObj[i].text = this.lettersObj[i + 1].text;
                }
                else {
                    this.lettersObj[i].text = this.emptyString;
                }
            }
        };
        TerminalLogic.prototype.removeChar = function () {
            if (this.inputIsDisabled)
                return;
            var col = this.cursor.x / 16;
            var row = this.cursor.y / 16;
            if (this.isShell && (this.shellStart < col)) {
                this.lettersObj[row].text = this.replaceAt(this.lettersObj[row].text, col - 1, " ");
                this.cursor.x = (col * 16) - 16;
                this.login = this.login.substr(0, this.login.length - 1);
            }
            else {
                this.lettersObj[row].text = this.replaceAt(this.lettersObj[row].text, col, " ");
                if (col == 0) {
                    if (row > 0) {
                        this.cursor.y = (row * 16) - 16;
                        this.cursor.x = (39 * 16);
                    }
                }
                else {
                    this.cursor.x = (col * 16) - 16;
                }
            }
        };
        TerminalLogic.prototype.addChar = function (key) {
            if (this.inputIsDisabled)
                return;
            var col = this.cursor.x / 16;
            var row = this.cursor.y / 16;
            if (this.isShell) {
                if (col == (this.shellStart + this.shellEnd))
                    return;
                this.login = this.login + key;
                if (this.isShellLogin)
                    key = "*";
            }
            this.lettersObj[row].text = this.replaceAt(this.lettersObj[row].text, col, key);
            this.cursor.x = (col * 16) + 16;
            col++;
            if (col == 40) {
                this.cursor.x = 0;
                this.cursor.y = (row * 16) + 16;
                row++;
                if (row > 24) {
                    this.scrollDown();
                    this.cursor.y = (row * 16) - 16;
                }
            }
        };
        TerminalLogic.prototype.addChars = function (key) {
            for (var i = 0; i < key.length; i++) {
                this.addChar(key.charAt(i));
            }
        };
        TerminalLogic.prototype.replaceAt = function (string, index, replace) {
            return string.substring(0, index) + replace + string.substring(index + 1);
        };
        TerminalLogic.prototype.returnShellError = function (shellString, error) {
            if (error === void 0) { error = false; }
            this.login = "";
            this.clear();
            this.writeMultiple(this.returnLogin());
            this.write(this.returnReady(shellString), false);
            this.setCursor(0, this.returnLogin().length + 1);
            if (error)
                this.writeMultiple(this.returnLoginError("PASSWORD NOT VALID!"));
            this.isShell = true;
            this.shellStart = shellString.length;
            this.shellEnd = 10;
            this.isShellLogin = true;
            this.setCursor(shellString.length, this.returnLogin().length);
        };
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
        TerminalLogic.prototype.checkCoordinates = function (coordinates) {
            if (coordinates == "quit")
                return 0;
            if (coordinates.length > 7)
                return -1;
            var _pos = coordinates.indexOf(",");
            if (_pos == -1 || _pos == 0 || _pos == coordinates.length - 1)
                return -1;
            var _coo = coordinates.split(",");
            if (!this.checkNumber(_coo[0]) || !this.checkNumber(_coo[1]))
                return -1;
            return 1;
        };
        TerminalLogic.prototype.checkNumber = function (val) {
            var pattern = /^\d+$/;
            return pattern.test(val);
        };
        TerminalLogic.prototype.openGame = function (url) {
            window.open(url, "_blank");
            this.gameLoaded = "";
            this.writeMultiple([{ text: this.rows[77], delay: 0 }, { text: url, delay: 0 }]);
            this.write(this.returnReady());
        };
        TerminalLogic.prototype.hitTarget = function () {
            //this.terminal.currentState.shootFromHigh([17]);
            //this.terminal.hide();
            //return;
            var _this = this;
            this.clearShell();
            this.clear();
            this.writeMultiple(this.returnStaticString(msgs.targetAquired, 0));
            var _loop_2 = function (i) {
                this_2.game.time.events.add(1000 * i, function () {
                    _this.writeMultiple(_this.returnStaticString(8 + i, 0));
                    if (i == 5)
                        _this.game.time.events.add(1000, function () {
                            _this.terminal.hide();
                            _this.terminal.currentState.shootFromHigh([27]);
                        }, _this);
                }, this_2);
            };
            var this_2 = this;
            for (var i = 0; i < 6; i++) {
                _loop_2(i);
            }
        };
        TerminalLogic.prototype.submitCommand = function () {
            var row = this.cursor.y / 16;
            var command = this.lettersObj[row].text.toLowerCase().trim();
            this.cursor.y = (row * 16) + 16;
            row++;
            if (row > 24) {
                this.scrollDown();
                this.cursor.y = (row * 16) - 16;
            }
            // console.log(command)
            if (this.isShell) {
                // console.log(this.login)
                switch (this.shellType) {
                    case 0:
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
                    case 1:
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
            }
            else {
                this.clearShell();
                switch (command) {
                    case "hit":
                        this.hitTarget();
                        break;
                    case "":
                        break;
                    case "run":
                        if (this.gameLoaded == "")
                            this.writeMultiple(this.returnError("NO GAME LOADED"));
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
                        }
                        else {
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
        };
        TerminalLogic.prototype.ajaxCall = function (data) {
            this.disableInput();
            this.writeMultiple(this.returnProcessing());
            var _this = this;
            $.ajax({
                url: "http://www.zero89.it/api/script/adventure/core.aspx",
                dataType: "script",
                type: "GET",
                data: data
            }).done(function (data) { _this.enableInput(); }).fail(function (xhr) { });
        };
        TerminalLogic.prototype.clearShell = function () {
            this.isShell = false;
            this.shellStart = 0;
            this.shellEnd = 0;
            this.isShellLogin = false;
            this.shellType = -1;
        };
        TerminalLogic.prototype.setCursor = function (x, y) {
            this.cursor.x = x * 16;
            this.cursor.y = y * 16;
        };
        TerminalLogic.prototype.clear = function (start, end) {
            var _start = 0;
            var _end = 25;
            if (start != undefined)
                _start = start;
            if (end != undefined)
                _end = end;
            this.currentColumn = 0;
            this.currentRow = 0;
            var _clear = this.clearString;
            for (var i = _start; i < _end; i++) {
                _clear.row = i;
                this.lettersObj[i].text = this.emptyString;
            }
            this.cursor.y = 0;
            this.cursor.x = 0;
        };
        TerminalLogic.prototype.removeLines = function () {
            this.lettersObj.forEach(function (element) {
                element.destroy();
            });
        };
        TerminalLogic.prototype.destroy = function () {
            //console.log("destroy writer")
            this.removeLines();
            this.cursor.destroy();
        };
        TerminalLogic.prototype.writeMultiple = function (letters) {
            var _this = this;
            letters.forEach(function (element) { _this.write(element); });
            //this.cursor.y+=16;
        };
        TerminalLogic.prototype.someLogic = function () {
            return 66;
        };
        TerminalLogic.prototype.write = function (obj, cursorNext) {
            if (cursorNext === void 0) { cursorNext = true; }
            var element = obj;
            var textObj;
            var cDelay = 0;
            var row = (this.cursor.y) / 16;
            if (row == 25) {
                this.scrollDown();
                row--;
            }
            textObj = this.lettersObj[row];
            if (element.cursor != undefined)
                this.cursor.play(element.cursor);
            if (element.cDelay != undefined)
                cDelay = element.cDelay;
            if (element.tint != undefined)
                this.tint = element.tint;
            textObj.tint = this.tint;
            textObj.text = element.text;
            if (cursorNext) {
                this.cursor.x = 0;
                this.cursor.y = (row * 16) + 16;
                row = this.cursor.y / 16;
                if (row == 25) {
                    this.scrollDown();
                    this.cursor.y = (row * 16) - 16;
                }
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
        };
        return TerminalLogic;
    }());
    z89.TerminalLogic = TerminalLogic;
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
            z89.playSound(z89.gameSound.intro);
            document.getElementsByTagName("body")[0].className = "game";
            this.game.cache.getBitmapFont("commodore").font.lineHeight = 18;
            this.game.cache.getBitmapFont("commodore2").font.lineHeight = 36;
            this.game.world.setBounds(0, 0, 3670, 720);
            //this.game.renderer.renderSession.roundPixels=true;
            this.gameUtils = new z89.GameUtils(this.game);
            this.gameItemsUtils = new z89.GameItemsUtils(this.game);
            this.saveGameObj = new z89.saveGame(this.game);
            // +++++++++++++++++++++++++++++++++++++++
            // group city
            // +++++++++++++++++++++++++++++++++++++++
            this.groupCity = this.game.add.group();
            var bgLevel0 = this.game.add.image(0, 0, 'bg-level0');
            bgLevel0.fixedToCamera = true;
            this.groupCity.add(bgLevel0);
            //palazzi sfondo bg lvl1
            this.bgLevel1 = this.game.add.tileSprite(0, 0, 1080, 642, 'bg-level1');
            this.bgLevel1.fixedToCamera = true;
            this.groupCity.add(this.bgLevel1);
            //palazzi group bg lvl2
            this.bgLevel2 = this.game.add.tileSprite(0, 55, 1080, 548, 'bg-level2');
            this.bgLevel2.fixedToCamera = true;
            this.groupCity.add(this.bgLevel2);
            var street = this.game.add.image(0, 592, 'street-level0');
            street.fixedToCamera = true;
            this.groupCity.add(street);
            var buildings = [{ s: "bg-home", x: 0, y: 640 - 48 }, { s: "bg-devday", x: 624, y: 640 - 48 }, { s: "bg-skills", x: 1114, y: 640 - 48 }, { s: "bg-cake", x: 1550, y: 640 - 36 }, { s: "bg-arcade", x: 1800, y: 640 - 48 }, { s: "bg-aerosol", x: 2400, y: 640 - 48 }, { s: "bg-contact", x: 3000, y: 640 - 36 }];
            var building;
            buildings.forEach(function (element) {
                building = _this.game.add.image(element.x, element.y, element.s, 0, _this.groupCity);
                building.anchor.set(0, 1);
            });
            // +++++++++++++++++++++++++++++++++++++++
            // group street
            // +++++++++++++++++++++++++++++++++++++++
            this.groupStreet = this.game.add.group();
            this.street = this.game.add.tileSprite(0, 703 - 48, 1080, 65, 'street-level1');
            this.street.fixedToCamera = true;
            this.groupStreet.add(this.street);
            // +++++++++++++++++++++++++++++++++++++++
            // group All
            // +++++++++++++++++++++++++++++++++++++++
            this.groupAll = this.game.add.group();
            this.player = new z89.Player(this.game);
            this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, .1, .1);
            this.groupAll.add(this.player);
            // +++++++++++++++++++++++++++++++++++++++
            // group Front
            // +++++++++++++++++++++++++++++++++++++++
            this.groupFront = this.game.add.group();
            this.front = this.game.add.tileSprite(0, 768 - 93 - 48, 1080, 720, 'street-level2');
            this.front.fixedToCamera = true;
            this.groupFront.add(this.front);
            // +++++++++++++++++++++++++++++++++++++++
            // group Baloon
            // +++++++++++++++++++++++++++++++++++++++
            this.groupBaloon = this.game.add.group();
            this.playerBaloon = new z89.PlayerBaloon(this.game);
            this.groupBaloon.add(this.playerBaloon);
            this.conversationBaloon = new z89.conversationBaloon(this.game, 0, 0);
            this.groupBaloon.add(this.conversationBaloon);
            // +++++++++++++++++++++++++++++++++++++++
            // group Action
            // +++++++++++++++++++++++++++++++++++++++
            this.groupAction = this.game.add.group();
            this.playerActions = new z89.PlayerActions(this.game);
            this.groupAction.add(this.playerActions);
            // +++++++++++++++++++++++++++++++++++++++
            // group Menu
            // +++++++++++++++++++++++++++++++++++++++
            this.groupMenu = this.game.add.group();
            this.playerMenu = new z89.PlayerMenu(this.game);
            this.groupMenu.add(this.playerMenu);
            // +++++++++++++++++++++++++++++++++++++++
            // group Terminal
            // +++++++++++++++++++++++++++++++++++++++
            this.Terminal = new z89.Terminal(this.game);
            this.Terminal.fixedToCamera = true;
            this.Terminal.cameraOffset.x = 0; //(1080 - 640) / 2;
            this.Terminal.cameraOffset.y = 0; //(720 - 500) / 2;
            this.Terminal.inputEnableChildren = false;
            this.Terminal.alpha = 0;
            //this.groupTerminal.alpha=0;
            // this.groupTerminal.fixedToCamera=true;
            // +++++++++++++++++++++++++++++++++++++++
            // GROUND
            // +++++++++++++++++++++++++++++++++++++++
            this.ground = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("ground"));
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
            //if game is saved
            if (this.saveGameObj.gameIsSaved()) {
                this.processSavedGame();
            }
            else {
                gameData.ingame.items.forEach(function (element) {
                    if (element.onStart) {
                        _this.gameItemsUtils.addItem(element.id);
                    }
                });
                this.saveGameObj.updatePlayerPosition(this.player.x, this.player.y);
                this.saveGameObj.updateItems();
                this.playerMenu.openOnStart();
            }
            var half = this.game.add.tileSprite(0, 0, 100, 720, "halftone");
            half.fixedToCamera = true;
            var half2 = this.game.add.tileSprite(1080, 0, 100, 720, "halftone");
            half2.fixedToCamera = true;
            half2.scale.x = -1;
            this.chapterTitle = this.game.add.bitmapText(512, 200, "commodore2", "", 48);
            this.chapterTitle.fixedToCamera = true;
            this.chapterTitle.anchor.set(.5);
            this.chapterTitle.alpha = 0;
            var _woofer = this.gameItemsUtils.getItemById(12);
            _woofer.tween = this.game.add.tween(_woofer.scale).to({ x: .95, y: .975 }, 230, "Sine.easeInOut", true, 0, -1, true);
            // this.chapterTitle.tint=0x00ff00;
            /*  let convObj: any = {
                     key: "TALKTO_devday",
                     action: null,
                     inventory: null,
                     item: null
                 }
                 
     
                     this.conversationBaloon.setUpConversation(convObj);

            let half3:Phaser.Sprite=this.game.add.sprite(1024,0,"halftone");
             half3.fixedToCamera=true;
            // half3.scale.x = -1;
             half3.angle=90;

             let half4:Phaser.Sprite=this.game.add.sprite(0,768,"halftone");
             half4.fixedToCamera=true;
            // half3.scale.x = -1;
             half4.angle=-90;
            */
            /*  gameData.ingame.items.forEach(element => {

                      if (element.onStart) {

                              this.gameItemsUtils.addItem(element.id)

                      }


              });
              */
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
        GameCity.prototype.stopSound = function () {
            z89.stopSoundAll();
        };
        GameCity.prototype.playSound = function (sound) {
            z89.stopSoundAll();
            z89.playSound(sound);
        };
        GameCity.prototype.restartGame = function () {
            this.saveGameObj.destroy();
            document.location.reload();
            console.log("restart game");
        };
        GameCity.prototype.update = function () {
            //this.filters[0].randomize();
            //this.filters[0].update();
            //if (this.gameInteracion) {
            this.bgLevel1.tilePosition.x = this.camera.x * -0.2;
            this.bgLevel2.tilePosition.x = this.camera.x * -0.7;
            this.street.tilePosition.x = this.camera.x * -1.1;
            this.front.tilePosition.x = this.camera.x * -1.25;
            this.groupAll.sort('y', Phaser.Group.SORT_ASCENDING);
            //}
        };
        GameCity.prototype.processSavedGame = function () {
            var _this = this;
            var _saved = this.saveGameObj.getSaved();
            this.player.x = _saved.position.x;
            this.player.y = _saved.position.y;
            if (_saved.items != undefined) {
                this.gameItemsUtils.addSavedItems(_saved.items);
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
                    _this.addInventoryItem(_this.gameItemsUtils.getItemById(element.id));
                });
            }
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
                    this.playerBaloon.hideBaloon();
                    this.playerActions.hide();
                    this.playerMenu.hide();
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
            var _actionObj = this.getActionObject();
            console.log(_actionObj);
            //console.log(this.checkCombinedItems())
            if (_actionObj.inventory.length > 0 && _actionObj.item == null) {
                console.log("logic 0");
                //console.log(_actionObj.inventory.length, this.getCurrentActionString(), _actionObj.key)
                if (_actionObj.inventory.length == 1 && gameData.ingame.logic[_actionObj.key] != undefined) {
                    console.log("logic 1");
                    gameData.ingame.logic[_actionObj.key](this);
                    return true;
                }
                else if (_actionObj.inventory.length == 2 && this.checkCombinedItems()) {
                    console.log("logic item on item", _actionObj.key);
                    gameData.ingame.logic[this.checkCombinedItemsKey()](this);
                    return true;
                }
            }
            else if (_actionObj.inventory.length == 0 && _actionObj.item != null && gameData.ingame.logic[_actionObj.key] != undefined) {
                console.log("logic 2", _actionObj.key);
                //if (_actionObj.item.itemObj.logic != undefined && _actionObj.item.itemObj.logic[this.getCurrentActionString()] != undefined) { _actionObj.item.itemObj.logic[this.getCurrentActionString()](this); return true; }
                gameData.ingame.logic[_actionObj.key](this);
                return true;
            }
            else if (_actionObj.inventory.length > 0 && _actionObj.item != null && gameData.ingame.logic[_actionObj.key] != undefined) {
                console.log("logic 3", _actionObj.key);
                gameData.ingame.logic[_actionObj.key](this);
                return true;
            }
            else {
                this.player.illogicAction();
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
        GameCity.prototype.isInteractionDisabled = function () { return !this.gameInteracion; };
        GameCity.prototype.addInventoryItem = function (item) {
            if (item != undefined) {
                // console.log(item);
                this.playerActions.addItem(item);
                this.groupAll.remove(item);
                this.player.play("pickdrop");
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
            this.saveGameObj.updateItems();
        };
        GameCity.prototype.updateItemObject = function (itemId, key, value) {
            this.gameItemsUtils.getItemById(itemId).updateItemObj(key, value);
        };
        GameCity.prototype.removeInventoryItems = function () { this.playerActions.removeItems(this.getActionObject().inventory); };
        GameCity.prototype.dropInventoryItem = function () {
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
                _item.itemObj.x = this.player.x;
                _item.itemObj.y = this.player.y + 10;
            }
            var _newItem = new z89.Items(this.game, _item.itemObj);
            this.groupAll.add(_newItem);
            this.playerActions.removeItem(_item);
            _item.destroy();
            this.player.play("pickdrop");
            this.saveGameObj.updateItems();
        };
        GameCity.prototype.displayChapterTitle = function (chapterIndex) {
            var _this = this;
            if (chapterIndex != undefined)
                this.currentChapter = chapterIndex;
            this.chapterTitle.text = gameData.chapters[this.currentChapter].title;
            this.game.add.tween(this.chapterTitle).to({ alpha: 1 }, 1000, Phaser.Easing.Quadratic.In, true, 500, 0, false).onComplete.add(function () {
                _this.game.add.tween(_this.chapterTitle).to({ alpha: 0 }, 1000, Phaser.Easing.Quadratic.In, true, 2000, 0, false);
            }, this);
        };
        GameCity.prototype.removeItem = function (itemIndex) {
            this.groupAll.remove(this.gameItemsUtils.getItemById(itemIndex), true);
        };
        GameCity.prototype.getContentsBycontexts = function (contexts) {
            var _arr = z89.getZero89Data();
            // console.log(contexts,_arr)
            if (_arr == undefined)
                return [{}];
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
                            _this.game.camera.flash(0xffffff, 2000);
                            _explosion = _this.game.add.sprite(sprite.x, sprite.y, "explosion");
                            _explosion.anchor.set(.5, 1);
                            _explosion.scale.set(2);
                            _this.groupAll.remove(_this.gameItemsUtils.getItemById(sprite.id));
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
