<?php

/*
Plugin Name: Square Payment Plugin
Plugin URI: https://example.com/
Description: Process payments using Square API
Version: 1.0
Author: Your Name
Author URI: https://example.com/

*/



// for security 
if(!defined('ABSPATH')){
    header("Location:/wp_test");
    die();
}


define('SQUARE_PLUGINS_DIR_PATH',plugin_dir_path(__FILE__));
define("SQUARE_PLUGIN_URL",plugins_url());
define("SQUARE_ADMIN_URL",get_admin_url());

 global $wpdb,$table_prefix;
 $wp_square_payment = $table_prefix.'square_payment';
 $result = $wpdb->get_results("SELECT * FROM $wp_square_payment"); 

// Square sanbox API Configuration
 
     
 
     if(!empty($result[0]->id)){
        $SANDBOX_ID = $result[0]->id ; 
        
    }else{
         $SANDBOX_ID="";
    }

    if(!empty($result[0]->sanbox_application_id)){ 
       $SANDBOX_APPLICATION_ID=$result[0]->sanbox_application_id;  
        
    }else{
        $SANDBOX_APPLICATION_ID ="";
    }

    if(!empty($result[0]->sandbox_access_token)){ 
       $SANBOX_ACCESS_TOKEN=$result[0]->sandbox_access_token;  
         
    }else{
        $SANBOX_ACCESS_TOKEN ="";
    }



define( 'SQUARE_API_SANBOX_ACCESS_TOKEN', $SANBOX_ACCESS_TOKEN); // Replace with your Square API access token
define( 'SQUARE_API_SANBOX_LOCATION_ID', $SANDBOX_APPLICATION_ID); // Replace with your Square location ID
define( 'SQUARE_API_SANBOX_ID', $SANDBOX_ID); // Replace with your Square ID


// Square production API Configuration

 
     if(!empty($result[0]->id)){
        $PRODUCTION_ID = $result[0]->id ; 
        
    }else{
         $PRODUCTION_ID="";
    }

    if(!empty($result[0]->production_application_id)){ 
       $PRODUCTION_APPLICATION_ID=$result[0]->production_application_id;  
        
    }else{
        $PRODUCTION_APPLICATION_ID ="";
    }

    if(!empty($result[0]->production_access_token)){ 
       $PRODUCTION_ACCESS_TOKEN=$result[0]->production_access_token;  
         
    }else{
        $PRODUCTION_ACCESS_TOKEN ="";
    }

 
define( 'SQUARE_API_PRODUCTION_ACCESS_TOKEN', $PRODUCTION_ACCESS_TOKEN); // Replace with your Square API access token
define( 'SQUARE_API_PRODUCTION_LOCATION_ID', $PRODUCTION_APPLICATION_ID); // Replace with your Square location ID
define( 'SQUARE_API_PRODUCTION_ID', $PRODUCTION_ID); // Replace with your Square ID

// plugin activation

function square_plugin_activate(){

   global $wpdb,$table_prefix;
   $wp_square_payment = $table_prefix.'square_payment';
  
  $qry1 = "CREATE TABLE IF NOT EXISTS $wp_square_payment(`id` INT(11) NOT NULL AUTO_INCREMENT , `sanbox_application_id` VARCHAR(255) NOT NULL ,`production_application_id` VARCHAR(255) NOT NULL , `sandbox_access_token` VARCHAR(255) NOT NULL ,`production_access_token` VARCHAR(255) NOT NULL ,`status` VARCHAR(255) NOT NULL ,`add_on` VARCHAR(255) NOT NULL ,  PRIMARY KEY (`id`)) ENGINE = InnoDB;
   ";
 $wpdb->query($qry1);

}
register_activation_hook(__FILE__, 'square_plugin_activate');

// plugin deactivation

function square_plugin_deactivation(){
    global $wpdb,$table_prefix;
    $wp_square_payment = $table_prefix.'square_payment';

    $qry1 = "TRUNCATE $wp_square_payment";
    $wpdb->query($qry1);
}
register_deactivation_hook(__FILE__, 'square_plugin_deactivation');


// Add Menu and Submenu Page
function square_payment_menu() {
    add_menu_page(
        'Square Payment', // Page title
        'Square Payment', // Menu title
        'manage_options', // Capability required to access the page
        'square-payment', // Menu slug
        'example_plugin_settings_page', // Callback function to render the page
        'dashicons-admin-plugins', // Icon URL or Dashicons class
        30 // Position of the menu item
    );

}
add_action('admin_menu', 'square_payment_menu');

// Render Settings Page
function example_plugin_settings_page() {
include('src/admin/dashboard.php');
}

// Register Plugin Settings
function example_plugin_register_settings() {
    //register_setting('example_plugin_settings', 'option_1');
}
add_action('admin_init', 'example_plugin_register_settings');



