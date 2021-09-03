import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';


//引入页面
import Main from './Page/Main'
import Put from './Page/Put'
import Open from './Page/Open'

function App() {
  return (
    <BrowserRouter>
        {/* <Nav /> */}
        <div className='container'>
          {/* 根据URL路径匹配路由组件，渲染到该位置 */}
          <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/put' exact component={Put} />
            <Route path='/open' exact component={Open} />
            {/* <Route path='/addCapsule' component={} /> */}
            {/* 这是一个默认页面，如果前面的路由都没有被匹配到，就会渲染这个组件，相当于404，一定要放到最后 */}
            
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
