import pytest
from backend.app import create_app
from backend.utils.database_Init import db
from backend.models.user_model import User


@pytest.fixture
def app():
    # Create and configure a new app instance for each test.
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    with app.app_context():
        db.create_all()
        # Add a tests device to the database
        test_user = User(user_name="User xyz",
                        user_email="user@email.com")
        db.session.add(test_user)
        db.session.commit()

    yield app

    # Clean up / reset the database after each tests
    with app.app_context():
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    # A tests client for the app.
    return app.test_client()


def test_get_users(client):
    # Test the GET /api/devices/ endpoint.
    response = client.get('/api/users/')
    assert response.status_code == 200  # Check that the status code is 200 OK

    data = response.get_json()
    assert len(data) == 1
    assert data[0]['user_name'] == "User xyz"
    assert data[0]['user_email'] == "user@email.com"
