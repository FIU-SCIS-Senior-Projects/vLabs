<?php
//This file cannot be called directly, only included.
if (str_replace(DIRECTORY_SEPARATOR, "/", __FILE__) == $_SERVER['SCRIPT_FILENAME']) {
    exit;
}


$CURRENCYSYMBOLS = array('USD' => '$',          
						 'EUR' => '&euro;', 
						 'JPY' => '&yen;',        
						 'GBP' => '&pound;',        
						 'CAD' => '$',                
						 'AUD' => '$', 				   
						 'SGD' => '$', 			 
						 'INR' => 'Rs',
						 'PLN' => '&#122;&#322',
						 'NZD' => '$',
						 'CHF' => 'chf',
						 'HKD' => '$',
						 'SEK' => 'kr',
						 'DKK' => 'kr',
						 'NOK' => 'kr',
						 'HUF' => 'ft',
						 'CZK' => '&#75;&#269;',
						 'ILS' => '&#8362;',
						 'MXN' => '$',
						 'RUB' => '&#1088;&#1091;&#1073;',
						 'BRL' => 'R$',
						 'ALL' => 'Lek',
						 'ARS' => '$',
						 'BYR' => 'p.',
						 'BOB' => '$b',
						 'BGN' => '&#1083;&#1074;',
						 'CLP' => '$',
						 'CNY' => '&#165;',
						 'COP' => '$',
						 'HRK' => 'kn',
						 'CUP' => '&#8369;',
						 'EGP' => '&pound;',
						 'EEK' => 'kr',
						 'HUF' => 'Ft',
						 'ISK' => 'kr',
						 'IDR' => 'Rp',
						 'IRR' => '&#65020;',
						 'ILS' => '&#8362;',
						 'KZT' => '&#1083;&#1074;',
						 'KPW' => '&#8361;',
						 'LVL' => 'Ls',
						 'LTL' => 'Lt',
						 'MYR' => 'RM',
						 'MNT' => '&#8366;',
						 'PKR' => '&#8360;',
						 'PLN' => '&#122;&#322;',
						 'RON' => 'lei',
						 'SAR' => '&#65020;',
						 'RSD' => '&#1044;&#1080;&#1085;&#46;',
						 'ZAR' => 'R',
						 'THB' => '&#3647;',
						 'TRY' => 'TL',
						 'UAH' => '&#8372;',
						 'VND' => '&#8363;',
						 'GEL' => '&#4314;&#4304;&#4320;&#4312;',
						 'PHP' => '&#8369;',
						 'VEF' => '&#66;&#115;&#70;',
						 'MAD' => 'د.م.',
						 '000' => '');


$CURRENCYNAMES   = array('USD' => 'US Dollars', 
						 'EUR' => 'Euros',  
						 'JPY' => 'Japanese Yen', 
						 'GBP' => 'British Pounds', 
						 'CAD' => 'Canadian Dollars', 
						 'AUD' => 'Australian Dollars', 
						 'SGD' => 'Singapore Dollars', 
						 'INR' => 'Indian Rupees',
						 'PLN' => 'Polish Zloty',
						 'NZD' => 'New Zealand Dollars',
						 'CHF' => 'Swiss Francs',
						 'HKD' => 'Hong Kong Dollars',
						 'SEK' => 'Swedish Kroner',
						 'DKK' => 'Danish Kroner',
						 'NOK' => 'Norwegian Kroner',
						 'HUF' => 'Hungarian Forints',
						 'CZK' => 'Czech Koruny',
						 'ILS' => 'Israeli Shekels',
						 'MXN' => 'Mexican Pesos',
						 'RUB' => 'Russian Rubles',
						 'BRL' => 'Brazilian Real',
						 'ALL' => 'Albanian Leke',
						 'ARS' => 'Argentinian Pesos',
						 'BYR' => 'Belarussian Rubles',
						 'BOB' => 'Bolivianos',
						 'BGN' => 'Bulgarian Leva',
						 'CLP' => 'Chilean Pesos',
						 'CNY' => 'Chinese Yuan',
						 'COP' => 'Colombian Pesos',
						 'HRK' => 'Croatian Kuna',
						 'CUP' => 'Cuban Pesos',
						 'EGP' => 'Egyptian Pounds',
						 'EEK' => 'Estonian Krooni',
						 'HUF' => 'Hungarian Forint',
						 'ISK' => 'Iceland Kronur',
						 'IDR' => 'Indonesian Rupiahs',
						 'IRR' => 'Iranian Rials',
						 'ILS' => 'Israeli Shekel',
						 'KZT' => 'Kazakhstani Tenge',
						 'KPW' => 'Korean Won',
						 'LVL' => 'Latvian Lati',
						 'LTL' => 'Lithuanian Litai',
						 'MYR' => 'Malaysian Ringgits',
						 'MNT' => 'Mongolian Tugriks',
						 'PKR' => 'Pakistani Rupees',
						 'PLN' =>'Polish Zlotych',
						 'RON' => 'Romanian New Lei',
						 'SAR' => 'Saudi Riyals',
						 'RSD' => 'Serbian Dinars',
						 'ZAR' => 'South African Rand',
						 'THB' => 'Thai Baht',
						 'TRY' => 'Turkish Lira',
						 'UAH' => 'Ukrainian Hryvnia',
						 'VND' => 'Vietnamese Dong',
						 'GEL' => 'Georgian Lari',
						 'PHP' => 'Philippine Peso',
						 'VEF' => 'Bolivares Fuertes',
						 'MAD' => 'Moroccan Dirham',
						 '000' => 'No currency symbol');
$smarty -> assign("T_CURRENCYSYMBOLS", $CURRENCYSYMBOLS);
