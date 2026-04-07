from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from prisma import Prisma

app = FastAPI()
prisma = Prisma()

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await prisma.connect()

@app.on_event("shutdown")
async def shutdown():
    await prisma.disconnect()

class UserCreate(BaseModel):
    email: str
    name: str = None

@app.get("/")
def read_root():
    return {"message": "Welcome to FastAPI Backend with Prisma!"}

@app.post("/users/")
async def create_user(user: UserCreate):
    created_user = await prisma.user.create(
        data={
            "email": user.email,
            "name": user.name
        }
    )
    return created_user

@app.get("/users/")
async def get_users():
    users = await prisma.user.find_many()
    return users
