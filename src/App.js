import React, { PureComponent } from 'react';
import './App.css';
import faker from 'faker';
import Carousel from './Carousel';

class App extends PureComponent {
  state = {
    data: []
  }

  componentDidMount() {
    const data = [];
    const size = faker.random.number({
      min: 3,
      max: 5
    });
    console.log('size', size);
    for (let i = 0; i < size * 4; i++) {
      const images = [];
      const imageLen = faker.random.number({
        min: 2,
        max: 4
      });
      for (let j = 0; j < imageLen; j++) {
        images.push(faker.image.image());
      }
      data.push({
        title: faker.lorem.words(2),
        images
      });
    }
    this.setState({ data });
  }

  render = () => (
    <div className="App">
      <Carousel
        data={this.state.data}
        width="80vw"
        height="80vh"
      />
    </div>
  )
}

export default App;
