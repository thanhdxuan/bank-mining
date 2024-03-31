import jwt
import time
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
import psycopg2
import ast

METABASE_SITE_URL = "http://localhost:3002"
METABASE_SECRET_KEY = "6d5bc8d158ffd9cd13c4cc4c503ce582f92eb7aa6b62ed08034c8f4b97b0b884"

payload = {
  "resource": {"dashboard": 8},
  "params": {
    
  },
  "exp": round(time.time()) + (60 * 10) # 10 minute expiration
}
token = jwt.encode(payload, METABASE_SECRET_KEY, algorithm="HS256")

iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true"


app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

postgre_host = "dpg-co2kmbsf7o1s73ckkrj0-a.singapore-postgres.render.com"
postgre_user = "banking_db_4twh_user"
postgre_password = "a9eVZXc6Bm8Qu5cGhdyJ4fm5p00fAuaC"
postgre_db = "banking_db_4twh"

db = psycopg2.connect(
        host=postgre_host,
        database=postgre_db,
        user=postgre_user,
        password=postgre_password)

@app.route("/")
@cross_origin()
def index():
    return "<p>This is index file</p>"