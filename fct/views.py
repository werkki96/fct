from django.shortcuts import render

m_key = 'AIzaSyAtWsRW1ftU1ix7rskfEQWXUt70hZqJsOQ'
# create your views here.
def index(request):
    ipChk = request.POST.get("test")
    if ipChk is None:
        #print("None22")
        ipChk = "-"
    else:
        print(request.POST.get("test"))


    context = {
        'ip': ipChk,
        'm_keys': m_key,
    }
    response = render(request, 'ThreatTrafic.html', context)
    return response


def inner_network(request):
    ipChk = request.POST.get("ip")
    if ipChk is None:
        ipChk = "-"
    else:
        print(request.POST.get("ip"))

    context = {
        'ip': ipChk,
        'm_keys': m_key,
    }
    response = render(request, 'InnerNetwork.html', context)
    return response

def geomap(request):
    context = {
        'm_keys': m_key,
    }
    response = render(request, 'GeoMap.html', context)
    return response


def test(request):
    context = {
        'm_keys': m_key,
    }
    response = render(request, 'test.html', context)
    return response

def base(request):
    context = {
        'm_keys': m_key,
    }
    response = render(request, 'base.html', context)
    return response


# 관심지역 내 내부망 가시화
def logical_view_2d(request):
    context = {
        'm_keys': m_key,
    }
    if request.method == 'POST':
        facility = request.POST['facility']
        coord = request.POST['coord']
        context = {
            'm_keys': m_key,
            'facility': facility,
            'coord': coord
        }
    response = render(request, 'logical-view-2d.html', context)
    return response
