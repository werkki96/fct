const map_styles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
];



//{# 아이콘 정의 #}
const icons =  function(google) {
    return {
        nuclear: {
            url: "/static/img/icons/nuclear.png",
            size: new google.maps.Size(90, 90),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(30, 30),
        },
        n_school: {
            url: "/static/img/icons/nuclear_negative.png",
            size: new google.maps.Size(90, 90),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(40, 40),
        },
        school: {
            url: "/static/img/icons/school_negative.png",
            size: new google.maps.Size(90, 90),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(40, 40),
        },
        pc: {
            url: "/static/img/icons/PC.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
            labelOrigin: new google.maps.Point(70, 20),
        },
        server: {
            url: "/static/img/icons/server.png",
            size: new google.maps.Size(100, 120),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(40, 40)
        },
        router: {
            url: "/static/img/icons/router.png",
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 30),
            scaledSize: new google.maps.Size(25, 25)
        },
    };

}


function AddLog(startLoc, endLoc, type){
    tr = document.createElement('tr')
    location_td = document.createElement('td')
    type_td = document.createElement('td')
    location_td.setAttribute('class','text-danger');
    location_td.setAttribute('style','width:65%');
    location_td.innerText = startLoc+" ------------------------> "+endLoc;
    type_td.setAttribute('class','text-summary');
    type_td.setAttribute('class','font-weight-bold');
    type_td.innerText = type;
    tr.appendChild(location_td)
    tr.appendChild(type_td)
    return tr;
}


function newMarkers(length, markerText, positions, map){
    markers = [];
    for (let i = 0; i < length; i++) {
        markers.push(new google.maps.Marker({
            position: positions[i],
            icon: icons(google)['router'],
            map: map,
            label: {
                text: markerText[i],
                color: "#000000",
                fontWeight: "bold",
                fontSize: "16px",
                className: "map-label"
            },
        }));
    }
    return markers
}


function animateMapZoomTo(map, targetZoom) {
    var currentZoom = arguments[2] || map.getZoom();
    if (currentZoom != targetZoom) {
        google.maps.event.addListenerOnce(map, 'zoom_changed', function (event) {
            animateMapZoomTo(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
        });
        setTimeout(function(){ map.setZoom(currentZoom) }, 300);
    }
}