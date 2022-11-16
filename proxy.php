<?php
  // put your Yelp API key here:
  $API_KEY = 'RyncTlXKg6HRfCOgM9hQnFvAuKV8hzcPTq3gPLY02UuavAuC4YCwrSI05TZW13PjL_oueGVsMUcsSQv3eqXPe5fzhvFcMqyAZQmiq9S6FjNGZletN69YV8Muhho6Y3Yx';
  $API_HOST = "https://api.yelp.com";
  $SEARCH_PATH = "/v3/businesses/search";
  $BUSINESS_PATH = "/v3/businesses/";
  $curl = curl_init();
  if (FALSE === $curl)
     throw new Exception('Failed to initialize');
  $url = $API_HOST . $SEARCH_PATH . "?" . $_SERVER['QUERY_STRING'];
  curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,  // Capture response.
            CURLOPT_ENCODING => "",  // Accept gzip/deflate/whatever.
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "authorization: Bearer " . $GLOBALS['API_KEY'],
                "cache-control: no-cache",
            ),
        ));
  $response = curl_exec($curl);
  curl_close($curl);
  print $response;
?>
