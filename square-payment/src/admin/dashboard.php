<?php include('header.php'); 
global $wpdb,$table_prefix;
$wp_square_payment = $table_prefix.'square_payment';

if (isset($_POST["san_btn"])) {

	$appId  = $_POST["appId"];
	$accToken  = $_POST["accToken"];
	$status = 1;
	$date   = date('Y-m-d H:i:s');

	if($appId == "" || $accToken == ""){
		$err_msg =  "Please fill the all Faileds";
	}else{ 
			if($wpdb->insert($wp_square_payment, array('sanbox_application_id' => $appId, 'sandbox_access_token' => $accToken, 'status' =>$status, 'add_on' =>$date ))){
				$success_msg = "Access Activating...";
				 echo '<meta http-equiv="refresh" content="1">';
			}else{
				$err_msg = "Failed";
			}
		}
	}


if(isset($_POST["pro_btn"])) {

	$appId  = $_POST["pro_appId"];
	$accToken  = $_POST["pro_accToken"];
	$status = 2;
	$date   = date('Y-m-d H:i:s');


	if($appId == "" || $accToken == ""){
		$err_msg =  "Please fill the all Faileds";
	}else{
		  
			if($wpdb->insert($wp_square_payment, array('production_application_id' => $appId, 'production_access_token' => $accToken, 'status' =>$status, 'add_on' =>$date ))){
				$success_msg = "Access Activating...";
				 echo '<meta http-equiv="refresh" content="1">';
			}else{
				$err_msg = "Failed";
			}
		}
	}

 if(isset($_POST["san_rm_btn"])){ 
 	$id = SQUARE_API_SANBOX_ID;
 
 	 
 if( $wpdb->delete( $wp_square_payment, array( 'id' => $id ) )){
           	echo '<meta http-equiv="refresh" content="3">';
           	$del_msg = "Access Token and Application ID is Deleting...";
           
           }else{
           	echo '<meta http-equiv="refresh" content="30">';
           	$del_err_msg = "Access Token and Application ID is not Deleted ";
        
           }

 }

  if(isset($_POST["pro_rm_btn"])){ 
 	$id = SQUARE_API_SANBOX_ID;
 
 	 
    if( $wpdb->delete( $wp_square_payment, array( 'id' => $id ) )){
           	echo '<meta http-equiv="refresh" content="3">';
           	$del_msg = "Access Token and Application ID is Deleting...";
           
           }else{
           	echo '<meta http-equiv="refresh" content="30">';
           	$del_err_msg = "Access Token and Application ID is not Deleted ";
        
           }

 }

