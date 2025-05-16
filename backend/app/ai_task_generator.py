import random

def generate_task():
    tasks = [
        {"title": "Read an article", "description": "Find an article on AI and read it."},
        {"title": "Write journal", "description": "Summarize your day in 100 words."},
        {"title": "Walk 15 mins", "description": "Take a 15-minute walk outside."}
    ]
    return random.choice(tasks)
