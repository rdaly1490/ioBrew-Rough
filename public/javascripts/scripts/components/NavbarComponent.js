var React = require('react');

module.exports = React.createClass({
  componentWillMount: function () {
      this.props.ioBrewUser.on('change', function() {
      this.forceUpdate();
    }, this);
  },
  render: function() {
    var links = [];
    var userDropdown = null;
    if(!this.props.ioBrewUser.get("username")) {
      links.push(<li key="register"><a href="/register">Register</a></li>);
      links.push(<li key="login"><a href="/login">Log in</a></li>);
    }
    else {
      // console.log(this.props);
      // this.props.myRouter.navigate("submitiou", {trigger: true});
      links.push(<li key="logout"><a href="#" onClick={this.onLogOut}>Log out</a></li>);
      links.push(<li key="UserDash"><a href="#userdash">User Dash</a></li>);
      userDropdown = (
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.ioBrewUser.get("username")} <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="#profile">Profile</a></li>
              <li><a href="#" onClick={this.onLogOut}>Log out</a></li>
            </ul>
          </li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">io<span className="brew">Brew</span><img src="/images/Beer-icon.png" /></a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              {links}
            </ul>
            <form className="navbar-form navbar-left" role="search">
            </form>
            {userDropdown}
          </div>
        </div>
      </nav>
    );
  },

  onLogOut: function(e) {
    e.preventDefault();
    window.location.href = "/logout";
  }
});


// <a className="navbar-brand" href="#">Cheers {this.props.ioBrewUser.get("givenName")} !</a>