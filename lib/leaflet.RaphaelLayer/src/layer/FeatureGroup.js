R.FeatureGroup = L.FeatureGroup.extend({
	initialize: function(layers, options) {
		L.FeatureGroup.prototype.initialize.call(this, layers, options);
	},

	animate: function(attr, ms, easing, callback) {
		this.eachLayer(function(layer) {
			layer.animate(attr, ms, easing, callback);
		});
	},

	onAdd: function(map) {
		L.FeatureGroup.prototype.onAdd.call(this,map);

		this._set = this._map._paper.set();

		for(i in this._layers) {
			this._set.push(this._layers[i]._set);
		}
	},

	hover: function(h_in, h_out, c_in, c_out) {
		this.eachLayer(function(layer) {
			layer.hover(h_in, h_out, c_in, c_out);
		});

		return this;
	},

	attr: function(name, value) {
		this.eachLayer(function(layer) {
			layer.attr(name, value);
		});
		
		return this;
	}
});