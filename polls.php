<?php
include_once('config.php');

//save|update poll here
$sql_poll = "SELECT * FROM polls";
$result_poll = $conn->query($sql_poll);

//if ($result_poll->num_rows() > 0) {
    while($row = $result_poll->fetch_object()) {
        ?>
		<a href="poll_detail.php?id=<?php echo $row->id; ?>"><?php echo $row->name; ?></a><br>
        <?php
    }
/*} else {
    echo "0 results";
}*/
$conn->close();



exit();
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