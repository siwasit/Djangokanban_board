# authentication/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

class Project(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    status = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_created=True)

    def __str__(self):
        return self.title
    
class TaskCard(models.Model):
    TASK_STATUS_CHOICES = (
        ('Backlog', 'Backlog'),
        ('Doing', 'Doing'),
        ('Testing', 'Testing'),
        ('Completed', 'Completed')
    )

    propertyOf = models.ForeignKey(Project, on_delete=models.CASCADE, to_field='id')
    cardTitle = models.CharField(max_length=100)
    description = models.TextField()
    createdAt = models.DateTimeField(auto_created=True)
    dueDate = models.DateTimeField()
    taskStatus = models.CharField(max_length=20, choices=TASK_STATUS_CHOICES)

    def __str__(self):
        return self.cardTitle
