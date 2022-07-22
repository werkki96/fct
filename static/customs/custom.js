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
        testde = place
        let photo = place.photos;
        let addr = place.formatted_address;
        let call_num = place.formatted_phone_number;
        let location = place.geometry.location; //lat, lng
        let website = place.website;
        let gmap_url = place.url;
        let type = place.types;
        let review = place.reviews;
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
            place_div.append(makeContent("위경도", location.lat + ", " + location.lng));
        if(location != undefined)
            place_div.append(makeContent("위경도", location.lat + ", " + location.lng));
        // if(location != undefined)
        //     place_div.append(makeContent("위경도", location.lat + ", " + location.lng));
        // if(location != undefined)
        //     place_div.append(makeContent("위경도", location.lat + ", " + location.lng));
        // if(location != undefined)
        //     place_div.append(makeContent("위경도", location.lat + ", " + location.lng));
    }
}
function makeContent(title, content) {
    html = "<div class='card-body' style='flex:0.01 1;'>" +
            "<h4 class='card-title text-info'>" + title + "</h4>" +
            "<span class='text-dark'>" + content + "</span>" +
            "</div>";
    return html;
}
/*
* End get place detail
* */
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


function animateMapZoomTo(map, targetZoom) {
    let currentZoom = arguments[2] || map.getZoom();
    if (currentZoom != targetZoom) {
        google.maps.event.addListenerOnce(map, 'zoom_changed', function (event) {
            animateMapZoomTo(map, targetZoom, currentZoom + (targetZoom > currentZoom ? 1 : -1));
        });
        setTimeout(function(){ map.setZoom(currentZoom) }, 300);
    }
}

