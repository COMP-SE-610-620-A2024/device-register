from flasgger import Swagger
import os

def setup_swagger(app):
    swagger = Swagger(app, template_file="static/swagger.yaml")
    return swagger
