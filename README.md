# Souldate

Souldate is an alternative to popular dating app called Tinder. What's different about? Here we took popular feature of choosing your future date and threw it into the bin. A lot of people say that we shouldn't judge by the visual appearance. Let's make it better and focus on personality!

## Development Plan

- real-time chat,
- personality/interests test,
- personality/interests matching,
- showing pictures after some time (3 days ?),
- date spot suggestions (random place to meet, synchronize with Google).

### Repo Structure

- **main** branch for working bits of code,
- **commit messages** related to separate parts of code, e.g. "footer", "profile component", "database connection", etc.

### Prerequisites

- Python 3.10
- Flask 2.1.0
- Node 16.17.1
- NPM 8.19.2

### First run

1. npm i
2. npm run dev

### How to run the project

#### Backend

1. py -m venv venv
2. cd venv/Scripts
3. activate.bat
4. cd ../..
5. py -m pip install -r requirements.txt
6. set FLASK_ENV=development
7. set FLASK_APP=app.py
8. py -m flask run

#### Frontend

1. npm run dev
