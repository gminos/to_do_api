from rest_framework import serializers
from task.models import Task
from django.utils.timezone import localdate

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['all']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_due_date(self, value):
        if value and value < localdate():
            raise serializers.ValidationError('Due date cannot be in the past')
        return value
