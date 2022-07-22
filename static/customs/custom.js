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
const STATIC_FOLDERS = "/static/img/icons/";


/*
* Start legend icon list init
* use: GeoMap.html
* writer: 장지수
* update: 2022/07/21
* */
//체크박스 형태로 필요한 아이콘만 볼 수 있게 설정
//https://jsfiddle.net/wpea43L1/
const LEGEND_ICONS = {
    "airport":{
        url:STATIC_FOLDERS + "airport-icon.png",
        name: "비행장",
        openType: true,
    },
    "bridge": {
        url: STATIC_FOLDERS + "bridge-icon.png",
        name: "다리",
        openType: true,
    },
    "camera":{
        url:STATIC_FOLDERS + "camera-icon.png",
        name:"관광명소",
        openType:true,
    },
    "civic_bldg":{
        url:STATIC_FOLDERS + "civic_bldg-icon.png",
        name:"대사관",
        openType:true,
    },
    "ferriswheel":{
        url:STATIC_FOLDERS + "ferriswheel-icon.png",
        name:"놀이공원",
        openType:true,
    },
    "historic":{
        url:STATIC_FOLDERS + "historic-icon.png",
        name:"역사적명소",
        openType:true,
    },
    "library":{
        url:STATIC_FOLDERS + "library-icon.png",
        name:"도서관",
        openType:true,
    },
    "lodging":{
        url:STATIC_FOLDERS + "lodging-icon.png",
        name:"호텔",
        openType:true,
    },
    "restaurant":{
        url:STATIC_FOLDERS + "restaurant-icon.png",
        name:"식당",
        openType:true,
    },
    "school":{
        url:STATIC_FOLDERS + "school-icon.png",
        name:"교육시설",
        openType:true,
    },
    "park":{
        url:STATIC_FOLDERS + "tree-icon.png",
        name:"공원",
        openType:true,
    },
    "metro":{
        url:STATIC_FOLDERS + "metro-icon.png",
        name:"지하철",
        openType:true,
    },
    "transit":{
        url:STATIC_FOLDERS + "transit-icon.png",
        name:"기차",
        openType:true,
    },
    "parking":{
        url:STATIC_FOLDERS + "parking-icon.png",
        name:"parking",
        openType:true,
    },
    "bgp": {
        url:STATIC_FOLDERS + "router.png",
        name:"AS Router",
        openType:true,
    },
};
function initLegends() {
    let tbl = $('.legends-list #openLocations');
    $.each(LEGEND_ICONS, function(key, val){
        tbl.append(
            "<tr>" +
            "<td style='width:20%;' class='text-center'>" +
            "<img src='" + val.url + "' alt='" + val.name + "' width='34.5' height='48'>" +
            "</td>" +
            "<td>" +
            "<span class='text-dark font-weight-bold'>" + val.name + "</span>" +
            "</td>" +
            "</tr>");
    });
    tbl.parent().height($('#map').height())
    tbl.parent().css('overflow','auto')
}
/*
* End legend icon list init
* */

