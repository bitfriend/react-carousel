import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Carousel.css';

class Carousel extends PureComponent {
  state = {
    activeIndex: 0
  }

  getSize() {
    return Math.floor((this.props.data.length + 3) / 4);
  }

  isNextDisabled() {
    return this.state.activeIndex >= this.getSize() - 1;
  }

  handleNext = () => {
    if (this.isNextDisabled()) {
      return;
    }
    let { activeIndex } = this.state;
    activeIndex++;
    this.setState({ activeIndex });
  }

  isPrevDisabled() {
    return this.state.activeIndex <= 0;
  }

  handlePrev = () => {
    if (this.isPrevDisabled()) {
      return;
    }
    let { activeIndex } = this.state;
    activeIndex--;
    this.setState({ activeIndex });
  }

  getVisibleData() {
    const data = [];
    for (let i = this.state.activeIndex * 4; i < (this.state.activeIndex + 1) * 4; i++) {
      data.push(i < this.props.data.length ? this.props.data[i] : null);
    }
    return data;
  }

  render = () => (
    <div style={{
      width: this.props.width || 200,
      height: this.props.height || 200,
      display: 'flex',
      alignItems: 'center'
    }}>
      <div>
        {this.getVisibleData().map((item, index) => (
          <div key={index} style={{
            width: '25%',
            display: 'inline-block'
          }}>
            {item && (
              <img alt="" src={item.images[0]} style={{
                width: '100%',
                height: '100%'
              }} />
            )}
          </div>
        ))}
        <a onClick={this.handlePrev} className={classnames('nav-button', 'nav-left', {
          'disabled': this.isPrevDisabled()
        })}>
          <img alt="" src={require(this.isPrevDisabled() ? './asset/images/left-arrow-disabled.svg' : './asset/images/left-arrow.svg')} />
        </a>
        <a onClick={this.handleNext} className={classnames('nav-button', 'nav-right', {
          'disabled': this.isNextDisabled()
        })}>
          <img alt="" src={require(this.isNextDisabled() ? './asset/images/right-arrow-disabled.svg' : './asset/images/right-arrow.svg')} />
        </a>
      </div>
    </div>
  )
}

Carousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    images: PropTypes.array
  })),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

export default Carousel;