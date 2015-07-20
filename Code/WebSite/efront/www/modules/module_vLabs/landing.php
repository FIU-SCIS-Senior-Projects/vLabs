<?php
	//include files needed to use eFront's built in db functions
	require_once("../../../libraries/configuration.php");	
	require_once("../../../libraries/database.php");
	require_once("../../../libraries/globals.php");
	require_once("config.php");
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<!--jQuery-->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<!--Bootstrap Latest compiled and minified CSS/JS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

<!-- jQueryUI-->
<?php
	//grab the theme parameter passed from the url
	$themeset = $_GET['theme'];
	//include the approriate css for the theme 
	switch ($themeset) {
		case 'default':
			echo "<link type='text/css' rel='stylesheet' href='jquery-ui-themes/themes/default/jquery-ui.css'>";
			break;
		case 'blue':
			echo "<link type='text/css' rel='stylesheet' href='jquery-ui-themes/themes/blue/jquery-ui.css'>";
			break;
		case 'bluehtml':
			echo "<link type='text/css' rel='stylesheet' href='jquery-ui-themes/themes/bluehtml/jquery-ui.css'>";
			break;
		case 'green':
			echo "<link type='text/css' rel='stylesheet' href='jquery-ui-themes/themes/green/jquery-ui.css'>";
			break;
		case 'flatgrey':
			echo "<link type='text/css' rel='stylesheet' href='jquery-ui-themes/themes/flatgrey/jquery-ui.css'>";
			break;
		default:
			echo "<link type='text/css' rel='stylesheet' href='jquery-ui-themes/themes/default/jquery-ui.css'>";
			break;
	}
?>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script src="jqtimer/jquery.countdown.js"></script>

</head>
<body id="docbody">
	<input id="userid" type="hidden" value="<?php echo $_GET['uid']; ?>" />
	<input id="username" type="hidden" value="<?php echo $_GET['username']; ?>" />
	<input id="hours" type="hidden" value="<?php echo $_GET['hours']; ?>" />
	<input id="minutes" type="hidden" value="<?php echo $_GET['minutes']; ?>" />
	<input id="encryptedPassword" type="hidden" value="<?php echo urlencode($_GET['encrypted_password']); ?>" />
	<input id="email" type="hidden" value="<?php echo $_GET['email']; ?>" />
	<input id="courseURL" type="hidden" value="KU-poweredby-ITS.html"/>
	<input id="resourcetype" type="hidden" value="VIRTUAL LAB" />
	<input id="veInsId" type="hidden" value="false"/>
	<input id="guacUrl" type="hidden" value="<?php echo $GUACAMOLE_URL; ?>" />
	<?php
	//grab the course name
		$courseId = $_GET['course'];
		$courseInfo = eF_getTableData("courses", "name", "id=$courseId");
		foreach($courseInfo as $cinfo){
			$cname = $cinfo['name'];
			echo "<input id='course' type='hidden' value='$cname'/>";
		}
	?>

<!-- nav bar -->
<div id="toolbar" class="ui-widget-header ui-corner-all">
	<div style="display:inline">
		<div id="timecontrols" style="display:inline">
		 minutes: <input type="text" id="timetochange" name="timetochange" value="5" placeholder="5" maxlength="2" size="2">
	 	<button id="addtime">Add time to your virtual-lab appointment</button>
	 	<button id="removetime">Remove time from your virtual-lab appointment</button>
	 	<button id="ejecttime">Cancel the remaining virtual-lab appointment</button>
	 	</div>
	 	<span class="clock" style="rgb(0,0,0);"></span>
	</div>
	<div id="vmcontrols" style="display:inline">
		<button id="poweroffvm">Power Off</button>
		<button id="poweronvm">Power On</button>
		<button id="shutdownvm">Shutdown</button>
		<button id="restartvm">Restart</button>
		<button id="pausevm">Pause</button>
		<button id="refreshvm">Refresh</button>
		<button id="refreshall">Refresh All</button>
		<label for="res">Resolution: </label>
		<select name="res" id="resolution" width="100px">
			<option value="default">default</option>
			<option value="640x480">640x480</option>
			<option value="800x600">800x600</option>
		</select>
		<label for="color">Color Depth: </label>
		<select name="color" id="cdepth" width="100px">
			<option value="default">default</option>
			<option value="8">8</option>
			<option value="16">16</option>
			<option value="24">24</option>
		</select>
	</div>
</div>

