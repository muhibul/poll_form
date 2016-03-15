row_seq = 0;
item_seq = 0;

$( document ).ready(function() {
    
    function add_row(row_seq) {
      field_set = '<div class-"set" id="set_'+row_seq+'">'
         +'  <p>Question:'
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
      add_row(row_seq);
      row_seq++;
    });
});

function generate_input(row_seq) {
  var selected_input_type = $('#input_type_selector_'+row_seq).val();
  if(selected_input_type == 'select' || selected_input_type == 'checkbox' || selected_input_type == 'option'){
    show_dropdown_value(row_seq, item_seq, selected_input_type);
  }else if(selected_input_type == 'text'){
    create_text_answer(row_seq);
  }else if(selected_input_type == 'textarea'){
    create_textarea_answer(row_seq);
  }
}

//for ddl, checkbox, radio option
function show_dropdown_value(row_seq, item_seq, selected_input_type){
  var items_wrapper = items_holder(row_seq, item_seq, selected_input_type);
  $('#answer_wrapper_'+row_seq).html(items_wrapper);
}

function items_holder(index, item_seq, input_type) {
  var items_wrapper = $('<div></div>').attr({
    type: 'text',
    id: 'ddl_value_wrapper_'+index,
    name: 'ddl_value_wrapper_['+index+']'
  });
  var hidden_input_type = $('<input>').attr({
    type: 'hidden',
    id: 'answer_'+index+'_type',
    name: 'answer['+index+'][type]',
    value: input_type
  }).appendTo(items_wrapper);
  
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
  var id = 'answer_'+index+'_item_'+item_seq;
  var item_label = $('<p></p>').html('Value: ');
  var item = $('<input>').attr({
    type: 'text',
    id: id,
    name: 'answer['+index+'][item]['+item_seq+']',
  }).appendTo(item_label);

  return item_label;
}

//for text
function create_text_answer(row_seq){
  var p = $('<p>Answer: </p>');
  var hidden_input_type = $('<input>').attr({
    type: 'hidden',
    id: 'answer_'+row_seq+'_type',
    name: 'answer['+row_seq+'][type]',
    value: 'text'
  }).appendTo(p);
  var input = $('<input>').attr({
    type: 'text',
    id: 'answer_'+row_seq+'_item_0',
    name: 'answer['+row_seq+'][item][0]',
    value: ''
  }).appendTo(p);

  $('#answer_wrapper_'+row_seq).html(p);
}

//for textarea
function create_textarea_answer(row_seq){
  var p = $('<p>Answer: </p>');
  var hidden_input_type = $('<input>').attr({
    type: 'hidden',
    id: 'answer_'+row_seq+'_type',
    name: 'answer['+row_seq+'][type]',
    value: 'textarea'
  }).appendTo(p);
  var input = $('<textarea></textarea>').attr({
    type: 'text',
    id: 'answer_'+row_seq+'_item_0',
    name: 'answer['+row_seq+'][item][0]',
    rows: 4,
    cols: 50,
    value: ''
  }).appendTo(p);

  $('#answer_wrapper_'+row_seq).html(p);
}
