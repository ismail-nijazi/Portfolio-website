from django.shortcuts import render
from .models import Project
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProjectSerializer
# Create your views here.

def home(request):
	projects = Project.objects.all()
	for project in projects:
		project.frontEnd_techniques = project.frontEnd_techniques.split(',')
		project.backEnd_techniques = project.backEnd_techniques.split(',')
	context = {
		'projects':projects
	}
	return render(request, 'portfolio/index.html', context)

@api_view(['GET'])
def getProject(request, pk):
	project = Project.objects.get(id=pk)
	serializer = ProjectSerializer(project, many=False)
	return Response(serializer.data)
