# fastapi공식문서참고
from fastapi import FastAPI

app = FastAPI

@app.get("/hello")
def sayHello():
    return {"message":"안녕하세요 슈퍼코딩!"}