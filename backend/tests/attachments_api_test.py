import os
import pytest
from backend.app import create_app
from backend.setup.database_Init import db
from backend.models.device_model import Device


@pytest.fixture
def app():
    # Create and configure a new app instance for each test.
    app = create_app(testing=True)

    with app.app_context():
        db.create_all()
        # Add a test device to the database
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


def test_upload_files(client, app):
    # Test the POST /api/attachments/upload/<dev_id> endpoint.
    test_files_dir: str = os.path.join(
        os.getcwd(),
        'backend', 'tests', 'static', 'attachments', 'test_files'
    )

    user_directory: str = os.path.join(
        os.getcwd(),
        'backend', 'tests', 'static', 'attachments', '1'
    )

    # Uploading to a non-existent device
    with open(os.path.join(test_files_dir, 'cat.jpg'), 'rb') as file:
        response_invalid_device = client.post('api/attachments/upload/2',
                                              data={'files': (file, 'cat.jpg')})
    assert response_invalid_device.status_code == 404

    # Uploading a valid file (JPG)
    with open(os.path.join(test_files_dir, 'cat.jpg'), 'rb') as file:
        response_valid_file = client.post('api/attachments/upload/1',
                                          data={'files': (file, 'cat.jpg')})
    assert response_valid_file.status_code == 200

    # Uploading an unsupported file type (CSV)
    with open(os.path.join(test_files_dir, 'not_supported.csv'), 'rb') as file:
        response_invalid_file_type = client.post('api/attachments/upload/1',
                                            data={'files': (file, 'not_supported.csv')})
    assert response_invalid_file_type.status_code == 400

    # Sending a request with no files
    response_no_files = client.post('api/attachments/upload/1', data={})
    assert response_no_files.status_code == 400

    # Clean up the uploaded files
    if os.path.exists(user_directory):
        for filename in os.listdir(user_directory):
            file_path = os.path.join(user_directory, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)
        os.rmdir(user_directory)
