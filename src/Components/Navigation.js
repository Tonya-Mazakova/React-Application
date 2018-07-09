import React, { PureComponent } from 'react';



class Navigation extends PureComponent{
    
    render(){
        return (<div className='nav-scroller py-1 mb-2'>
                        <nav className="nav d-flex justify-content-between">
                        <a className="p-2" href={null}>World</a>
                        <a className="p-2" href={null}>Technology</a>
                        <a className="p-2" href={null}>Culture</a>
                        <a className="p-2" href={null}>Health</a>
                        <a className="p-2" href={null}>Buisness</a>
                        <a className="p-2" href={null}>Style</a>
                        <a className="p-2" href={null}>Opinion</a>
                        <a className="p-2" href={null}>Travel</a>
                        <a className="p-2" href={null}>Design</a>
                        <a className="p-2" href={null}>Music</a>
                    </nav>
                </div>)
        }
    }



export default Navigation;