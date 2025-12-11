# -*- coding: utf-8 -*-

from fastapi import APIRouter
from app.api.v1.controller import router

admin = APIRouter()

# 注册路由
admin.include_router(router)