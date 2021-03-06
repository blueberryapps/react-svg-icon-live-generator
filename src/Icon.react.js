/* eslint-disable */
// Generated by gulp svg-icon - do not modify manually

import React, {Component} from 'react';

const iconList = [
  'clip',
  'close-thin',
]

export default class Icon extends Component {

  static propTypes = {
    color: React.PropTypes.string,
    height: React.PropTypes.number,
    kind: React.PropTypes.oneOf(iconList).isRequired,
    preview: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    size: React.PropTypes.number,
    width: React.PropTypes.number,
  };

  static defaultProps = {
    size: 32,
    color: '#000'
  }

  render() {
    const {kind, preview, onClick} = this.props

    return (
      <div onClick={onClick}>
        {preview ? this.renderPreview() : this.renderIcon(kind)}
      </div>
    );
  }

  renderPreview() {
    return (
      <div>
        {iconList.map(kind => this.renderPreviewKind(kind))}
      </div>
    )
  }

  renderPreviewKind(kind) {
    return (
      <span key={kind}>
        <h3>&lt;Icon kind="{kind}" /&gt;</h3>
        {this.renderIcon(kind)}
      </span>
    )
  }

  renderIcon(kind) {
    const {color, size, height, width} = this.props;

    switch (kind) {
      default: return null;
      case ('clip'): return (<svg xmlns="http://www.w3.org/2000/svg" fill={color} height={height || size} width={width || size} viewBox="0 0 512 512"><path d="M300.55 109.22l53.135 234.253c4.96 21.87 1.502 41.807-10.01 57.617-10.305 14.19-27.044 24.782-45.906 29.06-35.282 8.005-75.818-5.695-86.842-54.295L157.792 141.6c-7.785-34.313 12.515-55.085 36.06-60.425 12.56-2.85 25.13-1.173 35.39 4.735 11.54 6.62 19.52 18.465 23.1 34.243l45.1 198.828c3.407 15.018-3.315 22.14-10.096 23.676-7.04 1.597-15.74-2.05-19.14-17.043l-30.792-135.745-38.408 8.713 30.792 135.746c4.955 21.846 16.675 33.464 25.625 39.36 12.083 7.964 26.5 10.577 40.633 7.37 26.394-5.987 48.535-32.232 39.79-70.786l-45.1-198.828c-7.68-33.847-27.013-51.144-41.87-59.676-18.866-10.842-41.485-14.05-63.738-9-42.61 9.665-78.86 49.71-65.74 107.543l53.136 234.253c16.2 71.416 79.654 96.303 133.944 83.987 28.462-6.455 52.986-22.185 69.054-44.3 18.375-25.267 24.112-56.213 16.564-89.492l-53.14-234.253-38.407 8.714z"/></svg>);
      case ('close-thin'): return (<svg xmlns="http://www.w3.org/2000/svg" fill={color} height={height || size} width={width || size} viewBox="0 0 512 512"><path d="M448.864 399.824L305.04 256l143.823-143.824-49.04-49.04L256 206.958 112.176 63.134l-49.04 49.042L206.957 256 63.135 399.823l49.04 49.04L256 305.04l143.823 143.825z"/></svg>);
      }
  }
}