// Add Square Payment Form Shortcode
function square_payment_form_shortcode($atts) {
    ob_start();
    ?>
   <!--  <form action="" method="post" id="square-payment-form">
        <input type="text" name="card_nonce" id="card-nonce" hidden>
        <input type="submit" value="Pay with Square">
    </form>

    <script src="https://js.squareup.com/v2/paymentform"></script>
    <script>
        var paymentForm = new SqPaymentForm({
            applicationId: '<?php //echo SQUARE_API_ACCESS_TOKEN; ?>',
            locationId: '<?php //echo SQUARE_API_LOCATION_ID; ?>',
            inputClass: 'sq-input',
            cardNumber: {
                elementId: 'card-nonce',
                placeholder: 'Card Number'
            },
            cvv: {
                elementId: 'card-nonce',
                placeholder: 'CVV'
            },
            expirationDate: {
                elementId: 'card-nonce',
                placeholder: 'MM/YY'
            },
            postalCode: {
                elementId: 'card-nonce',
                placeholder: 'Postal Code'
            },
            callbacks: {
                cardNonceResponseReceived: function(errors, nonce, cardData) {
                    if (errors) {
                        // Handle errors
                        console.error(errors);
                    } else {
                        // Set card nonce value and submit form
                        document.getElementById('card-nonce').value = nonce;
                        document.getElementById('square-payment-form').submit();
                    }
                }
            }
        });

        document.getElementById('square-payment-form').addEventListener('submit', function(event) {
            event.preventDefault();
            paymentForm.requestCardNonce();
        });
    </script> -->

<head>
  <!-- <link rel="stylesheet" href="/reference/sdks/web/static/styles/code-preview.css" preload> -->
  <script src="https://sandbox.web.squarecdn.com/v1/square.js"></script>
  <style>
      
.button1 { 
      color: #ffffff;
    background-color: #006aff;
    border-radius: 5px;
    cursor: pointer;
    border-style: none;
    user-select: none;
    outline: none;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    padding: 12px;
    width: 47%;
}

.button1:hover {
  background-color: #4CAF50;
  color: white;
}

  </style>
</head>
<body>
<div id="payment-form">
 
    <div style="display:flex; justify-content: center; margin-bottom: 0px;">       
         <div id="card-container" style="margin-bottom: 0px;"></div> 
    </div>

    <div style="display:flex; justify-content: center; color:green;">       
          <div id="payment-status-container"></div>
    </div>
  
</div>

 <div style="display:flex; justify-content: center; margin-top: 0px;">
      <button id="card-button" class="button1" type="button">Pay</button>
  </div>

  <script type="module">
    const payments = Square.payments('<?php echo SQUARE_API_SANBOX_LOCATION_ID; ?>', '<?php echo SQUARE_API_SANBOX_ACCESS_TOKEN; ?>');
    const card = await payments.card();
    await card.attach('#card-container');

    const cardButton = document.getElementById('card-button');
    cardButton.addEventListener('click', async () => {
      const statusContainer = document.getElementById('payment-status-container');

      try {
        const result = await card.tokenize();
        if (result.status === 'OK') {
          console.log(`Payment token is ${result.token}`);
          statusContainer.innerHTML = "Payment Successful.";
        } else {
          let errorMessage = `Tokenization failed with status: ${result.status}`;
          if (result.errors) {
            errorMessage += ` and errors: ${JSON.stringify(
              result.errors
            )}`;
          }

          throw new Error(errorMessage);
        }
      } catch (e) {
        console.error(e);
        statusContainer.innerHTML = "Payment Failed";
      }
    });
  </script>
</body>








    <?php
    return ob_get_clean();
}
add_shortcode('square_payment_form', 'square_payment_form_shortcode');

// Process Payment
function process_square_payment() {
    if (isset($_POST['card_nonce'])) {
        $card_nonce = $_POST['card_nonce'];
        // Process payment using Square API and $card_nonce
        // You can use Square's PHP SDK to interact with the API
        // Example: https://developer.squareup.com/docs/payments-api/accept-a-payment
        // Add your payment processing logic here
        // Once payment is processed, you can display a success message or redirect to a thank you page
    }
}
add_action('init', 'process_square_payment');

/***
 ----------------------------------------------------------------
     REGISTER FRONTEND TEMPLATES
 ---------------------------------------------------------------- 
***/

  function my_template_array()
  {
    $temp = [];
    $temps['payment_form.php'] = 'Square Payment';
    return $temps;
  }

  function my_template_register($page_templates,$theme,$post)
  {
    $templates  = my_template_array();
    foreach($templates as $tk => $tv)
    {
      $page_templates[$tk] = $tv;
    }
     return $page_templates;
  }
  add_filter('theme_page_templates','my_template_register',10,3);


  function my_template_select($template)
  {
    global $post, $wp_query, $wpdb;
    $page_temp_slug = get_page_template_slug($post->ID);

    $templates = my_template_array();
    
    if(isset($templates[$page_temp_slug]))
    {
        $template = plugin_dir_path(__FILE__).'src/admin/template/'.$page_temp_slug;
    }
    // echo $template;
    // echo '<pre>Preformatted';print_r($page_temp_slug);echo '</pre>';
    return $template;
  }
  add_filter('template_include','my_template_select',99);

?>

