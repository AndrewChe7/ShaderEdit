var gui = require('nw.gui');
var fs = require('fs');
var win = gui.Window.get();



function fileSaveLoad (isSaving, filePath) {
	if (isSaving) {
		fs.writeFile(filePath+'.frag', fragEditor.getValue(), function (err) {
			if (err) {
					alert(err);
					return;
			}
		});
		fs.writeFile(filePath+'.vert', vertexEditor.getValue(), function (err) {
			if (err) {
					alert(err);
					return;
			}
		});
	} else {

		fs.readFile(filePath, function read (err, data) {
  		if (err) alert(err);
  		var content = "" + data;
  		if (filePath.split('.').pop() == "frag") {
				fragEditor.setValue (content, 1);
			} else {
				vertexEditor.setValue (content, 1);
			}
		});

	}
}

function chooseFile(name) {
	var chooser = $(name);
	if (name == "#fileSaveDialog") {
		isSaving = true;
	} else {
		isSaving = false;
	}
	chooser.unbind('change');

	chooser.change(function(evt) {
		fileSaveLoad (isSaving, $(this).val());
	});

	chooser.trigger('click');
}


function file_new () {
	vertexEditor.setValue('', 1);
	fragEditor.setValue('', 1);
}

function file_save () {
	chooseFile('#fileSaveDialog');
}

function file_open () {
	chooseFile('#fileOpenDialog');

}

function file_exit () {
	gui.App.closeAllWindows();
	gui.App.quit();
}


// Menu Items

var menu = new gui.Menu({ 'type': 'menubar' });

var file = new gui.MenuItem({ label: 'File' });
var view = new gui.MenuItem({ label: 'View' });

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

var viewSubmenu = new gui.Menu();

viewSubmenu.append (new gui.MenuItem({ 
	label : 'Box',
	click : boxButtonClick
}));

viewSubmenu.append (new gui.MenuItem({ 
	label : 'Plane',
	click : planeButtonClick
}));

viewSubmenu.append (new gui.MenuItem({ 
	label : 'Sphere',
	click : sphereButtonClick
}));




file.submenu = fileSubmenu;
view.submenu = viewSubmenu;

menu.append (file);
menu.append (view);

win.menu = menu;



