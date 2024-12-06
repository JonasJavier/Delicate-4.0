from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from .serializers import NewsletterSubscriptionSerializer

@api_view(['POST'])
@permission_classes([AllowAny]) 
def contact_api(request):
    """
    API endpoint that allows users to submit contact form data.
    The data is saved in the database and an email is sent.
    """
    subject = request.data.get('subject')
    email = request.data.get('email')
    message = request.data.get('message')

    # Validate required fields
    if not subject or not email or not message:
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Save the message to the database
        contact_message = ContactMessage.objects.create(
            subject=subject,
            email=email,
            message=message
        )
        # Success response
        return Response({'success': 'Message sent successfully!'}, status=status.HTTP_200_OK)

    except Exception as e:
        # Handle unexpected errors
        return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def newsletter_subscription_api(request):
    """
    API endpoint that allows users to subscribe to the newsletter.
    The email is saved in the database.
    """
    serializer = NewsletterSubscriptionSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()  # Esto guarda el objeto en la base de datos
        return Response({'success': 'Subscribed successfully!'}, status=status.HTTP_201_CREATED)

    return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)