from flask import Blueprint, request, Response
from backend.controllers.user_controller import add_or_update_user, get_user, get_all_users

user_api = Blueprint('user_api', __name__)

@user_api.route('/users', methods=['POST'])
def create_user_route() -> Response:
    user_data: dict[str, str | int] = request.get_json()
    return add_or_update_user(user_data=user_data)  # Pass user_data for creation

@user_api.route('/users/<int:user_id>', methods=['GET'])
def get_user_route(user_id: int) -> Response:
    return get_user(user_id)

@user_api.route('/users/<int:user_id>', methods=['PUT'])
def update_user_route(user_id: int) -> Response:
    user_data: dict[str, str | int] = request.get_json()
    return add_or_update_user(user_data=user_data, user_id=user_id)  # Pass user_id for update

@user_api.route('/users', methods=['GET'])
def get_all_users_route() -> Response:
    return get_all_users()
