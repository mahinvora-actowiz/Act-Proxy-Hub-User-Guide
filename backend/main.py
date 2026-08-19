from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Actowiz Proxy Hub Docs API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")
# Use a single, unified collection name for all proxy hub documentation
COLLECTION_NAME = os.getenv("DOCS_COLLECTION_NAME", "proxy_hub_docs")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

@app.on_event("startup")
async def startup_db():
    await client.admin.command("ping")
    print("✅ Connected to MongoDB")

@app.on_event("shutdown")
async def shutdown_db():
    client.close()

@app.get("/api/docs")
async def get_all_docs():
    """Fetch all unified proxy hub documentation"""
    try:
        cursor = db[COLLECTION_NAME].find().sort("section", 1)
        docs = await cursor.to_list(length=None)
        
        # Convert ObjectId to string for JSON serialization
        for doc in docs:
            doc["_id"] = str(doc["_id"])
            
        return docs
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch documentation: {str(e)}")

@app.get("/api/docs/{section_id}")
async def get_single_doc(section_id: int):
    """Fetch a single documentation section by ID (optional optimization)"""
    try:
        doc = await db[COLLECTION_NAME].find_one({"section": section_id})
        if not doc:
            raise HTTPException(
                status_code=404, 
                detail=f"Section {section_id} not found"
            )
        doc["_id"] = str(doc["_id"])
        return doc
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch section: {str(e)}")

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True # Set to True for local development
    )