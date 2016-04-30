import React, {Component} from 'react';

class Home extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({value: 0});
  }

  componentDidMount() {
    this.state.timer = setInterval(() => {this.animateLoader();}, 1500);
  }

  animateLoader() {
    const newVal = this.state.value + 25;
    this.setState({value: newVal});
    if ( newVal >= 100 ) {
      clearInterval(this.state.timer);
      this.context.router.push('/play/');
    }
  }

  render() {
    const homeImg = require('./images/Home.jpg');
    const barWidth = this.state.value + '%';
    return (
      <div className="centerElement">
        <div><img src={homeImg}/></div>
        <div className="progress ">
          <div ref="progress-bar" className="progress-bar" style={{'width': barWidth}}>
          </div>
        </div>
      </div>
    );
  }
}

export default (Home);
