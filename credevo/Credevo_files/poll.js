row_seq = 0;
item_seq = 0;

$( document ).ready(function() {
    
    function add_row(row_seq) {
      field_set = '<div class="q_seq">'
		     +'<div class="col-lg-12">'
		     +'	 <div class="form-group" id="set_'+row_seq+'">'
         +'    <h2 class="text-center">Question '+(row_seq+1)+'</h2>'
         +'    <input type="text" class="form-control required text-center" placeholder="Enter your question here" name="question['+row_seq+']" id="question_'+row_seq+'" value="">'
         +'    <a href="javascript:void(0);" onclick="remove_question(this);">[Remove this Question]</a>'
		     +'  </div>'
		     +'  </div>'
		     +'  <div class="col-lg-12">'
		     +'  <div class="form-group text-center" id="input_type_wrapper_'+row_seq+'" style="display: block;">'
         +'   <label>Select Answer Type</label>'
         +'   <p class="text-center">Do you like investigator to answer this question with<br/>text, detailed text, multiple choice, select an option, radio buttons(yes/no type) or a date?</p>'
		     +'		<div class="col-lg-4 col-lg-offset-4">'
         +'      <select class="form-control required" id="input_type_selector_'+row_seq+'" onchange="generate_input('+row_seq+');">'
         +'        <option value=""></option>'
         +'        <option value="text">Text</option>'
         +'        <option value="textarea">Detailed Text</option>'
         +'        <option value="checkbox">Multiple Choice</option>'
         +'        <option value="option">Radio Buttons</option>'
         +'        <option value="select">Select An Option</option>'
         +'        <option value="datepicker">Date</option>'
         +'      </select>'
         +'    </div>'
         +'  </div>'
         +'  </div>'
         +'  <div class="col-lg-12">'
		     +'    <div class="form-group" id="answer_wrapper_'+row_seq+'"></div>'
		     +'	   <div class="hr-line-dashed"></div>'
         +'	 </div>'
		     +'	</div>';
      
      //field_set.replace(/_x/g, row_seq);
      
      $('#field_set').append(field_set);
      $('#set_'+row_seq).show();
    }

    $('#add_question').click(function(){
      add_row(row_seq);

      //var elem_class = $(elem).parent().parent().parent().attr('class');console.log(elem_class);
      reset_question_title_seq();

      row_seq++;
    });
});

function generate_input(row_seq) {
  var selected_input_type = $('#input_type_selector_'+row_seq).val();
  if(selected_input_type == 'select'){
    show_dropdown_value(row_seq, item_seq, selected_input_type, 'An option will be selected as answer');
  }else if(selected_input_type == 'checkbox'){
	show_dropdown_value(row_seq, item_seq, selected_input_type, 'One or more choices will be provided as answer');  
  }else if(selected_input_type == 'option'){
	show_dropdown_value(row_seq, item_seq, selected_input_type, 'One choice will be clicked as answer');  
  }else if(selected_input_type == 'text'){
    create_text_answer(row_seq);
  }else if(selected_input_type == 'textarea'){
    create_textarea_answer(row_seq);
  }
}

//for ddl, checkbox, radio option
function show_dropdown_value(row_seq, item_seq, selected_input_type, msg){
  var items_wrapper = items_holder(row_seq, item_seq, selected_input_type, msg);
  $('#answer_wrapper_'+row_seq).html(items_wrapper);
}

function items_holder(index, item_seq, input_type, msg) {
  var items_wrapper = $('<div></div>')
  .addClass("row")
  .attr({
    type: 'text',
    id: 'ddl_value_wrapper_'+index,
    name: 'ddl_value_wrapper_['+index+']'
  });
   var p_label = $('<div></div>')
  .addClass("col-lg-12 text-center")
  .html('<label>'+msg+'</label>')
  .appendTo(items_wrapper);
  var hidden_input_type = $('<input>').attr({
    type: 'hidden',
    id: 'answer_'+index+'_type',
    name: 'answer['+index+'][type]',
    value: input_type
  }).appendTo(items_wrapper);
  
  var btn_div = $('<div></div>')
  .addClass("col-lg-3")
  .appendTo(items_wrapper);

  var btn_add = $('<input>')
  .addClass("btn btn-primary")
  .attr({
    type: 'button',
    id: 'add_item_'+index,
    name: 'add_item['+index+']',
    value: 'Add Options',
  }).appendTo(btn_div);

  var item_div = $('<div></div>')
  .addClass("col-lg-8")
  .appendTo(items_wrapper);

  $(btn_add).click(function(){
    var item = create_item(index, item_seq);
    $(item).appendTo(item_div);
    reset_item_title_seq('opt_elem_'+index);
    item_seq++;
  });

  return items_wrapper;
}

