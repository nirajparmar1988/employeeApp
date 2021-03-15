from api.employee import EmployeeAPI
import cherrypy

class Index(object):
    @cherrypy.expose
    def index(self):
        pass

if __name__ == '__main__':
    conf = {
        'global': {
            'server.socket_host': '0.0.0.0',
            'server.socket_port': 8000,
        },
        '/static': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './public'
        }
    }
    cherrypy.tree.mount(EmpolyeeAPI(), '/api/employees',{'/':
            {'request.dispatch': cherrypy.dispatch.MethodDispatcher(),}
         })
    webapp = Index()
    cherrypy.quickstart(webapp, '/', conf)