import React, { Component } from 'react';
import './App.css';
import _ from "lodash";
import { Button, Row, Col, Card, CloseButton, DropdownButton, Dropdown, Container, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ArrowUp, ArrowDown, Pencil } from 'react-bootstrap-icons';

class Todo {
    constructor(id, title, note, number, deadline, state,) {
        this.title = title;
        this.state = state;
        this.id = id;
        this.note = note;
        this.number = number;
        this.deadline = deadline;
    }
}



export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);

        this.state = {
            "todo": {
                title: "Todo",
                items: []
            },
            "inprogress": {
                title: "In Progress",
                items: []
            },
            "done": {
                title: "Done",
                items: []
            },
            "postponed": {
                title: "Postponed",
                items: []
            },
            "todoTitle": "",
            "todoNote": "",
            "todoDeadline": "",
            "todoId": "",
            "todoState": ""
        }
    }

    componentDidMount() {
        this.populateToDoData();
    }

    async saveChanges() {
        
        var modifiedTodo = null;
        if (this.todoState === 0) {

            var array = [...this.state.todo.items];
            for (var i = 0; i < this.state.todo.items.length; i++) {

                if (this.state.todo.items[i].id === this.todoId) {

                    modifiedTodo = new Todo(
                        this.state.todo.items[i].id,
                        this.state.todoTitle,
                        this.state.todoNote,
                        this.state.todo.items[i].number,
                        this.state.todoDeadline,
                        this.state.todo.items[i].state);

                    if (modifiedTodo.title == "") { modifiedTodo.title = this.state.todo.items[i].title }
                    if (modifiedTodo.note == "") { modifiedTodo.note = this.state.todo.items[i].note }
                    if (modifiedTodo.deadline == "") { modifiedTodo.deadline = this.state.todo.items[i].deadline }

                }
            }
            array[modifiedTodo.number] = modifiedTodo;
            this.setState(prev => { return { ...prev, todo: { title: "Todo", items: array, } } })
        }

        else if (this.todoState === 1) {

            var array = [...this.state.inprogress.items];
            for (var i = 0; i < this.state.inprogress.items.length; i++) {

                if (this.state.inprogress.items[i].id === this.todoId) {

                    modifiedTodo = new Todo(
                        this.state.inprogress.items[i].id,
                        this.state.todoTitle,
                        this.state.todoNote,
                        this.state.inprogress.items[i].number,
                        this.state.todoDeadline,
                        this.state.inprogress.items[i].state);

                    if (modifiedTodo.title == "") { modifiedTodo.title = this.state.inprogress.items[i].title }
                    if (modifiedTodo.note == "") { modifiedTodo.note = this.state.inprogress.items[i].note }
                    if (modifiedTodo.deadline == "") { modifiedTodo.deadline = this.state.inprogress.items[i].deadline }

                }
            }
            array[modifiedTodo.number] = modifiedTodo;
            this.setState(prev => { return { ...prev, inprogress: { title: "In progress", items: array, } } })
        }

        else if (this.todoState === 2) {

            var array = [...this.state.done.items];
            for (var i = 0; i < this.state.done.items.length; i++) {

                if (this.state.done.items[i].id === this.todoId) {

                    modifiedTodo = new Todo(
                        this.state.done.items[i].id,
                        this.state.todoTitle,
                        this.state.todoNote,
                        this.state.done.items[i].number,
                        this.state.todoDeadline,
                        this.state.done.items[i].state);

                    if (modifiedTodo.title == "") { modifiedTodo.title = this.state.done.items[i].title }
                    if (modifiedTodo.note == "") { modifiedTodo.note = this.state.done.items[i].note }
                    if (modifiedTodo.deadline == "") { modifiedTodo.deadline = this.state.done.items[i].deadline }

                }
            }
            array[modifiedTodo.number] = modifiedTodo;
            this.setState(prev => { return { ...prev, done: { title: "Done", items: array, } } })
        }

        else if (this.todoState === 3) {

            var array = [...this.state.postponed.items];
            for (var i = 0; i < this.state.postponed.items.length; i++) {

                if (this.state.postponed.items[i].id === this.todoId) {

                    modifiedTodo = new Todo(
                        this.state.postponed.items[i].id,
                        this.state.todoTitle,
                        this.state.todoNote,
                        this.state.postponed.items[i].number,
                        this.state.todoDeadline,
                        this.state.postponed.items[i].state);

                    if (modifiedTodo.title == "") { modifiedTodo.title = this.state.postponed.items[i].title }
                    if (modifiedTodo.note == "") { modifiedTodo.note = this.state.postponed.items[i].note }
                    if (modifiedTodo.deadline == "") { modifiedTodo.deadline = this.state.postponed.items[i].deadline }

                }
            }
            array[modifiedTodo.number] = modifiedTodo;
            this.setState(prev => { return { ...prev, postponed: { title: "Postponed", items: array, } } })
        }

        if (modifiedTodo != null) {
            await axios.put(`api/todos/${modifiedTodo.id}`,
                {
                    id: modifiedTodo.id,
                    title: modifiedTodo.title,
                    note: modifiedTodo.note,
                    deadline: modifiedTodo.deadline,
                    number: modifiedTodo.number,
                    state: modifiedTodo.state
                }
            )
        }
        this.state.todoNote = "";
        this.state.todoTitle = "";
        this.state.todoDeadline = "";
        this.state.todoId = "";
    }

    openForm(todo) {

        this.todoTitle = todo.title;
        this.todoNote = todo.note;
        this.todoDeadline = todo.deadline;
        this.todoState = todo.state;
        this.todoId = todo.id;

        document.getElementById("modifyTitle").value = todo.title;
        document.getElementById("modifyNote").value = todo.note;
        document.getElementById("modifyDeadline").value = todo.deadline;

        document.getElementById("myForm").style.display = "flex";
    }

    closeForm() {
        document.getElementById("myForm").style.display = "none";
    }

    async addNewToDo() {
        if (this.state.todoTitle === "" || this.state.todoDeadline === "" || this.state.todoNote === "") {
            return;
        }

        const todo = {
            id: "",
            title: this.state.todoTitle,
            note: this.state.todoNote,
            deadline: this.state.todoDeadline,
            number: this.state.todo.items.length,
            state: 0,
        };

        await axios.post(`/api/todos`,
            {
                title: todo.title,
                note: todo.note,
                deadline: todo.deadline,
                number: todo.number,
                state: todo.state,
            }
        ).then((response) => todo.id = response.data.id);


        var array = [...this.state.todo.items];
        array.push(todo);

        this.setState(prev => {
            return { ...prev, todo: { title: "Todo", items: array, } }
        })
    }

    async removeTodo(todo, state, key) {
        var copyTodo = todo;
        var array = [...state.items];
        var index;

        for (let i = 0; i < array.length; i++) {
            if (array[i].id == todo.id) { index = i }
        }

        array.splice(index, 1);

        for (var i = 0; i < array.length; i++) {
            array[i].number = i;
        }

        if (key == 0) {
            this.setState(prev => { return { ...prev, todo: { title: "Todo", items: array, } } })
        }

        else if (key == 1) {
            this.setState(prev => { return { ...prev, inprogress: { title: "In Progress", items: array, } } })
        }

        else if (key == 2) {
            this.setState(prev => { return { ...prev, done: { title: "Done", items: array, } } })
        }

        else if (key == 3) {
            this.setState(prev => { return { ...prev, postponed: { title: "Postponed", items: array, } } })
        }

        await axios.delete(`api/todos/${copyTodo.id}`);
    }

    async changeState(todo, state, prevState, newState) {
        if (prevState == newState) { return; }
        this.removeTodo(todo, state, prevState);

        if (newState == 1) {
            var array = [...this.state.inprogress.items];
            todo.state = 1;
            array.push(todo);
            todo.number = array.length;

            this.setState(prev => {
                return { ...prev, inprogress: { title: "In Progress", items: array, } }
            })
        }

        else if (newState == 0) {
            var array = [...this.state.todo.items];
            todo.state = 0;
            todo.number = array.length;
            array.push(todo);

            this.setState(prev => { return { ...prev, todo: { title: "ToDo", items: array, } } })
        }

        else if (newState == 2) {
            var array = [...this.state.done.items];
            todo.state = 2;
            todo.number = array.length
            array.push(todo);

            this.setState(prev => { return { ...prev, done: { title: "Done", items: array, } } })
        }

        else if (newState == 3) {
            var array = [...this.state.postponed.items];
            todo.state = 3;
            todo.number = array.length;
            array.push(todo);

            this.setState(prev => { return { ...prev, postponed: { title: "Postponed", items: array, } } })
        }

        await axios.post(`/api/todos`,
            {
                title: todo.title,
                note: todo.note,
                deadline: todo.deadline,
                number: todo.number,
                state: todo.state,
            }
        ).then((response) => todo.id = response.data.id);

    }

    async changePriorityUp(todo, state, key) {
        if (todo.number === 0) {
            return
        }

        if (key == 0) {
            var array = [...this.state.todo.items];
            var number = todo.number;
            [array[number], array[number - 1]] = [array[number - 1], array[number]]
            var todo2 = array[number];

            for (var i = 0; i < array.length; i++) {
                array[i].number = i;
            }


            this.setState(prev => { return { ...prev, todo: { title: "Todo", items: array, } } })
        }

        if (key == 1) {
            var array = [...this.state.inprogress.items];
            var number = todo.number;
            [array[number], array[number - 1]] = [array[number - 1], array[number]]
            var todo2 = array[number];

            for (var i = 0; i < array.length; i++) {
                array[i].number = i;
            }


            this.setState(prev => { return { ...prev, inprogress: { title: "In progress", items: array, } } })
        }

        if (key == 2) {
            var array = [...this.state.done.items];
            var number = todo.number;
            [array[number], array[number - 1]] = [array[number - 1], array[number]]
            var todo2 = array[number];

            for (var i = 0; i < array.length; i++) {
                array[i].number = i;
            }


            this.setState(prev => { return { ...prev, done: { title: "Done", items: array, } } })
        }

        if (key == 3) {
            var array = [...this.state.postponed.items];
            var number = todo.number;
            [array[number], array[number - 1]] = [array[number - 1], array[number]]
            var todo2 = array[number];

            for (var i = 0; i < array.length; i++) {
                array[i].number = i;
            }

            this.setState(prev => { return { ...prev, postponed: { title: "Postponed", items: array, } } })
        }

        await axios.put(`api/todos/${todo.id}`,
            {
                id: todo.id,
                title: todo.title,
                note: todo.note,
                deadline: todo.deadline,
                number: todo.number,
                state: todo.state
            }
        )

        await axios.put(`api/todos/${todo2.id}`,
            {
                id: todo2.id,
                title: todo2.title,
                note: todo2.note,
                deadline: todo.deadline,
                number: todo2.number,
                state: todo.state
            }
        )

    }

    async changePriorityDown(todo, state, key) {

        if (key === 0) {
            var array = this.state.todo.items;

            if (todo.number === array.length - 1) { return }

            var number = todo.number;
            [array[number], array[number + 1]] = [array[number + 1], array[number]];
            var todo2 = array[number];



            for (var i = 0; i < array.length; i++) {

                array[i].number = i;
            }

            this.setState(prev => { return { ...prev, todo: { title: "Todo", items: array, } } })
        }

        else if (key == 1) {
            var array = [...this.state.inprogress.items];

            if (todo.number === array.length - 1) { return }

            var number = todo.number;
            [array[number], array[number + 1]] = [array[number + 1], array[number]];
            var todo2 = array[number];

            for (var i = 0; i < array.length; i++) {
                array[i].number = i;
            }

            this.setState(prev => { return { ...prev, inprogress: { title: "In progress", items: array, } } })
        }

        else if (key == 2) {
            var array = [...this.state.done.items];

            if (todo.number === array.length - 1) { return }

            var number = todo.number;
            [array[number], array[number + 1]] = [array[number + 1], array[number]];
            var todo2 = array[number];

            for (var i = 0; i < array.length; i++) {
                array[i].number = i;
            }

            this.setState(prev => { return { ...prev, done: { title: "Done", items: array, } } })
        }

        else if (key == 3) {
            var array = [...this.state.postponed.items];

            if (todo.number === array.length - 1) { return };

            var number = todo.number;
            [array[number], array[number + 1]] = [array[number + 1], array[number]];
            var todo2 = array[number];

            for (var i = 0; i < array.length; i++) {
                array[i].number = i;
            }

            this.setState(prev => { return { ...prev, postponed: { title: "Postponed", items: array, } } })
        }

        await axios.put(`api/todos/${todo.id}`,
            {
                id: todo.id,
                title: todo.title,
                note: todo.note,
                deadline: todo.deadline,
                number: todo.number,
                state: todo.state
            }
        )

        await axios.put(`api/todos/${todo2.id}`,
            {
                id: todo2.id,
                title: todo2.title,
                note: todo2.note,
                deadline: todo.deadline,
                number: todo2.number,
                state: todo.state
            }
        )
    }

    render() {
        const sublist = [];
        sublist.push(this.state.todo);
        sublist.push(this.state.inprogress);
        sublist.push(this.state.done);
        sublist.push(this.state.postponed);

        return (
            <div>
                <div class="form-popup" id="myForm" style={{
                    display: 'none'
                }}>
                    <Modal.Dialog style={{
                         zIndex: '1000', position: 'absolute',

                    }}>
                        <Modal.Header>
                            <Modal.Title>Modify Todo</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Row >
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label></Form.Label>
                                    <input id="modifyTitle" type="text" placeholder="Enter Title" required
                                        onChange={(event) => { this.state.todoTitle = event.target.value }}></input>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridNote">
                                    <Form.Label></Form.Label>
                                    <input id="modifyNote" type="text" placeholder="Enter Note" required
                                        onChange={(event) => { this.state.todoNote = event.target.value }}></input>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridDeadline">
                                    <Form.Label></Form.Label>
                                    <input id="modifyDeadline" type="date" required
                                        onChange={(event) => { this.state.todoDeadline = event.target.value }}></input>
                                </Form.Group>

                            </Row>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeForm.bind(this)}>Close</Button>
                            <Button variant="primary" onClick={this.saveChanges.bind(this)}>Save changes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>

                <Container className="bg-light border">
                    <Form>
                        <h3>Add new To do</h3>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label></Form.Label>
                                <input type="text" placeholder="Enter Title" required onChange={(event) => {
                                    this.state.todoTitle = event.target.value
                                }}></input>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridNote">
                                <Form.Label></Form.Label>
                                <input type="text" placeholder="Enter Note" required onChange={(event) => { this.state.todoNote = event.target.value }}></input>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridDeadline">
                                <Form.Label></Form.Label>
                                <input type="date" required onChange={(event) => { this.state.todoDeadline = event.target.value }}></input>
                            </Form.Group>
                            <button type="submit" class="btn" onClick={this.addNewToDo.bind(this)} >Add</button>
                        </Row>

                    </Form>
                </Container>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 20 }}>

                    {_.map(sublist, (state, key) =>
                        <div key={key}>
                            <h1>{state.title}</h1>
                            {state.items.map((t, index) =>
                                <div key={index}>
                                    <Card
                                        bg="info"
                                        key="Info"
                                        style={{ width: '18rem' }}
                                        className="mb-2"
                                    >
                                        <Card.Header>
                                            <CloseButton onClick={this.removeTodo.bind(this, t, state, key)}></CloseButton>

                                            <DropdownButton id="dropdown-basic-button" title="Change state" >
                                                <Dropdown.Item onClick={this.changeState.bind(this, t, state, key, 0)}> To Do </Dropdown.Item>
                                                <Dropdown.Item onClick={this.changeState.bind(this, t, state, key, 1)}> In progress </Dropdown.Item>
                                                <Dropdown.Item onClick={this.changeState.bind(this, t, state, key, 2)}> Done </Dropdown.Item>
                                                <Dropdown.Item onClick={this.changeState.bind(this, t, state, key, 3)}> Postpone </Dropdown.Item>
                                            </DropdownButton>

                                            <Button onClick={this.changePriorityUp.bind(this, t, state, key)}>
                                                <ArrowUp />
                                            </Button>

                                            <Button onClick={this.changePriorityDown.bind(this, t, state, key)}>
                                                <ArrowDown />
                                            </Button>

                                            <Button onClick={this.openForm.bind(this, t)}>
                                                <Pencil />
                                            </Button>

                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                                {t.title}
                                            </Card.Title>
                                            <Card.Text>
                                                {t.note}
                                            </Card.Text>
                                            <Card.Footer >
                                                Deadline: {t.deadline}
                                            </Card.Footer>
                                        </Card.Body>
                                    </Card>

                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        )
    }

    async populateToDoData() {
        const data = await axios.get(`api/todos`).then((response) => response.data);
        var todo = [];
        var done = [];
        var inprogress = [];
        var postponed = []

        const list = data;


        for (var i = 0; i < list.length; i++) {
            var td = new Todo(list[i].id, list[i].title, list[i].note, list[i].number, list[i].deadLine.split("T")[0], list[i].state);

            if (td.state === 0) {
                todo.push(td);
            }
            else if (td.state === 1) {
                inprogress.push(td);
            }
            else if (td.state === 2) {
                done.push(td);
            }
            else if (td.state === 3) {
                postponed.push(td);
            }
        }

        var sortedTodo = [...todo].sort((a, b) =>
            a.number > b.number ? 1 : -1)
        todo = sortedTodo;

        var sortedInprogress = [...inprogress].sort((a, b) =>
            a.number > b.number ? 1 : -1)
        inprogress = sortedInprogress;

        var sortedDone = [...done].sort((a, b) =>
            a.number > b.number ? 1 : -1)
        done = sortedDone;

        var sortedPostponed = [...postponed].sort((a, b) =>
            a.number > b.number ? 1 : -1)
        postponed = sortedPostponed;


        this.setState({
            "todo": {
                title: "Todo",
                items: todo,
            },
            "inprogress": {
                title: "In Progress",
                items: inprogress,
            },
            "done": {
                title: "Done",
                items: done,
            },
            "postponed": {
                title: "Postponed",
                items: postponed,
            },

            "todoTitle": "",
            "todoNote": "",
            "todoDeadline": "",

        });
    }
}


