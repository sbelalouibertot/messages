from flask.views import MethodView
from flask_smorest import Blueprint, Page, abort

from ma_frontend_demo.schemas.realtors import RealtorSchema
from ma_frontend_demo.views.helpers import REALTORS


bp = Blueprint(
    "realtors", "realtors", url_prefix="/realtors", description="Operations on realtors"
)


@bp.route("/")
class Realtors(MethodView):
    @bp.response(200, RealtorSchema(many=True))
    @bp.doc(responses={"500": {}})
    @bp.paginate(Page)
    def get(self):
        """Get all the realtors

        Returns a list of realtors"""
        return REALTORS


@bp.route("/<int:realtor_id>")
class RealtorsById(MethodView):
    @bp.response(200, RealtorSchema)
    @bp.doc(responses={"404": {"description": "Realtor not found"}, "500": {}})
    def get(self, realtor_id):
        """
        Get realtor by ID

        Returns a dictionnary with realtor information (id, title, ...),
        404 if realtor is not found
        """
        for realtor in REALTORS:
            if realtor["id"] == realtor_id:
                return realtor
        else:
            abort(404, message="Realtor not found.")
