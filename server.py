from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from duckduckgo_search import DDGS
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI()

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SearchResult(BaseModel):
    title: str
    href: str
    body: str

@app.get("/search", response_model=List[SearchResult])
def search(q: str, max_results: int = 5):
    print(f"Searching for: {q}")
    try:
        results = []
        with DDGS() as ddgs:
            # ddgs.text() returns an iterator of dictionaries
            search_results = ddgs.text(q, max_results=max_results)
            if search_results:
                for r in search_results:
                    results.append(SearchResult(
                        title=r.get('title', ''),
                        href=r.get('href', ''),
                        body=r.get('body', '')
                    ))
        return results
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