/*
* Start get place detail
* use: GeoMap.html
* writer: 장지수
* update: 2022/07/21
* */
let testde;
function getPlaceDetail(event) {

    if(event.placeId) {
        // usable fields: address_components, formatted_address, business_status, formatted_phone_number, geometry
        // plus_code, icon, international_phone_number, name, opening_hours
        // photos, place_id, rating, reviews, types, url, vicinity, website
        let request = {
            placeId: event.placeId,
            fields: [
                'name', 'rating', 'formatted_phone_number', 'geometry' , 'formatted_address', 'address_component'
                , 'plus_code', 'icon', 'international_phone_number', 'opening_hours'
                , 'photos', 'place_id', 'reviews', 'types', 'url', 'vicinity', 'website', 'business_status'
            ]
        };

        service = new google.maps.places.PlacesService(map);
        service.getDetails(request, callback);

    }
}
function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        let photo = place.photos;
        let addr = place.formatted_address;
        let call_num = place.formatted_phone_number;
        let location = place.geometry.location; //lat, lng
        let website = place.website;
        let gmap_url = place.url;
        let type = place.types;
        //let review = place.reviews;
        let name = place.name;
        let place_div = $('#place_detail');
        place_div.empty();
        if(name != undefined)
            place_div.append(
                "<div class='card-body' style='flex:0.01 1;'>" +
                "<h3 class='card-title'>" + name + "</h3>" +
                "</div>"
            );
        if(addr != undefined)
            place_div.append(makeContent("주소", addr));
        if(location != undefined)
            place_div.append(makeContent("위경도", location.lat() + ", " + location.lng()));
        if(call_num != undefined)
            place_div.append(makeContent("전화번호", call_num));
        if(type != undefined)
            place_div.append(makeContent("시설 정보", type[0].replace("_", " ")));
        // if(review != undefined)
        //     place_div.append(makeContent("리뷰", review));
        if(website != undefined)
            place_div.append(makeContent("홈페이지", "<a href='"+website+"' class='text-primary'>"+website+"</a>"));
        if(gmap_url != undefined)
            place_div.append(makeContent("구글지도에서 보기", "<a href='"+gmap_url+"' class='text-primary'>"+gmap_url+"</a>"));
        if(photo != undefined)
            place_div.append(makeContent("사진", photo));

        if($('#mapDivs').hasClass('col-xl-9') && $('#mapDivs').hasClass('col-md-9')) {
            place_div.removeClass('d-none')
            $('#mapDivs').removeClass('col-xl-9')
            $('#mapDivs').removeClass('col-md-9')
            $('#mapDivs').addClass('col-xl-6')
            $('#mapDivs').addClass('col-md-6')
        }
    }
}
function makeContent(title, content) {
    let html = "";
    if(typeof(content) != 'object') {
        html = "<div class='card-body' style='flex:0.01 1;'>" +
            "<h4 class='card-title text-info'>" + title + "</h4>" +
            "<span class='text-dark'>" + content + "</span>" +
            "</div>";
    } else {
        if(title == "사진") {
            let li = "";
            let imgDiv = "";
            html = "<div class='card-body' style='flex:0.01 1;'>" +
                "<h4 class='card-title text-info'>" + title + "</h4>" +
                "<div class='carousel slide' data-ride='carousel' id='photos'>";

            $.each(content, function (key, val) {
                li += "<li data-target='#photos' data-slide-to='" + key + "' ";
                if (key == 0) {
                    li += "class='active'>";
                } else {
                    li += ">";
                }
                li += "</li>";


                imgDiv += "<div class='carousel-item ";
                if (key == 0) {
                    imgDiv += "active'>";
                } else {
                    imgDiv += "'>";
                }
                imgDiv += "<img src='" + val.getUrl() + "' alt='Los Angeles' width='100%' height='300'>"
                imgDiv += "</div>";
            });

            html += "<ul class='carousel-indicators'>" + li + "</ul>";
            html += "<div class='carousel-inner'>" + imgDiv + "</div>";

            html += "<a class='carousel-control-prev' href='#photos' data-slide='prev'>" +
                "<span class='carousel-control-prev-icon'></span>" +
                "</a>" +
                "<a class='carousel-control-next' href='#photos' data-slide='next'>" +
                "<span class='carousel-control-next-icon'></span>" +
                "</a>" +
                "</div>"
        }
        // } else if(title == "리뷰") {
        //
        // }
    }
    return html;
}
/*
* End get place detail
* */

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

/*
* Start Threat Log Detail
* use: ThreatTrafic.html
* writer: 장지수
* update: 2022/07/22
* */
//체크박스 형태로 필요한 아이콘만 볼 수 있게 설정
function openLogDetail(json) {
    table = $('#tb_threat_log_detail tbody');
    table.empty();
    if($('#threatDetailDiv').hasClass('d-none')) {
        if ($('#mapDiv').hasClass('col-xl-9') && !$('#mapDiv').hasClass('col-xl-6')) {
            $('#mapDiv').removeClass('col-xl-9')
            $('#mapDiv').addClass('col-xl-6')
            $('#threatDetailDiv').removeClass('d-none')
        }
    }
    console.log(json)

    for(let i = 0;i<json.path.length-1;i++) {
        threat_type = "네트워크 경유"
        if (i == json.timestamps.length - 1) threat_type = "위협발생"
        // 1 row
        table.append(
            '<tr>' +
            '<td style="width:5%;">'+i+'</td>' +
            '<td style="width:30%;">'+json.location[i]+'</td>' +
            '<td style="width:30%;">'+json.location[i+1]+'</td>' +
            '<td>'+threat_type+'</td>' +
            '</tr>');
        // 2 row
        table.append(
            '<tr>' +
            '<td>'+json.location[i]+'</td>' +
            '<td colspan="3">' +
            'ip: ' + json.location[i] +
            '<br>위경도: ' + json.path[i][0] + ', ' + json.path[i][1] +
            '<br>소유자 : ???' +
            '<br>트래픽 전송 시간: ' + json.timestamps[i] +
            '</td>' +
            '</tr>');
        // 3 row
        table.append(
            '<tr>' +
            '<td>'+json.location[i+1]+'</td>' +
            '<td colspan="3">' +
            'ip: ' + json.location[i+1] +
            '<br>위경도: ' + json.path[i+1][0] + ', ' + json.path[i+1][1] +
            '<br>소유자 : ???' +
            '<br>트래픽 전송 시간: ' + json.timestamps[i+1] +
            '</td>' +
            '</tr>');
    }
}

