

function hideWebControlProperties() {
    node = document.getElementById('add-as-webcontrol_dialog');
    node.style.display = "none";
}

function showWebControlProperties() {
    node = document.getElementById('add-as-webcontrol_dialog');
    node.style.display = "block";
}

function showPropertiesOnControlPress(){
    doc = editor.getDoc();

    editor.setOption("extraKeys", {
      'Ctrl-Space': function(cm) {
            VARIABLE_DECORATOR_SEP = '#@ui_control--->:'
            PROPERTYNAME_PROPERTYVALUE_SEP = ','
            PARAM_ARG_SEP = '='
            pos = doc.getCursor();
            line_text = doc.getLine(pos.line);

            webcontrol_save = document.getElementById('webcontrol-save').onclick = function save() {

                hideWebControlProperties();

                // TODO: drussell1974 - Append properties as comment e.g. #@ui_control--->:control_type=text,label_text=Name:
                // or append variable to function decorator that will be called at run time to get request.vars

                // TODO: always hide comment in editor

                cm.openNotification('<div class="notify success-notify">web form updated</div>', {bottom: false});
            }

            webcontrol_cancel = document.getElementById('webcontrol-cancel').onclick = function cancel() {

                hideWebControlProperties();

                cm.openNotification('<div class="notify warning-notify">cancelled</div>', {bottom: false});
            }



            // drussell1974 - ensure line is not in a comment (',#,""")... or in a string (', ")

            if (/"""/.test(line_text) === false && /^#/.test(line_text) === false && /^'/.test(line_text) === false) {

                vble = line_text.split('=');

                if( vble.length > 1) {

                    // get variable naem from line text

                    variable_name = vble[0].trim()

                    showWebControlProperties();

                    // set title

                    control_type = document.getElementById('webcontrol-dialog_title');
                    control_type.innerText = "Properties for " + variable_name + ":"

                    // get the parameters from the decorator section of the

                    decorator = line_text.split(VARIABLE_DECORATOR_SEP);

                    if (decorator.length > 1) {

                        // get the property-name and property-value

                        param_args = decorator[1].split(PROPERTYNAME_PROPERTYVALUE_SEP);

                        for (i = 0; i < param_args.length; i++) {

                            // get the property and value

                            prm_arg = param_args[i].split(PARAM_ARG_SEP);

                            // Set the Control Type property control value from the decorator

                            if (prm_arg.length == 2 && prm_arg[0].trim() == 'control_type') {
                                control_type = document.getElementById('webcontrol-dialog_control_type').value = prm_arg[1].trim();
                            }

                            // Set the Label Text property control value from the decorator

                            if (prm_arg.length == 2 && prm_arg[0].trim() == 'label_text') {
                                if(prm_arg[1] != null) {

                                    label_text = document.getElementById('webcontrol-dialog_label_text');
                                    console.log('Element = ' + label_text);
                                    label_text.value = prm_arg[1];
                                }
                            }
                        }
                    }
                }
            }
      }
    });
}

showPropertiesOnControlPress();
