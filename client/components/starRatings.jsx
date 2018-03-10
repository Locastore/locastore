import React from 'react';

class StarRatings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rating = this.props.rating * 20;

    return (
      <div>
      <p className="ratings-text">{this.props.rating}</p>
      <div className="star-ratings-css">

        <div className="star-ratings-css-top" style={{width: `${rating}%`}}>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      <div className="star-ratings-css-bottom">
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
    </div>
    </div>
    )
  }
}

export default StarRatings;