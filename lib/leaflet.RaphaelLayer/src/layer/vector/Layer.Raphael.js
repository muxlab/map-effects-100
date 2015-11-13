R.Layer = L.Class.extend({
	includes: L.Mixin.Events,
	
	initialize: function(options) {
		
	},

	onAdd: function (map) {
		this._map = map;
		this._map._initRaphaelRoot();
		this._paper = this._map._paper;
		this._set = this._paper.set();
		
		map.on('viewreset', this.projectLatLngs, this);
		this.projectLatLngs();
	},

	onRemove: function(map) {
		map.off('viewreset', this.projectLatLngs, this);
		this._map = null;
		this._set.forEach(function(item) {
			item.remove();
		}, this);
		this._set.clear();
	},

	projectLatLngs: function() {
		
	},

	animate: function(attr, ms, easing, callback) {
		this._set.animate(attr, ms, easing, callback);
	
		return this;
	},

	hover: function(f_in, f_out, icontext, ocontext) {
		this._set.hover(f_in, f_out, icontext, ocontext);

		return this;
	},

	attr: function(name, value) {
		this._set.attr(name, value);

		return this;
	}
});

L.Map.include({
	_initRaphaelRoot: function () {
		if (!this._raphaelRoot) {
			this._raphaelRoot = this._panes.overlayPane;
			this._paper = Raphael(this._raphaelRoot);

			this.on('moveend', this._updateRaphaelViewport);
			this._updateRaphaelViewport();
		}
	},

	_updateRaphaelViewport: function () {
		var	p = 0.02,
			size = this.getSize(),
			panePos = L.DomUtil.getPosition(this._mapPane),
			min = panePos.multiplyBy(-1)._subtract(size.multiplyBy(p)),
			max = min.add(size.multiplyBy(1 + p*2)),
			width = max.x - min.x,
			height = max.y - min.y,
			root = this._raphaelRoot,
			pane = this._panes.overlayPane;

		this._paper.setSize(width, height);
		
		L.DomUtil.setPosition(root, min);

		root.setAttribute('width', width);
		root.setAttribute('height', height);
		
		this._paper.setViewBox(min.x, min.y, width, height, false);
		
	}
});