<!-- Tabs -->
<div id="tabs">
	<ul>
		<li><a class="nonrdptab" href="#tabs-1">Network Diagram</a></li>
		<li><a class="nonrdptab" href="#tabs-2">Connection Info</a></li>

		<li><a class="rdptab" href="#tabs-3">Domain Controller</a>
		<span id="2" class="ui-icon ui-icon-extlink" role="presentation" title="Open RDP session in a new tab!"></span><li>
		
		<li><a class="rdptab" href="#tabs-4">Workstation 1</a>
		<span id="3" class="ui-icon ui-icon-extlink" role="presentation" title="Open RDP session in a new tab!"></span></li>
		
		<li><a class="rdptab" href="#tabs-5">Workstation 2</a>
		<span id="4" class="ui-icon ui-icon-extlink" role="presentation" title="Open RDP session in a new tab!"></span><li>
		
		<li><a class="rdptab" href="#tabs-6">Reception</a>
		<span id="5" class="ui-icon ui-icon-extlink" role="presentation" title="Open RDP session in a new tab!"></span><li>
		
		<li><a class="rdptab" href="#tabs-7">Laptop-Ceo</a>
		<span id="6" class="ui-icon ui-icon-extlink" role="presentation" title="Open RDP session in a new tab!"></span><li>
	</ul>
	<!-- Network Diagram -->
	<div id="tabs-1"> 
		<center><img src=http://ita-portal.cis.fiu.edu/mod/deva/embedded/img/K2-3_Network-Diagram.png></center>
	</div>
	<!-- Connection Info -->
	<div id="tabs-2">
		<table id="conninfotable" class="table table-striped">
			<tr>
				<td><center><strong>Machine Name</strong></center></td>
				<td><center><strong>Connection Protocol</strong></center></td>
				<td><center><strong>Host Name</strong></center></td>
				<td><center><strong>Host Port</strong></center></td>
				<td><center><strong>Username</strong></center></td>
				<td><center><strong>Password</strong></center></td>
				<td><center><strong>Domain</strong></center></td>
			</tr>
		</table>
	</div>
	<!-- RDP session tabs -->
	<div id="tabs-3" class="tabwhitespace">
	</div>
	<div id="tabs-4" class="tabwhitespace">
	</div>
	<div id="tabs-5" class="tabwhitespace">
	</div>
	<div id="tabs-6" class="tabwhitespace">
	</div>
	<div id="tabs-7" class="tabwhitespace">
	</div>
</div>
<div id="wait" style="display:none" align="center"><img src="wait.gif"><br>Please Wait...</div>
</body>
<script type="text/javascript" src="scheduler/fullcalendar/fullcalendar.js"></script>
<script type="text/javascript" src="dateFormat.js"></script>
<script type="text/javascript" src="navbarcontrols.js"></script> 
<script type="text/javascript" src="getandschedule.js"></script>
<script type="text/javascript" src="vmcObjs.js"></script> 
<script>
	$(function() {
		//initialize tab UI but hide until user is verified and the tabs have been properly loaded
		$("#tabs").tabs();
		$("#tabs").hide();

		//load the user's instance
		$("#wait").show();
		reloadDevaFrontEmbedded();
		setTimeControl();
		//startStatusInterval();

		//clicking a rdp tab
		$("a.rdptab").click(function(){
			currentTabSelected = $('#tabs').tabs("option", "active");	//0 based index
			var srcUrl = getRdpTabInfo('veInsURL', currentTabSelected);
			var paramstoadd = "";
			var tab = $(this).attr("href");

			//get vm controls
			$('#vmcontrols').empty();
			$('#vmcontrols').append(getVMControlHTML());

			//ajax to find bpp and res, if other than default then append the params to the iframe source
			$.ajax({
				url: "vmcontrols.php",
				type: "post",
				data: {"action" : "getBpp", "email" : $("#email").val()},
				success: function(data){
					if(data != 'default'){
						//make the selects reflect the chosen bpp and add to params to add to guacamole
						$('#cdepth option[value="' + data + '"]').remove();
						$('#cdepth').prepend('<option selected="selected" value="' + data + '">' + data + '</option>');
						paramstoadd = paramstoadd + "&guac.color-depth=" + data;
					}
				},
				complete: function(){
					//get resolution
					$.ajax({
						url: "vmcontrols.php",
						type: "post",
						data: {"action" : "getResolution", "email" : $("#email").val()},
						success: function(data){
							if(data != 'default'){
								//make the selects reflect the chosen bpp and add to params to add to guacamole
								var vals = data.split('x');
								$('#resolution option[value="' + data + '"]').remove();
								$('#resolution').prepend('<option selected="selected" value="' + data + '">' + data + '</option>');
								paramstoadd = paramstoadd + "&guac.width=" + vals[0] + "&guac.height=" + vals[1];
							}
						},
						complete: function(){
							setupVMControlButtons();
							//bind the event handlers for the selects
							$('#cdepth').change(function(){changeBpp()});
							$('#resolution').change(function(){changeRes()});
							$("#vmcontrols").show();

							//load tab with the appropriate srcURL
							alert("params to add: " + paramstoadd);
							if(paramstoadd != ""){
								loadTab(tab, srcUrl + paramstoadd);
							}
							else{
								loadTab(tab, srcUrl);
							}
						}
					});
				}
			});
		});

		//clicking a non-rdp tab
		$("a.nonrdptab").click(function(){
			currentTabSelected = $('#tabs').tabs("option", "active");	//0 based index
			//hide vm controls
			$("#vmcontrols").hide();
		});
		
		//new tab button clicks
		$("span.ui-icon-extlink").click(function(){
			var tab = $(this).attr("id"); //the rdp tab of the button we clicked

			if(currentTabSelected < 2){ //in a non-rdp tab
				//load rdp session with default display
				var link = getRdpTabInfo('veInsURL', tab);
				loadTab(tab, link);
				window.open(link);
			}
			else{
				//in an rdp tab
				var tabpanel = $('.ui-tabs-panel:not(.ui-tabs-hide)');
				var link = tabpanel.find('.iframetab').attr('src');
				window.open(link);
			}
		});
		
		//handle clicking outside the frame
		$(".tabwhitespace, .tabIframeWrapper").click(function(){
			$("iframe").focus();
		});
	});

