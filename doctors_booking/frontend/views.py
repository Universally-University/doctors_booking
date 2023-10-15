from django.shortcuts import render, get_object_or_404
from api.models import Patient, Doctor, Appointment
from icecream import ic
from django.http import HttpRequest,HttpResponse
from django.template import loader

# Create your views here.
def index(request: HttpRequest):
    mem_id=request.GET.get("member", False)
    if mem_id:
        request.COOKIES["member_ID"] = mem_id
    context={
        "member_ID": request.COOKIES.get("member_ID")
    }
    template = loader.get_template("frontend/index.html")
    response = HttpResponse(template.render(context, request))
    if mem_id:
        response.set_cookie("member_ID", mem_id)
    return response
