export function watch(realm, setData) {
  // Query realm for all instances of the "Task" type.
  const tasks = realm.objects('Todo');

  // Define the collection notification listener
  function listener(tasks, changes) {
    // Update UI in response to deleted objects
    changes.deletions.forEach(index => {
      // Deleted objects cannot be accessed directly,
      // but we can update a UI list, etc. knowing the index.
      console.log('should update UI');
      setData([...tasks.sorted('date', true)]);
    });

    // Update UI in response to inserted objects
    changes.insertions.forEach(index => {
      let insertedTasks = tasks[index];

      console.log('insertedTasks: ', insertedTasks);
      setData([...tasks.sorted('date', true)]);
    });

    // Update UI in response to modified objects
    changes.modifications.forEach(index => {
      let modifiedTask = tasks[index];

      console.log('all tasks', tasks);

      console.log('modifiedTask: ', modifiedTask);
      setData([...tasks.sorted('date', true)]);
    });
  }

  // Observe collection notifications.
  return tasks.addListener(listener);
}
