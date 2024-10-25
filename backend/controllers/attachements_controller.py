import os
from flask import jsonify, request, Response
from backend.models.device_model import Device


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

    user_directory = os.path.join('static', 'attachments', str(dev_id))

    # Create the directory if it doesn't exist
    os.makedirs(user_directory, exist_ok=True)

    saved_files = []
    for file in files:
        if allowed_mime_type(file):
            file_path = os.path.join(user_directory, file.filename)
            file.save(file_path)
            saved_files.append(file.filename)
        else:
            return jsonify({"error": f"File '{file.filename}' type not allowed"}), 400

    return (jsonify({"message": "Files uploaded successfully", "files": saved_files}),
            200)
