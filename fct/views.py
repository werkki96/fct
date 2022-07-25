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
    coord = "";
    if request.method == 'POST':
        coord = request.POST['coord']
    context = {
        'm_keys': m_key,
        'coord': coord,
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

# 관심지역 내 내부망 가시화(3D)
from django.http import JsonResponse
import subprocess
from pathlib import Path
def logical_view_3d(request):
    #if request.method == 'POST':
      #  facility = request.POST['facility']
       # coord = request.POST['coord']
    # context = {
    # #    'm_keys': m_key,
    # #    'facility': facility,
    # #    'coord': coord
    # }
    # response = render(request, 'logical-view-3d.html', context)
    # return response
    BASE_DIR = Path(__file__).resolve().parent.parent
    subprocess.call([BASE_DIR.__str__()+"/3d_Logical_view/NTV.exe"])

    return JsonResponse({"ok":"ok"})
