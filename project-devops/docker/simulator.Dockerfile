FROM python:3.9-slim

WORKDIR /app

COPY device-simulator/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY device-simulator/ .

EXPOSE 5000
CMD ["python", "app.py"]