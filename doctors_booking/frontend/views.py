from django.shortcuts import render, get_object_or_404
from api.models import Patient, Doctor, Appointment
from icecream import ic

# Create your views here.
def index(request):

    context={
        # "message":"Hello Jason"
    }
    return render(request, "frontend/index.html", context=context)

def patient_view(request, patientid):
    patient = Patient.objects.get_object_or_404(id=patientid)
    ic(patient)
    context={
        "patient":patient
    }
    return render(request, "frontend/index.html", context=context)
def doctor_view(request, patientid):
    doctor = Doctor.objects.get_object_or_404(patientid)
    context={
        # "message":"Hello Jason"
    }
    return render(request, "frontend/index.html", context=context)
