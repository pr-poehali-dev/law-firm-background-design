import json
import os
import psycopg2
from typing import Dict, Any
from pydantic import BaseModel, Field, EmailStr, ValidationError

class ConsultationRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    phone: str = Field(..., min_length=1, max_length=50)
    email: EmailStr
    message: str = Field(..., min_length=1)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Handle consultation booking requests from law firm website
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with attributes: request_id, function_name, function_version
    Returns: HTTP response dict with statusCode, headers, body
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        consultation = ConsultationRequest(**body_data)
        
        db_url = os.environ.get('DATABASE_URL')
        
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        cur.execute(
            "INSERT INTO t_p15815269_law_firm_background_.consultations (name, phone, email, message) VALUES (%s, %s, %s, %s) RETURNING id",
            (consultation.name, consultation.phone, consultation.email, consultation.message)
        )
        
        consultation_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'id': consultation_id,
                'message': 'Заявка принята'
            }),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
