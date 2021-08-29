from marshmallow import EXCLUDE, Schema, fields, validate


class ContactSchema(Schema):
    firstname = fields.String()
    lastname = fields.String()
    phone = fields.String(validate=validate.Regexp("^[0-9]{10}$"))
    email = fields.Email()


class MessageSchema(Schema):
    id = fields.Int(dump_only=True)
    date = fields.DateTime()
    type = fields.String()
    contact = fields.Nested(ContactSchema)
    subject = fields.String()
    body = fields.String()
    read = fields.Boolean()


class MessageQueryArgsSchema(Schema):
    class Meta:
        unknown = EXCLUDE

    sort = fields.String(
        default="id:asc",
        validate=validate.OneOf(["id:asc", "id:desc", "date:asc", "date:desc"]),
    )
