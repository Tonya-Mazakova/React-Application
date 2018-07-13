import React, { PureComponent } from 'react';
import '../css/index.sass';



class Slider extends PureComponent{

    componentDidMount () {
        var loadScript = function(src) {
            var tag = document.createElement('script');
            tag.async = true;
            tag.src = src;
            document.body.appendChild(tag);
          }
          loadScript('./engine1/wowslider.js')
          loadScript('./engine1/script.js')
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.vewPost !== prevProps.viewPost){
            var loadScript = function(src) {
                var tag = document.createElement('script');
                tag.async = true;
                tag.src = src;
                document.body.appendChild(tag);
              }
              loadScript('./engine1/wowslider.js')
              loadScript('./engine1/script.js')
        }
    }

    render(){
        if(this.props.viewPost){
            return null;
        }
        return(
            <div>
                <div id="wowslider-container1">
                    <div className="ws_images">
                        <ul>
                            <li><img src={require('./data1/images/foto.jpg')} alt='' title="" id="wows1_0"/>
                                <blockquote>
                                    <p>The most courageous act...</p>
                                        <footer>— <cite>Jeffery@juwan.us</cite></footer>
                                </blockquote>
                            </li>
                            <li><img src={require('./data1/images/foto1.jpg')} alt='' title="" id="wows1_1"/>
                                <blockquote>
                                    <p>The most courageous act...</p>
                                    <footer>— <cite>Jeffery@juwan.us</cite></footer>
                                </blockquote>
                            </li>
                            <li><img src={require('./data1/images/foto2.jpg')} alt='' title="" id="wows1_2"/>
                                <blockquote>
                                    <p>The most courageous act...</p>
                                    <footer>— <cite>Jeffery@juwan.us</cite></footer>
                                </blockquote>
                            </li>
                            <li><img src={require('./data1/images/foto4.jpg')} alt='' title="" id="wows1_3"/>
                                <blockquote>
                                    <p>The most courageous act...</p>
                                    <footer>— <cite>Jeffery@juwan.us</cite></footer>
                                </blockquote>
                            </li>
                            <li><img src={require('./data1/images/foto3.jpg')} alt='' title="" id="wows1_4"/>
                                <blockquote>
                                    <p>The most courageous act...</p>
                                    <footer>— <cite>Jeffery@juwan.us</cite></footer>
                                </blockquote>
                            </li>
                        </ul>
                    </div>
                <div className="ws_bullets"><div>
                    <a href={null} title="foto"><span><img src={require('./data1/tooltips/foto.jpg')} alt="foto"/>1</span></a>
                    <a href={null} title="foto1"><span><img src={require('./data1/tooltips/foto1.jpg')} alt="foto1"/>2</span></a>
                    <a href={null} title="foto2"><span><img src={require('./data1/tooltips/foto2.jpg')} alt="foto2"/>3</span></a>
                    <a href={null} title="foto4"><span><img src={require('./data1/tooltips/foto4.jpg')} alt="foto4"/>4</span></a>
                    <a href={null} title="foto3"><span><img src={require('./data1/tooltips/foto3.jpg')} alt="foto3"/>5</span></a>
                </div>
             </div>
            <div className="ws_shadow"></div>
            </div>	
        </div>
        ) 
    }
}



export default Slider;