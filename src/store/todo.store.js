import { Todo } from '../todos/models/todo.model';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}


const state = {
    todos: [
        new Todo ('Revisar y responder correos electrónicos.'),
        new Todo ('Hacer 20 min de ejercicio o estiramientos.'),
        new Todo ('Leer un capítulo de un libro o un artículo'),
        new Todo ('Limpiar el área de trabajo o una habitación'),
        new Todo ('Realizar 10 minutos de relajación o meditación'),
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