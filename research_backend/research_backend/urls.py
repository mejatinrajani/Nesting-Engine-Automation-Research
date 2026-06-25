from django.contrib import admin
from django.urls import path
from prediction.views import health_check, predict_algorithm

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/health/", health_check),
    path('api/predict/', predict_algorithm),
]
