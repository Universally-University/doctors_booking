from django.urls import include, path
from rest_framework import routers
from api import views

router = routers.DefaultRouter()
router.register(r"patient", views.PatientViewSet)
router.register(r"doctor", views.DoctorViewSet)
router.register(r"appointment", views.AppointmentViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
]
