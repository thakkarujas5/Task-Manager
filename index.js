const express = require("express")
const bodyParser = require('body-parser');

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


const tasks = [];

app.get('/', (req,res) => {
    res.send('Welcome')
})


app.get('/tasks', (req, res) => {

    let filteredTasks = tasks;
  
    if (req.query.isCompleted !== undefined) {
      filteredTasks = filteredTasks.filter(task => task.isCompleted === (req.query.isCompleted === 'true'));
    }
  
    if (req.query.sortBy !== undefined) {
      const sortAsc = req.query.sortBy[0] !== '-';
      const sortBy = sortAsc ? req.query.sortBy : req.query.sortBy.substring(1);
  
      filteredTasks.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return sortAsc ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortAsc ? 1 : -1;
        return 0;
      });
    }
  
    res.json(filteredTasks);
  });

app.get('/tasks/:id', (req,res) => {


    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].id===req.params.id)
        {
            return res.send(tasks[i])
        }
    }
    res.status(404);
    res.send('ID Not found')
})

app.get('/tasks/priority/:level', (req, res) => {

    let result = []

    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].priority === req.params.level)
        {
            result.push(tasks[i]);
        }
    }

    res.send(result);
})

app.post('/tasks', (req,res) => {

    const keys = Object.keys(req.body);
    
    for(let i=0;i<keys.length;i++)
    {
        if(keys[i]!=='title' && keys[i]!=='description' && keys[i]!=='isCompleted' && keys[i]!=='id' && keys[i]!=='priority')
        {
            return res.send('Unknown fields sent');
        }
    }

    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].id === req.body.id)
        {
            return res.send('Duplicate ID Found, please enter unique ID')
        }
    }

    if(req.body.title === "" || req.body.description === ""){

        res.status(400)
        return res.send("Bad request");
    }

    let level;

    if(req.body.priority === "high"){

        level = 1;
    }
    else if(req.body.priority === "medium"){

        level = 2;
    }
    else if(req.body.priority === "low") {

        level = 3;
    } else{

        return res.send('Invalid priority sent')
    }

    const obj = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted,
        priority: level,
        createdAt: new Date()
    }

    tasks.push(obj);

    res.send("success")
})

app.delete('/tasks/:id', (req,res) => {

    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].id==req.params.id)
        {
            tasks.splice(i,1);
            return res.send('Deleted successfully')
        }
    }
    res.status(404);
    res.send('ID Not found')
})

app.put('/tasks/:id', (req,res) => {

    const id = parseInt(req.params.id);

    if(req.body.title === "" || req.body.description === ""){

        res.status(400)
        return res.send("Bad request");
    }

    for(let i=0;i<tasks.length;i++)
    {
        if(id == tasks[i].id)
        {
            tasks[i] = {
                ...tasks[i], 
                ...req.body 
            };
            return res.send('Updated Successfully')
        }
    }
    res.status(404);
    res.send('ID Not found')
})

app.listen(5001, (err) => {
    console.log('Server Started')
})

