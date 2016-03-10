row_seq = 0;
item_seq = 0;

$( document ).ready(function() {
    
    function add_row(row_seq) {
      field_set = '<div class-"set" id="set_'+row_seq+'">'
         +'  <p>Question:</p>'
         +'  <p>'
         +'    <input type="text" name="question['+row_seq+']" id="question_'+row_seq+'" value="">'
         +'  </p>'
         +'  <div id="input_type_wrapper_'+row_seq+'" style="display: block;">'
         +'   <label>Select Answer Type</label>'
         +'   <select id="input_type_selector_'+row_seq+'" onchange="generate_input('+row_seq+');">'
         +'     <option value=""></option>'
         +'     <option value="text">Text Field</option>'
         +'     <option value="textarea">Text Area</option>'
         +'     <option value="checkbox">Checkbox</option>'
         +'     <option value="option">Radio Buttons</option>'
         +'     <option value="select">Dropdown List</option>'
         +'     <option value="datepicker">Date</option>'
         +'    </select>'
         +'  </div>'
         +'  <div id="answer_wrapper_'+row_seq+'"></div>'
         +'</div>';
      
      //field_set.replace(/_x/g, row_seq);
      
      $('#field_set').append(field_set);
      $('#set_'+row_seq).show();
    }

    $('#add_question').click(function(){
      console.log(row_seq);
      add_row(row_seq);
      row_seq++;
    });
});


function generate_input(row_seq) {
  var selected_input_type = $('#input_type_selector_'+row_seq).val();
  if(selected_input_type == 'select' || selected_input_type == 'checkbox' || selected_input_type == 'option'){
    show_dropdown_value(row_seq, item_seq);
  }else if(selected_input_type == 'text'){
    create_text_answer(row_seq);
  }else if(selected_input_type == 'textarea'){
    create_textarea_answer(row_seq);
  }
}

//for ddl
function add_ddl_value_row(row_seq){
  ddl_item_html= '    <p class="ddl_value_template">'
                 +'      <label>Value <input type="text" id="ddl_value_'+row_seq+'"></label> <a href="javascript:void(0);" class="delete_row">Remove</a>'
                 +'    </p>';
  $('#ddl_value_set_'+row_seq).append(ddl_item_html);
  
  $('#ddl_value_set_'+row_seq+' p a.delete_row').click(function(){
    $(this).parent().remove();
  });
}
function show_dropdown_value(row_seq, item_seq){
  var items_wrapper = items_holder(row_seq, item_seq);
  $('#answer_wrapper_'+row_seq).html(items_wrapper);
}

function items_holder(index, item_seq) {
  var items_wrapper = $('<div></div>').attr({
    type: 'text',
    id: 'ddl_value_wrapper_'+index,
    name: 'ddl_value_wrapper_['+index+']'
  });
  var btn_add = $('<input>').attr({
    type: 'button',
    id: 'add_item_'+index,
    name: 'add_item['+index+']',
    value: 'Add Item',
  }).appendTo(items_wrapper);

  $(btn_add).click(function(){
    var item = create_item(index, item_seq);
    $(item).appendTo(items_wrapper);
    item_seq++;
  });

  return items_wrapper;
}

function create_item(index, item_seq) {
  var id = 'answer_'+index+'_'+item_seq;
  var item_label = $('<label></label>').html('Value: ');
  var item = $('<input>').attr({
    type: 'text',
    id: id,
    name: 'answer['+index+']['+item_seq+']',
  }).appendTo(item_label);

  return item_label;
}

//for radio option
function add_option_value_row(row_seq){
  radio_item_html='    <p class="option_value_template">'
                 +'      <label>Value <input type="text" id="option_value_'+row_seq+'"></label> <a href="javascript:void(0);" class="delete_row">Remove</a>'
                 +'    </p>';
  $('#option_value_set_'+row_seq).append(radio_item_html);

  $('#option_value_set_'+row_seq+' p a.delete_row').click(function(){
    $(this).parent().remove();
  });
}
function show_option_value(row_seq){
  $('#option_value_wrapper_'+row_seq).show();
}

//for checkbox
function add_checkbox_value_row(row_seq){
  checkbox_item_html='    <p class="checkbox_value_template">'
                   +'      <label>Value <input type="text" id="checkbox_value_'+row_seq+'"></label> <a href="javascript:void(0);" class="delete_row">Remove</a>'
                   +'    </p>';
  $('#checkbox_value_set_'+row_seq).append(checkbox_item_html);

  $('#checkbox_value_set_'+row_seq+' p a.delete_row').click(function(){
    $(this).parent().remove();
  });
}
function show_checkbox_value(row_seq){
  $('#checkbox_value_wrapper_'+row_seq).show();
}

//for text
function create_text_answer(row_seq){
  var input = $('<input>').attr({
    type: 'text',
    id: 'answer_'+row_seq,
    name: 'answer['+row_seq+']',
    value: ''
  });
  $('#answer_wrapper_'+row_seq).html(input);
}

//for textarea
function create_textarea_answer(row_seq){
  var input = $('<textarea></textarea>').attr({
    type: 'text',
    id: 'answer_'+row_seq,
    name: 'answer['+row_seq+']',
    rows: 4,
    cols: 50,
    value: ''
  });
  $('#answer_wrapper_'+row_seq).html(input);
}
