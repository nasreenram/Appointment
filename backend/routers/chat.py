from fastapi import APIRouter, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from database import get_db

router = APIRouter(prefix="/api/chat", tags=["chat"])

class ConnectionManager:
    def __init__(self):
        self.active_connections: dict = {}

    async def connect(self, websocket: WebSocket, room_id: str):
        await websocket.accept()
        if room_id not in self.active_connections:
            self.active_connections[room_id] = []
        self.active_connections[room_id].append(websocket)

    def disconnect(self, websocket: WebSocket, room_id: str):
        if room_id in self.active_connections:
            self.active_connections[room_id].remove(websocket)
            if not self.active_connections[room_id]:
                del self.active_connections[room_id]

    async def broadcast(self, message: dict, room_id: str):
        if room_id in self.active_connections:
            for connection in self.active_connections[room_id]:
                await connection.send_json(message)

manager = ConnectionManager()

class Message(BaseModel):
    appointment_id: str
    sender_id: str
    sender_role: str
    text: str
    timestamp: Optional[str] = None

@router.post("/")
async def send_message(message: Message, db=Depends(get_db)):
    msg_dict = message.dict()
    msg_dict['timestamp'] = datetime.now().isoformat()
    result = await db.messages.insert_one(msg_dict)
    msg_dict['id'] = str(result.inserted_id)
    msg_dict.pop('_id', None)
    
    # Broadcast to connected websocket clients
    await manager.broadcast(msg_dict, message.appointment_id)
    
    return {"message": "Sent", "data": msg_dict}

@router.get("/{appointment_id}")
async def get_messages(appointment_id: str, db=Depends(get_db)):
    cursor = db.messages.find({"appointment_id": appointment_id}).sort("timestamp", 1)
    messages = []
    async for msg in cursor:
        msg["id"] = str(msg["_id"])
        del msg["_id"]
        messages.append(msg)
    return {"messages": messages}

@router.websocket("/ws/{appointment_id}")
async def websocket_endpoint(websocket: WebSocket, appointment_id: str):
    await manager.connect(websocket, appointment_id)
    try:
        while True:
            # Keep connection alive, though we send messages via the POST endpoint
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket, appointment_id)
