from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import UserSerializer
from .models import FileSave, FileLoad
from .serializers import FileSaveSerializer, FileLoadSerializer
from django.core.files.storage import FileSystemStorage
from django.http import FileResponse

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class FileSaveView(viewsets.ModelViewSet):
    queryset = FileSave.objects.all()
    serializer_class = FileSaveSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        return super(FileSaveView, self).create(request, *args, **kwargs)


class FileLoadView(viewsets.ModelViewSet):
    queryset = FileLoad.objects.all()
    serializer_class = FileLoadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, document_id):
        object = self.get_object(document_id)

        file_path = object.path
        fs = FileSystemStorage(file_path)
        response = FileResponse(fs.open(file_path, 'rb'))

        return response