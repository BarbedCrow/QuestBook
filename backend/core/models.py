from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.postgres.fields import ArrayField
from django.db import models
import logging

logger = logging.getLogger("general")


class VkUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, vk_id, password, **extra_fields):
        if not vk_id:
            raise ValueError('vk_id needed for user creation')
        user = self.model(vk_id=vk_id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, vk_id, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(vk_id, password, **extra_fields)

    def create_superuser(self, vk_id, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(vk_id, password, **extra_fields)


class VkUser(AbstractBaseUser, PermissionsMixin):
    USERNAME_FIELD = 'vk_id'
    REQUIRED_FIELDS = []

    is_staff = models.BooleanField(default=False)
    vk_id = models.IntegerField(unique=True)
    objects = VkUserManager()


class Quest(models.Model):
    data = models.TextField()
    creator = models.ForeignKey(VkUser, on_delete=models.CASCADE)
    is_published = models.BooleanField(default=False)

# id = 7150504
