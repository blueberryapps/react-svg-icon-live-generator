import Blueberry from './Blueberry.react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Playground from 'component-playground';
import Icon from './Icon.react';
import Highlight from 'react-highlight';
import lodash from 'lodash';
import liveSvgIconGenerator from 'react-svg-icon-generator/lib/inlineGenerate';
import React, { Component } from 'react';
import Svg from './Svg';
import {CompactPicker} from 'react-color';

const sizes = [
  28,
  36,
  60,
  80,
  100,
  120
]

export default class App extends Component {

  state = {
    color: '#000',
    copied: false,
    icons: [],
    size: 28,
    source: null,
    svgs: []
  }

  componentDidMount() {
    this.recalculateSourceCode([])
  }

  render() {
    const {color, copied, size, source} = this.state

    return (
      <div>
        <div className="row">
          <form className='form-inline' encType="multipart/form-data">
            <div className="jumbotron">
              <h1>React SVG Icon Live Generator</h1>
              <p>Generate React Icon Component from SVG icons to show, resize and recolor them.</p>
              <ul>
                <li><a href='https://github.com/blueberryapps/react-svg-icon-generator'>Source code library for generating component</a></li>
                <li><a href='https://github.com/blueberryapps/react-svg-icon-live-generator'>Source code of this site</a></li>
              </ul>
              <p>
                <span className="btn btn-primary btn-xxl btn-file">
                  <span className="vcenter" style={{marginRight: '5px'}}>Click to add your SVG icons</span>
                  <Svg className="vcenter" />
                  <input
                    accept='.svg'
                    multiple
                    name='files[]'
                    onChange={this.addFiles.bind(this)}
                    type='file'
                  />
                </span>
              </p>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  {sizes.map(s => this.renderSizeSelector(s))}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <CompactPicker color={color} onChange={({hex}) => this.setState({color: `#${hex}`})}/>
                </div>
              </div>
            </div>
          </form>
          {copied &&
            <div className="alert alert-success">Source code copied to your clipboard.</div>
          }
          <div className="col-md-6">
            <h2>Icons</h2>
            {this.renderIcons()}
          </div>
          <div className="col-md-6">
            {source &&
              <CopyToClipboard text={source} style={{marginTop: '10px', float: 'right'}} onCopy={this.onCopy.bind(this)}>
                <button className='btn btn-primary'><Icon size={20} color='white' kind='clip' title="Copy to clipboard" /></button>
              </CopyToClipboard>
            }
            <h2>React Component Source Code</h2>
            {this.renderSource()}
          </div>
        </div>
        <footer style={{marginTop: '40px', paddingTop: '19px', color: '#777', borderTop: '1px solid #e5e5e5'}}>
          <span className='vcenter'>Proudly made by </span><a className='vcenter' href='http://www.blueberry.cz/en'><Blueberry /></a>.
        </footer>
      </div>
    );
  }

  renderSizeSelector(s) {
    const {size} = this.state
    return (
      <div className={`btn btn-default ${s === size && 'btn-active'}`} style={{padding: '0 8px', margin: '5px', height: `${s}px`, lineHeight: `${s}px`}} onClick={({target: {value}}) => this.setState({size: s})}>
        {s}px
      </div>
    )
  }

  renderSource() {
    const {source} = this.state

    if (!source) return null

    return (
      <Highlight className='javascript'>
        {source}
      </Highlight>
    )
  }

  renderIcons() {
    const {icons} = this.state

    return (
      <ul className="list-unstyled">
        {icons.map((icon) => this.renderIcon(icon))}
      </ul>
    )
  }

  renderIcon({filename, name, svg}) {
    const {color, size} = this.state

    return (
      <li key={name}>
        <div className="vcenter" style={{display: 'inline-block'}}>
          <div dangerouslySetInnerHTML={{__html: this.fixSvg(svg)}} />
        </div>
        <div className="vcenter" style={{marginLeft: '10px', marginRight: '10px', display: 'inline-block'}}>
          <Highlight className='javascript'>
            &lt;Icon kind="{name}" size="{size}" color="{color}" /&gt;
          </Highlight>
        </div>
        <div style={{float: 'right', marginTop: '15px', cursor: 'pointer', ':hover': {opacity: 0.5}}}>
          <Icon size={20} kind='close-thin' onClick={() => this.removeIcon(filename)} title="Remove Icon" />
        </div>
      </li>
    )
  }

  removeIcon(filename) {
    const {icons, svgs} = this.state
    const allIcons = icons.filter(icon => icon.filename !== filename)
    const allSvgs = svgs.filter(file => file.name !== filename)

    this.setState({icons: allIcons, svgs: allSvgs})
    this.recalculateSourceCode(allSvgs)
  }

  onCopy() {
    this.setState({copied: true})
    setTimeout(() => this.setState({copied: false}), 3000)
  }

  fixSvg(svgData) {
    const {color, size} = this.state

    return svgData
      .replace('fill={color}', `fill="${color}"`)
      .replace('height={height || size} width={width || size}', `height="${size}" width="${size}"`)
  }

  addFiles({target: {files}}) {
    const {svgs} = this.state

    const newSvgs = Object.keys(files)
      .map(index => files[index])
      .filter(file => file.type.match('image/svg.*'))

    const allSvgs = lodash.uniqBy(svgs.concat(newSvgs), (file) => file.name)

    this.setState({svgs: allSvgs})

    this.recalculateSourceCode(allSvgs)
  }

  recalculateSourceCode(svgs) {
    liveSvgIconGenerator({}, svgs).then(({icons, source}) => {
      this.setState({icons, source})
    })
  }
}
