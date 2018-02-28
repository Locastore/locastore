import React from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  imageFallback(event) {
    event.target.src = 'https://images.unsplash.com/photo-1496389395181-e5fdd5c0315e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=49bd31ab070ce144fe11d9df225d1d4c&auto=format&fit=crop&w=746&q=80';
  }

  createItems() {
    var items;
    if (this.props.photos ===  undefined) {
      items = [
        {
        src: 'https://images.unsplash.com/photo-1496389395181-e5fdd5c0315e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=49bd31ab070ce144fe11d9df225d1d4c&auto=format&fit=crop&w=746&q=80',
        },
        {
        src: 'https://images.unsplash.com/photo-1510629326852-3f0946701bc6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d67a874d7c2b83e05cf5154b352324d6&auto=format&fit=crop&w=968&q=80',
        },
        {
        src: 'https://images.unsplash.com/photo-1493259606967-571afaef3d81?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5fc97aabffb67934abcf17750357afd4&auto=format&fit=crop&w=1050&q=80',
        }
      ]
    } else {
      items = [
        {
          src: `${this.props.photos[0]}`,
        },
        {
          src: `${this.props.photos[1]}`,
        },
        {
          src: `${this.props.photos[2]}`
        }
      ];
    }
    return items;
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.createItems().length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.createItems().length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = this.createItems().map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}>

          <img className="carouselItem" src={item.src} onError={this.imageFallback}/>
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}>
        <CarouselIndicators items={this.createItems()} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}

export default Slider;











