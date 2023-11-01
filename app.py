import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory, render_template
import flask_cors
from werkzeug.utils import secure_filename
import gps_info
import sqlite3

UPLOAD_FOLDER = './static/img'
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg'])
DATABESE = 'database.db' #定数化

#app = Flask(__name__, static_folder='.', static_url_path='')
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config["SECRET_KEY"] = "sample1203"

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#データベース
def create_books_table():
    con = sqlite3.connect(DATABESE) #引数は、データベースの名前
    #conは、データベースへ接続するためのオブジェクト(コネクションオブジェクト)

    #エラーにならないように IF NOT EXIST を記述する
    con.execute("CREATE TABLE IF NOT EXISTS Poses (long, lat)") #テーブル作成のSQL文 
    #longが緯度、latが経度
    con.close() #データベースとの接続を閉じる。 


Upload_File = 0
gpsdata = (0, 0)


@app.route('/', methods=['GET','POST'])
def upload_file():

	global Upload_File, gpsdata #return redirect(request.url)の時に、関数が振り出しに戻る。
	#そのため、関数内の変数が保持されない。対処法として、global変数を定義する。

	#テーブルを作成
	create_books_table() 
    #コネクションオブジェクトを作成する。
	con = sqlite3.connect(DATABESE)
	DB_Poses = con.execute('SELECT * FROM Poses').fetchall() #fetchallでpythonのlistオブジェクトとして取得することができる(1行が1つのタプルになっている。) 
    #SELECTは、SQLテーブルからデータを取得することができる。
    #SELECT * FROM booksは、booksテーブル内の全てのデータを取得するという意味。
	con.close()

    #python側でデータを作る。
    #1つの辞書に設定
	Poses = []
    #辞書として取得
	for row in DB_Poses:
		Poses.append({'lat':row[0], 'long':row[1]})


	if request.method == 'POST':
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
			gpsdata = gps_info.get_gps(fname)
			#print(round(gpsdata[0], 7)) #小数点以下第8位を四捨五入する。
			#print(round(gpsdata[1], 7)) #小数点以下第8位を四捨五入する。
			#print(Upload_File)
			Long = round(gpsdata[0], 7) #緯度を四捨五入
			Lat = round(gpsdata[1], 7)  #経度を四捨五入

			con = sqlite3.connect(DATABESE)
    
            #INSERT INTO テーブル名 VALUES(1列目の値, 2列目の値, 3列目の値)
            #テーブルにデータを入力する。    
            #?には順番に下記の変数の値が当てはめられる。
			con.execute('INSERT INTO Poses VALUES(?, ?)',[Long, Lat])
			con.commit() #入力後に実行する関数
		
			DB_Poses = con.execute('SELECT * FROM Poses').fetchall() #fetchallでpythonのlistオブジェクトとして取得することができる(1行が1つのタプルになっている。) 
            #SELECTは、SQLテーブルからデータを取得することができる。
            #SELECT * FROM booksは、booksテーブル内の全てのデータを取得するという意味。
			con.close()
 
            #辞書として追加されたデータを再取得
			for row in DB_Poses:
				Poses.append({'long':row[0], 'lat':row[1]})
				
			return redirect(request.url)
        
		#print(Upload_File)
	#print(Upload_File)
	return render_template(
		'index.html',
		poses = Poses, #緯度と経度を辞書の形で送信する。
		Up = Upload_File #Uploadできたかどうか
	)



Upload_File = 0
app.run(port=5000, debug=True)