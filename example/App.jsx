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
      prefix: 'Zcon',
    });
  }


  render() {
    return (
      <div>
        <div className={cx('copy-ctrl')}>
          <div className={cx('copy-title')}>复制组件名</div>
          <p>推荐使用 Zcon 作为标签与 antd 区分，当然，由于本组件已经将 antd 的所有图标都收集了，
            所以如果你使用了antd又不想大量修改你的代码时，你可以将</p>
          <p> import&nbsp;&#123; Icon &#125; from &#x27;antd&#x27;;</p>
          <p> 替换为 </p>
          <p> import Icon from &#x27;zteui-icon&#x27;;</p>
          <div className={cx('copy-name')}>
            <div
              className={cx('copy-name-item', { selected: this.state.prefix === 'Zcon' })}
              onClick={() => {
                this.setState({ prefix: 'Zcon' });
              }}
            >Zcon
            </div>
            <div
              className={cx('copy-name-item', { selected: this.state.prefix === 'Icon' })}
              onClick={() => {
                this.setState({ prefix: 'Icon' });
              }}
            >Icon
            </div>
          </div>
        </div>
        {
          iconConfig.map((item) => (<div key={item.title} className={cx('icon-group')}>
            <div className={cx('icon-group-title')}>{item.title}</div>
            <div className={cx('icon-group-content')}>{
              item.icons.map((icon) => (<div
                key={icon.code}
                className={cx('icon-box', { copied: icon.code === this.state.copiedCode })}
                onClick={() => {
                  clipboard.writeText(`<${this.state.prefix} type="${icon.code}" />`);
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
                {icon.tag ? <div className={cx('icon-tag')}>{icon.tag}</div> : null}
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
