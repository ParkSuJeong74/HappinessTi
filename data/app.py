#<app.py>
from flask import Flask, render_template, request, redirect

app = Flask(__name__)

fruit_list = ['수박']


@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == 'POST':
        input_fruit = request.form['fruit']
        # 입력받은 과일을 fruit_list에 저장하세요.
        fruit_list.append(input_fruit)
        return redirect('/')
    
    # 과일 리스트를 매개변수로 넘겨주세요.
    return render_template("index.html",fruit_list=fruit_list)


if __name__ == "__main__":
    app.run(debug=True)