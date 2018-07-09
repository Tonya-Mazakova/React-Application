import React, { PureComponent } from 'react';



class Navigation extends PureComponent{
    
    render(){
        return (<div className='nav-scroller py-1 mb-2'>
                        <nav className="nav d-flex justify-content-between">
                        <a className="p-2" href="#">World</a>
                        <a className="p-2" href="#">Technology</a>
                        <a className="p-2" href="#">Culture</a>
                        <a className="p-2" href="#">Health</a>
                        <a className="p-2" href="#">Buisness</a>
                        <a className="p-2" href="#">Style</a>
                        <a className="p-2" href="#">Opinion</a>
                        <a className="p-2" href="#">Travel</a>
                        <a className="p-2" href="#">Design</a>
                        <a className="p-2" href="#">Music</a>
                    </nav>
                </div>)
        }
    }



export default Navigation;