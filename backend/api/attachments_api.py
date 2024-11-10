from flask import Blueprint, Response
from flask_jwt_extended import jwt_required
from backend.app import limiter
from backend.controllers.attachments_controller import upload_files, list_files
from backend.utils.check_admin import it_is_admin


attachments_api = Blueprint('attachments_api', __name__)


@attachments_api.route('/upload/<dev_id>', methods=['POST'])
@jwt_required(optional=True)
#@limiter.limit("4 per minute", exempt_when=it_is_admin)
@limiter.limit("4 per minute")
def send_files(dev_id: int) -> tuple[Response, int]:
    return upload_files(dev_id)


@attachments_api.route('/list/<dev_id>', methods=['GET'])
@jwt_required(optional=True)
def get_files(dev_id: int) -> tuple[Response, int]:
    return list_files(dev_id)
