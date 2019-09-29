from rest_framework.response import Response
from rest_framework.views import APIView
from core.serializers import *
from rest_framework import renderers

logger = logging.getLogger("general")


def ensure_user_exists(vk_id):
    if VkUser.objects.filter(vk_id=vk_id).exists():
        return VkUser.objects.get(vk_id=vk_id)
    else:
        return VkUser.objects.create(vk_id=vk_id)


class QuestsView(APIView):
    renderer_classes = [renderers.JSONRenderer]

    def get(self, request):
        vk_id = request.GET.get("vk_id")
        quests = Quest.objects.all()
        if vk_id is not None:
            user = ensure_user_exists(vk_id)
            quests = Quest.objects.filter(creator=user)
        return Response(data=QuestSerializer(quests, many=True).data)

    def post(self, request):
        vk_id = request.data.get("vk_id")
        if vk_id is None:
            return Response(data={"error": "vk_id not provided"}, status=400)
        user = ensure_user_exists(vk_id)
        data = request.data.get("data")
        if data is None:
            return Response(data={"error": "quest data not provided"}, status=400)
        quest = Quest.objects.create(data=data, creator=user)
        return Response(data=QuestSerializer(quest).data)


class QuestView(APIView):
    renderer_classes = [renderers.JSONRenderer]

    def post(self, request, quest_id):
        quest = Quest.objects.filter(pk=quest_id)
        if not quest.exists():
            return Response(data={"error": f"quest with id {quest_id} not found"}, status=400)
        quest = quest.first()
        data = request.data.get("data")
        if data is None:
            return Response(data={"error": f"data is required"}, status=400)
        quest.data = data
        quest.save()
        return Response("OK")

    def get(self, request, quest_id):
        quest = Quest.objects.filter(pk=quest_id)
        if not quest.exists():
            return Response(data={"error": f"quest with id {quest_id} not found"}, status=400)
        quest = quest.first()
        return Response(data=QuestSerializer(quest).data)
