from flask import Blueprint, request, jsonify
from dtos.request.creat_note_request import NoteCreateRequest
from dtos.request.note_update_request import NoteUpdateRequest
from services.note_service import NoteService

note_bp = Blueprint('note_bp', __name__)

@note_bp.route('/', methods=['POST'])
def create_note():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Missing JSON data"}), 400

    try:
        note_dto = NoteCreateRequest(**data)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    result = NoteService.create_note(note_dto)
    return jsonify(result), 201


@note_bp.route('/<user_id>', methods=['GET'])
def get_notes(user_id):
    notes = NoteService.get_notes_by_user(user_id)
    return jsonify(notes), 200


@note_bp.route('/<note_id>', methods=['PUT'])
def update_note(note_id):
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Missing JSON data"}), 400

    try:
        note_dto = NoteUpdateRequest(**data)
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    result, status = NoteService.update_note(note_id, note_dto)
    return jsonify(result), status
