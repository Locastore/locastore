class SearchView extends React.Component {
  constructor (props) {
    super(props);
    // this.state = {
    // }
  }



  render () {
    <div className="searchBar">
      <h3>This is from the SearchView.  Does it render in the DOM?</h3>
      <input type="text" value="your location">
      </input>
      <button onClick={this.props.search}>Search</button>
    </div>
  }

}