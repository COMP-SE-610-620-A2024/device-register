import pytest
from backend.app import create_app
from backend.utils.database_Init import db
from backend.models.device_model import Device


@pytest.fixture
def app():
    # Create and configure a new app instance for each tests.
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    with app.app_context():
        db.create_all()
        # Add a tests device to the database
        test_device = Device(dev_name="Device",
                             dev_type="Type A",
                             dev_serial="Test123")
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
    assert data[1]['dev_name'] == "Device"
    assert data[1]['dev_type'] == "Type A"
    assert data[1]['dev_serial'] == "Test123"


def test_post_devices(client, app):
    # Test the POST /api/devices/ endpoint.
    payload1 = [
        {
            "name": "Device 1",
            "type": "Type A",
            "serial": "123"
        },
        {
            "name": "Device 2",
            "type": "Type B",
            "serial": "456"
        }
    ]
    response1 = client.post('/api/devices/', json=payload1)
    assert response1.status_code == 201

    payload2 = {
            "name": "Device 3",
            "type": "Type A",
            "serial": "333"
    }
    response_not_list = client.post('/api/devices/', json=payload2)
    assert response_not_list.status_code == 400

    payload3 = [
        {
            "name": "Device 4",
            "type": "Type D",
            "serial": "444"
        },
        {
            "name": "Device 5",
            "type": "Type E"
        }
    ]
    response_missing_field = client.post('/api/devices/', json=payload3)
    assert response_missing_field.status_code == 400

    with app.app_context():
        devices = Device.query.all()

        assert len(devices) == 4

        assert devices[2].dev_name == "Device 1"
        assert devices[2].dev_type == "Type A"
        assert devices[2].dev_serial == "123"

        assert devices[3].dev_name == "Device 2"
        assert devices[3].dev_type == "Type B"
        assert devices[3].dev_serial == "456"
