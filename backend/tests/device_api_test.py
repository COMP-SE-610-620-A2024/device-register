import pytest
from backend.app import create_app
from backend.utils.database_Init import db
from backend.models.device_model import Device


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
        test_device = Device(dev_name="Device",
                             dev_manufacturer="Manfact A",
                             dev_model="Model S",
                             dev_class="class A",
                             dev_comments="Location: Herwood xyz")
        db.session.add(test_device)
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


def test_get_devices(client):
    # Test the GET /api/devices/ endpoint.
    response = client.get('/api/devices/')
    assert response.status_code == 200  # Check that the status code is 200 OK

    data = response.get_json()
    assert len(data) == 2
    assert data[0]['dev_name'] == "Device"
    assert data[0]['dev_manufacturer'] == "Manfact A"
    assert data[0]['dev_model'] == "Model S"
    assert data[0]['dev_class'] == "class A"
    assert data[0]['dev_comments'] == "Location: Herwood xyz"


def test_get_device_by_id(client):
    # Test the GET /api/devices/int:dev_id endpoint.
    response = client.get('/api/devices/1')
    assert response.status_code == 200

    data = response.get_json()
    assert data['dev_id'] == "1"
    assert data['dev_name'] == "Device"
    assert data['dev_manufacturer'] == "Manfact A"
    assert data['dev_model'] == "Model S"
    assert data['dev_class'] == "class A"
    assert data['dev_comments'] == "Location: Herwood xyz"

    response_404 = client.get('/api/users/9999')
    assert response_404.status_code == 404


def test_update_device_by_id(client):
    # Test the PATCH /api/devices/int:dev_id endpoint.
    new_device_data = {
        "dev_name": "New device",
        "dev_manufacturer": "Toyota",
        "dev_model": "Corolla",
        "dev_class": "Super",
        "dev_comments": "Moved to Timbuktu"
    }

    response = client.patch('/api/devices/1', json=new_device_data)

    assert response.status_code == 200

    updated_device = response.get_json()

    assert updated_device['dev_name'] == "New device"
    assert updated_device['dev_manufacturer'] == "Toyota"
    assert updated_device['dev_model'] == "Corolla"
    assert updated_device['dev_class'] == "Super"
    assert updated_device['dev_comments'] == "Moved to Timbuktu"

    # Verify that updating a non-existent device returns 404
    response_404 = client.patch('/api/devices/9999', json=new_device_data)
    assert response_404.status_code == 404
