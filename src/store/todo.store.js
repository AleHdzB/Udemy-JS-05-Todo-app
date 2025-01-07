import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}


const state = {
    todos: [
        new Todo ('Piedra del alma'),
        new Todo ('Piedra del espacio'),
        new Todo ('Piedra del tiempo'),
        new Todo ('Piedra del poder'),
        new Todo ('Piedra de la realidad'),
    ],
    filter: Filters.All,
}


const initStore = () => {
    loadStore();
    console.log('InitStore 🥑');
}

const loadStore = () => {
   if( !localStorage.getItem('state')) return;
   const {todos=[], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
   state.todos = todos;
   state.filter = filter;

}

const saveStateToLocalStorage = () =>{
    localStorage.setItem('state', JSON.stringify(state));
}
/**
 * 
 * @param {String} filter 
*/
const getTodo = ( filter = Filters.All ) => {
    switch (filter){
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter( todo => todo.done);
        case Filters.Pending:
            return state.todos.filter( todo => !todo.done);
        default:
            throw new Error (`Option ${ filter} is not valid.`);
    }
    
}
/**
 * 
 * @param {String} description 
*/
const addTodo = ( description ) => {
    if (!description) throw new Error ('Description is required');
    state.todos.push(new Todo (description));

    saveStateToLocalStorage();
    
}
/**
 * 
 * @param {String} todoId Todo Identifier
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map( todo => {
        if (todo.id === todoId){
            todo.done =! todo.done;
        }
        return todo;
    })
    saveStateToLocalStorage();
}
/**
 * 
 * @param {String} todoId Todo Identifier
 */
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter (todo => todo.id != todoId);
    saveStateToLocalStorage();
}
/**
 * 
 * @param {String} todoId Todo Identifier
 */
const deleteCompleted = (todoId) => {
    state.todos = state.todos.filter (todo => !todo.done);
    saveStateToLocalStorage();
}

/**
 * 
 * @param {Filters} Filter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}
/**
 * 
 * @param {Filters} Filter 
 */
const getCurrentFilter = (newFilter = Filters.All) => {
    return state.filter;

}

export default {
    initStore,
    loadStore,
    addTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    toggleTodo,
    getTodo,
    getCurrentFilter,
}