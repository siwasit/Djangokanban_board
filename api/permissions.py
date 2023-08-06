from rest_framework import permissions

class IsOwnerAndIsAuthenticated(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request, so we'll always allow GET, HEAD, or OPTIONS requests.
        # if obj.owner == request.user and request.user.is_authenticated == True:
        #     print('hi')
        #     return True
        if request.method in permissions.SAFE_METHODS and obj.owner == request.user and request.user.is_authenticated:
            return True
        else:
            return False

        # Write permissions are only allowed to the owner of the project who is authenticated.
        # return obj.owner == request.user and request.user.is_authenticated


class IsCardOfProject(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request, so we'll always allow GET, HEAD, or OPTIONS requests.
        # if obj.owner == request.user and request.user.is_authenticated == True:
        #     print('hi')
        #     return True
        project_id = view.kwargs.get('project_id')
        if request.method in permissions.SAFE_METHODS and obj.propertyOf.id == project_id:
            return True
        else:
            return False