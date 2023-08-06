# authentication/serializers.py
from rest_framework import serializers
from .models import User, Project, TaskCard

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password:
            instance.set_password(password)
        instance.save()
        return instance
    
class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')  # Show owner's username as read-only field

    class Meta:
        model = Project
        fields = ('id', 'title', 'description', 'status', 'owner', 'createdAt')  # Add other fields as needed

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCard
        fields = ('id', 'propertyOf', 'cardTitle', 'description', 'createdAt', 'dueDate', 'taskStatus')