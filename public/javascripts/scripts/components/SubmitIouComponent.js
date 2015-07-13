var React = require('react');
var $ = require("jquery");

// var IouModel = require("../models/IouModel");
var OweModel = require("../models/OweModel");

module.exports = React.createClass({
	render: function() {
		return (
			<div className="container-fluid submit-container">
				<div className="col-xs-8 col-xs-offset-2 form">
					<form onSubmit={this.submitIou}>
						<label>Who do you owe a beer?</label><br />
						<input type="text" ref="name" /><br />
						<label>Image URL</label><br />
						<input type="text" ref="image" /><br />
						<label>Reason</label><br />
						<textarea ref="reason"></textarea><br />
						<label>Category</label><br />
						<select ref="category">
							<option value=""> -- Select a Beer Category -- </option>
							<option value="Single Beer">Single Beer</option>
							<option value="Six Pack">6 Pack</option>
							<option value="Twelve Pack">12 Pack</option>
							<option value="Twenty-Four Pack">24 Pack</option>
							<option value="30 Rack">30 Rack</option>
							<option value="Keg">Keg</option>
						</select><br />
						<label>Email Reminder in a week?</label><br />
						<input type="radio" value="true" name="reminder" />&nbsp; Yes<br />	
						<input type="radio" value="false" name="reminder" />&nbsp; No<br />																		
						<button type="submit">Submit</button>
					</form>
				</div>
			</div>
		);
	},
	submitIou: function(e) {
		e.preventDefault();

		var rem = false;
		if ($("input[name=reminder]:checked").val() === "true") {
			rem=true;
		}


		var owe = new OweModel({
			type: 1,
			owerid: this.props.ioBrewUser.get("username"),
			owername: this.props.ioBrewUser.get("givenName"),
			owedid: this.refs.name.getDOMNode().value,
			owedname: this.refs.name.getDOMNode().value,
			createdby: this.props.ioBrewUser.get("username"),
			image: this.refs.image.getDOMNode().value,
			reason: this.refs.reason.getDOMNode().value,
			category: this.refs.category.getDOMNode().value,
			reminder: rem
		});

		if (owe.attributes.image.length < 5) {
			owe.attributes.image = "https://s-media-cache-ak0.pinimg.com/736x/85/98/de/8598de9ad9ae33b00123f07f4fef7a38.jpg"
		}

		owe.save();

		this.props.myRouter.navigate("userdash", {trigger: true});
	}
});