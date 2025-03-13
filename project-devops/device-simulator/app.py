from flask import Flask, jsonify
from flask_cors import CORS
from device_simulator.simulator import DeviceSimulator

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Create a single device simulator instance
simulator = DeviceSimulator('device_1')

# Create multiple device simulators
device_simulators = DeviceSimulator.generate_multiple_devices(5)

@app.route('/')
def home():
    """Root endpoint for testing"""
    return jsonify({'status': 'ok', 'message': 'Device Simulator API is running'})

@app.route('/telemetry', methods=['GET'])
def get_telemetry():
    """Get telemetry from a single device"""
    return jsonify(simulator.generate_telemetry())

@app.route('/telemetry/all', methods=['GET'])
def get_all_telemetry():
    """Get telemetry from all devices"""
    return jsonify([
        device.generate_telemetry() 
        for device in device_simulators
    ])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
