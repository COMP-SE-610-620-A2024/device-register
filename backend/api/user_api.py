from flask import Blueprint, request, Response
from backend.controllers.user_controller import add_or_update_user, get_user_by_id, get_all_users

user_api = Blueprint('user_api', __name__)

@user_api.route('/', methods=['POST'])
def create_user() -> tuple[Response, int]:
    user_data: dict[str, str | int] = request.get_json()
    return add_or_update_user(user_data=user_data)  # Pass user_data for creation

@user_api.route('/<int:user_id>', methods=['GET'])
def get_user(user_id: int) -> tuple[Response, int]:
    return get_user_by_id(user_id)

@user_api.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id: int) -> tuple[Response, int]:
    user_data: dict[str, str | int] = request.get_json()
    return add_or_update_user(user_data=user_data, user_id=user_id)  # Pass user_id for update

@user_api.route('/', methods=['GET'])
def list_users() -> tuple[Response, int]:
    return get_all_users()
