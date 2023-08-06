from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, ProjectSerializer, CardSerializer
from .permissions import IsOwnerAndIsAuthenticated, IsCardOfProject
from rest_framework.generics import RetrieveAPIView, UpdateAPIView, DestroyAPIView
from .models import Project, TaskCard
from django.http import JsonResponse
from rest_framework.decorators import api_view

class UserRegisterAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginAPIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user:
            login(request, user)
            serializer = UserSerializer(user)
            # return Response({'message': 'Login successful.'}, status=status.HTTP_200_OK)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'message': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
    
# class UserDetailView(generics.RetrieveDestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [IsAuthenticated]

class UserLogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logout(request)
        return Response({'message': 'Logout successful.'}, status=status.HTTP_200_OK)

class ProjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Project.objects.filter(owner = self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProjectDetailAPIView(RetrieveAPIView, UpdateAPIView, DestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

class CardListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs.get('project_id')
        return TaskCard.objects.filter(propertyOf = project_id)

    def perform_create(self, serializer):
        # project_id = self.kwargs.get('project_id')
        # print(project_id)
        serializer.save()

class CardDetailAPIView(RetrieveAPIView, UpdateAPIView, DestroyAPIView):
    queryset = TaskCard.objects.all()
    serializer_class = CardSerializer
    permission_classes = [IsAuthenticated]

@api_view(['GET'])
def get_cards_for_user(request, user_id):
    cards = TaskCard.objects.filter(propertyOf__owner__id=user_id)
    serializer = CardSerializer(cards, many=True)
    return JsonResponse({'cards': serializer.data})