class SearchView extends React.Component {
  constructor (props) {
    super(props);
    // this.state = {
    // }
  }



  render () {
    <div className="searchBar">
      <input type="text" value="your location">
      </input>
      <button onClick={this.props.search}>Search</button>
    </div>
  }

}