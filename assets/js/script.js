$(document).ready(function() {
	var position=1;
	var maxFields=5;
		$("#add-button").click(function(event) {
			event.preventDefault();
			if (position<maxFields) {
				position++;
				$('<input type="text" id="answer'+position+'" class="form-control" name="answer'+position+'" placeholder="Answer #'+position+'"><br>').insertBefore($("#submitButton"));
			}
		});
	});