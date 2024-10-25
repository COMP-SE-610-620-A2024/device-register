import os
import pytest
from backend.app import create_app
from backend.setup.database_Init import db
from backend.models.device_model import Device
from backend.models.event_model import Event
from backend.models.user_model import User
from sqlalchemy.sql import func

from backend.utils.config import config


@pytest.fixture
def app():
    # Create and configure a new app instance for each test.
    app = create_app('.env-test')

    with app.app_context():
        db.create_all()
        # Add a tests device to the database
        test_device: Device = Device(
            dev_name="Device",
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
    assert len(data) == 1

    assert data[0]['dev_name'] == "Device"
    assert data[0]['dev_manufacturer'] == "Manfact A"
    assert data[0]['dev_model'] == "Model S"
    assert data[0]['dev_class'] == "class A"


def test_post_devices(client, app):
    # Test the POST /api/devices/ endpoint.
    payload1 = [
        {
            "dev_name": "Device 1",
            "dev_manufacturer": "Company A",
            "dev_model": "M1",
            "dev_class": "C1",
            "dev_location": "Lab",
            "dev_comments": ""
        },
        {
            "dev_name": "Device 2",
            "dev_manufacturer": "Company A",
            "dev_model": "M2",
            "dev_class": "C1",
            "dev_location": "lab",
            "dev_comments": ""
        }
    ]
    response1 = client.post('/api/devices/', json=payload1)
    assert response1.status_code == 201

    with app.app_context():
        devices = Device.query.all()

        assert len(devices) == 3

        # Clean up the created QR images
        for device in devices:
            dev_id = device.dev_id
            qr_image_path = os.path.join(config.PROJECT_ROOT, 'backend', 'static', 'qr',
                                         f"{dev_id}.png")
            if os.path.exists(qr_image_path):
                os.remove(qr_image_path)

    payload2 = {
            "dev_name": "Device 3",
            "dev_manufacturer": "Company A",
            "dev_model": "M3",
            "dev_class": "C1",
            "dev_comments": ""
    }
    response_not_list = client.post('/api/devices/', json=payload2)
    assert response_not_list.status_code == 400

    payload3 = [
        {
            "dev_name": "Device 4",
            "dev_manufacturer": "Company A",
            "dev_model": "M4",
            "dev_class": "C1",
            "dev_comments": ""
        },
        {
            "dev_name": "Device 5",
            "dev_manufacturer": "Company B",
            "dev_model": "M5",
            "dev_comments": ""
        }
    ]
    response_missing_field = client.post('/api/devices/', json=payload3)
    assert response_missing_field.status_code == 400

    response_empty_list = client.post('/api/devices/', json=[])
    assert response_empty_list.status_code == 400

    with app.app_context():
        devices = Device.query.all()

        assert len(devices) == 3

        device_1 = devices[1]
        assert device_1.dev_name == "Device 1"
        assert device_1.dev_manufacturer == "Company A"
        assert device_1.dev_model == "M1"
        assert device_1.dev_class == "C1"
        assert device_1.dev_comments == ""

        device_2 = devices[2]
        assert device_2.dev_name == "Device 2"
        assert device_2.dev_manufacturer == "Company A"
        assert device_2.dev_model == "M2"
        assert device_2.dev_class == "C1"
        assert device_2.dev_comments == ""


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


def test_update_device_invalid_fields(client):
    # Test updating with invalid fields
    invalid_device_data = {
        "invalid_field": "some value"
    }
    response = client.patch('/api/devices/1', json=invalid_device_data)

    assert response.status_code == 400
    data = response.get_json()
    assert data['error'] == 'No valid fields provided to update'


def test_get_events_by_device_id(client, app):
    # Test the GET /api/<int:dev_id>/events endpoint.
    with app.app_context():
        test_user: User = User(user_name="User", user_email="user@mail.com")
        db.session.add(test_user)
        db.session.commit()

        test_event1: Event = Event(
            dev_id=1,
            user_id=1,
            move_time=func.now(),
            loc_name='Lab',
            comment='Hello')
        db.session.add(test_event1)
        db.session.commit()

        test_event2: Event = Event(
            dev_id=1,
            user_id=1,
            move_time=func.now(),
            loc_name='Labz',
            comment='Hi')
        db.session.add(test_event2)
        db.session.commit()

        response = client.get('/api/devices/1/events')
        assert response.status_code == 200

        data = response.get_json()
        assert len(data) == 2
        assert data[0]['dev_id'] == "1"
        assert data[0]['user_id'] == "1"
        assert data[0]['loc_name'] == "Lab"
        assert data[0]['comment'] == "Hello"
        assert data[0]['user_name'] == "User"
        assert data[1]['dev_id'] == "1"
        assert data[1]['user_id'] == "1"
        assert data[1]['loc_name'] == "Labz"
        assert data[1]['comment'] == "Hi"
        assert data[1]['user_name'] == "User"

        response_404 = client.get('/api/devices/25565/events')
        assert response_404.status_code == 404


def test_remove_devices(client, app):
    # Test the DELETE /api/devices/ endpoint.
    with app.app_context():
        test_user = User(user_name="testuser", user_email="testuser@example.com")
        db.session.add(test_user)
        db.session.commit()

        test_device1 = Device(
            dev_name="Device 1",
            dev_manufacturer="Manfact A",
            dev_model="Model S",
            dev_class="class A",
            dev_comments="Location: Herwood xyz",
        )
        test_device2 = Device(
            dev_name="Device 2",
            dev_manufacturer="Manfact A",
            dev_model="Model T",
            dev_class="class A",
            dev_comments="Location: Herwood xyz",
        )

        db.session.add(test_device1)
        db.session.add(test_device2)
        db.session.commit()

        dev_id1 = test_device1.dev_id
        dev_id2 = test_device2.dev_id

        test_event1 = Event(
            dev_id=dev_id1,
            user_id=test_user.user_id,
            move_time=func.now(),
            loc_name='Lab',
            comment='Event 1',
        )
        test_event2 = Event(
            dev_id=dev_id2,
            user_id=test_user.user_id,
            move_time=func.now(),
            loc_name='Lab',
            comment='Event 2',
        )

        db.session.add(test_event1)
        db.session.add(test_event2)
        db.session.commit()

        payload = [{'id': dev_id1}, {'id': dev_id2}]
        response = client.delete('/api/devices/', json=payload)
        assert response.status_code == 200

        assert db.session.get(Device, dev_id1) is None
        assert db.session.get(Device, dev_id2) is None


def test_get_current_locations(client, app):
    # Test the GET /api/devices/current_locations/ endpoint.
    with app.app_context():
        test_user: User = User(user_name="User", user_email="user@mail.com")
        db.session.add(test_user)
        db.session.commit()

        test_device1: Device = Device(
            dev_name="Unique Device 1",
            dev_manufacturer="Unique Manufacturer 1",
            dev_model="Unique Model 1",
            dev_class="Unique Class 1",
            dev_comments="Location: Unique Location 1"
        )
        db.session.add(test_device1)
        db.session.commit()

        test_device2: Device = Device(
            dev_name="Unique Device 2",
            dev_manufacturer="Unique Manufacturer 2",
            dev_model="Unique Model 2",
            dev_class="Unique Class 2",
            dev_comments="Location: Unique Location 2"
        )
        db.session.add(test_device2)
        db.session.commit()

        event1: Event = Event(
            dev_id=test_device1.dev_id,
            user_id=test_user.user_id,
            move_time=func.now(),
            loc_name="Location 1",
            comment="Device 1 is here"
        )
        db.session.add(event1)

        event2: Event = Event(
            dev_id=test_device2.dev_id,
            user_id=test_user.user_id,
            move_time=func.now(),
            loc_name="Location 2",
            comment="Device 2 is here"
        )
        db.session.add(event2)

        db.session.commit()

        response = client.get('/api/devices/current_locations/')
        assert response.status_code == 200

        data = response.get_json()
        assert len(data) == 3

        assert data[1]['dev_id'] == str(test_device1.dev_id)
        assert data[1]['dev_name'] == test_device1.dev_name
        assert data[1]['dev_model'] == test_device1.dev_model
        assert data[1]['dev_manufacturer'] == test_device1.dev_manufacturer
        assert data[1]['loc_name'] == "Location 1"

        assert data[2]['dev_id'] == str(test_device2.dev_id)
        assert data[2]['dev_name'] == test_device2.dev_name
        assert data[2]['dev_model'] == test_device2.dev_model
        assert data[2]['dev_manufacturer'] == test_device2.dev_manufacturer
        assert data[2]['loc_name'] == "Location 2"

        response_404 = client.get('/api/devices/9999/current_locations/')
        assert response_404.status_code == 404
