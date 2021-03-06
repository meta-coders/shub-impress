api.deleteHomework = function(sessionId, homeworkId, callback) {
  if (!homeworkId) {
    callback('Homework id required');
    return;
  }

  api.checkAvailability(sessionId, (err, teacherId) => {
    if (err) {
      application.log.error(err);
      return;
    }

    if (!teacherId) {
      callback('Not authorized');
      return;
    }

    const processTables = (table) => {
      const id = (table === 'homework') ? 'id' : 'homework_id';
      const options = {
        method: 'delete',
        table,
        filter: `${id} = ${homeworkId}`
      };

      api.db.mysql.query(options, (err) => {
        if (err) {
          application.log.error(err);
          return;
        }
      });
    };

    ['done_homework', 'homework'].forEach(processTables);

    callback();
  });
};
