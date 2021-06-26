import {ObjectId} from 'bson';

class Todo {
  constructor({
    date,
    description,
    partition,
    title,
    user,
    _id = new ObjectId(),
  }) {
    this._id = _id;
    this.date = date;
    this.description = description;
    this.user = user;
    this.title = title;
    this.partition = partition;
  }

  static schema = {
    name: 'Todo',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      date: 'date',
      description: 'string',
      title: 'string',
      user: 'string',
      partition: 'string?',
    },
  };
}

export {Todo};
