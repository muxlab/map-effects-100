R.Polygon = R.Layer.extend({
	
	initialize: function(latlngs, attr, options) {
		R.Layer.prototype.initialize.call(this, options);

		if(latlngs.length == 1) {
			if(latlngs[0] instanceof Array) {
				latlngs = latlngs[0];
			}
		}

		this._latlngs = latlngs;
		this._attr = attr || {'fill': 'rgba(255, 0, 0, 0.5)', 'stroke': '#f00', 'stroke-width': 2};
	},

	projectLatLngs: function() {
		if (this._path) this._path.remove();
		
		this._path = this._paper.path(this.getPathString())
			.attr(this._attr)
			.toBack();

		this._set.push(this._path);
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