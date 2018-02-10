(client, callback) => {
  const data = JSON.parse(client.data);
  const homeworkId = data.homeworkId;
  const sessionId = data.sessionId;

  api.getHomework(homeworkId, sessionId, (err, data) => {
    if (err) {
      client.res.statusCode = 403;
      callback(err.message);
      return;
    }

    callback(data);
  });
}
