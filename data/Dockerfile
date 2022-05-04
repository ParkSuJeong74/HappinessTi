FROM python:3.8.5
WORKDIR /test
COPY . .
RUN pip install -r requirements.txt
RUN pip install python-dotenv
EXPOSE 8000
CMD python ./app.py