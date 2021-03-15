import cherrypy

employees = {
    1: {
        'id': 1,
        'name': 'niraj',
        'email': 'niraj@gmail.com',
        'designation': 'developer',
        'mobile_no': 750520520,
        'dept': 'IT',
        'age': 34,
        'gender': 'Male',
        'todo_items': ['code review']
    },
    2: {
        'id': 2,
        'name': 'Amit',
        'email': 'Amit@gmail.com',
        'designation': 'manager',
        'mobile_no': 58585858,
        'dept': 'HR',
        'age': 34,
        'gender': 'Male',
        'todo_items': ['meeting with team']
    }
}

@cherrypy.expose
@cherrypy.tools.json_out()
@cherrypy.tools.json_in()
class EmployeeAPI:

    def GET(self, id=None):
    
        if id:
            return employees.get(int(id))
        return list(employees.values())

    def POST(self):
        emp = cherrypy.request.json
        keys = sorted(employees.keys())
        emp_id = keys[-1] + 1
        emp['id'] = keys[-1] + 1
        employees[emp_id] = emp
        return employees.get(emp_id)

    def PUT(self, id):
        data = cherrypy.request.json
        emp = employees.get(int(id))
        emp.update(data)
        return emp

    def DELETE(self, id):
        emp_id = int(id)
        del employees[emp_id]
        return list(employees.values())
