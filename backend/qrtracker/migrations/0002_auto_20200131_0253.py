# Generated by Django 3.0.2 on 2020-01-31 02:53

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('qrtracker', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventpromoter',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='qrtracker.Event', verbose_name='the event'),
        ),
        migrations.AlterField(
            model_name='eventpromoter',
            name='promoter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='qrtracker.Promoter', verbose_name='the promoter'),
        ),
        migrations.AlterField(
            model_name='eventpromoterregister',
            name='event_promoter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='qrtracker.EventPromoter', verbose_name='the event promoter'),
        ),
        migrations.AlterField(
            model_name='location',
            name='phone_number',
            field=models.CharField(blank=True, max_length=17, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", regex='^\\+?1?\\d{9,15}$')]),
        ),
        migrations.AlterField(
            model_name='promoter',
            name='phone_number',
            field=models.CharField(blank=True, max_length=17, validators=[django.core.validators.RegexValidator(message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.", regex='^\\+?1?\\d{9,15}$')]),
        ),
    ]
