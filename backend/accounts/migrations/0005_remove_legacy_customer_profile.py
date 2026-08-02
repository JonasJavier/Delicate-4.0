from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [("accounts", "0004_alter_customuser_options_alter_userprofile_options_and_more")]

    operations = [
        migrations.DeleteModel(name="UserProfile"),
        migrations.RemoveField(model_name="customuser", name="is_email_verified"),
        migrations.RemoveField(model_name="customuser", name="verification_code"),
    ]
