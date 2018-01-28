var gui = require("nw.gui");
var win = gui.Window.get();





function file_new () {
	vertexEditor.setValue("", 1);
	fragEditor.setValue("", 1);
}

//TODO : save and load dialogs
function file_save () {


}

function file_open () {

}

function file_exit () {
	gui.App.closeAllWindows();
	gui.App.quit();
}


// Menu Items

var menu = new gui.Menu({ 'type': 'menubar' });

var file = new gui.MenuItem({ label: 'File' });

var fileSubmenu = new gui.Menu();


fileSubmenu.append (new gui.MenuItem({ 
	label : 'New',
	click : file_new
}));

fileSubmenu.append (new gui.MenuItem({ 
	label : 'Save',
	click : file_save
}));

fileSubmenu.append (new gui.MenuItem({ 
	label : 'Open',
	click : file_open
}));

fileSubmenu.append (new gui.MenuItem({ 
	label : 'Exit',
	click : file_exit
}));

file.submenu = fileSubmenu;


menu.append (file);


win.menu = menu;



