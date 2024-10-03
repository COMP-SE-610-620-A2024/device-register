from flask import Flask
from backend.setup.database_Init import db
from flask_cors import CORS
from backend.setup.swagger_setup import setup_swagger


def create_app(testing=False) -> Flask:
    app = Flask(__name__)
    CORS(app)

    setup_swagger(app)

    if testing:
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    from backend.api.device_api import device_api
    app.register_blueprint(device_api, url_prefix='/api/devices')

    from backend.api.user_api import user_api
    app.register_blueprint(user_api, url_prefix='/api/users')

    from backend.api.event_api import event_api
    app.register_blueprint(event_api, url_prefix='/api/events')

    with app.app_context():
        db.create_all()

    @app.route('/')
    def index() -> str:
        return "Hello from Flask with SQLAlchemy!"

    return app


# Running the app
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
