from flask import jsonify, Response
from backend.models.user_model import User

def get_user_by_id(user_id: int) -> tuple[Response, int]:
    user: User | None = User.query.get(user_id)
    if user:
        return jsonify(user.to_dict()), 200
    return jsonify({'error': 'User not found'}), 404

def add_or_update_user(user_data: dict[str, str | int], user_id: int = None) -> tuple[Response, int]:
    try:
        if user_id:
            user: User = User.query.get(user_id)
            if user:
                User.update_user(user_id, user_data)
                return jsonify(user.to_dict()), 200
            else:
                return jsonify({'error': 'User not found'}), 404
        else:  # Create a new user if user_id is not provided
            new_user: User = User.add_user(user_data)
            return jsonify(new_user.to_dict()), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

def get_all_users() -> tuple[Response, int]:
    users: list[User] = User.get_all()  # Use the new get_all() method
    user_list: list[dict[str, str]] = [user.to_dict() for user in users]
    return jsonify(user_list), 200

