$(document).ready(function() {

		map = new OpenLayers.Map("map-markers");
		map.addLayer(new OpenLayers.Layer.OSM());
		var zoom = 16;
		 
		var lonLat = new OpenLayers.LonLat(parseFloat(-3.7006813), parseFloat(40.4084496) )
		          .transform(
		            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
		            map.getProjectionObject() // to Spherical Mercator Projection
		          );

		map.setCenter (lonLat, zoom);
		
		var markers = new OpenLayers.Layer.Markers("Markers");
		map.addLayer(markers);
		
		AutoSizeAnchored = OpenLayers.Class(OpenLayers.Popup.Anchored, {
	            'autoSize': true,
	            'minSize': new OpenLayers.Size(350,120)
	    });
		
		var lonLat1 = new OpenLayers.LonLat(parseFloat(-3.7012135), parseFloat(40.4087411) )
		.transform(
	            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
	            map.getProjectionObject() // to Spherical Mercator Projection
	          );
	
		var feature1 = new OpenLayers.Feature(markers, lonLat1); 
        feature1.closeBox = true;
        feature1.popupClass = AutoSizeAnchored;
        feature1.data.overflow = "auto";

        
		feature1.data.popupContentHTML = "<div id='logo-espacio'><img src='../img/plaza-de-lavapies.jpg' /></div><div id='txt-espacio'><strong>Plaza de Lavapi�s</strong><br> Plaza de Lavapi�s</p><p>  </p></div>";
                
        var marker1 = feature1.createMarker();
        
        var markerClick1 = function (evt) {
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
        marker1.events.register("mousedown", feature1, markerClick1);
		
        markers.addMarker(marker1);
		

		var lonLat2 = new OpenLayers.LonLat(parseFloat(-3.7022709), parseFloat(40.4106338) )
		.transform(
	            new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
	            map.getProjectionObject() // to Spherical Mercator Projection
	          );
	
		var feature2 = new OpenLayers.Feature(markers, lonLat2); 
        feature2.closeBox = true;
        feature2.popupClass = AutoSizeAnchored;
        feature2.data.overflow = "auto";

        
		feature2.data.popupContentHTML = "<div id='logo-espacio'><img src='../img/plaza-xose-tarrio.jpg' /></div><div id='txt-espacio'><p><a href='http://plazaxosetarrio.wordpress.com/' ><strong>Plaza Xos� Tarrio</strong></a><br> Ministriles 6</p><p> Xos� Tarrio pas� m�s de 16 a�os en prisi�n y muri� a causa de ella, a causa de a�os de tortura, enfermedad, aislamiento. El d�a 3 de enero del a�o 2009, familiares, compa�erxs y amigxs de Xos� se reunieron en Madrid para llevar a cabo un particular homenaje, la inauguraci�n de la plaza Xos� Tarrio. </p></div>";
                
        var marker2 = feature2.createMarker();
        
        var markerClick2 = function (evt) {
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
        marker2.events.register("mousedown", feature2, markerClick2);
		
        markers.addMarker(marker2);
				
	
});
