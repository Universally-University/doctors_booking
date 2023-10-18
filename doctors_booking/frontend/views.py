from django.shortcuts import render, get_object_or_404
from api.models import Patient, Doctor, Appointment
from icecream import ic
from django.http import HttpRequest, HttpResponse
from django.template import loader


# Create your views here.
def index(request: HttpRequest):
    cookie_id = request.COOKIES.get("member_ID")
    print(cookie_id, type(cookie_id))
    context = {}
    delete_cookie = False
    if cookie_id and cookie_id != "None":
        context |= {"member_ID": cookie_id}
    elif "member_ID" in request.COOKIES.keys():
        delete_cookie = True
    template = loader.get_template("frontend/index.html")
    response = HttpResponse(template.render(context, request))
    if delete_cookie:
        response.delete_cookie("member_ID")
    return response
