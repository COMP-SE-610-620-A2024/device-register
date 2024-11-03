import os
from flask import jsonify, request, Response
from backend.models.device_model import Device
from werkzeug.utils import secure_filename


allowed_mime_types = {'application/pdf', 'image/png', 'image/jpeg'}


def allowed_mime_type(file):
    return file.mimetype in allowed_mime_types


def upload_files(dev_id: int) -> tuple[Response, int]:
    if Device.get_device_by_id(dev_id) is None:
        return jsonify({"error": "Device not found"}), 404

    if 'files' not in request.files:
        return jsonify({"error": "No files part in the request"}), 400

    files = request.files.getlist('files')
    if len(files) == 0:
        return jsonify({"error": "No files uploaded"}), 400

    device_attachment_directory = os.path.join('static', 'attachments', str(dev_id))

    # Create the directory if it does not exist
    try:
        os.makedirs(device_attachment_directory, exist_ok=True)
    except OSError as e:
        return jsonify({"error": f"Failed to create directory: {str(e)}"}), 500

    saved_files = []
    for file in files:
        if allowed_mime_type(file):
            safe_filename = secure_filename(file.filename)
            file_path = os.path.join(device_attachment_directory, safe_filename)

            if os.path.exists(file_path):
                return jsonify({"error": f"File '{safe_filename}' already exists"}), 400

            try:
                file.save(file_path)
                saved_files.append(safe_filename)
            except Exception as e:
                return jsonify(
                    {"error": f"Failed to save file '{safe_filename}': {str(e)}"}), 500
        else:
            return jsonify({"error": f"File '{file.filename}' type not allowed"}), 400

    return (jsonify({"message": "Files uploaded successfully", "files": saved_files}),
            200)


def get_all_files_in_directory(directory_path: str) -> list[str]:
    try:
        # List all files and directories in the specified path
        all_items = os.listdir(directory_path)
        # Filter out only the files
        files = [item for item in all_items if os.path.isfile(
            os.path.join(directory_path, item
        ))]
        return files
    except OSError as e:
        print(f"Error accessing directory: {e}")
        return []  # Return an empty list in case of an error


def list_files(dev_id: int) -> tuple[Response, int]:
    device_attachment_directory = os.path.join('static', 'attachments', str(dev_id))

    all_files = get_all_files_in_directory(device_attachment_directory)

    if not os.path.exists(device_attachment_directory):
        return jsonify({"error": "Directory not found"}), 404

    # Check if there were any issues accessing the files
    if not all_files:
        return jsonify({"message": "No files found in the directory"}), 200

    file_urls = [f"/static/attachments/{dev_id}/{file}" for file in all_files]

    return (jsonify({"message": "Files retrieved successfully", "files": file_urls}),
            200)
