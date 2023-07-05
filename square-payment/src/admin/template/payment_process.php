<?php 
// require_once('../../../../../../wp-config.php');
 
require 'square/square-php-sdk/example-autoload.php';

use Square\SquareClient;
use Square\LocationsApi;
use Square\Environment;
use Square\Exceptions\ApiException;
use Square\Http\ApiResponse;
use Square\Models\ListLocationsResponse;
use Square\Models\Money;
use Square\Models\CreatePaymentRequest;
use Square\Models\createPayment;

$data = json_decode(file_get_contents('php://input'), true);

$square_client = new SquareClient([
  'accessToken' => 'EAAAEN0D0WFjjsyv0S9f0dY8aWwOfVhc8S62E1Vh8Njvc96Y8Tj7uaxP2gMvmUXo',
  'environment' => Environment::SANDBOX,
]);


$payments_api = $square_client->getPaymentsApi();

$money = new Money();
$money->setAmount(100);
// Set currency to the currency for the location
$money->setCurrency("USD");

// Every payment you process with the SDK must have a unique idempotency key.
// If you're unsure whether a particular payment succeeded, you can reattempt
// it with the same idempotency key without worrying about double charging
// the buyer.

$orderId = rand(9000, 1000);
$create_payment_request = new CreatePaymentRequest($data['sourceId'], $orderId, $money);

$response = $payments_api->createPayment($create_payment_request);

if ($response->isSuccess()) {
  echo json_encode($response->getResult());
} else {
  echo json_encode($response->getErrors());
}
 ?>
