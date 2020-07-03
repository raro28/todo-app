import axios from 'axios';

export class TodoApi{

    constructor(basePath){
        this._basePath = basePath;
    }

    get basePath(){
        return this._basePath;
    }

    listsGet(qs){
        return axios.get(`${this._basePath}/lists?page=${qs.page}&size=${qs.size}`);
    }

    listsPost(list){
        return axios.post(`${this._basePath}/lists`, list);
    }

    listsIdDelete(id){
        return axios.delete(`${this._basePath}/lists/${id}`);
    }

    listsIdGet(id){
        return axios.get(`${this._basePath}/lists/${id}`);
    }

    listsIdTasksGet(id, qs){
        return axios.get(`${this._basePath}/lists/${id}/tasks?page=${qs.page}&size=${qs.size}`);
    }

    listsIdPut(id, list){
        return axios.put(`${this._basePath}/lists/${id}`, list);
    }

    listsIdTasksPost(id, task){
        return axios.post(`${this._basePath}/lists/${id}/tasks`, task);
    }

    tasksIdPut(id, task){
        return axios.put(`${this._basePath}/tasks/${id}`, task);
    }

    tasksIdDelete(id){
        return axios.delete(`${this._basePath}/tasks/${id}`);
    }
}

export default{
    install: function (Vue){
        //https://stackoverflow.com/questions/48650107/use-axios-globally-in-all-my-components-vue
        Vue.prototype.$todoApi = new TodoApi('http://mumei:8080');
        Vue.prototype.$removeId = function(obj){
            let result = Object.assign({}, obj);
            delete result.id;
        
            return result;
        }
    }
}