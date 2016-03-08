$( document ).ready(function() {
    row_seq = 0;

    function add_row(row_seq) {
      field_set = '<div class-"set" id="set_'+row_seq+'">'
         +'  <p>Question:</p>'
         +'  <p>'
         +'    <input type="text" name="question['+row_seq+']" id="question_'+row_seq+'" value="">'
         +'  </p>'
         +'  <p>Answer:</p>'
         +'  <p id="answer_'+row_seq+'">'
         //+'    <input type="text" name="answer['+row_seq+']" id="answer_'+row_seq+'" value="">'
         +'  <input type="button" id="add_answer'+row_seq+'" value="Add Answer" onclick="select_input_type('+row_seq+');">'
         +'  </p>'
         +'</div>';

      //$('#field_set').append(field_set);
      $('#set_0').clone().appendTo('#set_0');
    }

    $('#add_question').click(function(){
      console.log(row_seq);
      add_row(row_seq);
      row_seq++;
    });
    $('#input_type_selector').change(function(){
      generate_input();
    });
    
    

    function select_input_type(row_seq){
      $('#input_type_wrapper').show();
    }
    
    
    function generate_input() {
      var selected_input_type = $('#input_type_selector').val();
      if(selected_input_type == 'select'){
        show_dropdown_value();
      }else if(selected_input_type == 'option'){
        show_option_value();
      }else if(selected_input_type == 'checkbox'){
        show_checkbox_value();
      }else if(selected_input_type == 'text'){
        show_text_value();
      }else if(selected_input_type == 'textarea'){
        show_textarea_value();
      }
    }

    //for textarea
    $('#add_textarea_values').click(function(){
      add_textarea_value_row();
    });
    function add_textarea_value_row(){
      $('.textarea_value_template').clone().appendTo('#textarea_value_set');
      $('#textarea_value_set p').removeClass('textarea_value_template');
    }
    function show_textarea_value(row_seq){
      $('#textarea_value_wrapper').show();
    }

    //for text
    $('#add_text_values').click(function(){
      add_text_value_row();
    });
    function add_text_value_row(){
      $('.text_value_template').clone().appendTo('#text_value_set');
      $('#text_value_set p').removeClass('text_value_template');
    }
    function show_text_value(row_seq){
      $('#text_value_wrapper').show();
    }

    //for radio option
    $('#add_option_values').click(function(){
      add_option_value_row();
    });
    function add_option_value_row(){
      $('.option_value_template').clone().appendTo('#option_value_set');
      $('#option_value_set p').removeClass('option_value_template');
      
      $('#option_value_set p a.delete_row').click(function(){
        $(this).parent().remove();
      });
    }
    function show_option_value(row_seq){
      $('#option_value_wrapper').show();
    }

    //for checkbox
    $('#add_checkbox_values').click(function(){
      add_checkbox_value_row();
    });
    function add_checkbox_value_row(){
      $('.checkbox_value_template').clone().appendTo('#checkbox_value_set');
      $('#checkbox_value_set p').removeClass('checkbox_value_template');
      
      $('#checkbox_value_set p a.delete_row').click(function(){
        $(this).parent().remove();
      });
    }
    function show_checkbox_value(row_seq){
      $('#checkbox_value_wrapper').show();
    }

    //for ddl
    $('#add_ddl_values').click(function(){
      add_ddl_value_row();
    });
    function add_ddl_value_row(){
      $('.ddl_value_template').clone().appendTo('#ddl_value_set');
      $('#ddl_value_set p').removeClass('ddl_value_template');
      
      $('#ddl_value_set p a.delete_row').click(function(){
        $(this).parent().remove();
      });
    }
    function show_dropdown_value(row_seq){
      $('#ddl_value_wrapper').show();
    }
    
});
