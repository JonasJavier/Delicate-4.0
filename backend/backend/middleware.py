from django.conf import settings


class SecurityHeadersMiddleware:
    """Add browser hardening headers to every response.

    It sits above WhiteNoise so the storefront files, which WhiteNoise returns
    before the rest of Django's middleware runs, get the same headers as the
    API and the admin.
    """

    def __init__(self, get_response):
        self.get_response = get_response
        self.headers = {
            name: value
            for name, value in {
                "Content-Security-Policy": settings.CONTENT_SECURITY_POLICY,
                "Permissions-Policy": settings.PERMISSIONS_POLICY,
                "X-Frame-Options": settings.X_FRAME_OPTIONS,
            }.items()
            if value
        }

    def __call__(self, request):
        response = self.get_response(request)
        for name, value in self.headers.items():
            response.headers.setdefault(name, value)
        return response
