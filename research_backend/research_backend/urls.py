from django.contrib import admin
from django.urls import path
from prediction.views import predict_algorithm

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/predict/', predict_algorithm),
]