let aniHandler;
let aa ;
function AnimationOverlayView(json) {
    // {# animate map #}
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
    aa = props
    show = function(index) {
        markers[index].setMap(map);
        markers_2[index].setMap(map);
        markers_3[index].setMap(map);
        markers_4[index].setMap(map);
        markers_5[index].setMap(map);
        markers_6[index].setMap(map);
        markers_7[index].setMap(map);
        markers_8[index].setMap(map);
        markers_9[index].setMap(map);
        markers_10[index].setMap(map);
        markers_11[index].setMap(map);
        markers_12[index].setMap(map);
        markers_13[index].setMap(map);
        markers_14[index].setMap(map);
        markers_15[index].setMap(map);
        markers_16[index].setMap(map);
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
                    $('#tb_threat_log tbody').append(AddLog(json[0].location[j - 1], json[0].location[j], threat_type, json[0]))
                }
                if (j > 1){
                    markers[j - 2].setMap(null);
                    markers_2[j - 2].setMap(null);
                    markers_3[j - 2].setMap(null);
                    markers_4[j - 2].setMap(null);
                    markers_5[j - 2].setMap(null);
                    markers_6[j - 2].setMap(null);
                    markers_7[j - 2].setMap(null);
                    markers_8[j - 2].setMap(null);
                    markers_9[j - 2].setMap(null);
                    markers_10[j - 2].setMap(null);
                    markers_11[j - 2].setMap(null);
                    markers_12[j - 2].setMap(null);
                    markers_13[j - 2].setMap(null);
                    markers_14[j - 2].setMap(null);
                    markers_15[j - 2].setMap(null);
                    markers_16[j - 2].setMap(null);
                }
                markers_2[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_3[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_4[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_5[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_6[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_7[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_8[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_9[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_10[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_11[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_12[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_13[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_14[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_15[j].setAnimation(google.maps.Animation.BOUNCE)
                markers_16[j].setAnimation(google.maps.Animation.BOUNCE)
                markers[j++].setAnimation(google.maps.Animation.BOUNCE)


            } else if (currentTime == loop_length - 1) {
                for (let i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                    markers_2[i].setMap(null);
                    markers_3[i].setMap(null);
                    markers_4[i].setMap(null);
                    markers_5[i].setMap(null);
                    markers_6[i].setMap(null);
                    markers_7[i].setMap(null);
                    markers_8[i].setMap(null);
                    markers_9[i].setMap(null);
                    markers_10[i].setMap(null);
                    markers_11[i].setMap(null);
                    markers_12[i].setMap(null);
                    markers_13[i].setMap(null);
                    markers_14[i].setMap(null);
                    markers_15[i].setMap(null);
                    markers_16[i].setMap(null);
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
    //lat 오른쪽 왼쪽, lng 위아래
    // 북한 { lat: 39.058678662262984, lng: 125.76824421680736 }
    // 영국 { lat: 51.4510898289427, lng: -1.7277438152626 }
    // 러시아 { lat: 55.76633, lng:37.63332 }
    // 중국 { lat: 39.91040, lng: 116.40784 }
    // 홍콩 { lat: 22.29579, lng: 114.13927 }
    // 미국 { lat: 38.90535, lng: -77.03427 }
    // 스위스 { lat: 46.97053, lng: 7.44797 }
    // 싱가포르 { lat: 0.38322614183837, lng: 103.884164188281 }
    // 일본 { lat: 34.3710341583988, lng: 136.907403270728 }
    // 캐나다 [{ lat: 45.55459, lng: -75.72917 }
    // 브라질 { lat: -11.04565062461054, lng: -39.9190236603046 }
    // 스웨덴 { lat : 59.32393, lng : 18.06198 }
    // 남아공 { lat: -29.21951, lng: 26.08857 }
    // 불가리아 { lat : 41.4265131266211, lng: 24.9206256368066 },
    // 캄보디아 { lat : 11.54629, lng : 104.93112 }
    // 필리핀 { lat: 14.60311, lng: 120.98620 }
    // 대한민국 lat : 37.63124, lng : 127.2899  }
    // 이집트 { lat: 30.11246, lng: 31.20469 }
    // 이탈리아 { lat : 41.92704, lng : 12.44452 }
    // 호주 { lat : -35.30468, lng : 149.11818 }
    // 뉴질랜드 { lat : -41.29896, lng : 174.78678 }
    // 브라질 { lat : -15.68335, lng : -47.80003 }
    // 페루 { lat : -12.00122, lng : -77.00774 }
    // 콜롬비아  { lat :4.74056, lng : -74.04241 }
    // 노르웨이 { lat :59.98176, lng : 10.58528 }
    // {# new create markers #}
    if(map.getZoom() < 10) {
        markers = newMarkers(json[0].location.length, json[0].location, target)
        markers_2 = newMarkers(json[1].location.length, json[1].location, target_2)
        markers_3 = newMarkers(json[2].location.length, json[2].location, target_3)
        markers_4 = newMarkers(json[3].location.length, json[3].location, target_4)
        markers_5 = newMarkers(json[4].location.length, json[4].location, target_5)
        markers_6 = newMarkers(json[5].location.length, json[5].location, target_6)
        markers_7 = newMarkers(json[6].location.length, json[6].location, target_7)
        markers_8 = newMarkers(json[7].location.length, json[7].location, target_8)
        markers_9 = newMarkers(json[8].location.length, json[8].location, target_9)
        markers_10 = newMarkers(json[9].location.length, json[9].location, target_10)
        markers_11 = newMarkers(json[10].location.length, json[10].location, target_11)
        markers_12 = newMarkers(json[11].location.length, json[11].location, target_12)
        markers_13 = newMarkers(json[12].location.length, json[12].location, target_13)
        markers_14 = newMarkers(json[13].location.length, json[13].location, target_14)
        markers_15 = newMarkers(json[14].location.length, json[14].location, target_15)
        markers_16 = newMarkers(json[15].location.length, json[15].location, target_16)

    }markerShowAll(markers_2, map)
    markerShowAll(markers_3, map)
    markerShowAll(markers_4, map)
    markerShowAll(markers_5, map)
    markerShowAll(markers_6, map)
    markerShowAll(markers_7, map)
    markerShowAll(markers_8, map)
    markerShowAll(markers_9, map)
    markerShowAll(markers_10, map)
    markerShowAll(markers_11, map)
    markerShowAll(markers_12, map)
    markerShowAll(markers_13, map)
    markerShowAll(markers_14, map)
    markerShowAll(markers_15, map)
    markerShowAll(markers_16, map)



    hideAll(markers_2)
    hideAll(markers_3)
    hideAll(markers_4)
    hideAll(markers_5)
    hideAll(markers_6)
    hideAll(markers_7)
    hideAll(markers_8)
    hideAll(markers_9)
    hideAll(markers_10)
    hideAll(markers_11)
    hideAll(markers_12)
    hideAll(markers_13)
    hideAll(markers_14)
    hideAll(markers_15)
    hideAll(markers_16)


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
        flag = true
    });

    markers_2[markers_2.length-1].addListener("click", (a) => {
        map.setCenter(markers_2[markers_2.length-1].getPosition());
        animateMapZoomTo(map, 15)
        map.setZoom(15)
        hideAll(markers_2)
        flag = true
    });

    markers_3[markers_3.length-1].addListener("click", (b) => {
        map.setCenter(markers_3[markers_3.length-1].getPosition());
        animateMapZoomTo(map, 18)
        map.setZoom(18)
        hideAll(markers_3)
        flag = true
    });

    markers_4[markers_4.length-1].addListener("click", (c) => {
        map.setCenter(markers_4[markers_4.length-1].getPosition());
        animateMapZoomTo(map, 18)
        map.setZoom(18)
        hideAll(markers_4)
        flag = true
    });

    markers_5[markers_5.length-1].addListener("click", (d) => {
        map.setCenter(markers_5[markers_5.length-1].getPosition());
        animateMapZoomTo(map, 18)
        map.setZoom(18)
        hideAll(markers_5)
        flag = true
    });

    flightPath = null;
    // {# marker zoom up event #}
    map.addListener("zoom_changed", function (e) {
        //줌했을때 물리노드 보이는 좌표
        zoomTarget = [target[3],
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
        } else if (map.zoom < 10 && map.zoom >= 3) {
            hideAll(markers2)
            //markerShowAll(markers, map)
            if(flag == true) {
                aniHandler = window.requestAnimationFrame(animate);

            }
            //markers = newMarkers(json[0].location.length, json[0].location, target)
            flag = false;
        } else {
            hideAll(markers)
            hideAll(markers2)
            flightPath.setVisible(false)
        }
    });

    map.addListener("zoom_changed", (a) => {
        //줌했을때 물리노드 보이는 좌표
        zoomTarget2 = [target_2[3],
            { lat : 37.92713, lng : 126.63468 },
            { lat : 37.92945, lng : 126.63647 },
            { lat : 37.92935, lng : 126.62565 }]
        zoomTarget = zoomTarget.concat([zoomTarget2[0], zoomTarget2[2], zoomTarget2[1], zoomTarget2[3]])
        if(flightPath != null) {
            flightPath = new google.maps.Polyline({
                path: zoomTarget2,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
        }
        if(map.zoom > 14) {
            if(markers2 != ''){
                markers2 = newMarkers(3, ["개성공업지구","개성부천공업(주)","평화변전소",".."], zoomTarget2);
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
        } else {
            hideAll(markers_2)
            hideAll(markers2)
            flightPath.setVisible(false)
        }

    });

    map.addListener("zoom_changed", (b) => {
        //줌했을때 물리노드 보이는 좌표
        zoomTarget3 = [target_3[3],
            { lat : 39.77649, lng : 125.75728 },
            { lat : 39.77567, lng : 125.75433 },
            { lat : 39.79758, lng : 125.75486 }]
        zoomTarget = zoomTarget.concat([zoomTarget3[0], zoomTarget3[2], zoomTarget3[1], zoomTarget3[3]])
        if(flightPath != null) {
            flightPath = new google.maps.Polyline({
                path: zoomTarget3,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
        }
        if(map.zoom > 14) {
            if(markers2 != ''){
                markers2 = newMarkers(3, ["영변 원자력 발전소","영변 증기 발전소 1지부","영변 증기 발전소 2지부",".."], zoomTarget3);
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
        } else {
            hideAll(markers_3)
            hideAll(markers2)
            flightPath.setVisible(false)
        }

    });

    map.addListener("zoom_changed", (c) => {
        //줌했을때 물리노드 보이는 좌표
        zoomTarget4= [target_4[3],
            { lat : 40.95816, lng : 126.60888 },
            { lat : 40.95811, lng : 126.61243 },
            { lat : 40.95883, lng : 126.61385 },
            { lat : 40.95850, lng : 126.60760 }]
        zoomTarget = zoomTarget.concat([zoomTarget4[1], zoomTarget4[2], zoomTarget4[3], zoomTarget4[4], zoomTarget4[0], zoomTarget4[1]])
        if(flightPath != null) {
            flightPath = new google.maps.Polyline({
                path: zoomTarget4,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
        }
        if(map.zoom > 14) {
            if(markers2 != ''){
                markers2 = newMarkers(4, ["고려국방대학원 공학관","강계 정밀기계연합공장", "고려국방대학원 인문관", "고려국방대학원 원자력융합 대학원"], zoomTarget4);
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
        } else {
            hideAll(markers_4)
            hideAll(markers2)
            flightPath.setVisible(false)
        }
    });

    map.addListener("zoom_changed", (d) => {
        //줌했을때 물리노드 보이는 좌표
        zoomTarget5= [target_5[3],
            { lat : 39.02392, lng : 125.74630 },
            { lat : 39.01773, lng : 125.74469 },
            { lat : 39.02033, lng : 125.74918 },
            { lat : 39.02117, lng : 125.75305 }]
        zoomTarget = zoomTarget.concat([zoomTarget5[0], zoomTarget5[1], zoomTarget5[2], zoomTarget5[3], zoomTarget[3]])
        if(flightPath != null) {
            flightPath = new google.maps.Polyline({
                path: zoomTarget5,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
        }
        if(map.zoom > 14) {
            if(markers2 != ''){
                markers2 = newMarkers(4, ["조선노동당 본부","로씨야 대사관", "조선노동당 1호 청사", "인민대학습당"], zoomTarget5);
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
        } else {
            hideAll(markers_5)
            hideAll(markers2)
            flightPath.setVisible(false)
        }
    });
    window.requestAnimationFrame(animate);

    return overlay;
}

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