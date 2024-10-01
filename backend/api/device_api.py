from flask import Blueprint, Response, request
from backend.controllers.device_controller import (
    get_devices,
    get_device_by_id,
    update_device
)

device_api = Blueprint('device_api', __name__)


@device_api.route('/', methods=['GET'])
def list_devices() -> tuple[Response, int]:
    return get_devices()


@device_api.route('/<int:dev_id>', methods=['GET'])
def device_by_id(dev_id: int) -> tuple[Response, int]:
    return get_device_by_id(dev_id)


@device_api.route('/<int:dev_id>', methods=['PATCH'])
def update_device_by_id(dev_id: int) -> tuple[Response, int]:
    device_data = request.get_json()
    return update_device(dev_id, device_data)
