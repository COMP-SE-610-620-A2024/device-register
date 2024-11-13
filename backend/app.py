from flask import Flask, request, jsonify
from backend.setup.database_Init import db
from flask_cors import CORS
from backend.setup.swagger_setup import setup_swagger
from sqlalchemy import event
from sqlalchemy.engine import Engine
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

from backend.utils.backup import Backup
from backend.utils.config import config

load_dotenv()
backup_instance = None


@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record) -> None:
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


def create_app(env_config_file: str = ".env.development") -> Flask:

    config.load(env_config_file)
    app: Flask = Flask(__name__)
    CORS(app)

    app.config['TESTING'] = config.TESTING
    app.config['SQLALCHEMY_DATABASE_URI'] = config.SQLALCHEMY_DATABASE_URI
    app.config['JWT_SECRET_KEY'] = config.JWT_SECRET_KEY
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Bearer'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    setup_swagger(app)
    JWTManager(app)
    db.init_app(app)
    global backup_instance
    if backup_instance is None:
        backup_instance = Backup()


    from backend.api.device_api import device_api
    app.register_blueprint(device_api, url_prefix=f'{config.BACKEND_BASEPATH}/devices')

    from backend.api.user_api import user_api
    app.register_blueprint(user_api, url_prefix=f'{config.BACKEND_BASEPATH}/users')

    from backend.api.event_api import event_api
    app.register_blueprint(event_api, url_prefix=f'{config.BACKEND_BASEPATH}/events')

    from backend.api.auth_api import auth_api
    app.register_blueprint(auth_api, url_prefix=f'{config.BACKEND_BASEPATH}/auth')

    from backend.api.class_api import class_api
    app.register_blueprint(class_api, url_prefix=f'{config.BACKEND_BASEPATH}/classes')

    from backend.api.attachments_api import attachments_api
    app.register_blueprint(
        attachments_api, url_prefix=f'{config.BACKEND_BASEPATH}/attachments')

    with app.app_context():
        db.create_all()

    @app.route(f'{config.BACKEND_BASEPATH}/flask')
    def index() -> str:
        return "Hello from Flask with SQLAlchemy!"

    @app.route('/headers')
    def headers():
        h = dict(request.headers)
        return jsonify(h), 200

    return app


# Running the app
if __name__ == '__main__':
    application = create_app()
    application.run(debug=True)
