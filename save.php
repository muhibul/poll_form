<?php
include_once('config.php');

//generate poll id
$poll_id_result = $conn->query("SELECT UUID() AS id");
$poll_id = $poll_id_result->fetch_object();

$sql_poll = "INSERT INTO polls (id, name, create_date) VALUES('".$poll_id->id."', '".$_POST['poll_name']."', NOW())";
$result_poll = $conn->query($sql_poll);
//echo '<pre>';print_r($result_poll);echo '</pre>';
//echo "<br>";
if($result_poll){
	//save|update question here
	foreach ($_POST['question'] as $q_seq => $question) {
		//generate question id
		$q_id_result = $conn->query("SELECT UUID() AS id");
		$q_id = $q_id_result->fetch_object();

		$sql_question = "INSERT INTO questions (id, poll_id, question, create_date, seq) VALUES('".$q_id->id."', '".$poll_id->id."', '".$question."', NOW(), '".$q_seq."')";
		$result_question = $conn->query($sql_question);

		if($result_question){
			//echo '<pre>';print_r($_POST['answer'][$q_seq]);echo '</pre>';
			
			foreach ($_POST['answer'][$q_seq]['item'] as $ans_seq => $answer) {
				//echo '<br>';
				$answer_type = $_POST['answer'][$q_seq]['type'];
				if($ans_seq !== 'type'){
					//generate answer id
					$ans_id_result = $conn->query("SELECT UUID() AS id");
					$ans_id = $ans_id_result->fetch_object();
					$sql_answer = "INSERT INTO answers_template (id, question_id, answer_type, answer, seq) VALUES('".$ans_id->id."', '".$q_id->id."', '".$answer_type."', '".$answer."', '".$ans_seq."')";
					$result_answer = $conn->query($sql_answer);
				}
			}
		}
		

		//echo "<p>";
	}
}
$conn->close();
exit();

?>