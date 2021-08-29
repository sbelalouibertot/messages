from marshmallow import Schema, fields


class RealtorSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.String()
    unread_messages = fields.Int()
    logo = fields.String()
