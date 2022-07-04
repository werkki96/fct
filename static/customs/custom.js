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
    let markers = [];
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


//network topology create
function draw(dir) {
    // Create a data table with nodes.
    nodes = [];

    // Create a data table with links.
    edges = [];

    nodes.push({
        id: 1,
        label: "교장실",
        x: x+=100,
        y: y+=50,
        image: dir + "router.png",
        shape: "image",
    });
    nodes.push({
        id: 2,
        label: "Switch",
        x: x+=100,
        y: y+=50,
        image: dir + "switch.png",
        shape: "image",
    });
    edges.push({ from: 1, to: 2, length: EDGE_LENGTH_MAIN });
    arr = ["169.0.1.16","169.0.1.17","169.0.1.18","169.0.1.19"]
    for (var i = 3; i <= 6; i++) {
        nodes.push({
            id: i,
            label: arr[i-3],
            x: x+=100,
            y: y+=50,
            image: dir + "pc.png",
            shape: "image",
        });
        edges.push({ from: 2, to: i, length: EDGE_LENGTH_SUB });
    }

    nodes.push({
        id: 101,
        label: "Printer",
        image: dir + "Hardware-Printer-Blue-icon.png",
        x: x+=100,
        y: y+=50,
        shape: "image",
    });
    edges.push({ from: 2, to: 101, length: EDGE_LENGTH_SUB });

    nodes.push({
        id: 11,
        label: "제1교무실",
        x: x+=100,
        y: y+=50,
        image: dir + "router.png",
        shape: "image",
    });
    nodes.push({
        id: 12,
        label: "Switch",
        x: x+=100,
        y: y+=50,
        image: dir + "switch.png",
        shape: "image",
    });
    edges.push({ from: 11, to: 12, length: EDGE_LENGTH_MAIN });
    arr = ["169.14.21.16","169.14.21.17","169.14.21.18","169.14.21.19"]
    for (var i = 13; i <= 16; i++) {
        nodes.push({
            id: i,
            label: arr[i-13],
            x: x+=100,
            y: y+=50,
            image: dir + "pc.png",
            shape: "image",
        });
        edges.push({ from: 12, to: i, length: EDGE_LENGTH_SUB });
    }

    nodes.push({
        id: 1101,
        label: "Printer",
        image: dir + "Hardware-Printer-Blue-icon.png",
        x: x+=100,
        y: y+=50,
        shape: "image",
    });
    edges.push({ from: 12, to: 1101, length: EDGE_LENGTH_SUB });

    nodes.push({
        id: 104,
        label: "39120",
        x: x+=100,
        y: y+=50,
        image: dir + "System-Firewall-2-icon.png",
        shape: "image",
    });
    edges.push({ from: 1, to: 104, length: EDGE_LENGTH_SUB });
    edges.push({ from: 11, to: 104, length: EDGE_LENGTH_SUB });

    // create a network
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {};
    network = new vis.Network(container, data, options);
}



let test24;
let test22 = 0;
function test2(json) {
    // {# animate map #}
            loop_length = json[0].timestamps[json[0].timestamps.length-1]+100
    //console.log(loop_length)
    let currentTime = 0;
    const props = {
        id: "trips",
        data: DATA_URL,
        getPath: (d) => d.path,
        getTimestamps: (d) => d.timestamps,
        getColor: (d) => VENDOR_COLORS[d.vendor],
        opacity: 1,
        widthMinPixels: 5,
        trailLength: 180,
        currentTime,
        shadowEnabled: false,
    };
    const overlay = new GoogleMapsOverlay({});
    const animate = () => {
        currentTime = (currentTime + 1) % loop_length;
        test22++;
        const tripsLayer = new TripsLayer({
            ...props,
            currentTime,
        });
        if(map.getZoom() < 10) {
            overlay.setProps({
                layers: [tripsLayer],
            });
            if (currentTime == json[0].timestamps[j]) {
                show(j)
                if (j > 0 && j < json[0].timestamps.length) {
                    threat_type = "네트워크 경유"
                    if (j == json[0].timestamps.length - 1) threat_type = "위협발생"
                    $('#tb_threat_log').append(AddLog(json[0].location[j - 1], json[0].location[j], threat_type))
                }
                if (j > 1) markers[j - 2].setMap(null);
                markers[j++].setAnimation(google.maps.Animation.BOUNCE)

            } else if (currentTime == loop_length - 1) {
                for (let i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                $('#tb_threat_log').html('');
                j = 0;
            }
        }
        if(!flag) test24 = window.requestAnimationFrame(animate);
        else {
            window.cancelAnimationFrame(test24)
            overlay.setMap(null)
            hideAll(markers)
        }
    }

    let j = 0;
    $('#tb_threat_log').text('')

    // {# new create markers #}
    if(map.getZoom() < 10)  markers = newMarkers(json[0].location.length, json[0].location, target)

    hide = function (index) {
        markers[index].setMap(null);
    }
    hideAll = function (mark) {
        for (let i = 0; i < mark.length; i++) {
            mark[i].setMap(null);
        }
    }
    show = function (index) {
        markers[index].setMap(map);
    }
    hideAll(markers)


    // {# 마커 클릭시 텍스트 정의 #}
    const contentString = "<span class='text-black'>test one 2 three</span>";
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200,
    });

    // {# marker zoom up event #}
    markers[markers.length-1].addListener("click", (e) => {
        map.setCenter(markers[markers.length-1].getPosition());
        animateMapZoomTo(map, 18)
        map.setZoom(18)
        hideAll(markers)
    });

    // {# marker zoom up event #}
    map.addListener("zoom_changed", (e) => {
        if(map.zoom > 14) {
            markers2 = newMarkers(5, ["종합대학","혁명사적관","학생빌딩","과학도서관",".."], [target[3],
                {lat:39.05807855450129, lng:125.76711363450084},
                {lat:39.05934347236878, lng:125.77019746627538},
                {lat:39.05628854814572, lng:125.7673594819969},
                {lat:39.05695679415487, lng:125.77108898847766}]);
            console.log(markers2, "22")
            for (let i=0;i<markers2.length;i++) {
                markers2[i].setMap(map)
            }
        } else if (map.zoom < 10) {
            hideAll(markers2)
            markers = newMarkers(json[0].location.length, json[0].location, target)
        }else {
            hideAll(markers)
            hideAll(markers2)
        }
    });


    window.requestAnimationFrame(animate);

    return overlay;
}