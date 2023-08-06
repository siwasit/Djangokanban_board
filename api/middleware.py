# custom_session_middleware.py

# class CustomSessionMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         if request.path == '/api/login/':  # Replace this URL with your actual login view URL
#             request.session = {}  # Create an empty session for the login view
#         return self.get_response(request)


class CustomSessionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path == '/api/login/':  # Adjust the path as needed for your login endpoint
            from django.contrib.sessions.middleware import SessionMiddleware
            session_middleware = SessionMiddleware(self.get_response)
            return session_middleware(request)
        else:
            return self.get_response(request)
