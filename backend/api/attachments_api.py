from flask import Blueprint, Response
from backend.controllers.attachements_controller import upload_files, list_files


attachments_api = Blueprint('attachments_api', __name__)


@attachments_api.route('/upload/<dev_id>', methods=['POST'])
def send_files(dev_id: int) -> tuple[Response, int]:
    return upload_files(dev_id)


@attachments_api.route('/list/<dev_id>', methods=['GET'])
def get_files(dev_id: int) -> tuple[Response, int]:
    return list_files(dev_id)