?>

 

  <div class="wrap mt-3">
        <h1>Square Payment Settings</h1>
  </div>

 <script>
      $(document).ready(function(){

          $('#s_btn').click(function(){
          $(this).addClass('btn-danger');
          $(this).removeClass('btn-outline-danger ');       
          $('#p_btn').removeClass('btn-info');
          $('#p_btn').addClass('btn-outline-info');
          $('#sandboxform').css({"display":"block"});
          $('#productionform').css({"display":"none"});
                
          });

          $('#p_btn').click(function(){
          $(this).addClass('btn-info');
          $(this).removeClass('btn-outline-info ');          	
          $('#s_btn').addClass('btn-outline-danger');
 		  $('#s_btn').removeClass('btn-danger');
          $('#productionform').css({"display":"block"});
          $('#sandboxform').css({"display":"none"});
             
          });
      });

 </script>



   <div class="d-flex justify-content-center align-items-center p-3">
  		 <div class="">
  		 <button class="btn btn-outline-danger mx-1 shadow-none" id="s_btn" >Sandbox</button><button class="btn btn-outline-info mx-1 shadow-none" id="p_btn">Production</button>
  	 	</div>
 </div>
   
  <div class="container bg-white border mt-2 p-3 shadow-sm rounded form-container">
  	<div class="row">
  		

  		<div class="col-sm-12 col-lg-12 col-md-12">

	  	  <form action="" method="post" id="sandboxform">
	  	  	<h5>Sandbox Form</h5>
  			<hr>
	      	<div class="form-group mt-2 row">
	      		<div class="col-3"><label for="">Sandbox Application ID</label></div>
	      		<div class="col-6 p-0"><input type="text" name="appId" id="san_appId" class="form-control shadow-none border"<?php if(!SQUARE_API_SANBOX_LOCATION_ID == ''){echo 'Value=" '.SQUARE_API_SANBOX_LOCATION_ID . '"  ';} ?> <?php if(!SQUARE_API_SANBOX_LOCATION_ID == ''){echo 'readonly';} ?>></div>
	      	</div>

	      	<div class="form-group mt-2 row mb-5">
	      	<div class="col-3 "><label for="">Sandbox Access Token</label></div>
	      	<div class="col-6 p-0"><input type="text" name="accToken" id="san_accToken" class="form-control shadow-none border"<?php if(!SQUARE_API_SANBOX_ACCESS_TOKEN == ''){echo 'Value=" '.SQUARE_API_SANBOX_ACCESS_TOKEN . '"  ';}?> <?php if(!SQUARE_API_SANBOX_ACCESS_TOKEN == ''){echo 'readonly';} ?>>

	      		<?php if(!SQUARE_API_PRODUCTION_LOCATION_ID == ''){ $pro_activated = "Already activated in Production";} ?> 

	      		<h6 class="success_msg text-success mt-2"><?php  if(isset($success_msg)){echo $success_msg;} ?></h6>
	      		<h6 class="success_msg text-success mt-2"><?php  if(isset($pro_activated)){echo $pro_activated;} ?></h6>
				<h6 class="err_msg text-danger mt-2"><?php  if(isset($err_msg)){echo $err_msg;} ?></h6>
				<h6 class="del_msg text-success"><?php  if(isset($del_msg)){echo $del_msg;} ?></h6>
				<h6 class="del_err_msg text-danger"><?php  if(isset($del_err_msg)){echo $del_err_msg;} ?></h6>
 				
	      		</div>	      	
	      	</div>

	      	<div class="form-group row d-flex justify-content-center">	
	      		<input type="submit" class="btn btn-outline-success mx-1 w-50" value="Add" name="san_btn" id="san_add">
	      		 
	      		 <input type="submit" class="btn btn-outline-danger  mt-2 mx-1 w-50" name="san_rm_btn" id="san_remove" style="display: none" value="Remove"> 

	      	</div>
				
	      </form>
  		</div>
  	</div>

  	<div class="row">  		

  		<div class="col-sm-12 col-lg-12 col-md-12">

	  	  <form action="" method="post" id="productionform" style="display: none">
	  	  	<h5>Production Form</h5>
  			<hr>
	      	<div class="form-group mt-2 row">
	      		<div class="col-3 "><label for="">Production Application ID</label></div>
	      		<div class="col-6 p-0"><input type="text" name="pro_appId" id="production_appId" class="form-control shadow-none border" <?php if(!SQUARE_API_PRODUCTION_LOCATION_ID == ''){echo 'Value=" '.SQUARE_API_PRODUCTION_LOCATION_ID . '"  ';} ?> <?php if(!SQUARE_API_PRODUCTION_LOCATION_ID == ''){echo 'readonly';} ?>></div>
	      	</div>
	      	<div class="form-group mt-2 row">
	      		<div class="col-3 "><label for="">Production Access Token</label></div>
	      		<div class="col-6 p-0"><input type="text" name="pro_accToken" id="production_accToken" class="form-control shadow-none border" <?php if(!SQUARE_API_PRODUCTION_ACCESS_TOKEN == ''){echo 'Value=" '.SQUARE_API_PRODUCTION_ACCESS_TOKEN . '"  ';} ?> <?php if(!SQUARE_API_PRODUCTION_ACCESS_TOKEN == ''){echo 'readonly';} ?>>

				<?php if(!SQUARE_API_SANBOX_LOCATION_ID == ''){ $san_activated = "Already activated in Sandbox";} ?> 

				<h6 class="success_msg text-success mt-2"><?php  if(isset($san_activated)){echo $san_activated;} ?></h6>
	      		<h6 class="success_msg text-success mt-2"><?php  if(isset($success_msg)){echo $success_msg;} ?></h6>
				<h6 class="err_msg text-danger mt-2"><?php  if(isset($err_msg)){echo $err_msg;} ?></h6>
				<h6 class="del_msg text-success"><?php  if(isset($del_msg)){echo $del_msg;} ?></h6>
				<h6 class="del_err_msg text-danger"><?php  if(isset($del_err_msg)){echo $del_err_msg;} ?></h6>

	      	</div>
	      	</div>
	      	<div class="form-group row d-flex justify-content-center mt-5">
	      		 <input type="submit" class="btn btn-outline-success mx-1 w-50" name="pro_btn" value="Add" id="pro_add"> 
	      		 <input type="submit" class="btn btn-outline-danger mt-2 mx-1 w-50" name="pro_rm_btn" id="pro_remove" value="Remove" style="display: none"> 	 
	      	</div>

	      </form>

  		</div>
  	</div>
  </div>

<script>
	$(document).ready(function(){
      const  $sandbox_id = '<?php echo SQUARE_API_SANBOX_ID ?>';
      const  $production_id = '<?php echo SQUARE_API_PRODUCTION_ID ?>';
     // alert($production_id);

       if(!$sandbox_id == ''){
       	  $('#san_add').addClass('disabled');
       	  $('#san_appId').addClass('disabled');
       	  $('#san_accToken').addClass('disabled');
       	  $("#san_add").attr("value","Activated");
       	  $('#san_add').css({

       	  	"border":"2px solid green",
       	  	"color":"green",
       	  	"box-shadow":"none",
       	  	"outline-none":"none",

       	  });
       	  $('#san_remove').css({

       	  	"display":"block",
       	  });
       }

       if(!$production_id == ''){
       	  $('#pro_add').addClass('disabled');
       	  $('#production_appId').addClass('disabled');
       	  $('#production_accToken').addClass('disabled');
       	  $("#pro_add").attr("value","Activated");
       	  $('#pro_add').css({

       	  	"border":"2px solid green",
       	  	"color":"green",
       	  	"box-shadow":"none",
       	  	"outline-none":"none",

       	  });
       	  $('#pro_remove').css({

       	  	"display":"block",
       	  });
       }

	});
</script>
 
  <?php include('footer.php'); ?>