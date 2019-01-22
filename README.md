# zteui-icon
An icon component for ReactJS

通用图标组件

### 图标的命名规范
命名规范参考[ant-design](https://ant.design/docs/react/introduce-cn)的[icon](https://ant.design/components/icon-cn/)组件

### 如何使用
#### 安装
你可以使用npm或cnpm进行安装

当UED通知你图标库已更新，你同样可以再次安装以更新该组件，并在项目中使用新图标
```text
npm install @cbd/icon --save
```
or
```text
cnpm install @cbd/icon --save
```


#### 引用
```javascript
import Zcon from '@';
```

#### 使用
使用 Zcon 标签声明组件，指定图标对应的 type 属性，font-size样式调整大小，示例代码如下:
```html
<Zcon type="link" />
```

spin 是否强制/取消旋转
```html
<Zcon type="link" spin />
```

svg 是否强制/取消svg模式
```html
<!-- svg模式会使颜色固定为默认颜色，不能修改，普通图标强制设为svg模式没有意义 -->
<Zcon type="link" svg />

<!-- （一般demo种彩色展示的是svg模式的图标）取消svg模式，会让图标丢失颜色信息，并接受color控制 -->
<Zcon type="camera-point-samll" svg={false} style={{color: '#F00'}} />
```

