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

        while ($ans = $result_ans->fetch_object()) {
            if($ans->answer_type == 'text'){
                echo $ans->answer;
                echo '<input type="text" id="" name="answer['.$row_q->id.']['.$ans->id.']" value="">';
            }elseif($ans->answer_type == 'textarea'){
                echo $ans->answer;
                echo '<textarea id="" name="answer['.$row_q->id.']['.$ans->id.']" cols="40" rows="5"></textarea>';
            }elseif ($ans->answer_type == 'checkbox') {
                echo '<label><input type="checkbox" id="" name="answer['.$row_q->id.']['.$ans->id.']" value="'.$ans->answer.'">';
                echo $ans->answer.'</label><br>';
            }
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