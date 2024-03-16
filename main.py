from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles #정적 파일들을 서버에 주입하도록 도와줌


app = FastAPI()

answer = 'TRAIN'

@app.get('/answer')
def get_answer():
    return {'answer' : answer}

app.mount("/", StaticFiles(directory="static", html=True), name="static")

    