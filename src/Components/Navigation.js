import React, { PureComponent } from 'react';



class Navigation extends PureComponent{
    
    render(){
        return (<div className='nav-scroller py-1 mb-2'>
                        <nav className="nav d-flex justify-content-between">
                        <a className="p-2 text-muted" href="#">World</a>
                        <a className="p-2 text-muted" href="#">Technology</a>
                        <a className="p-2 text-muted" href="#">Culture</a>
                        <a className="p-2 text-muted" href="#">Health</a>
                        <a className="p-2 text-muted" href="#">Buisness</a>
                        <a className="p-2 text-muted" href="#">Style</a>
                        <a className="p-2 text-muted" href="#">Opinion</a>
                        <a className="p-2 text-muted" href="#">Travel</a>
                        <a className="p-2 text-muted" href="#">Design</a>
                        <a className="p-2 text-muted" href="#">Music</a>
                    </nav>
                </div>)
        }
    }



export default Navigation;