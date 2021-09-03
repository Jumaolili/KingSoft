import {action,observable} from 'mobx'
import { makeAutoObservable } from "mobx"
class Store {
    constructor() {
        makeAutoObservable(this)
    }
    @observable
    capsule_color='red';

    @action
    setCapsule_color=()=>{
        if(this.capsule_color=='red'){
            this.capsule_color='skyblue'
        }else{
            this.capsule_color='red'
        }
    }
}

export const store=new Store();
