import pickle
import pandas as pd
from datetime import datetime
import json
from bson import json_util

# import os
# import tensorflow as tf
# import numpy as np
# from tensorflow import keras
# from skimage import io
# from tensorflow.keras.preprocessing import image

from flask import Flask, request, jsonify

from flask_cors import CORS, cross_origin
from pymongo import MongoClient

# password = iot
# username = iot
client = MongoClient('mongodb+srv://iot:iot@cluster0.qsrqdn2.mongodb.net/?retryWrites=true&w=majority')
db = client.db
crop_recommendation = db.crop_recommendation
irrigation_coll = db.irrigation_coll
user = db.user

app = Flask(__name__)
rf_model = pickle.load(open('model.pkl', 'rb'))


cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def index():
    return {"result": "hello server"}


@app.route('/recommend', methods=['POST', 'PUT'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def recommend():
    data = request.json
    cropdata = data["data"]
    predicted = rf_model.predict([cropdata])[0]

    username = data["username"]

    store_data = {"username": username, "data" : cropdata, "recommend": predicted}
    crop_recommendation.insert_one(store_data)

    result = {"status": "successful"}
    return jsonify(result)

@app.route('/get_recommend', methods=['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def get_recommend():

    data = request.json
    username = data["username"]
    res = list(crop_recommendation.find({"username": username}, {'_id': False}))

    result = {"result": res}
    return jsonify(result)

@app.route('/setter', methods=['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def setter():

    data = request.json
    username = data["username"]
    time = data["time"]
    status = data["status"]
    createdata = {"username": username, "time": time, "status": status}
    irrigation_coll.insert_one(createdata)
    result = {"result": "successfull"}

    return jsonify(result)


@app.route('/irrigation', methods=['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def irrigation():

    data = request.json
    username = data["username"]
    createdata = {"username": username}
    res = list(irrigation_coll.find(createdata, {'_id': False}))
    result = {"result": res}

    return jsonify(result)  

@app.route('/signup', methods=['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def signup():
    data = request.json
    username = data["username"]
    password = data["password"]
    create = {"username": username,"password": password}

    res = list(user.find({"username": username,"password": password}, {'_id': False}))

    if(len(res) == 0):
        user.insert_one(create)

    return {"result": "successful"}

@app.route('/login', methods=['POST'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def login():

    data = request.json
    username = data["username"]
    password = data["password"]

    res = list(user.find({"username": username,"password": password}, {'_id': False}))

    if(len(res) == 0):
        result = {"result": "false"}

        return jsonify(result)

    result = {"result": "true"}
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
