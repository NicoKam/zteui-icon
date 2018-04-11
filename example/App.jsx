import React, { Component } from 'react';
import clipboard from 'clipboard-polyfill';
import iconConfig from './iconConfig';
import utils from './utils';
import Zcon from '../lib/Zcon';
import './App.scss';

const PREFIX = 'app';
const cx = utils.classnames(PREFIX);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      copiedCode: '',
    });
  }

  render() {
    return (
      <div>
        {
          iconConfig.map((item) => (<div key={item.title} className={cx('icon-group')}>
            <div className={cx('icon-group-title')}>{item.title}</div>
            <div className={cx('icon-group-content')}>{
              item.icons.map((icon) => (<div
                key={icon.code}
                className={cx('icon-box', { copied: icon.code === this.state.copiedCode })}
                onClick={() => {
                  clipboard.writeText(`<Zcon type="${icon.code}" />`);
                  this.setState({
                    copiedCode: icon.code,
                  });
                  if (this.timer) clearTimeout(this.timer);
                  this.timer = setTimeout(() => {
                    this.timer = false;
                    this.setState({
                      copiedCode: '',
                    });
                  }, 1000);
                }}
              >
                <Zcon type={icon.code} />
                <div className={cx('btn-copy')}>已复制</div>
                <div className={cx('icon-title')}>{icon.text}</div>
                <div className={cx('icon-code')}>{icon.code}</div>
              </div>))
            }</div>
          </div>))
        }
      </div>
    );
  }
}

App.propTypes = {};

App.defaultProps = {};

export default App;
