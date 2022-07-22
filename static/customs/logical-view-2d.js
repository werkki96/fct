// Temporary measures to temporarily block Google Maps errors
window.initMap = function(){}

// test val
let tt = null;

// Reading predefined elements
let json_datas = null;

// Variables for drawing network topology
let network = null;
let nodes = [];
let edges = [];

const DIR = "static/img/refresh-cl/";
let EDGE_LENGTH_MAIN = 150;
let EDGE_LENGTH_SUB = 50;
x = 0
y = 0

// Draw the network topology
drawNetwork = async (dir, facility, coord) => {
    // For the CDR2 scenario (Use the 재영's data)
    if (facility === "김일성종합대학") {
        for (let i = 0; i < json_datas[0].hws_for_demo.length; i++) {
            let hw_data = json_datas[0].hws_for_demo[i]
            const vuls_datas = json_datas[0].vuls
            let vul_idxs = []

            if (hw_data.sw_idx !== null)
                for (let sw_idx of hw_data.sw_idx)
                    for (let vuls_data  of vuls_datas)
                        if (sw_idx === vuls_data.sw_idx)
                            vul_idxs.push(vuls_data.idx)

            if (vul_idxs.length === 0)
                vul_idxs = null

            if (hw_data.coord == null)
                hw_data.coord = coord

            nodes.push({
                id: hw_data.idx,
                group: hw_data.type,
                label: hw_data.name,
                ip: hw_data.ip,
                gw: hw_data.gw,
                own: hw_data.own,
                coord: hw_data.coord,
                sw_idx: hw_data.sw_idx,
                vul_idx: vul_idxs,
                x: x+100,
                y: y+50
            })
        }

        for (let i = 0; i < json_datas[0].hw_edge.length; i++) {
            let hw_edge = json_datas[0].hw_edge[i]
            if (hw_edge === "EDGE_LENGTH_SUB")
                hw_edge.length= EDGE_LENGTH_SUB
            else
                hw_edge.length= EDGE_LENGTH_MAIN
            edges.push(hw_edge)
        }
    // For the CDR2 scenario (no data). Randomly create infrastructure
    } else {
        if (facility == null) facility = "알수없음"
        let cnt = 0
        const router_arr = [randomGW(), randomGW(), randomGW(), randomGW(), randomGW(), randomGW()]
        const switch_cnt = router_arr.length * 4
        const pc_cnt = switch_cnt * 5
        const node_total = router_arr.length + switch_cnt + pc_cnt
        // tmp
        const coord = null

        for (let i = 0; i < node_total; i++) {
            let hw_data = {}
            if (i < router_arr.length) {
                hw_data.type = 'router'
                hw_data.name = randomStr()
                hw_data.ip = router_arr[i]
                hw_data.gw = null
                hw_data.own = null
                hw_data.coord = coord
                hw_data.sw_idx = [json_datas[0].sws[1].idx]
            } else if (i < (router_arr.length+switch_cnt)) {
                hw_data.type = 'switch'
                hw_data.name = randomStr()
                hw_data.ip = null
                hw_data.gw = router_arr[Math.floor((i-router_arr.length)/4)]
                hw_data.own = null
                hw_data.coord = coord
                hw_data.sw_idx = null
                hw_data.edge = {from: i, to: Math.floor((i-router_arr.length)/4), length: EDGE_LENGTH_MAIN}
            } else {
                if (19 < cnt) cnt = 0
                cnt += 1

                hw_data.type = 'pc'
                hw_data.name = 'DESKTOP-' + randomStr()
                hw_data.ip = router_arr[Math.floor((i-(router_arr.length+switch_cnt))/20)] + cnt
                hw_data.gw = router_arr[Math.floor((i-(router_arr.length+switch_cnt))/20)]
                hw_data.own = null
                hw_data.coord = coord
                hw_data.sw_idx = []

                const os = Math.floor(Math.random()*3)+1
                if (os === 1) {
                    hw_data.sw_idx.push(json_datas[0].sws[2].idx)
                }
                else if (os === 2) {
                    hw_data.sw_idx.push(json_datas[0].sws[3].idx)
                }
                else {
                    hw_data.sw_idx.push(json_datas[0].sws[6].idx)
                }

                const others = Math.floor(Math.random()*4)+1
                const sw_list = [5,7,9,10]
                for (let j = 0; j < others; j++)
                    hw_data.sw_idx.push(sw_list[j])

                hw_data.edge = {from: i, to: Math.floor(i/router_arr.length), length: EDGE_LENGTH_SUB}
            }

            // Vulnerability setting according to S/W
            let vul_idxs = []
            const vuls_datas = json_datas[0].vuls

            if (hw_data.sw_idx !== null)
                for (let sw_idx of hw_data.sw_idx)
                    for (let vuls_data  of vuls_datas)
                        if (sw_idx === vuls_data.sw_idx)
                            vul_idxs.push(vuls_data.idx)

            if (vul_idxs.length === 0)
                vul_idxs = null

            nodes.push({
                id: i+1,
                group: hw_data.type,
                label: hw_data.name,
                ip: hw_data.ip,
                gw: hw_data.gw,
                own: hw_data.own,
                coord: hw_data.coord,
                sw_idx: hw_data.sw_idx,
                vul_idx: vul_idxs,
                x: x+100,
                y: y+50
            })

            if (5 < i) {
                if (i === 6)
                    for (let comb of getCombinations([1,2,3,4,5,6], 2))
                        edges.push({ from: comb[0], to: comb[1], length: EDGE_LENGTH_MAIN})
                edges.push(hw_data.edge)
            }
        }
    }




    // create a network
    let container = document.getElementById("logical-view-2d")
    const data = {
        nodes: nodes,
        edges: edges,
    }
    const options = {
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
            server: {
                shape: "image",
                image: dir + "server.png"
            },
            cellphone: {
                shape: "image",
                image: dir + "sell-phone.png"
            },
        }
    }
    network = new vis.Network(container, data, options)

    // Clicking on a node will show the node details and clicking on the background will close the node details.
    network.on('click', (e) => {
        if (e.nodes.length === 0)
            closeNodeDetail()
        else
            openNodeDetail(e, facility)
            // openNodeDetail(e, facility, coord)
    })
}

