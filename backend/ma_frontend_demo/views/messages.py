from flask.views import MethodView
from flask_smorest import Blueprint, Page, abort

from ma_frontend_demo.schemas.messages import MessageQueryArgsSchema, MessageSchema
from ma_frontend_demo.views.helpers import MESSAGES, REALTORS, count_unread


bp = Blueprint(
    "messages",
    "messages",
    url_prefix="/realtors/<int:realtor_id>/messages",
    description="Operations on messages",
)

PAGE_SIZE = 20


@bp.route("/")
class Messages(MethodView):
    @bp.arguments(MessageQueryArgsSchema, location="query")
    @bp.response(200, MessageSchema(many=True))
    @bp.doc(responses={"404": {"description": "Realtor not found"}, "500": {}})
    @bp.paginate(Page)
    def get(self, args, realtor_id):
        """Get all the messages of one realtor

        Returns a list of messages of one realtor.
        404 if realtor is not found
        """
        messages = []

        for realtor in REALTORS:
            if realtor["id"] == realtor_id:
                break
        else:
            abort(404, message="Realtor not found.")

        messages = [m for m in MESSAGES if m["realtor_id"] == realtor_id]

        sort_args = args.pop("sort", None)
        if sort_args is not None:
            sort, direction = sort_args.split(":")
            if sort is not None and direction is not None:
                messages.sort(
                    key=lambda x: x[sort],
                    reverse=(direction == "desc"),
                )
        return messages


@bp.route("/<int:message_id>")
class MessageById(MethodView):
    @bp.response(200, MessageSchema)
    @bp.doc(
        responses={"404": {"description": "Realtor or Message not found"}, "500": {}}
    )
    def get(self, realtor_id, message_id):
        """Get one message by ID.

        Returns a single message
        404 if realtor is not found
        404 if message is not found
        """
        for realtor in REALTORS:
            if realtor["id"] == realtor_id:
                break
        else:
            abort(404, message="Realtor not found.")

        for message in MESSAGES:
            if message["id"] == message_id:
                return message
        else:
            abort(404, message="Message not found.")

    @bp.arguments(MessageSchema)
    @bp.response(200, MessageSchema)
    @bp.doc(
        responses={"404": {"description": "Realtor or Message not found"}, "500": {}}
    )
    def patch(self, update_data, realtor_id, message_id):
        """Update a message attribute.

        Mark a message as read and returns the message representation,
        404 if message is not found.
        404 if realtor is not found.
        """
        realtor = None
        message = None

        for r in REALTORS:
            if r["id"] == realtor_id:
                realtor = r
                break
        else:
            abort(404, message="Realtor not found.")

        for m in MESSAGES:
            if m["id"] == message_id:
                message = m
                break
        else:
            abort(404, message="Message not found.")

        for key, value in update_data.items():
            message[key] = value
            if key == "read":
                realtor["unread_messages"] = count_unread(
                    [m for m in MESSAGES if m["realtor_id"] == realtor_id]
                )

        return message
