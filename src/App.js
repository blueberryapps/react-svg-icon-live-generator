import Blueberry from './Blueberry.react';
import CopyToClipboard from 'react-copy-to-clipboard';
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

const defaultSvgs = [
  new File([
      '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"',
      '   width="512px" height="512px" viewBox="0 0 512 512">',
      '<path d="M441.739,78.127c0,0-54.865,7.851-100.363-0.993c-41.384-8.06-85.342-37.434-85.365-37.401',
      '  c-0.049-0.033-44,29.342-85.382,37.401c-45.491,8.844-100.371,0.993-100.371,0.993s-11.188,162.913,48.1,267.25',
      '  c54.062,95.109,137.621,126.891,137.653,126.891c0.015,0,83.565-31.781,137.628-126.891',
      '  C452.942,241.041,441.739,78.127,441.739,78.127z M158.253,319.711c-41.581-94.626-33.725-205.882-33.725-205.882',
      '  s14.631-0.289,30.427-1.8c16.398-1.588,31.142-6.116,31.142-6.116s-4.142,101.481,17.777,204.1',
      '  c19.993,93.551,50.875,124.805,50.875,124.789C254.734,434.818,196.161,405.99,158.253,319.711z"/>',
      '</svg>'
    ], 'shiled.svg'),

  new File([
      '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"',
      '   width="512px" height="512px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">',
      '  <path d="M484.854,143.099c-0.283-1.809-0.642-3.59-1.141-5.305c-0.203-0.812-0.47-1.624-0.734-2.436',
      '    c-6.04-17.919-22.976-30.859-42.957-30.875h3.123c0,0-80.308-12.121-187.152-12.612C149.147,92.362,68.84,104.483,68.84,104.483',
      '    h3.13c-19.997,0.016-36.909,12.955-42.965,30.875c-0.257,0.812-0.508,1.624-0.734,2.436c-0.476,1.715-0.842,3.497-1.1,5.305',
      '    c-2.927,20.823-7.735,62.406-8.171,112.23c0.437,49.855,5.245,91.407,8.171,112.262c0.258,1.811,0.625,3.559,1.1,5.289',
      '    c0.226,0.828,0.477,1.61,0.734,2.421c6.056,17.95,22.968,30.905,42.965,30.905h-3.13c0,0,80.308,12.113,187.152,12.612',
      '    c106.845-0.499,187.152-12.612,187.152-12.612h-3.123c19.981,0,36.917-12.955,42.957-30.905c0.265-0.811,0.531-1.593,0.734-2.421',
      '    c0.499-1.73,0.857-3.479,1.141-5.289c2.886-20.854,7.71-62.406,8.146-112.262C492.563,205.505,487.739,163.922,484.854,143.099',
      '     M326.186,265.491l-95.683,69.508c-1.998,1.466-4.403,2.2-6.775,2.2c-1.779,0-3.59-0.423-5.245-1.249',
      '    c-3.839-1.967-6.274-5.946-6.274-10.271V186.681c0-4.34,2.435-8.305,6.274-10.287c3.871-1.966,8.492-1.577,12.02,0.953',
      '    l95.683,69.49c2.998,2.171,4.746,5.637,4.746,9.336C330.932,259.856,329.199,263.307,326.186,265.491"/>',
      '</svg>'
    ], 'youtube.svg'),

    new File([
      '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"',
      '   viewBox="0 0 52.74 53.91" enable-background="new 0 0 52.74 53.91" xml:space="preserve">',
      '  <path d="M26.379,2.996c-13.182,0-23.906,10.75-23.906,23.962c0,13.212,10.724,23.962,23.906,23.962',
      '    c13.182,0,23.907-10.75,23.907-23.962C50.286,13.745,39.561,2.996,26.379,2.996z M26.379,48.921',
      '    c-12.083,0-21.914-9.853-21.914-21.964c0-12.112,9.831-21.965,21.914-21.965c12.084,0,21.915,9.853,21.915,21.965',
      '    C48.293,39.068,38.463,48.921,26.379,48.921z M26.882,27.501V12.921c0-0.551-0.448-1.001-0.999-1.001',
      '    c-0.552,0-0.999,0.449-0.999,1.001v15.408l8.287,8.29c0.195,0.196,0.451,0.294,0.707,0.294c0.255,0,0.511-0.097,0.706-0.294',
      '    c0.39-0.39,0.39-1.023,0-1.412L26.882,27.501z M9.737,48.216l-3.977,3.99c-0.389,0.391-0.389,1.023,0,1.411',
      '    c0.194,0.196,0.449,0.293,0.704,0.293s0.51-0.096,0.705-0.293l3.977-3.99c0.389-0.388,0.389-1.021,0-1.411',
      '    C10.756,47.825,10.126,47.825,9.737,48.216z M43.021,48.216c-0.389-0.391-1.019-0.391-1.409,0c-0.389,0.39-0.389,1.022,0,1.411',
      '    l3.977,3.99c0.194,0.196,0.449,0.293,0.704,0.293c0.255,0,0.51-0.096,0.705-0.293c0.389-0.389,0.389-1.021,0-1.411L43.021,48.216z',
      '     M16.596,1.978c0.539-0.109,0.887-0.635,0.779-1.176c-0.108-0.541-0.63-0.893-1.171-0.782C15.728,0.117,4.477,2.495,0.065,14.09',
      '    c-0.196,0.516,0.062,1.093,0.576,1.288c0.117,0.045,0.237,0.065,0.355,0.065c0.401,0,0.779-0.243,0.931-0.643',
      '    C5.937,4.26,16.49,2,16.596,1.978z M52.674,14.09C48.263,2.495,37.013,0.117,36.536,0.02c-0.54-0.109-1.063,0.242-1.171,0.782',
      '    c-0.108,0.541,0.24,1.066,0.779,1.176C36.25,2,46.802,4.26,50.812,14.801c0.152,0.399,0.53,0.643,0.931,0.643',
      '    c0.118,0,0.238-0.021,0.355-0.065C52.612,15.183,52.87,14.605,52.674,14.09z"/>',
      '</svg>',
    ], 'clock.svg'),
]

console.log(defaultSvgs)

export default class App extends Component {

  state = {
    color: '#000',
    copied: false,
    icons: [],
    size: 28,
    source: null,
    svgs: defaultSvgs
  }

  componentDidMount() {
    this.recalculateSourceCode(this.state.svgs)
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
                  <CompactPicker color={color} onChange={({hex}) => this.setState({color: `#${hex}`.replace('##', '#')})}/>
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
        <footer style={{marginTop: '40px', paddingTop: '19px', paddingBottom: '30px', color: '#777', borderTop: '1px solid #e5e5e5'}}>
          <span className='vcenter'>Proudly made by </span><a className='vcenter' href='http://www.blueberry.cz/en'><Blueberry width="300"/></a>.
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