randomStr = () => {
    return Math.random().toString(36).substring(2, 12);
}

randomGW = () => {
    return Math.floor((Math.random()*(255-1))+1) + '.' + Math.floor(Math.random()*(255)) + '.' + Math.floor(Math.random()*(255)) + '.1'
}

const getCombinations = (arr, num) => {
    const results = [];

    if (num === 1) return arr.map(v => [v]);

    arr.forEach((fixed, index, origin) => {
        const rest = origin.slice(index + 1);
        const combinations = getCombinations(rest, num - 1);
        const attached = combinations.map(v => [fixed, ...v]);
        results.push(...attached);
    });

    return results;
}

// Show node details on the right side of the screen.
openNodeDetail = (e, facility) => {
    // data in the first table.append()
    let node = JSON.stringify(nodes[e.nodes[0]-1])
    node = node.replace(/null/g, '"알수없음"')
    node = JSON.parse(node)
    console.log(node)

    // data in the second table.append()
    let sw_list = ''
    let sw_list_before = []
    if (node.sw_idx !== null)
        for (let i = 0; i < node.sw_idx.length; i++) {
            let sws = json_datas[0].sws.filter( (e) => {
                return e.idx === node.sw_idx[i]
            })
            for (let v of sws)
                sw_list_before.push(v.name + " " + v.version)
        }
    for (let i = 0; i < sw_list_before.length; i++) {
        if (i === 0) sw_list = sw_list_before[i]
        else sw_list += '<br>' + sw_list_before[i]
    }

    // data in the third and fourth table.append()
    const CVSS_COLORS = (cvss) => {
            if (cvss < 0.1)
                return "#ffffff; color: black"
            else if ((0.1 <= cvss) && (cvss < 3.9))
                return "#39b54a; color: black"
            else if ((4.0 <= cvss) && (cvss < 6.9))
                return "#fcee21; color: black"
            else if ((7.0 <= cvss) && (cvss < 8.9))
                return "#f7931e; color: black"
            else
                return "#c1272d; color: white"
    }
    let vul_list = ''
    let vul_list_before = []
    let vul_total = 0.0
    if (node.vul_idx !== null)
        for (let i = 0; i < node.vul_idx.length; i++) {
            let vuls = json_datas[0].vuls.filter( (e) => {
                return e.idx === node.vul_idx[i]
            })
            for (let v of vuls) {
                vul_list_before.push(v.name + '  /  CVSS: <a style=\"font-weight: bold; background-color: ' + CVSS_COLORS(v.cvss) + '\" >'+ v.cvss +'</a>')
                vul_total += v.cvss
            }
        }
    for (let i = 0; i < vul_list_before.length; i++) {
        if (i === 0) vul_list = vul_list_before[i]
        else vul_list += '<br>' + vul_list_before[i]
    }

    vul_total /= vul_list_before.length
    vul_total = vul_total.toFixed(2)
    console.log(vul_total)


    table = $('#tb_node_detail tbody');
    table.empty();
    if($('#nodeDetailDiv').hasClass('d-none')) {
        if ($('#mapDiv').hasClass('col-xl-9') && !$('#mapDiv').hasClass('col-xl-6')) {
            $('#mapDiv').removeClass('col-xl-9')
            $('#mapDiv').addClass('col-xl-6')
            $('#nodeDetailDiv').removeClass('d-none')
        }
    }

    table.append(
        '<tr>' +
        '<td>' +
        '<br><a style="font-weight: bold;">노드 ID: </a>' + node.id +
        '<br><a style="font-weight: bold;">타입: </a>' + node.group +
        '<br><a style="font-weight: bold;">이름: </a>' + node.label +
        '<br><a style="font-weight: bold;">시설명: </a>' + facility +
        '<br><a style="font-weight: bold;">위경도: </a>' + node.coord +
        '<br><a style="font-weight: bold;">소유자: </a>' +  node.own +
        '<br><a style="font-weight: bold;">IP: </a>' + node.ip +
        '<br><a style="font-weight: bold;">GATEWAY: </a>' +  node.gw +
        '</td>' +
        '</tr>');

    table.append(
        '<tr>' +
        '<td>' +
        '<br><a style="font-weight: bold;">설치된 소프트웨어</a>' +
        '<br><div style="overflow-y: scroll; height: 100px;">' +
        sw_list +
        '</div>' +
        '</td>' +
        '</tr>');

    table.append(
        '<tr>' +
        '<td>' +
        '<br><a style="font-weight: bold;">노드 내 취약점</a>' +
        '<br><div style="overflow-y: scroll; height: 100px;">' +
        vul_list +
        '</div>' +
        '</td>' +
        '</tr>');

    table.append(
        '<tr>' +
        '<td>' +
        '<br><a style="font-weight: bold;">취약점 CVSS 평균: </a><a style="font-weight: bold; background-color:' + CVSS_COLORS(vul_total) + '" >'+ vul_total + '</a>' +
        '<br><div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="background-color:'+ CVSS_COLORS(vul_total) +'; width: '+ (vul_total*10) +'%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"/>' +
        '</td>' +
        '</tr>');
}

// Close the node details on the right side of the screen.
closeNodeDetail = () => {
    div = $('#nodeDetailDiv');
    div.addClass('d-none')
    if(!$('#mapDiv').hasClass('col-xl-9') && $('#mapDiv').hasClass('col-xl-6')) {
        $('#mapDiv').removeClass('col-xl-6')
        $('#mapDiv').addClass('col-xl-9')
    }
}


// Onload Function
window.onload = (event) => {
    // Reading predefined elements
    json_datas = JSON.parse(network_data)
    drawNetwork(DIR, null, "00.00000 / 00.00000")
}
