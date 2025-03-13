from setuptools import setup, find_packages

setup(
    name="device_simulator",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        "Flask==2.3.2",
        "flask-cors==4.0.0",
        "pytest==7.4.0",
        "pytest-cov==4.1.0",
        "requests==2.31.0",
        "python-dotenv==1.0.0",
    ],
)
