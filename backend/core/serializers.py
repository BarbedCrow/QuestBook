from rest_framework import serializers
from core.models import *


class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = ("id", "data", "is_published")
