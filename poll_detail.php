<script src="js/jquery.min.js"></script>
<script src="js/jquery-ui/jquery-ui.js"></script>
<script src="js/poll.js"></script>
<script type="text/javascript">
  $(function() {
    $( ".datepicker" ).datepicker({
      dateFormat: "yy-mm-dd"
    });
  });
</script>

<link href="js/jquery-ui/jquery-ui.css" rel="stylesheet">

<form action="save_answer.php" method="post" id="save_answer" name="save_answer">
<?php
include_once('config.php');

//display poll
$poll_id = $_GET['id'];
/*echo $sql_poll = "SELECT p.name AS poll_name, q.id AS q_id, q.question, q.seq AS q_seq, tmp.id AS ans_id, tmp.answer_type, tmp.answer 
    FROM polls p 
    LEFT JOIN questions q ON q.poll_id = p.id 
    LEFT JOIN answers_template tmp ON tmp.question_id = q.id 
    WHERE p.id = '".$poll_id."' 
    ORDER BY q.seq ASC, tmp.seq ASC";
$result_poll = $conn->query($sql_poll);*/

$sql_q = "SELECT * FROM questions WHERE poll_id = '".$poll_id."' ORDER BY seq ASC";
$result_q = $conn->query($sql_q);
//if ($result_poll->num_rows() > 0) {
    while($row_q = $result_q->fetch_object()) {
        ?>
		<p>
        <?php echo $row_q->question; ?>
        <?php //echo '<input type="hidden" id="" name="question['.$row_q->id.']" value="">'; ?>
        </p>
        <?php
        $sql_ans = "SELECT * FROM answers_template WHERE question_id = '".$row_q->id."' ORDER BY seq ASC";
        $result_ans = $conn->query($sql_ans);

        $answer_type = '';
        $input_name = '';
        $options = array();

        while ($ans = $result_ans->fetch_object()) {
            if($ans->answer_type == 'text'){
                echo $ans->answer;
                echo '<input type="text" id="" name="answer['.$row_q->id.']['.$ans->id.']" value="">';
            }elseif($ans->answer_type == 'textarea'){
                echo $ans->answer;
                echo '<textarea id="" name="answer['.$row_q->id.']['.$ans->id.']" cols="40" rows="5"></textarea>';
            }elseif($ans->answer_type == 'checkbox') {
                echo '<label><input type="checkbox" id="" name="answer['.$row_q->id.']['.$ans->id.']" value="'.$ans->answer.'">';
                echo $ans->answer.'</label><br>';
            }elseif($ans->answer_type == 'option') {
                $input_name = 'answer['.$row_q->id.']';
                $options[$ans->id] = $ans->answer;
            }elseif($ans->answer_type == 'select'){
                $ddl_name = 'answer_['.$row_q->id.']';
                $ddl_id = 'answer_'.$row_q->id;
                $hidden_id = 'hidden_answer_'.$row_q->id;

                $options[] = '<option value="answer['.$row_q->id.']['.$ans->id.']">'.$ans->answer.'</option>';
            }elseif($ans->answer_type == 'datepicker'){
                echo $ans->answer;
                echo '<input type="text" readonly class="datepicker" size="10" id="" name="answer['.$row_q->id.']['.$ans->id.']" value="">';
            }
            $answer_type = $ans->answer_type;
        }

        if($answer_type == 'option'){
            $ans_html = '';
            foreach ($options as $key => $value) {
                $ans_html .= '<label><input type="radio" name="'.$input_name.'" value="'.$value.'">'.$value.'</label><br />';
            }
            
            echo $ans_html;
        }elseif($answer_type == 'select'){
            $ans_html = '<select id="'.$ddl_id.'" name="'.$ddl_name.'" onchange="set_ddl_answer(\''.$hidden_id.'\', \''.$ddl_id.'\')">';
            $ans_html .= '<option value=""></option>';
            foreach ($options as $key => $value) {
                $ans_html .= $value;
            }
            $ans_html .= '</select>';
            $ans_html .= '<input type="hidden" id="'.$hidden_id.'" name="" />';
            echo $ans_html;
        }
    }
/*} else {
    echo "0 results";
}*/
$conn->close();



/*exit();
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["id"];
    }
} else {
    echo "0 results";
}
$conn->close();

echo '<pre>';print_r($_POST);echo '</pre>';*/

?>
<p>
  <input type="hidden" id="poll_id" name="poll_id" value="<?php echo $_GET['id']; ?>" />
  <input type="submit" name="save" id="save" value="Submit Answers" />
</p>
</form>