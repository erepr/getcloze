from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel, Field, EmailStr
import pandas as pd
import random
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

df = pd.read_csv("Data/urdu_dataset.csv")

language = {'urdu': 'Data/urdu_dataset.csv', 
        'russian': 'Data/russian_dataset.csv', 
        'persian': 'Data/persian_dataset.csv', 
        'indonesian': 'Data/indonesian_dataset.csv', 
        'turkish': 'Data/turkish_dataset.csv',
        'korean': 'Data/korean_dataset.csv', 
        'arabic': 'Data/arabic_dataset.csv', 
        'mandarin': 'Data/mandarin_dataset.csv'}

@app.get("/items/{count}")
def read_item(count: int, lang: str):
    df = pd.read_csv(language[lang])
    new_df = pd.read_csv("Data/dataset.csv")
    rnd = {'words': []}
    for i in range(len(df)):
        tmp = df[['Sentence']].iloc[i][0].split()
        for i in range(len(tmp)):
            rnd['words'].append(tmp[i])
    word_list = df[['Sentence']].iloc[count][0].split()
    number_of_words = len(word_list)
    idx = random.randint(0, number_of_words)
    new = df[['Sentence']].iloc[count][0].replace(word_list[idx], "<span class='smol'>_________</span>")
    return {'cloze': new,
            'og_text': new_df[['Sentence']].iloc[count][0],
            'options': [random.choices(rnd['words'], k=3)],
            'correct': word_list[idx]}

