from flask import Flask
from flask_socketio import SocketIO, emit
import serial
import time
import threading

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

isSensorOn = False
ser = None  # Initialize the serial connection object globally
port = 'COM3'
baudrate = 9600

@app.route('/')
def index():
    return "Flask SocketIO Server Running"

@socketio.on('toggle_switch')
def toggle_switch(data):
    global isSensorOn, ser
    if data['state'] == 'on':
        if isSensorOn == True : 
            # turn off the senso 
            isSensorOn = False
            if ser and ser.is_open:
                ser.close()
            print("Sensor is switched off")
            emit('switch_status', {'state': 'off'}, broadcast=True)
        if not isSensorOn:
            isSensorOn = True
            ser = serial.Serial(port, baudrate, timeout=1)
            print("Sensor is switched on")
            emit('switch_status', {'state': 'on'}, broadcast=True)
            socketio.sleep(0.1)
            while isSensorOn:
                if ser and ser.in_waiting > 0:
                    data = ser.readline().decode('utf-8').strip()
                    print(f"Arduino: {data}")
                    emit('response', {'value': data})
                    socketio.sleep(0.1)
                socketio.sleep(0.1)
    
    elif data['state'] == 'off':
        if isSensorOn:
            isSensorOn = False
            if ser and ser.is_open:
                ser.close()
            print("Sensor is switched off")
            emit('switch_status', {'state': 'off'}, broadcast=True)

@socketio.on('message')
def handle_message(data):
    print(f"Message received: {data}")
    emit('response', {'message': f"Server received: {data}"}, broadcast=True)
    print(f"Connected to {port} at {baudrate} baud")
    socketio.sleep(0.1)

def readSensor():
    global ser
    while isSensorOn:
        if ser and ser.in_waiting > 0:
            data = ser.readline().decode('utf-8').strip()
            print(f"Arduino: {data}")
            emit('message', {'value': data})
        socketio.sleep(0.1)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
