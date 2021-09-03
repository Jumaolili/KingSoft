interface DataItem {
  value:string,
  date:number,
  isFinish:boolean
}

// 1. 读取localstorage
// 2. （1）有数据 （2）没数据
// 3. 改数据；增数据
// function addData(value:string){
//   // console.log(typeof value =='string')
//   let date:number=new Date().getTime();
//   let item:DataItem={
//     value:value,
//     date:date,
//     isFinish:false
//   };
//   let content:any=JSON.parse(localStorage.getItem('todo'));
//   if(content==null){
//     content=[];
//   }
//   content.push(item);
//   localStorage.setItem('todo',JSON.stringify(content));
// }

class App extends React.Component {
  render() {
    return <div>
      <Title first="TS" second="Todo"/>
      <Input allItem={[]} value="" />
    </div>
  }
}

interface Props{
  first?:string,
  second?:string,
  value?:string
}


class Title extends React.Component<Props>{
  render(){
  return <h1 className="title">{this.props.first}&nbsp;{this.props.second}</h1>
  }
}

interface State{
  value:string,
  allItem:[]
}

class Input extends React.Component<State>{
  state:State={
    value:'',
    allItem:[]
  }
  //添加数据
  addData(value:string){
    // console.log(typeof value =='string')
    let date:number=new Date().getTime();
    let item:DataItem={
      value:value,
      date:date,
      isFinish:false
    };
    let content:any=JSON.parse(localStorage.getItem('todo'));
    if(content==null){
      content=[];
    }
    content.push(item);
    localStorage.setItem('todo',JSON.stringify(content));
    this.setState({
      value:'',
      allItem:localStorage.getItem('todo')
    });
    alert(`添加成功：${value}`)
    this.setState({
      allItem:this.state.allItem
    });
    window.location.reload()
  }
  //修改数据
  fixData(index:number){
    let item:DataItem=this.state.allItem[index]
    item.isFinish=!item.isFinish;
    localStorage.setItem('todo',JSON.stringify(this.state.allItem));
    this.setState({
      allItem:this.state.allItem
    })
  }
    
  
  //删除数据
  deleteData(index:number){
    this.state.allItem.splice(index,1);
    this.setState({
      allItem:this.state.allItem
    });
    localStorage.setItem('todo',JSON.stringify(this.state.allItem))
  }
  //挂载事件
  componentDidMount(){
    this.init();
  }
  //init
  init(){
    let data:any=localStorage.getItem('todo');
    if(data==null){
      this.setState({
        allItem:[]
      })
    }else{
      this.setState({
        allItem:JSON.parse(data)
      })
    }
  }
  render(){
    let _this=this;
    // console.log(this.state.allItem)
    return  <>
              <div className="search-container">
                <input type="text" 
                onKeyDown={(e:any)=>{
                  if(e.keyCode===13){
                    _this.addData(e.target.value)
                  }
                }}  
                onChange={(e:any)=>{
                  if(e.keyCode!==13){
                    _this.setState({
                      value:e.target.value
                    })
                  }
                }}
                value={_this.state.value} className="search" placeholder="What needs to be done?"></input>
              </div>
              <div className="search-list-container">
                {_this.state.allItem.map((item:any,index:number)=>{
                  return  <p key={item.date} className="list-item">
                            <span onClick={()=>{
                              _this.fixData(index)
                            }} className={"done-img "+(item.isFinish?"done":"")}>✔</span>
                            <span className={"item-content "+(item.isFinish?"finished":"")}>{item.value}</span>
                            <span onClick={()=>{
                              _this.deleteData(index)
                            }} className="delete-img">✖</span>
                          </p>
                })}
              </div>
            </>
  }
}

//下方列表
class Note extends React.Component<Props>{
  render(){
    return  <div className="item">
              <img className="done-img" src="../imgs/done.png" alt=""/>
              <span className="item-content">{this.props.value}</span>
              <img className="delete-img" src="../imgs/delete.png" alt=""/>
            </div>
  }
}


ReactDOM.render(<App />, document.getElementById('app'))