function closeLogDetail() {
    div = $('#threatDetailDiv');
    div.addClass('d-none')
    if(!$('#mapDiv').hasClass('col-xl-9') && $('#mapDiv').hasClass('col-xl-6')) {
        $('#mapDiv').removeClass('col-xl-6')
        $('#mapDiv').addClass('col-xl-9')
    }
}
/*
* End Threat Log Detail
* */

/*
* Start Threat Log list
* use: ThreatTrafic.html
* writer: 장지수
* update: 2022/07/22
* */
//체크박스 형태로 필요한 아이콘만 볼 수 있게 설정
function AddLog(startLoc, endLoc, type, json){
    tr = document.createElement('tr')
    start_td = document.createElement('td')
    end_td = document.createElement('td')
    type_td = document.createElement('td')
    tr.onclick = function() {
        openLogDetail(json)
    }
    start_td.setAttribute('class','text- font-weight-bold');
    start_td.setAttribute('style','width:30%');
    start_td.innerText = startLoc;
    end_td.setAttribute('class','text- font-weight-bold');
    end_td.setAttribute('style','width:30%');
    end_td.innerText = endLoc;
    type_td.setAttribute('class','text-summary');
    type_td.setAttribute('class','font-weight-bold');
    type_td.innerText = type;
    tr.appendChild(start_td)
    tr.appendChild(end_td)
    tr.appendChild(type_td)
    return tr;
}
/*
* End Threat Log list
* */
/*
* Start create New Marker
* use: ThreatTrafic.html
* writer: 장지수
* update: 2022/07/22
* */
function newMarkers(length, markerText, positions, map){
    let markers = [];
    for (let i = 0; i < length; i++) {
        markers.push(new google.maps.Marker({
            position: positions[i],
            icon: icons(google)['router'],
            map: map,
            label: {
                text: markerText[i],
                //color: "#000000",
                fontWeight: "bold",
                fontSize: "16px",
                className: "marker-labels"
            },
            id:"test"
        }));
    }
    return markers
}
/*
* End create New Marker
* */

