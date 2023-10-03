from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
class Patient(models.Model):
    id = models.AutoField(_("Patient ID"), primary_key=True)
    first_name = models.CharField(
        _("First Name"), max_length=255, null=True, blank=True
    )
    last_name = models.CharField(_("Last Name"), max_length=255, null=True, blank=True)
    dob = models.DateField(_("Date of Birth"), null=True, blank=True)
    email = models.CharField(_("Email"), max_length=255, null=True, blank=True)
    phone = models.CharField(_("Phone Number"), max_length=255, null=True, blank=True)
    address = models.CharField(_("Address"), max_length=300, null=True, blank=True)
    member_id = models.IntegerField(_("Member ID"), null=True)
    gender = models.CharField(
        _("Gender"), max_length=6, choices=(("M", "Male"), ("F", "Female"))
    )
    current_patient = models.BooleanField(_("Currently a Patient"), default=True)


class Doctor(models.Model):
    id = models.AutoField(_("Patient ID"), primary_key=True)
    first_name = models.CharField(
        _("First Name"), max_length=255, null=True, blank=True
    )
    last_name = models.CharField(_("Last Name"), max_length=255, null=True, blank=True)
    current_doctor = models.BooleanField(_("Currently a Doctor"), default=True)


class Appointment(models.Model):
    id = models.AutoField(_("Appt ID"), primary_key=True)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField(_("Date"))
    time = models.TimeField(_("Time"))
