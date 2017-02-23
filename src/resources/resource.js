export default function resource(path, name) {
  return client => (
    {
      path,
      client,
      name,

      findAll(query = {}) {
        client.logger.trace('findAll', { path: this.path, query });
        return client.get(this.path, { $filter: query })
                     .then(response => response[name]);
      },

      findOne(query = {}) {
        client.logger.trace('findOne', { path: this.path, query });
        return client.get(this.path, { $filter: query })
                     .then(response => response[name][0]);
      },

      findById(id) {
        client.logger.trace('findById', { path: this.path, id });
        return client.get(`${this.path}/${id}`);
      },

      get(...args) { return this.findbyId(...args); },

      create(params = {}) {
        client.logger.trace('create', { path: this.path, params });
        return client.post(this.path, params);
      },

      destroy(id) {
        client.logger.trace('destory', { path: this.path, id });
        return client.delete(`${this.path}/${id}`);
      },

      update(id, params = {}) {
        client.logger.trace('update', { path: this.path, id, params });
        return client.put(`${this.path}/${id}`, params);
      },
    }
  );
}
