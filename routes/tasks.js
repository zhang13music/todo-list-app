const express = require('express');
const mongoose = require('mongoose');

const Task = require("../models/task");


const router = express.Router();

// GET: Respond with a List of tasks
router.get('/', (req, res, next) => {

    Task.find()
        .exec()
        .then(docs => {

            const response = {
                message: "Task list fetched",
                count: docs.length,
                data: docs.map(doc => {
                    return {
                        _id: doc._id,
                        title: doc.title,
                        description: doc.description,
                        completed: doc.completed
                    }
                })
            };

            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error fetching task list",
                data: {
                    error: err
                }
            });
        });

});

// POST: Create a new task. Respond with details of new task
router.post('/', (req, res, next) => {

    var params = {
        _id: new mongoose.Types.ObjectId()
    };

    for (var key in req.body) {
        params[key] = req.body[key];
    }

    const task = new Task(params);

    task
        .save()
        .then(result => {

            var response = {
                message: "Task created",
                data: {
                    _id: task._id,
                    title: task.title,
                    description: task.description,
                    completed: task.completed
                }
            };

            res.status(201).json(response);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error creating task",
                data: {
                    error: err
                }
            });
        });


});

// PATCH tasks/:id : Patch task with new info or 404 error
router.patch('/:id', (req, res, next) => {

    const id = req.params.id;

    var params = {
        _id: id
    };

    for (var key in req.body) {
        params[key] = req.body[key];
    }

    const new_task = new Task(params);

    Task.replaceOne({
        _id: id
    }, new_task)
        .exec()
        .then(doc => {
            if (doc) {
                const response = {
                    message: "Task patched",
                    data: {
                        _id: new_task._id,
                        title: new_task.title,
                        description: new_task.description,
                        completed: new_task.completed
                    }
                };

                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'Task not found by this ID',
                    data: {
                        doc: doc
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error patching task",
                data: {
                    error: err
                }
            });
        });
});

// DELETE tasks/:id : Delete specified task or 404 error
router.delete('/:id', (req, res, next) => {

    const id = req.params.id;

    Task.remove({
        _id: id
    })
        .exec()
        .then(result => {

            if (result.deletedCount > 0) {
                const response = {
                    message: "Task deleted",
                    data: {
                        _id: id,
                        deletedCount: result.deletedCount
                    }
                };
                res.status(200).json(response);
            } else // Not found
            {
                const response = {
                    message: "Task not found by this ID",
                    data: {
                        _id: id,
                        deletedCount: result.deletedCount
                    }
                };
                res.status(404).json(response);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error deleting task",
                data: {
                    error: err
                }
            });
        });
});

module.exports = router;