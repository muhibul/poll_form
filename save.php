<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "poll";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

//save|update poll here
$sql_poll = "INSERT INTO polls (id, name, create_date) VALUES(UUID(), '".$_POST['poll_name']."', NOW())";
$result_poll = $conn->query($sql_poll);
//echo '<pre>';print_r($result_poll);echo '</pre>';
//echo "<br>";
if($result_poll){
	//save|update question here
	foreach ($_POST['question'] as $q_seq => $question) {
		$sql_question = "INSERT INTO questions (id, poll_id, question, create_date, seq) VALUES(UUID(), '".$poll_id."', '".$question."', NOW(), '".$q_seq."')";
		$result_question = $conn->query($sql_question);

		if($result_question){
			echo '<pre>';print_r($_POST['answer'][$q_seq]);echo '</pre>';
			/*foreach ($_POST['answer'][$q_seq] as $key => $value) {
				array_pop($_POST['answer'][$key]);
			}
			echo '<pre>';print_r($_POST['answer'][$q_seq]);echo '</pre>';*/
			foreach ($_POST['answer'][$q_seq] as $ans_seq => $answer) {
				echo '<br>';
				$answer_type = $ans_seq;
				if($ans_seq !== 'type'){
					echo $sql_answer = "INSERT INTO answers_template (id, question_id, answer_type, answer, seq) VALUES(UUID(), '".$question_id."', '".$answer_type."', '".$answer."', '".$ans_seq."')";
					$result_answer = $conn->query($sql_answer);
				}
				//echo '<pre>';print_r($answer);echo '</pre>';

			}
		}
		

		echo "<p>";
	}
}
$conn->close();
exit();
//$sql = "INSERT INTO questions (id, poll_id, question, create_date, seq) VALUES(UUID(), '".$_POST['question'][$question]."')";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["id"];
    }
} else {
    echo "0 results";
}
$conn->close();

echo '<pre>';print_r($_POST);echo '</pre>';

?>