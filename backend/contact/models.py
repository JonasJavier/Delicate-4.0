from django.db import models


class ContactMessage(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "Nuevo"
        CONTACTED = "contacted", "Contactado"
        CLOSED = "closed", "Cerrado"

    name = models.CharField("nombre", max_length=120, blank=True)
    email = models.EmailField("correo")
    phone = models.CharField("teléfono", max_length=30, blank=True)
    subject = models.CharField("asunto", max_length=255)
    message = models.TextField("mensaje")
    status = models.CharField("estado", max_length=20, choices=Status.choices, default=Status.NEW)
    submitted_at = models.DateTimeField("recibido", auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]
        verbose_name = "mensaje de contacto"
        verbose_name_plural = "mensajes de contacto"

    def __str__(self):
        return f"{self.name or self.email} · {self.subject}"


class NewsletterSubscription(models.Model):
    email = models.EmailField("correo", unique=True)
    subscribed_at = models.DateTimeField("suscrito", auto_now_add=True)

    class Meta:
        ordering = ["-subscribed_at"]
        verbose_name = "suscripción"
        verbose_name_plural = "suscripciones"

    def __str__(self):
        return self.email
