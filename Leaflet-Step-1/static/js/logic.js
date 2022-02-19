// determine marker size based on magnitude
function markerSize(mag){
    return mag * 10;
}

// marker color based on depth
function markerColor(depth){
    if (depth >= 90) {
        return '#ff0000'}
    else if (depth >= 70) {
        return '#ff7518'}
    else if (depth >= 50) {
        return '#ffea00'}
    else if (depth >= 30) {
        return '#228b22'}
    else if (depth >= 10) {
        return '#0047ab'}
    else {
        return '800080'}
};

// store endpoint as queryURL
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// array to hold earthquake markers
var earthquakeMarkers = [];

// Perform a GET request to the query URL
d3.json(queryURL).then(function (response) {

    // send response to createFeatures func
    createFeatures(response.features);
    
    function createFeatures(earthquakeData) {

        function onEachFeature(feature, layer) {
            
            for (var i = 0; i < response.length; i++){
            
                layer.bindPopup('<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>')
            
                earthquakeMarkers.push(
                    L.circle([response.features.geometry.coordinates[1], response.features.geometry.coordinates[0]], {
                        stroke: true,
                        fillOpacity: 0.75,
                        fillColor: markerColor(features.geometry.coordinates[2]),
                        radius: markerSize(features.properties.mag)
                    })
            )};
        }
    }

});

// base layer/ background
 var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// layer group for earthquake markers
var earthquakes = L.layerGroup(earthquakeMarkers);

// define map object
var myMap = L.map("map", {
    center: [36.9991, -109.0452],
    zoom: 5,
    layers: [street, earthquakes]
});



    