from django.urls import path, re_path
from .views import index, patient_view,doctor_view

urlpatterns = [
    path("", index),
    re_path(r"^patient/(?P<patientid>[0-9]+)", patient_view),
    path("doctor/<int:doctor>", doctor_view)

]