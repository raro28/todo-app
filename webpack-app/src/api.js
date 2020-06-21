const TodoListApi = require('todo_list_api');

export const todoApi = new TodoListApi.CrudApi();

export function initTodoApi(basePath){
    TodoListApi.ApiClient.instance.basePath = basePath;
}

export default{
    install: function (Vue){
        //https://stackoverflow.com/questions/48650107/use-axios-globally-in-all-my-components-vue
        Vue.prototype.$todoApi = todoApi;
        Vue.prototype.$removeId = function(obj){
            let result = Object.assign({}, obj);
            delete result.id;
        
            return result;
        }
    }
}