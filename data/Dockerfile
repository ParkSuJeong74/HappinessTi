FROM python:3.8.5
WORKDIR /
COPY . .
RUN pip install -r requirements.txt
RUN pip install python-dotenv
COPY .env .
ENV FLASK_PORT=8000
ENV FLASK_DEBUG=True
ENV FLASK_APP=app.py
EXPOSE 8000
CMD ["python", "app.py", "-p", "8000"]
