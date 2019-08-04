import $ from 'jquery';

class Request {

	post(data, url) {
		return $.ajax({
			url: url,
			type: 'POST',
			data: data
		});
	}
}

export default Request;