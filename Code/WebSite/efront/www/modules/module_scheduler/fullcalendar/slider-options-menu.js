//filename: slider-options-menu.js

//var types = ["Virtual Lab","Mentoring","Certificate"];

var totalBoxes = 0;
var tracker = [];
var loading = false;

var totalboxes = 0;
var counter = 0;



// ------------------------------------------ Untilities - Start
// Uses colormanager.js
function generateEventColors(number){
	
	for(var i = 0; i<number; i++){
		var code = random_color('hex');
		var id = insertColor(code.substring(1), 'enabled');
		if(!id){
			i--;	
		}
	}
}

// Random color generator
// @format (hex|rgb|null) : Format to return, default is integer
function random_color(format)
{
 var rint = Math.round(0xffffff * Math.random());
 switch(format)
 {
  case 'hex':
   return ('#0' + rint.toString(16)).replace(/^#0([0-9a-f]{6})jQuery/i, '#jQuery1');
  break;
  
  case 'rgb':
   return 'rgb(' + (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255) + ')';
  break;
  
  default:
   return rint;
  break;
 }
}


// ------------------------------------------ Untilities - End

function checkArrayOfBoxes(column, name, len){
	var cnt = 0;

	if(column){
		jQuery("."+name).each(function(){
			if(this.checked){cnt++;}
			
		});
	
	}else{		// Row
		for(var i = 0; i<len; i++){
			jQuery("#fltcourse-"+i).each(function(){
				if(this.checked){cnt++;}
			});
		}
	}
	return cnt;
}
// cols: num of type columns, t: set for all types, c: set for total courses checked.
function setupTracker(cols, c, t){
	tracker[0] = c;
	for(var i=1; i<=cols; i++){
		tracker[i] = t;
	}
}
function getTotalChecked(){
	var total=0;
	for(var i=0; i<tracker.length; i++){
		total = total + tracker[i];
	}
	return total;
}

function constructOptionTable(courses, types){
	
	debugging("constructOptionTable: start");
	//alert('constructOptionTable -> courses: '+courses.length+' types:'+types.length);
	var table = "";
	var customLabel;
	if(is_admin_user){
		customLabel = "HOSTS";
	}else{
		customLabel = "COURSES";
	}
	
	table += '<form id="form-options">';
	table += '<table style="border:2px solid #444;border-collapse:collapse;" cellpadding="5" cellspacing="5" border="1"id="table-options"><thead>';
	table += '<tr>';
	table += '<th><input type="checkbox" class="checkbox" value="'+ courses.length +'" name="courses" id="courses" />'+customLabel+'</th>';
	
	for(var i = 0; i<types.length; i++){
		var type = (jQuery.trim(types[i])).replace(/ /g,"-").toLowerCase();	// Fixes any issues with type name with spaces.
		
		table += '<th colspan="3"><input class="types checkbox" type="checkbox" value="' + courses.length + '" name="' + type + '" id="' + type + '" />' + types[i] + '</th>';
	}
	table += '</tr></thead><tbody>';
	for(var j = 0; j<courses.length; j++){
		var course = (jQuery.trim(courses[j])).replace(/ /g,"-").toLowerCase();	// Fixes any issues with type name with spaces.
		table += '<tr>';
		table += '<td><input class="course-item '+ course.replace(/\./g,"") +' checkbox" type="checkbox" value="' + types.length + '" name="fltcourse-'+j+'" id="fltcourse-'+j+'" />' + courses[j] + '</td>'; // Name Displayed
		
		
		for(var i = 0; i<types.length; i++){ 
		    
			var type = (jQuery.trim(types[i])).replace(/ /g,"-").toLowerCase();	// Fixes any issues with type name with spaces.
			//var className = course + "-" + type;
			var className = type + "-" + course;
			var courseId = course + "-" + type;
			
			className = className.replace(/\./g,"");
			courseId = courseId.replace(/\./g,"");
			
			//table += '<td class="div'+ types[i].replace(/ /g, "-").toLowerCase() +'-'+ course.toLowerCase() +'"><input class="' + types[i] + '" type="checkbox" value="' + course + '-' + types[i] + '" name="' + course + '" id="' + course + '-' + type  + '" /></td>';
			table += '<td width="25px"><input class="' + type + ' checkbox" type="checkbox" value="' + courseId + '" name="' +  course.replace(/\./g,"") + '" id="' + courseId  + '" /></td>';
			table += '<td class="div'+ className +'"><span style="color: #FFFFFF; font-size: 10px;">Sched</span></td>';
			table += '<td class="div'+ className +'" style="opacity:0.5; filter:alpha(opacity=50);"><span style="color: #FFFFFF; font-size: 10px;">Avail</span></td>';
		}
		table += '</tr>';
	}
	table += '</tbody></table>';
	table += '</form>';
	
	return table;
	
}

function constructMentorOptionTable(courses, types){
	//alert('courses: '+courses.length+' types:'+types.length);
	var table = "";
	var customLabel = "COURSES";
	
	
	table += '<form id="form-options">';
	table += '<table style="border:2px solid #444;border-collapse:collapse;" cellpadding="5" cellspacing="5" border="1"id="table-options"><thead>';
	table += '<tr>';
	table += '<th><input type="checkbox" value="'+ courses.length +'" name="courses" id="courses" />'+customLabel+'</th>';
	
	for(var i = 0; i<types.length; i++){
		
		var type = (jQuery.trim(types[i])).replace(/ /g,"-").toLowerCase();	// Fixes any issues with type name with spaces.
		
		table += '<th colspan="2"><input class="types" type="checkbox" value="' + courses.length + '" name="' + type + '" id="' + type + '" />' + types[i] + '</th>';
	}
	table += '</tr></thead><tbody>';
	for(var j = 0; j<courses.length; j++){
		var course = (jQuery.trim(courses[j])).replace(/ /g,"-").toLowerCase();	// Fixes any issues with type name with spaces.
		table += '<tr>';
		table += '<td><input class="course-item '+ course.replace(/\./g,"") +'" type="checkbox" value="' + types.length + '" name="fltcourse-'+j+'" id="fltcourse-'+j+'" />' + courses[j] + '</td>'; // Name Displayed
		
		
		for(var i = 0; i<types.length; i++){ 
		    
			var type = (jQuery.trim(types[i])).replace(/ /g,"-").toLowerCase();	// Fixes any issues with type name with spaces.
			//var className = course + "-" + type;
			var className = type + "-" + course;
			var courseId = course + "-" + type;
			
			className = className.replace(/\./g,"");
			courseId = courseId.replace(/\./g,"");
			
			//table += '<td class="div'+ types[i].replace(/ /g, "-").toLowerCase() +'-'+ course.toLowerCase() +'"><input class="' + types[i] + '" type="checkbox" value="' + course + '-' + types[i] + '" name="' + course + '" id="' + course + '-' + type  + '" /></td>';
			table += '<td width="25px"><input class="' + type + '" type="checkbox" value="' + courseId + '" name="' +  course.replace(/\./g,"") + '" id="' + courseId  + '" /></td>';
			
			if(j < 1){
				table += '<td class="div'+ className +'" style="opacity:0.5; filter:alpha(opacity=50);"><span style="color: #FFFFFF; font-size: 10px;">Avail</span></td>';
			}else{
				table += '<td class="div'+ className +'"><span style="color: #FFFFFF; font-size: 10px;">Sched</span></td>';
			}
		}
		table += '</tr>';
	}
	table += '</tbody></table>';
	table += '</form>';
	
	return table;
	
}

/*
* selectAllRows.js - http://beckelman.net
*
* Copyright (c) 2008 Bill Beckelman
* Dual licensed under the MIT (MIT-LICENSE.txt)
* and GPL (GPL-LICENSE.txt) licenses.
*
* 2008-11-18
* Version .01
*/


(function(jQuery) {

    jQuery.fn.selectAllRows = function(callerSettings) {
        var settings;
        var headerCheckbox;
        var columnCheckboxes;

        settings = jQuery.extend({
            column: 'first',
            selectTip: 'Click to Select All',
            unselectTip: 'Click to Un-Select All'            
        }, callerSettings || {});

        if (isNaN(settings.column)) {
            headerCheckbox = jQuery("thead tr th:" + settings.column + "-child input:checkbox", this);
            columnCheckboxes = jQuery("tbody tr td:" + settings.column + "-child input:checkbox", this);
        }
        else {
            headerCheckbox = jQuery("thead tr th:nth-child(" + settings.column + ") input:checkbox", this);
			
			// add a fix for the multiple tds in each rox/col
			if(settings.column > 2){
				var mlt = settings.column - 2;
				var newCol = settings.column + (mlt * 2);
				columnCheckboxes = jQuery("tbody tr td:nth-child(" + newCol + ") input:checkbox", this);
			}else{
				 columnCheckboxes = jQuery("tbody tr td:nth-child(" + settings.column + ") input:checkbox", this);
			}
        }

        headerCheckbox.attr("title", settings.selectTip);

        headerCheckbox.click(function() {
		
            var checkedStatus = this.checked;

            columnCheckboxes.each(function() {
                this.checked = checkedStatus;
            });

            if (checkedStatus == true) {
                jQuery(this).attr("title", settings.unselectTip);
            }
            else {
                jQuery(this).attr("title", settings.selectTip);
            }
			
			//alert("CB Debug: 3");
			checkboxClick();
        });

        return jQuery(this);
    };
})(jQuery);


function setAppointmentCSS(username){
	
	//alert("setAppointmentCSS");
	
	var css ="";
	var i =0;
	
	
	// checks of color manager installed, and applies corrections|checks
	checkAvailableColors();
	if(availColors > 0){
		if(availColors < (courses.length * types.length)){
			var leftover = (courses.length * types.length) - availColors;
			generateEventColors(leftover);
			document.getElementById("colorList").value = getAvailColors();	// set new colorList values
			getColors();
		}
		if(schedColors.length > 0){
			eventsColors = schedColors;
		}
	}
	
	//alert("debug: 1");
	
	// Google Calendar Colors
	css += ".gcal-event a, .gcal-event .actions {background-color: #FFFFCC; color:#000000; border: 1px solid; border-color:#000000;} \n";
	// External Droable Objects
	//css += '#sidePanel { float: left; width: 150px; padding: 0 10px; border: 1px solid #ccc; background: #eee; text-align: left; }';
	for(var c =0; c < courses.length; c++){
		for(var t =0; t < types.length; t++){		
				
			var eventColor = eventsColors[i++];
			
			var courseName = (jQuery.trim(courses[c])).replace(/ /g,"-").toLowerCase();
			var type = (jQuery.trim(types[t])).replace(/ /g,"-").toLowerCase();
			
			var className = "div" + type + "-" + courseName;
			courseName = courseName.replace(/\./g,"");
			
			var divclass = ".div"+(jQuery.trim(types[t])).replace(/ /g,"-").toLowerCase()+"-"+courseName;
			
			css += ""+divclass+" a {background-color: #"+eventColor+"; color:#FFFFFF}\n";
			css += ".fc-agenda "+divclass+" .fc-event-time {border-color: #"+eventColor+"; background-color: #"+eventColor+";}\n";
			css += ".fc-agenda "+divclass+" .fc-event-actions {border-color: #"+eventColor+"; background-color: #"+eventColor+";}\n";
			css += "td"+divclass+" {border-color: #"+eventColor+"; background-color: #"+eventColor+";}\n";
			
			/*
			jQuery(divclass + " a").css('background-color', '#'+eventColor);
			jQuery(divclass + " a").css('color', '#FFFFFF');
			
											
			jQuery(divclass+" .fc-event-time").css('border-color','#'+eventColor);
			jQuery(divclass+" .fc-event-time").css('background-color','#'+eventColor);
			
			jQuery(divclass+" .fc-event-actions").css('border-color','#'+eventColor);
			jQuery(divclass+" .fc-event-actions").css('background-color','#'+eventColor);
			
			jQuery("td"+divclass).css('border-color','#'+eventColor);
			jQuery("td"+divclass).css('background-color','#'+eventColor);
			*/
		}
			
	}
	
	//alert("debug: 2");
	
	//alert("IE Test: \n"+ css); 
	/*
	css += "div .available {opacity:0.4; filter:alpha(opacity=40); color: #333333;}\n";
	css += "div .available-accordion h3 a {opacity:0.4; filter:alpha(opacity=40);}\n";
	css += "div .scheduled-accordion h3 a {opacity:0.9; filter:alpha(opacity=90);}\n";
	
	css += "div .available-accordion h3 a:visited {color:#ffffff;}\n";
	css += "div .available-accordion h3 a:hover {font-weight:bold;}\n";
	
	css += "div .scheduled-accordion h3 a:visited {color:#ffffff;}\n";
	css += "div .scheduled-accordion h3 a:hover {font-weight:bold;}\n";
	//css += ".context-label { text-transform: capitalize; color:#FF0000;}";
	//css += ".selectedEvent {border-color: #000000}\n";
	
	*/
	if (jQuery.browser.msie) {
		//alert("HERE");
		//var filtersDiv = jQuery('#dynamic_css');
		//filtersDiv.append(css);
		/*
		//alert("1 IE:"+jQuery.browser.msie);
		var dynamic = document.getElementById("dynamic_css");
		var ss1 = document.createElement('style');
		//var styles = 'p {color: blue;}';
		ss1.setAttribute("type", "text/css");
		ss1.styleSheet.cssText = css;
		dynamic = ss1;
		*/
		
		document.getElementById('dynamic_css').removeNode(true);
		
		/*
		var element = document.getElementById('dynamic_css');
		alert("sheetToBeRemoved:"+element);
		if(sheetToBeRemoved){
			document.body.removeChild(element);
		}
		*/
		
		var ss1 = document.createElement('style');
		//var styles = 'p {color: blue;}';
		ss1.setAttribute("type", "text/css");
		ss1.setAttribute("id", "dynamic_css");
		ss1.styleSheet.cssText = css;
		document.body.appendChild(ss1);
		
		
		
		//alert("IE");
		//alert("IE Test: CSS \n"+ss1.styleSheet.cssText);
		
		//document.getElementById('debug2').innerHTML = ss1.styleSheet.cssText;
	}else{
		jQuery("#dynamic_css").html(css);
		//alert("WORLD");
	}
	
	
	 
	 //jQuery("#dynamic_css").html(css);
	//alert(css);
			
}

function getResourcesAvailable(username){
/*	
	types = ['Mentoring','Certificate','Virtual Labs'];
	getHostsCourses();	
	getCalendarCSS(username);	
	setupFilterOptions();	
*/
	debugging("getResourcesAvailable: start");
	
	//debugging("getResourcesAvailable: ajax called 'getUserResourceTypes'");

	jQuery.ajax({
		type: 'POST',
		url: 'modules/module_scheduler/fullcalendar/calendar.php',
		dataType: 'xml',
		async: false,
		data: {

			action:'getUserResourceTypes',
			requestingUser:  jQuery('#username').val(),
			username:username

		},

		success: function(data) {
			
			debugging("getResourcesAvailable: success 'getUserResourceTypes'");
			//debugging("getResourcesAvailable: parse Resources - start");
			
			types = [];
		
			if(data){
				//getHostsCourses();
				jQuery(data).find('resources').each(function() {
				
					var nodes  = this.getElementsByTagName('node');
					if(nodes.length >0){
						if(nodes.length!=0)
						{
							for(var n =0; n<nodes.length; n++)
							{
								types.push(nodes[n].childNodes[0].nodeValue);
							}
						}
					}else{
						var resources  = this.getElementsByTagName('resource');
					
						if(resources.length!=0)
						{
							for(var n =0; n<resources.length; n++)
							{
								types.push(resources[n].childNodes[0].nodeValue);
							}
						}
					}
			   });
			
			
				setupFilterOptions();	// sets up the checkboxes and click events 
			}
			
			//alert("TEst");
			//getCalendarCSS(username);	
			//setupFilterOptions();	// sets up the checkboxes and click events 
	
			//debugging("getResourcesAvailable: parse Resources - end");
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			var header = "Loading Event Resources";
			var message = "An unexpected error has occurred.<br/><br/> **please try again later.";
			var icon = "alert";
			
			noticeDialog(header, message, icon);
			
			

		}
			
	
	});

	debugging("getResourcesAvailable: end");
}
 
function setupFilterOptions(){
	debugging("setupFilterOptions: start");
	
	totalBoxes = ((1+types.length)*(1+courses.length));
	setupTracker(types.length,0,0);
	counter = 0;
	//alert(totalBoxes);
	
	
	jQuery("#filterOptions_TopResources").click(function () {
	 // jQuery("#options_pane").slideToggle("slow");
	 jQuery("#form-options").slideToggle("slow");
	});
	
	
	if (jQuery.browser.msie) {
		var divOptions = jQuery('#options_pane');
		divOptions.empty();
		
		if(is_mentor_user){
			divOptions.append(constructMentorOptionTable(courses, types));
		}else{
			divOptions.append(constructOptionTable(courses, types));
		}	
		//alert("append");
		
	}else{
		if(is_mentor_user){
			jQuery("#options_pane").html(constructMentorOptionTable(courses, types));
		}else{
			jQuery("#options_pane").html(constructOptionTable(courses, types));
		}	
	}
	
	
	var rows = courses.length;
	var cols = types.length;
	var index = "";
	//alert(rows);
	//Set all Row select.
	for(var i = 1; i<=types.length; i++){
		var col = i+1;
		jQuery("#table-options").selectAllRows({ column: col });
	}
	
	for(var j = 0; j<courses.length; j++){
		
		jQuery("#fltcourse-"+j).click(function() { 
	
			for(var j = 0; j<courses.length; j++){
				if(this.id == "fltcourse-"+j){
				
					var checked_status = this.checked;
					var course = (courses[j]).replace(/ /g,"-").toLowerCase();	// Fixes any issues with type name with spaces.		
					course = course.replace(/\./g,"");
					
					//alert(course);
					
					///------------------------------------------------------ HERE - find a way to optimize
					jQuery("input[name^='"+course+"']").each(function() { 
						this.checked = checked_status; 
						checkBoxStatus(this);				// ---- Commented
					});
				}
			}
			
			var colHeader = jQuery("#courses");
			//var total = jQuery(colHeader).val();
			var total = totalBoxes;
			var checked = 0;
			jQuery(".course-item").each(function() { 
				checked = (this.checked) ? checked + 1: checked;
			});
	
			if(checked == total){	//solid checkbox (row)
				jQuery(colHeader).each(function(){
					jQuery(this).removeClass("mixed-state");
					this.checked = true;
				});
				
			}else if(checked == 0){	// not checked
				jQuery(colHeader).each(function(){
					jQuery(this).removeClass("mixed-state");
					this.checked = false;
				});
			}else{
				jQuery(colHeader).each(function(){
					//alert('addClass: 3');
					jQuery(this).addClass("mixed-state");
					this.checked = true;
				});
			}
			
			//checkboxClick();
			
		});
		
	}
	
	
	// manages the state of the mixed checkboxes
	jQuery("#form-options input:checkbox").click(function(){
		//showProgressBar(true);
		
		if(this.id == 'courses'){
		
			jQuery("#form-options input:checkbox").each(function(){
				var checked_status = jQuery("#courses").attr("checked");
				
				this.checked = checked_status;
				if(!checked_status){
					jQuery(this).removeClass("mixed-state");
					//jQuery("#courses").val(0);
				}
			});
			//alert("CB Debug: 4");	
			checkboxClick();	// occurs only when the all courses checkbox is clicked
			
		}else if(jQuery(this).hasClass("types")){
			//alert("header");
			var cbClass = "."+this.id;
			jQuery(cbClass).each(function(){
				checkBoxStatus(this);								
			});
			
		}else{
			//checkboxClick();
			/*
			if(jQuery(this).hasClass("course-item")){
				
				for(var j = 0; j<courses.length; j++){
					var course = (courses[j]).replace(/ /g,"-").toLowerCase();// Fixes any issues with type name with spaces.
					if(this.id == "fltcourse-"+j){
						jQuery("input[name^='"+course+"']").each(function() { 
							checkBoxStatus(this);
						});
					}
				}
			}else if(jQuery(this).hasClass("types")){
				jQuery(this).removeClass("mixed-state");
				checkBoxStatus(this);
				
			}else{
				checkBoxStatus(this);
			}
			*/
			
			//if(!(jQuery(this).hasClass("course-item")) && !(jQuery(this).hasClass("types"))){
				checkBoxStatus(this);
				
				//alert("CB Debug: 5");
				checkboxClick();
			//}
			
			
		}
		
		//alert("counter: "+counter+"totalboxes: "+totalboxes);
		
		if(this.id != 'courses'){
			if(counter == totalboxes){							
				jQuery(".types").removeClass("mixed-state");
				jQuery("#courses").removeClass("mixed-state");
				jQuery("#courses").attr("checked",true);
			}else if(counter == 0){	// not checked
				jQuery(".types").removeClass("mixed-state");
				jQuery("#courses").removeClass("mixed-state");
				jQuery("#courses").attr("checked",false);
			}else{
				jQuery("#courses").addClass("mixed-state");
				jQuery("#courses").attr("checked",true);
			}
		}
		
		//showProgressBar(false);
	});
	/*
	if(isJookie){
		resetCheckboxFilters(Jookiefilter);	
		isJookie=false;
		jQuery.each( jQuery("#form-options input:checkbox") , function () { 
			jQuery(this).removeClass("mixed-state");
			checkBoxStatus(this);
		});				
	}
	*/
	
}

function checkBoxStatus(cb){
	//alert(cb.id);
	totalboxes = types.length * courses.length;
	counter = 0;
	var colHeader = jQuery("#courses");
	
	jQuery(colHeader).val(totalboxes); 
	for(var i = 0; i<types.length; i++){
	
		var type = jQuery.trim(types[i]);
		type = (type).replace(/ /g,"-").toLowerCase();	// Fixes any issues with type name with spaces.
		type = type.replace(/\./g,"");
		
		if(jQuery(cb).hasClass(type)){
			
			var colHeader = jQuery("#"+type);
			var total = jQuery(colHeader).val();
			//var total = totalboxes;
			var checked = 0;
			jQuery("input[class^='"+type+"']").each(function() { 
				checked = (this.checked) ? checked + 1: checked;
				//alert('type: '+type+', checked: '+checked);
			});
		
			
			//alert('type: '+type+', checked: '+checked+', total: '+total);
			if(checked == total){	//solid checkbox (column)
				jQuery(colHeader).each(function(){
					jQuery(this).removeClass("mixed-state");
					this.checked = true;
				});
				
			}else if(checked == 0){	// not checked
				jQuery(colHeader).each(function(){
					jQuery(this).removeClass("mixed-state");
					this.checked = false;
				});
			}else{
				jQuery(colHeader).each(function(){
					//alert('addClass: 1');
					jQuery(this).addClass("mixed-state");
					this.checked = true;
				});
			}
			//alert("here");
			jQuery("."+cb.name).each(function(){
	
				var rowHeader = jQuery("#"+this.id);
				var total = jQuery(rowHeader).val();
				var checked = 0;
				
				jQuery("input[name^='"+cb.name+"']").each(function() { 
					checked = (this.checked) ? checked + 1: checked;
				});
				
				if(checked == total){	//solid checkbox (row)
					jQuery(rowHeader).each(function(){
						jQuery(this).removeClass("mixed-state");
						this.checked = true;
					});
					
				}else if(checked == 0){	// not checked
					jQuery(rowHeader).each(function(){
						jQuery(this).removeClass("mixed-state");
						this.checked = false;
					});
				}else{
					jQuery(rowHeader).each(function(){
						//alert('addClass: 2');  
						jQuery(this).addClass("mixed-state");
						this.checked = true;
					});
				}
			
			});

		}
		//counter = counter+checked;
		
		jQuery("input[class^='"+type+"']").each(function() { 
			counter = (this.checked) ? counter + 1: counter;
		});
		
	}
	
				 
	
	
/*	for(var j = 0; j<courses.length; j++){
		var course = (jQuery.trim(courses[j])).replace(/ /g,"-").toLowerCase();	// Fixes any issues with type name with spaces.
		course = course.replace(/\./g,"");
		
		//if(cb.name == course){
			var rowHeader = jQuery("#fltcourse-"+j);
			var total = jQuery(rowHeader).val();
			var checked = 0;
			jQuery("input[name^='"+course+"']").each(function() { 
				checked = (this.checked) ? checked + 1: checked;
			});
			alert("checked:"+checked + " total:"+total);
			if(checked == total){	//solid checkbox (row)
				jQuery(rowHeader).each(function(){
					jQuery(this).removeClass("mixed-state");
					this.checked = true;
				});
				
			}else if(checked == 0){	// not checked
				jQuery(rowHeader).each(function(){
					jQuery(this).removeClass("mixed-state");
					this.checked = false;
				});
			}else{
				jQuery(rowHeader).each(function(){
					//alert('addClass: 2');  
					jQuery(this).addClass("mixed-state");
					this.checked = true;
				});
			}
		//}
	}
	
	*/

}