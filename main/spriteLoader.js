//Display shuttles
var spriteLoader = {
	sprites: {},
	keys: [],
	source: "./",
	extension: ".png",
	loaded: 0,

	doAfterLoaded: function () {},

	loadSprites: function () {
		var keys = this.keys;
		var source = this.source;
		var extension = this.extension;

		for ( var i = 0; i < keys.length; i++ ) {
			var key = keys[i];
			var sprite = new Image();
			sprite.src = source + key + extension;
			this.sprites[key] = sprite;
			sprite.onload = function () {
				this.loaded++;
				if ( this.loaded == this.keys.length ) {
					this.doAfterLoaded();
				}
			}.bind(this);
		}
	},

	getSprite: function ( key ) {
		return this.sprites[key];
	}
};
