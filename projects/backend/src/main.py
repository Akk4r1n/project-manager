from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from src.config import load_settings
from src.routers import user_router, project_router

settings = load_settings()

app = FastAPI(title="project-manager", version="1.0.0")

app.add_middleware(
    CORSMiddleware,  # type: ignore
    allow_origins=settings.BACKEND_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/users")
app.include_router(project_router, prefix="/projects")


@app.get("/", tags=["index"])
def index():
    return RedirectResponse(url="/docs")


@app.get("/health", tags=["index"])
def health():
    pass
