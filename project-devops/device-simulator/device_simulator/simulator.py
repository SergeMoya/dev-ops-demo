import random
from datetime import datetime

class DeviceSimulator:
    def __init__(self, device_id):
        self.device_id = device_id

    def generate_telemetry(self):
        return {
            'device_id': self.device_id,
            'heart_rate': random.randint(60, 120),
            'steps': random.randint(0, 1000),
            'timestamp': datetime.utcnow().isoformat(),
            'battery_level': random.randint(10, 100)
        }

    @staticmethod
    def generate_multiple_devices(num_devices):
        return [DeviceSimulator(f'device_{i}') for i in range(num_devices)]
