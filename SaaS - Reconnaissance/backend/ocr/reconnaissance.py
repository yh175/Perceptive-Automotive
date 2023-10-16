import pytesseract
import cv2
import numpy as np
from flask import Flask, request, abort


app = Flask(__name__)


@app.route("/id-extraction", methods=["POST"])
def extract_id():
    # UPLOAD
    file = request.files['file']
    if not file: abort(400, 'Missing file parameter')

    image = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # OCR EXTRACTION
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
    cv2.imshow("GRAY", gray)
    text = pytesseract.image_to_string(gray)
    print(text)

    # PHOTO EXTRACTION
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=10, minSize=(30, 30))
    for (x, y, w, h) in faces:
        # cv2.rectangle(image, (x-10, y-40), (x+w+10, y+h+40), (0, 0, 255), 2)
        cropped_image = image[y-40:y+h+40, x-10:x+w+10]

    # cv2.imshow("ID", image)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    return text



if __name__ == '__main__':
    app.run(debug=True)
