from fastapi import FastAPI, HTTPException, Path
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from typing import Literal

load_dotenv()

app = FastAPI(title="Scrapedo Docs API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("DB_NAME")

# Map product slug → MongoDB collection name
PRODUCT_TO_COLLECTION = {
    "scrapedo": "scrapedo_post_docs",
    "scraper": "scraperapi_post_docs"
}

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

@app.on_event("startup")
async def startup_db():
    await client.admin.command("ping")
    print("✅ Connected to MongoDB")

@app.on_event("shutdown")
async def shutdown_db():
    client.close()

def get_collection_name(product: str) -> str:
    """Validate product and return collection name"""
    if product not in PRODUCT_TO_COLLECTION:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid product: {product}. Use 'scrapedo' or 'scraper'"
        )
    return PRODUCT_TO_COLLECTION[product]

@app.get("/api/docs/{product}")
async def get_docs(product: Literal["scrapedo", "scraper"] = Path(...)):
    """Fetch all docs for a product"""
    try:
        collection_name = get_collection_name(product)
        cursor = db[collection_name].find().sort("section", 1)
        docs = await cursor.to_list(length=None)
        for doc in docs:
            doc["_id"] = str(doc["_id"])
        return docs
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/docs/{product}/{section_id}")
async def get_single_doc(
    product: Literal["scrapedo", "scraper"] = Path(...),
    section_id: int = Path(...)
):
    """Fetch single doc by section ID for a product"""
    try:
        collection_name = get_collection_name(product)
        doc = await db[collection_name].find_one({"section": section_id})
        if not doc:
            raise HTTPException(
                status_code=404, 
                detail=f"Section {section_id} not found for product '{product}'"
            )
        doc["_id"] = str(doc["_id"])
        return doc
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=False
    )