function create_item(index, item_seq) {
  var id = 'answer_'+index+'_item_'+item_seq;
  var item_label = $('<div class="opt_elem_'+index+'"></div>').html('<label></label>');
  var item = $('<input>')
  .addClass("form-control")
  .attr({
    type: 'text',
    id: id,
    name: 'answer['+index+'][item]['+item_seq+']',
  }).appendTo(item_label);

  //reset_item_title_seq('opt_elem_'+index);
	
	var close = $('<a>[x]</a>').attr({
		href: 'javascript:void(0)',
	}).appendTo(item_label);

	$(close).click(function(opt_elem){
		if (confirm('Delete item?')){
			$(this).parent().remove();

      reset_item_title_seq('opt_elem_'+index);
		}
	});
  
  return item_label;
}

//for text
function create_text_answer(row_seq){
  var p = $('<div></div>')
  .addClass("row");
  
  var p_label = $('<div></div>')
  .addClass("col-lg-12 text-center")
  .html('<label>A short text will be provided as an answer</label>')
  .appendTo(p);
  
  var p_hidden = $('<div></div>')
  .addClass("col-lg-3 hidden")
  .appendTo(p);
  
  var hidden_input_type = $('<input>').attr({
    type: 'hidden',
    id: 'answer_'+row_seq+'_type',
    name: 'answer['+row_seq+'][type]',
    value: 'text'
  }).appendTo(p_hidden);
  
  var p_input = $('<div></div>')
  .addClass("col-lg-8 col-lg-offset-2")
  .appendTo(p);
  
  var input = $('<input>')
  .addClass("form-control")
  .attr({
    type: 'hidden',
    id: 'answer_'+row_seq+'_item_0',
    name: 'answer['+row_seq+'][item][0]',
    value: ''
  }).appendTo(p_input);

  $('#answer_wrapper_'+row_seq).html(p);
}

//for textarea
function create_textarea_answer(row_seq){
  var p = $('<div></div>')
  .addClass("row");
  
  var p_label = $('<div></div>')
  .addClass("col-lg-12 text-center")
  .html('<label>A detailed text will be provided as an answer</label>')
  .appendTo(p);
  
  var p_hidden = $('<div></div>')
  .addClass("col-lg-3 hidden")
  .appendTo(p);
  
  var hidden_input_type = $('<input>').attr({
    type: 'hidden',
    id: 'answer_'+row_seq+'_type',
    name: 'answer['+row_seq+'][type]',
    value: 'textarea'
  }).appendTo(p_hidden);
  
  var p_input = $('<div></div>')
  .addClass("col-lg-8 col-lg-offset-2 hidden")
  .appendTo(p);
  
  var input = $('<textarea></textarea>')
  .addClass("form-control")
  .attr({
    type: 'text',
    id: 'answer_'+row_seq+'_item_0',
    name: 'answer['+row_seq+'][item][0]',
    rows: 4,
    cols: 50,
    value: ''
  }).appendTo(p_input);

  $('#answer_wrapper_'+row_seq).html(p);
}

function remove_question(elem) {
  if (confirm('Delete question?')){
    $(elem).parent().parent().parent().remove();

    var elem_class = $(elem).parent().parent().parent().attr('class');console.log(elem_class);
    reset_question_title_seq(elem_class);

    //update question sequence number
    /*var i = 0;
    $('.q_seq').each(function(question){
        i++;
        $(this).children().children().children('h2').html('Question '+i);
    });*/
  }
}

//update question title sequence number
function reset_question_title_seq() {
  var i = 0;
  $('.q_seq').each(function(){
      i++;
      $(this).children().children().children('h2').html('Question '+i);
  });
}

//update item title sequence number
function reset_item_title_seq(elem_class) {
  var i = 0;
  $('.'+elem_class).each(function(){
      i++;
      $(this).children('label').html('Option '+i);
  });
}
