# Generated by Django 4.2.3 on 2023-07-17 09:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_project'),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskCard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdAt', models.DateTimeField(auto_created=True)),
                ('cardTitle', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('dueDate', models.DateTimeField()),
                ('taskStatus', models.CharField(choices=[('Backlog', 'Backlog'), ('Doing', 'Doing'), ('Testing', 'Testing'), ('Completed', 'Completed')], max_length=20)),
                ('propertyOf', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.project')),
            ],
        ),
    ]
