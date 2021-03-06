# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-07-22 14:42
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='PasswordEntry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('version', models.PositiveIntegerField()),
                ('name', models.CharField(max_length=50)),
                ('size', models.PositiveIntegerField(default=12)),
                ('numbers', models.BooleanField(default=True)),
                ('uppers', models.BooleanField(default=True)),
                ('lowers', models.BooleanField(default=True)),
                ('specials', models.BooleanField(default=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
