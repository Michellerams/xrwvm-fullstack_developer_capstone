# Uncomment the imports before you add the code

from django.conf.urls.static import static
from django.conf import settings
from . import views
from django.views.generic.base import TemplateView 
from django.contrib import admin
from django.urls import path, include


app_name = 'djangoapp'
urlpatterns = [
    # # path for registration
    # path for login
     #path('login/', views.login_user, name='login'),
    path('login', views.login_user, name='login'),
    # path(route='login', view=views.login_user, name='login'),
     
    # path for dealer reviews view

    # path for add a review view

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
