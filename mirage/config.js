export default function () {
  this.timing = 400; // Delay for each request, automatically set to 0 during testing.

  this.get('/interactions', (server) => {
    return {
      data: server.db.interactions.map((attrs) => ({
        type: 'interaction',
        id: attrs.id,
        attributes: attrs,
      })),
    };
  });

  this.get('/interactions/:id', (server, request) => {
    let id = request.params.id;

    return {
      data: {
        type: 'interaction',
        id,
        attributes: server.db.interactions.find(id),
      },
    };
  });

  this.get('/students', (server) => {
    return {
      data: server.db.students.map((attrs) => ({
        type: 'student',
        id: attrs.id,
        attributes: attrs,
      })),
    };
  });
}
