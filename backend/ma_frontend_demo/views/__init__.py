from ma_frontend_demo.views import messages, realtors


def init(api):
    api.register_blueprint(realtors.bp)
    api.register_blueprint(messages.bp)
