function initialize () {
	maxLimit = 10
   mapCenter = {lat: 32.75, lng: -97.13} 
	map = new google.maps.Map(document.getElementById('map'), {
	  center: mapCenter, 
	  zoom: 16
	});
}
function TableDisplay(json){
	//https://www.w3schools.com/css/tryit.asp?filename=trycss_table_vertical-align
	table = "<table>"
   table = table+"<tr>"
   table = table+"<th></th>"
   table = table+"<th></th>"
   table = table+"<th>Restaurant:</th>"
   table = table+"<th>Rating:</th>"
   table = table+"</tr>"
	for(var i=0;i<json["businesses"].length;i++){
		table = table+"<tr bgcolor='aliceblue'>"
      table = table+"<td>"
		table = table+(i+1)+")"
      table = table+"</td>"
      table = table+"<td></td>"
		table = table+"<img src=\"" + json["businesses"][i]["image_url"] + "\" style=\"height:75px;width:75px;\">"
      table = table+"</td><td>"
		table = table+"<a href=\"" + json["businesses"][i]["url"] + "\">" + json["businesses"][i]["name"] + "</a>"
      table = table+"</td><td>"
		table = table+json["businesses"][i]["rating"]
      table = table+"</td><td>"
		table = table+"</td></tr>"
	}
	table = table+"</table>"
	document.getElementById("output").innerHTML = "<th>Images:</th>"+table;
}

var MapPoint = [];
function sendRequest () {
	var xhr = new XMLHttpRequest();
   var SearchRestaurant =  encodeURI(document.getElementById("search").value);
   // https://developers.google.com/maps/documentation/javascript/reference/coordinates
   Boundary = map.getBounds();
   Latitude = Boundary.getCenter().lat();
   Longitude = Boundary.getCenter().lng();
   Radius = parseInt(google.maps.geometry.spherical.computeDistanceBetween(Boundary.getCenter(), Boundary.getSouthWest()))
   xhr.open("GET", "proxy.php?term=" + SearchRestaurant + "&limit=" + maxLimit + "&radius=" + Radius + "&latitude=" + Latitude + "&longitude=" + Longitude);
   xhr.setRequestHeader("Accept","application/json");
	xhr.onreadystatechange = function () {
		if (this.readyState == 4) {
			var json = JSON.parse(this.responseText);
         if (json["businesses"].length==0){
            Output = document.getElementById("output")
            Output.innerHTML = "No Results Were Found"
         }
         else{  
            //https://developers.google.com/maps/documentation/javascript/examples/marker-remove#maps_marker_remove-javascript
            function setMapOnAll(map) {
               for (let i = 0; i < MapPoint.length; i++){
                  MapPoint[i].setMap(map);
                  console.log("working");
               }
             }       
             //Removes the markers from the map, but keeps them in the array.
             function hideMarkers() {
               setMapOnAll(null);
             }
            hideMarkers();    
            MapPoint = [];     
            for(var i=0;i<json["businesses"].length;i++){
               const index = i;
               //https://developers.google.com/maps/documentation/javascript/examples/map-latlng-literal
               Pointer = new google.maps.LatLng({lat: json["businesses"][i]["coordinates"]["latitude"],
                lng: json["businesses"][i]["coordinates"]["longitude"]}); 
               MapPoint.push(new google.maps.Marker({position: Pointer, map: map, label: String(index+1)}));
               console.log("working");
            }
           
            marker.addListener("click", () => {
               console.log("working");
               });
            

            TableDisplay(json)
         }
			
		}
	};
	xhr.send(null);
}