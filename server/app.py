import pickle
import pandas as pd
from datetime import datetime
import json
from bson import json_util

import os
import tensorflow as tf
import numpy as np
from tensorflow import keras
from skimage import io
from tensorflow.keras.preprocessing import image

from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer

model =tf.keras.models.load_model('PlantDNet.h5',compile=False)
print('Model loaded. Check http://127.0.0.1:5000/')

from flask import Flask, request, jsonify

from flask_cors import CORS, cross_origin
from pymongo import MongoClient

# password = iot
# username = iot

client = MongoClient(
    'mongodb+srv://iot:iot@cluster0.facczqu.mongodb.net/?retryWrites=true&w=majority')
db = client.db
crop_recommendation = db.crop_recommendation
irrigation_coll = db.irrigation_coll
user = db.user

app = Flask(__name__)
rf_model = pickle.load(open('model.pkl', 'rb'))


cors = CORS(app, resources={r"/foo": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

def model_predict(img_path, model):
    img = image.load_img(img_path, grayscale=False, target_size=(64, 64))
    show_img = image.load_img(img_path, grayscale=False, target_size=(64, 64))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = np.array(x, 'float32')
    x /= 255
    preds = model.predict(x)
    return preds

@app.route('/', methods=['GET'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def index():
    return {"result": "hello server"}

@app.route('/predict', methods=['GET', 'POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        preds = model_predict(file_path, model)
        print(preds[0])

        # x = x.reshape([64, 64]);
        disease_class = ['Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy', 'Potato___Early_blight',
                         'Potato___Late_blight', 'Potato___healthy', 'Tomato_Bacterial_spot', 'Tomato_Early_blight',
                         'Tomato_Late_blight', 'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot',
                         'Tomato_Spider_mites_Two_spotted_spider_mite', 'Tomato__Target_Spot',
                         'Tomato__Tomato_YellowLeaf__Curl_Virus', 'Tomato__Tomato_mosaic_virus', 'Tomato_healthy']
        a = preds[0]
        ind=np.argmax(a)
        print('Prediction:', disease_class[ind])
        result=disease_class[ind]
        return result
    return None


@app.route('/recommend', methods=['POST', 'PUT'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def recommend():
    data = request.json
    # print(data)
    cropdata = data["data"]  # N,P,K,temperature,humidity,ph,rainfall details
    # print(cropdata)
    predicted = rf_model.predict([cropdata])[0]

    username = data["username"]

    store_data = {"username": username,
                  "data": cropdata, "recommend": predicted}
    crop_recommendation.insert_one(store_data)

    result = {"status": "successful"}
    return jsonify(result)


@app.route('/get_recommend', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def get_recommend():

    data = request.json
    username = data["username"]
    res = list(crop_recommendation.find(
        {"username": username}, {'_id': False}))

    result = {"result": res}
    return jsonify(result)


@app.route('/setter', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
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
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def irrigation():

    data = request.json
    username = data["username"]
    createdata = {"username": username}
    res = list(irrigation_coll.find(createdata, {'_id': False}))
    result = {"result": res}

    return jsonify(result)


@app.route('/signup', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def signup():
    data = request.json
    username = data["username"]
    password = data["password"]
    print(username+" "+password)
    create = {"username": username, "password": password}

    res = list(
        user.find({"username": username, "password": password}, {'_id': False}))

    if(len(res) == 0):
        user.insert_one(create)

    return {"result": "successful"}


@app.route('/login', methods=['POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def login():

    data = request.json
    username = data["username"]
    password = data["password"]

    res = list(
        user.find({"username": username, "password": password}, {'_id': False}))

    if(len(res) == 0):
        result = {"result": "false"}

        return jsonify(result)

    result = {"result": "true"}
    return jsonify(result)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
