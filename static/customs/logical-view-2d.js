window.initMap = function(){}

let network = null;
let nodes = null;
let edges = null;

const DIR = "static/img/refresh-cl/";
let EDGE_LENGTH_MAIN = 150;
let EDGE_LENGTH_SUB = 50;
x = 0
y = 0

// test val
let tt = null;

// network topology create
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
        group: "router"
    });
    nodes.push({
        id: 2,
        label: "Switch",
        x: x+=100,
        y: y+=50,
        group: "switch"
    });
    edges.push({ from: 1, to: 2, length: EDGE_LENGTH_MAIN });
    arr = ["169.0.1.16","169.0.1.17","169.0.1.18","169.0.1.19"]
    for (var i = 3; i <= 6; i++) {
        nodes.push({
            id: i,
            label: arr[i-3],
            x: x+=100,
            y: y+=50,
            group: "pc"
        });
        edges.push({ from: 2, to: i, length: EDGE_LENGTH_SUB });
    }

    nodes.push({
        id: 101,
        label: "Printer",
        x: x+=100,
        y: y+=50,
        group: "printer"
    });
    edges.push({ from: 2, to: 101, length: EDGE_LENGTH_SUB });

    nodes.push({
        id: 11,
        label: "제1교무실",
        x: x+=100,
        y: y+=50,
        group: "router"
    });
    nodes.push({
        id: 12,
        label: "Switch",
        x: x+=100,
        y: y+=50,
        group: "switch"
    });
    edges.push({ from: 11, to: 12, length: EDGE_LENGTH_MAIN });
    arr = ["169.14.21.16","169.14.21.17","169.14.21.18","169.14.21.19"]
    for (var i = 13; i <= 16; i++) {
        nodes.push({
            id: i,
            label: arr[i-13],
            x: x+=100,
            y: y+=50,
            group: "pc"
        });
        edges.push({ from: 12, to: i, length: EDGE_LENGTH_SUB });
    }

    nodes.push({
        id: 1101,
        label: "Printer",
        x: x+=100,
        y: y+=50,
        group: "printer"
    });
    edges.push({ from: 12, to: 1101, length: EDGE_LENGTH_SUB });

    nodes.push({
        id: 104,
        label: "39120",
        x: x+=100,
        y: y+=50,
        group: "firewall"
    });
    edges.push({ from: 1, to: 104, length: EDGE_LENGTH_SUB });
    edges.push({ from: 11, to: 104, length: EDGE_LENGTH_SUB });

    // create a network
    let container = document.getElementById("logical-view-2d");
    const data = {
        nodes: nodes,
        edges: edges,
    };
    let options = {
        edges: {
            color: "gray",
        },
        groups: {
            router: {
                shape: "image",
                image: dir + "router.png"
            },
            switch: {
                shape: "image",
                image: dir + "switch.png"
            },
            firewall: {
                shape: "image",
                image: dir + "firewall.png"
            },
            pc: {
                shape: "image",
                image: dir + "pc.png"
            },
            server: {
                shape: "image",
                image: dir + "server.png"
            },
            printer: {
                shape: "image",
                image: dir + "printer.png"
            },
            fax: {
                shape: "image",
                image: dir + "fax.png"
            },
            cellphone: {
                shape: "image",
                image: dir + "sell-phone.png"
            },
        }
    };
    network = new vis.Network(container, data, options);

    // Clicking on a node will show the node details and clicking on the background will close the node details.
    network.on('click', function (e) {
        tt = e
        if (e.nodes.length === 0)
            closeNodeDetail()
        else
            openNodeDetail()
    });
}

draw(DIR)

