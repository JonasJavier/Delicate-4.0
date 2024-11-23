from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from .models import CustomUser, UserProfile

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'User Profile'

class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'is_staff', 'is_active', 'is_superuser', 'is_email_verified')
    list_filter = ('is_staff', 'is_active', 'is_superuser', 'is_email_verified')
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'is_email_verified')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active', 'is_superuser', 'is_email_verified')}
        ),
    )
    
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()
    inlines = [UserProfileInline]  # Agregar UserProfile como inline

# Registro del modelo CustomUser y desregistro de Group
admin.site.register(CustomUser, UserAdmin)
admin.site.unregister(Group)
