import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory, render_template, jsonify
from werkzeug.utils import secure_filename
import gps_info
import sqlite3

UPLOAD_FOLDER = './static/img'
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg'])
DATABASE = 'database.db' #定数化

#app = Flask(__name__, static_folder='.', static_url_path='')
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config["SECRET_KEY"] = "sample1203"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#データベース
def create_books_table():
    con = sqlite3.connect(DATABASE) #引数は、データベースの名前
    #conは、データベースへ接続するためのオブジェクト(コネクションオブジェクト)

    #エラーにならないように IF NOT EXIST を記述する
    con.execute("CREATE TABLE IF NOT EXISTS Poses (long, lat, location, content, pinType, tagType, remarks, filename, address)") #テーブル作成のSQL文
    #longが緯度、latが経度
    #longが緯度、latが経度
    con.close() #データベースとの接続を閉じる。


Upload_File = 0
gpsdata = (0, 0)
check = 0

# ページ読み込み時にチェック状態を渡すAPI
@app.route('/get_check_status', methods=['GET'])
def get_check_status():
    global check
    return jsonify({'check': check})
@app.route('/reset_check_status', methods=['GET', 'POST'])
def reset_check_status():
    global check
    check = 0
    return jsonify({'check': check})

# アップロードしたファイルから取得した情報を渡すAPI
@app.route('/', methods=['GET', 'POST'])
def upload_file():
    global Upload_File, gpsdata, check

    # テーブルを作成
    create_books_table()
    con = sqlite3.connect(DATABASE)
    DB_Poses = con.execute('SELECT * FROM Poses').fetchall()
    con.close()

    Poses = []
    for row in DB_Poses:
        Poses.append({'lat': row[0], 'long': row[1],'location': row[2], 'content': row[3],'pinType': row[4], 'tagType': row[5],'remarks': row[6],'filename': row[7], 'address': row[8]})

    if request.method == 'POST':
        # フォームからデータを取得
        location = request.form['location']
        content = request.form['content']
        pinType = request.form['pinType']
        tagType = request.form['tagType']
        remarks = request.form['remarks']
        # 以下、GPSデータの取得とデータベースへの挿入
        if 'file' not in request.files:
            flash('No file part', "failed1")
            return redirect(request.url)

        file = request.files['file']
        if file.filename == '':
            flash('No selected file', "failed2")
            return redirect(request.url)

        if file and allowed_file(file.filename):
            Upload_File = 1
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            fname = './static/img/' + filename
            try:
                gpsdata = gps_info.get_gps(fname)

                Long = round(gpsdata[0], 7)
                Lat = round(gpsdata[1], 7)
                Longtitude = round(gpsdata[0], 4)
                Latitude = round(gpsdata[1], 4)

                address = gps_info.search_address("dj00aiZpPWhNeTlXMkwwTVFodCZzPWNvbnN1bWVyc2VjcmV0Jng9OWM-", Latitude,Longtitude)

                con = sqlite3.connect(DATABASE)
                con.execute('INSERT INTO Poses VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                            [Long, Lat, location, content, pinType, tagType, remarks, filename, address])
                con.commit()

                DB_Poses = con.execute('SELECT * FROM Poses').fetchall()
                con.close()

                for row in DB_Poses:
                    Poses.append({'lat': row[0], 'long': row[1],'location': row[2], 'content': row[3],'pinType': row[4], 'tagType': row[5],'remarks': row[6],'filename': row[7], 'address': row[8]})
                    check = 0

            except ValueError as e:
                flash(str(e), "error")
                check = 1
                return redirect(request.url)

            return redirect(request.url)

    return render_template(
        'index.html',
        poses=Poses,
        Up=Upload_File
    )



Upload_File = 0
app.run()