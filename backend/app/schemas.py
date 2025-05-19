from pydantic import BaseModel

class TaskBase(BaseModel):
    title: str
    description: str
    completed: bool = False

class TaskCreate(TaskBase):
    pass

class Task(TaskBase):
    id: int
    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TaskOut(TaskBase):
    id: int
    class Config:
        from_attributes = True


class UserOut(BaseModel):
    id: int
    username: str
    class Config:
        from_attributes = True