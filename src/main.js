import './style.css';
import {App} from './todos/app';
import todoStore from './store/todo.store';

// ensure application starts after DOM is ready (build injects script in <head>)
todoStore.initStore();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App('#app'));
} else {
    App('#app');
}