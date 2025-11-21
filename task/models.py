from django.db import models


PRIORITIES = [("low", "Low"),("medium", "Medium"),("high", "High")]

class Task(models.Model):
    title = models.CharField(max_length=200, blank=False)
    description = models.TextField(null=True, blank=True)
    is_complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateField(null=True, blank=True)
    priority = models.CharField(max_length=10, blank=True, null=True, choices=PRIORITIES)
