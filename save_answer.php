<?php
include_once('config.php');



	//save|update question here
	//foreach ($_POST['question'] as $q_seq => $question) {
		//$sql_question = "INSERT INTO questions (id, poll_id, question, create_date, seq) VALUES(UUID(), '".$poll_id."', '".$question."', NOW(), '".$q_seq."')";
		//$result_question = $conn->query($sql_question);

		//if($result_question){
			//echo '<pre>';print_r($_POST);echo '</pre>';
			
			foreach ($_POST['answer'] as $key => $answer) {
				$poll_id = $_POST['poll_id'];
				$q_id = $key;
				//$ans_id = $_POST['poll_id'];
				//$ans = $answer;

				foreach ($answer as $ans_key => $ans_value) {
					$ans = $ans_value;
					echo $ans_id = $_POST['answer_id'][$q_id][$ans_key];//$ans_key;
					echo '<pre>';print_r($ans_id);echo '</pre>';
					echo $sql_answer = "INSERT INTO answers (id, poll_id, question_id, answer_id, answer) VALUES(UUID(), '".$poll_id."', '".$q_id."', '".$ans_id."', '".$ans."')";
					echo "<br>";
					$result_answer = $conn->query($sql_answer);
				}
				//$user_id = $_POST['poll_id'];


				//if($ans_seq !== 'type'){
					
					//$result_answer = $conn->query($sql_answer);
				//}
				//echo '<pre>';print_r($answer);echo '</pre>';

			}
		// }
		

		// echo "<p>";
	//}

$conn->close();
exit();

?>