// Show node details on the right side of the screen.
function openNodeDetail(json) {
    table = $('#tb_node_detail tbody');
    table.empty();
    if($('#nodeDetailDiv').hasClass('d-none')) {
        if ($('#mapDiv').hasClass('col-xl-9') && !$('#mapDiv').hasClass('col-xl-6')) {
            $('#mapDiv').removeClass('col-xl-9')
            $('#mapDiv').addClass('col-xl-6')
            $('#nodeDetailDiv').removeClass('d-none')
        }
    }
    const cvssColors = {
        1: "#57C037",
        2: "#66DB49",
        3: "#6DEA46",
        4: "#DBFC51",
        5: "#fadf4a",
        6: "#f8cc46",
        7: "#f6be44",
        8: "#f2a042",
        9: "#f08633",
        10: "#eb3223",
    }

    table.append(
        '<tr>' +
        '<td>' +
        '<br><a style="font-weight: bold;">노드 ID:</a> 1' +
        '<br><a style="font-weight: bold;">이름:</a> DESKTOP-P102K9U' +
        '<br><a style="font-weight: bold;">타입:</a> PC' +
        '<br><a style="font-weight: bold;">위경도:</a> 39.058345, 125.768266' +
        '<br><a style="font-weight: bold;">IP:</a> 192.0.0.1' +
        '<br><a style="font-weight: bold;">GATEWAY:</a> 192.0.0.1' +
        '<br><a style="font-weight: bold;">소유자:</a> 알수없음' +
        '</td>' +
        '</tr>');

    table.append(
        '<tr>' +
        '<td>' +
        '<br><a style="font-weight: bold;">설치된 소프트웨어</a>' +
        '<br><div style="overflow-y: scroll; height: 100px;">' +
        'Apache Tomcat' + ' ' + '10.0.0-M1' +
        '<br>quagga' + ' ' + '8.5.2' +
        '<br>quagga' + ' ' + '8.5.2' +
        '<br>quagga' + ' ' + '8.5.2' +
        '<br>quagga' + ' ' + '8.5.2' +
        '<br>quagga' + ' ' + '8.5.2' +
        '</div>' +
        '</td>' +
        '</tr>');

    table.append(
        '<tr>' +
        '<td>' +
        '<br><a style="font-weight: bold;">노드 내 취약점</a>' +
        '<br><div style="overflow-y: scroll; height: 100px;">' +
        'CVE-2021-25329' + ' / ' + 'CVSS: <a style="background-color: black; font-weight: bold; color:' + cvssColors[7] + '" >7.0</a>' +
        '<br>CVE-2022-33043' + ' / ' + 'CVSS: <a style="background-color: black; font-weight: bold; color:' + cvssColors[5] + '" >5.4</a>' +
        '<br>CVE-2022-33043' + ' / ' + 'CVSS: <a style="background-color: black; font-weight: bold; color:' + cvssColors[5] + '" >5.4</a>' +
        '<br>CVE-2022-33043' + ' / ' + 'CVSS: <a style="background-color: black; font-weight: bold; color:' + cvssColors[5] + '" >5.4</a>' +
        '<br>CVE-2022-33043' + ' / ' + 'CVSS: <a style="background-color: black; font-weight: bold; color:' + cvssColors[5] + '" >5.4</a>' +
        '<br>CVE-2022-33043' + ' / ' + 'CVSS: <a style="background-color: black; font-weight: bold; color:' + cvssColors[5] + '" >5.4</a>' +
        '</div>' +
        '</td>' +
        '</tr>');

    table.append(
        '<tr>' +
        '<td>' +
        '<br><a style="font-weight: bold;">취약점 CVSS 평균: </a><a style="background-color: black; font-weight: bold; color:' + cvssColors[5] + '" >5.4</a>' +
        '<br><div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="background-color:'+ cvssColors[5] +'; width: 54%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"/>' +
        '</td>' +
        '</tr>');
}

// Close the node details on the right side of the screen.
function closeNodeDetail() {
    div = $('#nodeDetailDiv');
    div.addClass('d-none')
    if(!$('#mapDiv').hasClass('col-xl-9') && $('#mapDiv').hasClass('col-xl-6')) {
        $('#mapDiv').removeClass('col-xl-6')
        $('#mapDiv').addClass('col-xl-9')
    }
}