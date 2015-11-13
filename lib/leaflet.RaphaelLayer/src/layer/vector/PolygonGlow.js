R.PolygonGlow = R.Layer.extend({
	initialize: function(latlngs, attr, options) {
		R.Layer.prototype.initialize.call(this, options);

		this._latlngs = latlngs;
		this._attr = attr || {'fill': 'rgba(255, 0, 0, 1)', 'stroke': '#f00', 'stroke-width': 3};
	},

	onRemove: function(map) {
		R.Layer.prototype.onRemove.call(this, map);
		
		if(this._path) this._path.remove();
	},

	projectLatLngs: function() {	
		if (this._path) this._path.remove();
		
		this._path = this._paper.path(this.getPathString())
			.attr(this._attr)
			.toBack();

		var p = this._path;

		var fadeIn = function() {
			p.animate({
				'fill-opacity': 0.25
			}, 1000, '<', fadeOut);
		};

		var fadeOut = function() {
			p.animate({
				'fill-opacity': 1
			}, 1000, '<', fadeIn);
		};

		fadeOut();
	},

	getPathString: function() {
		for(var i=0, len=this._latlngs.length, str=''; i<len; i++) {
			var p = this._map.latLngToLayerPoint(this._latlngs[i]);
			str += (i ? 'L' : 'M') + p.x + ' ' + p.y;
		}
		str += 'Z';

		return str;
	}
});