<?php

namespace App\Utils;

use Symfony\Component\Console\Exception\InvalidArgumentException;

class CaseConverter
{

    public function camelToSnakeCase(?string $str): string
    {
        return strtolower((string) preg_replace('/[A-Z]/', '_\\0', lcfirst((string) $str)));
    }

    /**
     * Translates a string with underscores
     * into camel case (e.g. first_name -> firstName)
     *
     * @param string $str String in underscore format
     * @param bool $capitalise_first_char If true, capitalise the first char in $str
     * @return string $str translated into camel caps
     */
    function snakeToCamelCase($str, $lowerCamelCase = true): string
    {
        $camelCasedName = preg_replace_callback('/(^|_|\.)+(.)/', fn($match) => ('.' === $match[1] ? '_' : '').strtoupper((string) $match[2]), $str);

        if ($lowerCamelCase) {
            $camelCasedName = lcfirst((string) $camelCasedName);
        }

        return $camelCasedName;
    }

}
