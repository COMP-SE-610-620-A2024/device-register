from flask_jwt_extended import verify_jwt_in_request
from backend.controllers.auth_controller import is_admin


def it_is_admin():
    #verify_jwt_in_request(optional=True)
    if is_admin()[1] == 200:
        return True
    else:
        return False
