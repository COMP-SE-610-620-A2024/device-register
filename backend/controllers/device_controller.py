from typing import Union, Optional

from datetime import datetime
from flask import current_app, jsonify, request, Response
from backend.controllers.event_controller import create_event
from backend.models.device_model import Device
from backend.utils.qr_generator import generate_qr, remove_qr


def get_devices() -> tuple[Response, int]:
    all_devices: list[Device] = Device.get_all()
    device_list: list[dict[str, str]] = [
        device.to_dict() for device in all_devices
    ]

    return jsonify(device_list), 200


def create_devices() -> tuple[Response, int]:
    device_json = request.get_json()

    if not isinstance(device_json, list):
        return jsonify({'error': "Expected a list of devices"}), 400

    device_list = []
    device_list_with_location = []
    for item in device_json:
        if not all(key in item for key in ('dev_name', 'dev_manufacturer',
                                           'dev_model', 'dev_class',
                                           'dev_location', 'dev_comments')):
            return (jsonify({'error': "All devices must have"
                                      " name,"
                                      " manufacturer,"
                                      " model,"
                                      " class,"
                                      " location and comments"}),
                    400)

        new_device = Device(dev_name=item['dev_name'],
                            dev_manufacturer=item['dev_manufacturer'],
                            dev_model=item['dev_model'],
                            dev_class=item['dev_class'],
                            dev_comments=item['dev_comments'])

        device_list.append(new_device)
        device_list_with_location.append((new_device, item['dev_location']))

    dev_db_success, dev_db_error = Device.create_devices(device_list)
    if not dev_db_success:
        return jsonify({'error': f"Database error: {dev_db_error}"}), 500

    home_event_list = []
    for device, location in device_list_with_location:
        generate_qr(device.dev_id)
        new_event_json = {
            'dev_id': device.dev_id,
            'user': {
                'user_name': 'admin',
                'user_email': 'admin@admin'
            },
            'move_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'loc_name': location,
            'comment': ''
        }
        home_event_list.append(new_event_json)

    event_response, event_status_code = create_event(home_event_list)

    if event_status_code != 201:
        print(event_response.get_json())
        return jsonify({'message': "Devices created successfully, "
                                   "but creation events failed"}), 207

    return jsonify({'message': "Devices created successfully"}), 201


def get_device_by_id(dev_id: int) -> tuple[Response, int]:
    device: Optional[Device] = Device.get_device_by_id(dev_id)
    if device:
        return jsonify(device.to_dict()), 200
    return jsonify({'error': 'Device not found'}), 404


def get_events_by_device_id(dev_id: int) -> tuple[Response, int]:
    events, status_code = Device.get_events_by_device_id(dev_id)
    if status_code == 404:
        return jsonify({'error': 'Device not found'}), 404
    return jsonify([event.to_dict() for event in events]), 200


def update_device(
        dev_id: int, device_data: dict[str, Union[str, int]]) -> tuple[Response, int]:
    valid_fields = {
        'dev_name', 'dev_manufacturer', 'dev_model', 'dev_class', 'dev_comments'}

    if not any(key in valid_fields for key in device_data):
        return jsonify({'error': 'No valid fields provided to update'}), 400

    updated_device, success = Device.update_device_by_id(dev_id, device_data)

    if success:
        return jsonify(updated_device.to_dict()), 200
    else:
        return jsonify({'error': 'Device not found'}), 404


def remove_devices() -> tuple[Response, int]:
    id_list_json = request.get_json()

    if not isinstance(id_list_json, list):
        return jsonify({'error': "Expected a list of devices"}), 400

    device_id_list = []

    for item in id_list_json:
        if not isinstance(item, dict):
            return jsonify({'error': "Each device must be an object"}), 400

        if 'id' not in item or len(item) != 1:
            return jsonify({'error': "Each device object must have only"
                                     " 'id' attribute"}), 400

        device_id_list.append(item['id'])

    database_response = Device.remove_devices(device_id_list)

    if database_response[0] == 200:
        for dev_id in device_id_list:
            remove_qr(dev_id)
        return jsonify({'message': "Devices deleted successfully"}), 200
    elif database_response[0] == 404:
        return (jsonify({'error': f"Failed to delete devices. "
                                  f"{database_response[1]}"}), 404)
    else:
        return jsonify({'error': f"Database error: {database_response[1]}"}), 500


def current_locations() -> tuple[Response, int]:
    locations = Device.get_current_locations()
    return jsonify(locations), 200
