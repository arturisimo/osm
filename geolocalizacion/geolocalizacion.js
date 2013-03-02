$(document).ready(function() {
	map = new OpenLayers.Map("map");
	map.addLayer(new OpenLayers.Layer.OSM());
	var zoom = 15;
	 
	var lonLat = new OpenLayers.LonLat($('#id_longitud').html(), $('#id_latitud').html() )
	          .transform(
	            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
	            map.getProjectionObject() // to Spherical Mercator Projection
	          );
	 
	
	map.setCenter (lonLat, zoom);
	
	$("#b_checkgeo").click(function(){
		var address = $('#direccion').val();
		var geoCodeURL = "http://nominatim.openstreetmap.org/search";
		$.ajax({
			 url: geoCodeURL,
			 data: {
				  format: "json",
                  q: address
             },
             success: function(data) {
            	var first = $.browser.webkit ? data[0] : jQuery.parseJSON(data)[0];
            	$('#id_latitud').html(first.lat);
    	        $('#id_longitud').html(first.lon);
    	        $('#id_ciudad').html(first.display_name);
    	        
    	        map.destroy();
    	        map = new OpenLayers.Map("map");
	   			map.addLayer(new OpenLayers.Layer.OSM());
	   			 
	   			var lonLat = new OpenLayers.LonLat(first.lon, first.lat)
	   			          .transform(
	   			            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
	   			            map.getProjectionObject() // to Spherical Mercator Projection
	   			          );
	   			 
	   			var zoom = 15;
	   			
	   			var markers = new OpenLayers.Layer.Markers("Markers");
	   			map.addLayer(markers);
	   			
	   			AutoSizeAnchored = OpenLayers.Class(OpenLayers.Popup.Anchored, {
	   	            'autoSize': true,
	   	        });
	   			
	   			var feature = new OpenLayers.Feature(markers, lonLat); 
	            feature.closeBox = true;
	            feature.popupClass = AutoSizeAnchored;
	            feature.data.popupContentHTML = "<strong>Longitud:</strong> " + first.lon + "<br>" +
	            								"<strong>Latitud:</strong> " + first.lat + "<br>" +
	            								"<strong>Ubicación:</strong> " + first.display_name;
	            feature.data.overflow = "auto";
	                    
	            var marker = feature.createMarker();
	            
	            var markerClick = function (evt) {
	                if (this.popup == null) {
	                    this.popup = this.createPopup(this.closeBox);
	                    map.addPopup(this.popup);
	                    this.popup.show();
	                } else {
	                    this.popup.toggle();
	                }
	                currentPopup = this.popup;
	                OpenLayers.Event.stop(evt);
	            };
	            marker.events.register("mousedown", feature, markerClick);
				
	            markers.addMarker(marker);
	   			
	   			map.setCenter (lonLat, zoom);
    	        
             }
		});
		
	});
});