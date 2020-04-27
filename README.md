# A Full Stack To-Do App

#### This is a full stack To-do app implemented with a **React** front end and **Node.js** + **Express** + **MongoDB** back end.

## *App Screenshot:*
![image](https://user-images.githubusercontent.com/25305842/80330036-ae629180-8809-11ea-8d45-5fd30f25974f.jpg)

## Details

In addition to the above, this app also incorporates:
- [Semantic UI](https://semantic-ui.com/) component library
- React [Hooks](https://reactjs.org/docs/hooks-reference.html) and [Context API](https://reactjs.org/docs/context.html) for state management
- [Axios](https://github.com/axios/axios) for XHR requests
- [Mongoose](https://www.npmjs.com/package/mongoose) as MongoDB object modeling tool
- [Concurrently](https://www.npmjs.com/package/concurrently) to connect front end and back end
  
This app supports:
- Posting a new task
- Editing an existing task
- Toggling completion status of a task
- Deleting a task
- Filtering tasks by completion status
- ***Display of task stats***

## Deploy
``` zsh
git clone git@github.com:zhang13music/todo-list-app.git
cd todo-list-app
npm install
```

#### Run application:
``` zsh
npm run todo
```

#### Run server only:
``` bash
npm run server
```

#### Run client only:
``` bash
npm run client
```

> NOTE: 
MongoDB atlas credentials are located at `./config/secrets.js`.
Client is default at port 3000 and server is default at port 4000.