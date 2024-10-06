from flasgger import Swagger


def setup_swagger(app, deploymentEndpoint="/"):
    swagger = Swagger(app, template_file='static/swagger.yaml')
    swagger.template['basePath'] = deploymentEndpoint
    return swagger
