// formatted after lesson 15.1 #10

// determine marker size based on magnitude
function markerSize(magnitude){
    return magnitude * 5000;
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
        return '#800080'}
};

// store endpoint as queryURL
var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// array to hold earthquake markers
var earthquakeMarkers = [];

// Perform a GET request to the query URL
d3.json(queryURL).then(function (response) {

    // send response to createFeatures func
    createFeatures(response.features);

});

function createFeatures(earthquakeData) {
        
    for (var i = 0; i < earthquakeData.length; i++){

        var magnitude = earthquakeData[i].properties.mag
        var lat = earthquakeData[i].geometry.coordinates[1]
        var lng = earthquakeData[i].geometry.coordinates[0]
        var latlng = [lat, lng]
        var depth = earthquakeData[i].geometry.coordinates[2]
        var location = earthquakeData[i].properties.place

        earthquakeMarkers.push(
            L.circle(latlng, {
                stroke: true,
                fillOpacity: 0.75,
                color: markerColor(depth),
                radius: markerSize(magnitude)               
            }).bindPopup(`<h3>Location: ${location}</h3><hr><p>Time: ${new Date(earthquakeData[i].properties.time)}</p>`)
    )};

    // layer group for earthquake markers
    var earthquakes = L.layerGroup(earthquakeMarkers);

    // send earthquakes layer to createMap func
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // base layer/ background
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // baseMaps obj
    var baseMaps = {
        "Street Map": street
    };

    // overlayMaps obj
    var overlayMaps = {
        "Earthquakes": earthquakes
    };

    // define map object
    var myMap = L.map("map", {
        center: [58.3019, -134.4197],
        zoom: 4,
        layers: [street, earthquakes]
    });

    // create layer control
    // pass baseMaps and overlayMaps
    // add layer control to myMap
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

}