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
        # Add a test user to the database
        test_user = User(user_name="User xyz", user_email="user@email.com")
        db.session.add(test_user)
        db.session.commit()

    yield app

    # Clean up / reset the database after each tests
    with app.app_context():
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    # A test client for the app.
    return app.test_client()

def test_add_or_update_user(client):
    # Test the POST /api/users/ endpoint for adding a new user.
    new_user_data = {
        "user_name": "New User",
        "user_email": "newuser@email.com"
    }

    # Test adding a new user
    response = client.post('/api/users/', json=new_user_data)
    assert response.status_code == 201
    data = response.get_json()
    assert data['user_name'] == new_user_data['user_name']
    assert data['user_email'] == new_user_data['user_email']

    # Test updating an existing user by email
    updated_user_data = {
        "user_name": "Updated User",
        "user_email": "newuser@email.com"
    }

    response = client.post('/api/users/', json=updated_user_data)
    assert response.status_code == 200  # Expect 200 OK for an update

    updated_data = response.get_json()
    assert updated_data['user_name'] == updated_user_data['user_name']
    assert updated_data['user_email'] == updated_user_data['user_email']

    with client.application.app_context():
        updated_user = User.query.filter_by(user_email=updated_user_data['user_email']).first()
        assert updated_user is not None
        assert updated_user.user_name == updated_user_data['user_name']

def test_add_user_with_duplicate_email(client):
    # Test adding a new user with an existing email.
    duplicate_user_data = {
        "user_name": "Duplicate User",
        "user_email": "user@email.com"
    }

    response = client.post('/api/users/', json=duplicate_user_data)
    assert response.status_code == 200  # Expect 200 OK for updating existing user

    data = response.get_json()
    assert data['user_name'] == "Duplicate User"  # Ensure the name has changed

    with client.application.app_context():
        users_count = User.query.count()
        assert users_count == 1  # Ensure still only one user in the database
