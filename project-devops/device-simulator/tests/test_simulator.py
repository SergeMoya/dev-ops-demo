import pytest
from device_simulator.simulator import DeviceSimulator

class TestDeviceSimulator:
    def test_generate_telemetry(self):
        simulator = DeviceSimulator('test_device')
        telemetry = simulator.generate_telemetry()
        
        assert 'device_id' in telemetry
        assert 'heart_rate' in telemetry
        assert 'steps' in telemetry
        assert 'timestamp' in telemetry
        assert 'battery_level' in telemetry
        
        assert 60 <= telemetry['heart_rate'] <= 120
        assert 0 <= telemetry['steps'] <= 1000
        assert 10 <= telemetry['battery_level'] <= 100
