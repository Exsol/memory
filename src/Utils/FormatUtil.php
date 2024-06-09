<?php

namespace App\Utils;

class FormatUtil
{

//    public function stringToFloat($str) {
//        if (is_int($str) || is_float($str)) { return floatval($str); }
//        if (!is_string($str)) {
//            return 'String expected but received '.gettype($str).'.';
//            //throw new Exception('String expected but received '.gettype($str).'.');
//        }
//        $str = trim($str);
//        if (!preg_match('/^(\-|\+)?[0-9][0-9\,\.]*/', $str)) {
//            return "Could not convert string to float. Given string does not match expected number format.";
//            //throw new Exception("Could not convert string to float. Given string does not match expected number format.");
//        }
//
//        $last = max(strrpos($str, ','), strrpos($str, '.'));
//        if ($last !== false) {
//            $str = strtr($str, ',.', 'XX');
//            $str[$last] = '.';
//            $str = str_replace('X', '', $str); // strtr funktioniert nicht mit $to=''
//        }
//        return (float)$str;
//    }

    /**
     * @param $num
     * @return float
     */
    public function stringToFloat($num) {
        $dotPos = strrpos((string) $num, '.');
        $commaPos = strrpos((string) $num, ',');
        $sep = (($dotPos > $commaPos) && $dotPos) ? $dotPos :
            ((($commaPos > $dotPos) && $commaPos) ? $commaPos : false);

        if (!$sep) {
            return floatval(preg_replace("/[^\\-0-9]/", "", $num));
        }

        return floatval(
            preg_replace("/[^\\-0-9]/", "", substr((string) $num, 0, $sep)) . '.' .
            preg_replace("/[^\\-0-9]/", "", substr((string) $num, $sep+1, strlen((string) $num)))
        );
    }


    /**
     * Gebe Text aus und wandel neue Zeilen in Abs�tze um
     *
     * @param string $text Text zum Ausgeben
     * @return void
     */
    public function tkp( $text )
    {
        return str_replace( ",", ".", strval( $text ) );
    }

    /**
     * Gebe Text aus und wandel neue Zeilen in Abs�tze um
     *
     * @param string $text Text zum Ausgeben
     * @return void
     */
    public function tpk( $text )
    {
        return str_replace( ".", ",", strval( $text ) );
    }

    /**
     * Formatiere eine Zahl auf 2 Stellen hinter dem Komma
     *
     * @param string $text Text zum Ausgeben
     * @return void
     */
    public function formatNumber( $number )
    {
        return sprintf( "%0.2f", $number );
    }
}