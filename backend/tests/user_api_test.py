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
        test_user: User = User(user_name="User xyz",
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

def test_user_to_dict(app):
    with app.app_context():
        user = User.query.first()

        user_dict = user.to_dict()

        assert user_dict['user_id'] == str(user.user_id)
        assert user_dict['user_name'] == user.user_name
        assert user_dict['user_email'] == user.user_email

def test_get_all_users(client):
    # Test the GET /api/users endpoint.
    response = client.get('/api/users/')
    assert response.status_code == 200

    data = response.get_json()
    assert len(data) == 1
    assert data[0]['user_name'] == "User xyz"
    assert data[0]['user_email'] == "user@email.com"

def test_get_user_by_id(client):
    # Test the GET /api/users/int:user_id endpoint.
    response = client.get('/api/users/1')
    assert response.status_code == 200

    data = response.get_json()
    assert data['user_id'] == "1"
    assert data['user_name'] == "User xyz"
    assert data['user_email'] == "user@email.com"

    response_404 = client.get('/api/users/9999')
    assert response_404.status_code == 404

def test_add_or_update_user(client):
    # Test the POST /api/users/int:user_id endpoint.
    new_user_data = {
        "user_name": "New User",
        "user_email": "newuser@email.com"
    }

    response = client.post('/api/users/', json=new_user_data)
    assert response.status_code == 201

    data = response.get_json()
    assert data['user_name'] == new_user_data['user_name']
    assert data['user_email'] == new_user_data['user_email']

    with client.application.app_context():
        user = User.query.filter_by(user_email=new_user_data['user_email']).first()
        assert user is not None
        assert user.user_name == new_user_data['user_name']

    # Test the PUT /api/users/int:user_id endpoint.
    updated_user_data = {
        "user_name": "Updated User",
        "user_email": "newuser@email.com"
    }

    response = client.put(f'/api/users/{user.user_id}', json=updated_user_data)
    assert response.status_code == 200

    updated_data = response.get_json()
    assert updated_data['user_name'] == updated_user_data['user_name']
    assert updated_data['user_email'] == updated_user_data['user_email']

    with client.application.app_context():
        updated_user = User.query.filter_by(user_email=updated_user_data['user_email']).first()
        assert updated_user is not None
        assert updated_user.user_name == updated_user_data['user_name']

def test_add_user_with_duplicate_email(client):
    # Test adding a new user with an existing email.
    # Test the POST /api/users/int:user_id endpoint.
    duplicate_user_data = {
        "user_name": "Duplicate User",
        "user_email": "user@email.com"
    }

    response = client.post('/api/users/', json=duplicate_user_data)

    assert response.status_code == 400

    data = response.get_json()
    assert data['error'] == "Email already exists."

    with client.application.app_context():
        users_count = User.query.count()
        assert users_count == 1
