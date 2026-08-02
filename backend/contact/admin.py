from django.contrib import admin

from .models import ContactMessage, NewsletterSubscription


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "status", "submitted_at")
    list_filter = ("status", "submitted_at")
    list_editable = ("status",)
    search_fields = ("name", "email", "phone", "subject", "message")
    readonly_fields = ("submitted_at",)


@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ("email", "subscribed_at")
    search_fields = ("email",)
    readonly_fields = ("subscribed_at",)
