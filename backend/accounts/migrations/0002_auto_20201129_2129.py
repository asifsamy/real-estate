# Generated by Django 3.1.3 on 2020-11-29 20:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='useraccount',
            old_name='is_stuff',
            new_name='is_staff',
        ),
    ]
