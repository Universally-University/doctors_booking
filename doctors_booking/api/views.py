from rest_framework import viewsets
from rest_framework import permissions
from api.serializers import AppointmentSerializer, DoctorSerializer, PatientSerializer
from api.models import Appointment, Doctor, Patient
import datetime

# Create your views here.
class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all().order_by("-last_name")
    serializer_class = PatientSerializer
    # permission_classes = [permissions.AllowAny]
    filterset_fields = [
        "first_name",
        "last_name",
        "dob",
        "current_patient",
        "member_id",
    ]


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all().order_by("-last_name")
    serializer_class = DoctorSerializer
    # permission_classes = [permissions.AllowAny]
    filterset_fields = [
        "id",
        "first_name",
        "last_name",
        "current_doctor",
    ]


class AppointmentViewSet(viewsets.ModelViewSet): # Json this should work!! :P 
    queryset = Appointment.objects.filter(date__gte=datetime.date.today()).order_by("date", "time")
    serializer_class = AppointmentSerializer
    # permission_classes = [permissions.AllowAny]
    filterset_fields = [
        "doctor",
        "patient",
        "date",
        "time",
    ]
