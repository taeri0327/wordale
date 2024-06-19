# fastapi공식문서참고
from typing import Union

from fastapi import FastAPI 

from pydantic import BaseModel 
#pydantic이라는 내장 라이브러리를 통해 BaseModel이라는 걸 불러오기

from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer ='TRAIN'

@app.get('/answer')
def get_answer():
    return {'answer':answer}

app.mount("/", StaticFiles(directory="static", html=True), name="static")
#"/" -> 루트경로, directory(폴더명), html = True -> 경로가 깔끔해짐
class Item(BaseModel):
    id:int
    content:str
#class item이라는 BaseModel 정의,
#id는 정수, content는 문자열

items = ['맥북','애플워치','아이패드']

#.get = 어떤 값을 조회할 때 사용
#.post = 어떤 값을 서버에 업데이트 or 새로 등록 요청


# @app.get('/items')
# def read_items():
#     return items

@app.get('/items/{id}') 
def read_id_item(id):
    return items[int(id)] # int()->문자열을 숫자열으로 JavaScript는 number()
# @app.get("/hello")
# def read_root():
#     return {"message": "안녕하세요 슈퍼코딩!"}

@app.get('/items')#127.0.0.1:8000/items?skip=1&limit=2
def read_item(skip:int=0,limit:int=0): # skip이라는 쿼리는 int(숫자값) 초기는 0,limit(최대갯수라는 쿼리 = 변수)는 int(숫자값) 초기는 0
    return items[skip:skip+limit]#skip부터 skip+limit까지


# @app.get("/")
# def sayWelcome():
#     return {"message":"환영합니다!!"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

@app.post("/items")
def post_item(item:Item):
    items.append(item.content)
    return '성공했습니다!'