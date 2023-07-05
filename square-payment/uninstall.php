<?php 

// if uninstall.php is not called by WordPress, die
if (!defined('WP_UNINSTALL_PLUGIN')) {
   die;
}

global $wpdb,$table_prefix;
$wp_square_payment = $table_prefix.'square_payment';

$qry1 = "DROP TABLE $wp_square_payment";
$wpdb->query($qry1);

 ?>