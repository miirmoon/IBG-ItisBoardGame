# Generated by Django 4.0.3 on 2022-03-27 16:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('title', models.CharField(max_length=50)),
                ('url', models.URLField()),
                ('email', models.EmailField(max_length=254)),
                ('cdate', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
