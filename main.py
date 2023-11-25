from fastapi import FastAPI, Depends, Request, Form, status
from fastapi.responses import HTMLResponse
from datetime import datetime
from fastapi.staticfiles import StaticFiles
from starlette.responses import RedirectResponse
from starlette.templating import Jinja2Templates
from sqlalchemy.orm import Session
import models
from database import SessionLocal, engine
from fastapi import FastAPI, Depends, Request, Form, status
from datetime import datetime
models.Base.metadata.create_all(bind=engine)

templates = Jinja2Templates(directory="templates")

app = FastAPI()

# Mount the static directory to serve static files

app.mount("/static", StaticFiles(directory="static"), name="static")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home(request: Request, db: Session = Depends(get_db)):
    employees = db.query(models.Employee).all()
    return templates.TemplateResponse("index.html",
                                      {"request": request, "employee_list": employees})

@app.post("/add")
def add_employee(request: Request, name: str = Form(...), position: str = Form(...), department: str = Form(...), salary: float = Form(...), db: Session = Depends(get_db)):
    new_employee = models.Employee(name=name, position=position, department=department, salary=salary)
    db.add(new_employee)
    db.commit()

    url = app.url_path_for("home")
    return RedirectResponse(url=url, status_code=status.HTTP_303_SEE_OTHER)

@app.get("/update/{employee_id}")
def update_employee(request: Request, employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    # Update employee details
    db.commit()

    url = app.url_path_for("home")
    return RedirectResponse(url=url, status_code=status.HTTP_302_FOUND)

@app.get("/delete/{employee_id}")
def delete_employee(request: Request, employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    db.delete(employee)
    db.commit()

    url = app.url_path_for("home")
    return RedirectResponse(url=url, status_code=status.HTTP_302_FOUND)



@app.get("/search", response_class=HTMLResponse)
async def search_employee(request: Request, min_salary: int, db: Session = Depends(get_db)):
    employees = db.query(models.Employee).filter(models.Employee.salary >= min_salary).all()
    return templates.TemplateResponse("index.html", {"request": request, "search_results": employees})

