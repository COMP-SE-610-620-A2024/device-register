from flask import jsonify, Response
from backend.models.user_model import User

def get_user_by_id(user_id: int) -> tuple[Response, int]:
    user: User | None = User.query.get(user_id)
    if user:
        return jsonify(user.to_dict()), 200
    return jsonify({'error': 'User not found'}), 404

def add_or_update_user(user_data: dict[str, str | int]) -> tuple[Response, int]:
    try:
        # Check if the user exists
        existing_user = User.query.filter_by(user_email=user_data.get('user_email')).first()

        if existing_user:
            # Update the existing user
            updated_user: User = User.add_or_update_user(user_data)
            return jsonify(updated_user.to_dict()), 200  # Return 200 for updates
        else:
            # Add a new user
            new_user: User = User.add_or_update_user(user_data)
            return jsonify(new_user.to_dict()), 201  # Return 201 for creation
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

def get_all_users() -> tuple[Response, int]:
    users: list[User] = User.get_all()
    user_list: list[dict[str, str]] = [user.to_dict() for user in users]
    return jsonify(user_list), 200
