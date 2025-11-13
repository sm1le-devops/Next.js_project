from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
import uvicorn


app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')


templates = Jinja2Templates(directory='templates')


@app.get('/', response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse('index.html', {'request': request})


@app.get('/api/profile')
async def profile():
    data = {
        'name': 'Alabushev Vladislav',
        'role': 'Medior Web Developer',
        'intro': 'Я делаю современные и быстрые веб-приложения с акцентом на UX и производительность.',
        'skills': [
            {'name': 'HTML / CSS', 'level': 95},
            {'name': 'JavaScript (ES6+)', 'level': 90},
            {'name': 'React / Vue', 'level': 80},
            {'name': 'Python / FastAPI', 'level': 85},
            {'name': 'Databases', 'level': 75},
        ]
    }
    return JSONResponse(content=data)


if __name__ == '__main__':
    uvicorn.run('main:app', host='127.0.0.1', port=8000, reload=True)