function changeRes(){
	var currSrc = getRdpTabInfo('veInsURL', currentTabSelected);
	//grab the iframe
	var tabpanel = $('.ui-tabs-panel:not(.ui-tabs-hide)');
	var iframe = tabpanel.find('.iframetab');
	//grab the chosen resolution value
	var rval = $("#resolution option:selected").text();
	//grab the current color depth option set
	var dval = $("#cdepth").val();

	//write the new res val to the database
	$.ajax({
		url: "vmcontrols.php",
		type: "post",
		data: {"action" : "setResolution", "resolution" : rval , "email" : $("#email").val()},
		error: function(){
			alert("error: Cannot update user settings");
		}
	});

	if(rval != 'default'){
		var dimensions = rval.split("x");
		if(dval != 'default'){
			//reload with res and the set color depth params
			var temp = currSrc + "&guac.width=" + dimensions[0] + "&guac.height=" + dimensions[1] +"&guac.color-depth=" + dval;
			iframe.attr('src', generateGuacUrl(temp, dval, dimensions));
		}
		else{
			//reload with the chosen resolution and default cdepth
			var temp = currSrc + "&guac.width=" + dimensions[0] + "&guac.height=" + dimensions[1];
			iframe.attr('src', generateGuacUrl(temp, null, dimensions));
		}
	}
	else{ //rval is default
		if(dval != 'default'){
			//reload with the previously chosen color depth param added
			var temp = currSrc + "&guac.color-depth=" + dval;
			iframe.attr('src', generateGuacUrl(temp, dval, null));
		}
		else{
			//just reload with default everything
			iframe.attr('src', currSrc);
		}	
	}
}

function changeBpp(){
	var currSrc = getRdpTabInfo('veInsURL', currentTabSelected);
	//grab the iframe
	var tabpanel = $('.ui-tabs-panel:not(.ui-tabs-hide)');
	var iframe = tabpanel.find('.iframetab');
	//grab chosen depth value
	var dval = $("#cdepth").val();
	//grab current resolution option set
	var rval = $("#resolution option:selected").text();

	//write the new cdpeth value to database
	alert("ajax with: " + dval);
	$.ajax({
		url: "vmcontrols.php",
		type: "post",
		data: {"action" : "setBpp", "bpp" : dval , "email" : $("#email").val()},
		error: function(){
			alert("error: Cannot update user settings");
		}
	});

	if(rval != 'default'){
		var dimensions = rval.split("x");

		if(dval != 'default'){
			//reload iframe source with both res and depth parameters
			var temp = currSrc + "&guac.color-depth=" + dval + "&guac.width=" + dimensions[0] + "&guac.height=" + dimensions[1];
			iframe.attr('src', generateGuacUrl(temp, dval, dimensions));
		}
		else{
			//reset to default color depth and the specified res
			var temp = currSrc + "&guac.width=" + dimensions[0] + "&guac.height=" + dimensions[1];
			iframe.attr('src', generateGuacUrl(temp, null, dimensions));
		}
	}
	else{
		if(dval != 'default'){
			//reload iframe source with just the color depth parameter added
			var temp = currSrc + "&guac.color-depth=" + dval;
			iframe.attr('src', generateGuacUrl(temp, dval, null));
		}
		else{
			//reload with default color depth and res
			iframe.attr('src', currSrc);
		}
	}
}

function loadTab(tab, url){
	if($(tab).find("iframe").length != 0){
		//just refocus the tab to the frame
		$("iframe").focus();
	}
	else{
		//create and load iframe
		var html = [];
		html.push('<div class="tabIframeWrapper">');
		html.push('<iframe id="iframetab' + currentTabSelected + '" class="iframetab" src="' + url + '" width="100%" height="70%" style="border:none"></iframe>');
		html.push('</div>');
		$(tab).append(html.join(""));
		$("iframe").focus();
	}
}

function generateGuacUrl(src, depth, dim){
	var newSrc = "";
	var id = "";
	var guacUrl = $('#guacUrl').val();
	var port = getRdpTabInfo('veInsPort', currentTabSelected).toString();
	var params = src.substring(src.indexOf("&"), src.length);	//all the parameters after id
	
	//generate the connection id and the new url
	//order as follows: port always at beginning, then depth if there, then resolution width, height
	if(depth == null){ id = port + dim[0] + dim[1]; }
	else if(dim == null){ id = port + depth; }
	else{ id = port + depth + dim[0] + depth[1];}

	id = (id.length < 15) ? id : id.substring(0, 15); //if id is longer than 15 chars then take the first 15
	newSrc = guacUrl + id + "?id=" + id + params;
	return newSrc;
}	
</script>
</html>