/*
* Start Map Zoom using Animation
* use: ThreatTrafic.html
* writer: 장지수
* update: 2022/07/22
* */
function animateMapZoomTo(map, targetZoom) {
    let currentZoom = arguments[2] || map.getZoom();
    if (currentZoom != targetZoom) {
        google.maps.event.addListenerOnce(map, 'zoom_changed', function (event) {
            animateMapZoomTo(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
        });
        setTimeout(function(){ map.setZoom(currentZoom) }, 300);
    }
}
/*
* End Map Zoom using Animation
* */
/*
* Start set Marker Coordinate
* use: ThreatTrafic.html
* writer: 박한솔
* update: 2022/07/21
* */
function coordinate(json){
    coordi = new Array();

    for(i = 0; i < json.length; i++){
        coordi[i] = [{ lat : json[i].path[0][1], lng: json[i].path[0][0]},
                     { lat : json[i].path[1][1], lng: json[i].path[1][0]},
                     { lat : json[i].path[2][1], lng: json[i].path[2][0]},
                     { lat : json[i].path[3][1], lng: json[i].path[3][0]}]
    }
    return coordi
}
/*
* End  set Marker Coordinate
* */
let aniHandler;

/*
* Start Map Overlay Animation Traffic
* use: ThreatTrafic.html
* writer: 장지수
* update: 2022/07/21
* */
function AnimationOverlayView(json) {
    // {# animate map #}
    let tbl = $('#tb_threat_log tbody');
    coordi = coordinate(json)
    loop_length = json[0].timestamps[json[0].timestamps.length-1]+100
    //console.log(loop_length)
    let currentTime = 0;
    let props = {
        id: "trips",
        data: DATA_URL,
        getDataId: (d) => d.id,
        getPath: (d) => d.path,
        getTimestamps: (d) => d.timestamps,
        getColor: (d) => VENDOR_COLORS[d.vendor],
        opacity: 0,
        widthMinPixels: 5,
        trailLength: 80,
        currentTime,
        shadowEnabled: false,
        rounded:true,
    };
    show = function(index) {
        for(i = 0; i < coordi.length; i++){
            markers[i][index].setMap(map);
        }
    }

    const overlay = new GoogleMapsOverlay({});

    const animate = () => {
        //console.log(props)
        let tripsLayer = new TripsLayer({
            ...props,
            currentTime,
        });
        overlay.setProps({
            layers: [tripsLayer],
        });
        currentTime = (currentTime + 1) % loop_length;

        if(map.getZoom() < 10) {
            if (currentTime == json[0].timestamps[j]) {
                show(j)
                if (j > 0 && j < json[0].timestamps.length) {
                    threat_type = "네트워크 경유"
                    if (j == json[0].timestamps.length - 1) threat_type = "위협발생"
                    for(i = 0; i < markers.length; i++){
                    tbl.append(AddLog(json[0].location[j - 1], json[0].location[j], threat_type, json[0]));
                    }
                    tbl.parent().parent().height($('#map').height());
                    tbl.parent().parent().css('overflow', 'auto');
                }
                if (j > 1){
                    for(let i = 0; i < coordi.length; i++){
                        markers[i][j-2].setMap(null);
                    }
                }

                // for(let i = 1; i < coordi.length; i++){
                //     markers[i][j].setAnimation(google.maps.Animation.BOUNCE)
                // }
                j++;
            } else if (currentTime == loop_length - 1) {

            for (let i = 0; i < coordi.length; i++){
                for (let j = 0; j < coordi[0].length; j++){
                    markers[i][j].setMap(null);
                }
            }
                $('#tb_threat_log tbody').empty();
                j = 0;
            }
        }
        if(!flag) {
            aniHandler = window.requestAnimationFrame(animate);
            if(props.opacity == 0) {
                currentTime = 0;
                show(0)
            }
            props.opacity = 1;

        }
        else {
            props.opacity = 0;
            window.cancelAnimationFrame(aniHandler)
            hideAll(markers)
        }
    }

    let j = 0;
    //$('#tb_threat_log').text('')
    // {# new create markers #}


    if(map.getZoom() < 10) {
        var markers = [];
        for(let i = 0; i < json.length; i ++){
            markers[i] = newMarkers(json[i].location.length, json[i].location, coordi[i])
        }

    }


    for(let i = 0; i < json.length; i++){
        markerShowAll(markers[i], map);
    }


    for(let i = 0; i < json.length; i++){
        hideAll(markers[i]);
    }

    // {# marker zoom up event #}
    markers[0][3].addListener("click", (e) => {
        map.setCenter(markers[0][3].getPosition());
        animateMapZoomTo(map, 18)
        map.setZoom(18)
        hideAll(markers)
        flag = true
    });


    flightPath = null;
    // {# marker zoom up event #}
    map.addListener("zoom_changed", (e) => {
        //줌했을때 물리노드 보이는 좌표
        zoomTarget = [markers[0][3],
            {lat:39.05807855450129, lng:125.76711363450084},
            {lat:39.05934347236878, lng:125.77019746627538},
            {lat:39.05628854814572, lng:125.7673594819969},
            {lat:39.05695679415487, lng:125.77108898847766}]
        zoomTarget = zoomTarget.concat([zoomTarget[0], zoomTarget[2], zoomTarget[4], zoomTarget[1], zoomTarget[3], zoomTarget[0]])
        if(flightPath == null) {
            flightPath = new google.maps.Polyline({
                path: zoomTarget,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
        }
        if(map.zoom > 14) {
            if(markers2 == ''){
                markers2 = newMarkers(5, ["종합대학","혁명사적관","학생빌딩","과학도서관",".."], zoomTarget);
            }markerShowAll(markers2, map)

            flightPath.setVisible(true);
            flightPath.setMap(map);
            flag = true;
        } else if (map.zoom < 10) {
            hideAll(markers2)
            //markerShowAll(markers, map)
            if(flag == true) {
                aniHandler = window.requestAnimationFrame(animate);

            }
            //markers = newMarkers(json[0].location.length, json[0].location, target)
            flag = false;
        }else {
            hideAll(markers[0])
            hideAll(markers2)
            flightPath.setVisible(false)
        }

    });
    window.requestAnimationFrame(animate);

    return overlay;
}
/*
* End Map Overlay Animation Traffic
* */

function hideAll(mark) {
    for (let i = 0; i < mark.length; i++) {
        mark[i].setMap(null);
    }
}
function markerShowAll(mark, map) {
    for (let i = 0; i < mark.length; i++) {
        mark[i].setMap(map);
    }
}