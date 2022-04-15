from django.shortcuts import render


# create your views here.
def main_page(request):
    ipChk = request.POST.get("test")
    if ipChk is None:
        print("None22")
        ipChk = "-"
    else:
        print(request.POST.get("test"))

    context = {
        'ip': ipChk,
    }
    response = render(request, 'main.html', context)
    return response


def inner_network(request):
    ipChk = request.POST.get("ip")
    if ipChk is None:
        ipChk = "-"
    else:
        print(request.POST.get("ip"))

    context = {
        'ip': ipChk,
    }
    response = render(request, 'InnerNetwork.html', context)
    return response

def maps(request, mno):
    m_key = 'AIzaSyBSCfYSvhqS17N9skfLIzThSVNea5mvEBs'
    context = {
        'm_keys': m_key,
    }
    response = render(request, 'map_01.html', context)
    return response
