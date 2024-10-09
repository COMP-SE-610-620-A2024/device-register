from flask import url_for
import qrcode
import os


# TODO: Make sure the folder exists
QR_FOLDER = os.path.join(os.getcwd(), 'static', 'qr')


def generate_qr(device_id: int):
    device_url = url_for('device_api.device_by_id' ,dev_id=device_id, _external=True)

    qr_image = qrcode.make(device_url)

    qr_image.save(qr_path(device_id))


def remove_qr(device_id: int):
    qr_image_path = qr_path(device_id)

    if os.path.exists(qr_image_path):
        os.remove(qr_image_path)


def qr_path(device_id: int):
    return os.path.join(QR_FOLDER, f'{device_id}.png')
