window.initMap = function(){}

let nodes = null;
let edges = null;
let network = null;

const DIR = "static/img/refresh-cl/";
let EDGE_LENGTH_MAIN = 150;
let EDGE_LENGTH_SUB = 50;
x = 0
y = 0

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
        image: dir + "printer.png",
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
        image: dir + "printer.png",
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
        image: dir + "firewall.png",
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

draw(DIR)