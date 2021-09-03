import * as React from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'

import './style.css'

interface State{
    name?:string,
    email?:string,
    time?:string,
    content?:string,
    tip?:string,
    seconds?:Number,
    timer?:any,
    count?:number
}

interface Props{
    data?:any
}

// interface Data{
//     name:string,
//     email:string,
//     time:string,
//     content:string,
//     tip:string,
// }

export default class Capsule extends React.Component<Props>{
    state:any={
        name:this.props.data.name,
        email:this.props.data.email,
        time:this.props.data.time,
        content:this.props.data.content,
        tip:this.props.data.tip,
        seconds:this.props.data.seconds,
        count:this.props.data.count>new Date().getTime()
              ?
              Math.floor((this.props.data.count-new Date().getTime())/1000)
              :
              0,
        timer:null
    }
    componentDidMount() { // 生命周期
        let _this=this;
        this.state.timer = setInterval(
            () => {
                
                if(_this.state.count>0){
                    // console.log(2)
                    let tick=this.state.count-1;
                    this.setState({
                        count:tick
                    })
                }else{
                    clearInterval();
                    _this.setState({
                        timer:null
                    })
                }
                
            },
            1000
        );
    }
    componentDidUpdate(){
        
    }

    render(){
        let _this=this;
        //console.log(this.props.data.count)
        return(
            <div className="capsule">
                <p className="capsule-title"><span className="title-name">【{_this.state.name}】</span>在<span className="title-time">【{_this.state.time}】</span>写下的时间胶囊</p>
                <p className="capsule-content">{(new Date().getTime()>_this.state.seconds)?_this.state.content:`还没到时间，距离可以开启还有${_this.state.count}秒`}</p>
            </div>
        )
    }
}