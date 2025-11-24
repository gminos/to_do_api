from django.db import models


PRIORITIES = [(3, "Low"),(2, "Medium"),(1, "High")]

class Task(models.Model):
    title = models.CharField(max_length=200, blank=False)
    description = models.TextField(null=True, blank=True)
    is_complete = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateField(null=True, blank=True)
    priority = models.IntegerField(blank=False, null=False, choices=PRIORITIES, default=3)
