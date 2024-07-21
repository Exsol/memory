<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class EmailExtension extends AbstractExtension
{
    public function getFilters(): array
    {
        return [
            new TwigFilter('emailStyle', function (string $key): string {
                return $this->getEmailStyle($key);
            }, ['is_safe' => ['html']]),
        ];
    }

    /**
     * Transforms the given Markdown content into HTML content.
     */
    public function getEmailStyle(string $key): string
    {
        $emailStyles = [
            'fontFamily' => 'font-family: Arial, \'Helvetica Neue\', Helvetica, sans-serif;',

            'body' => 'margin: 0; padding: 0; width: 100%; background-color: #F2F4F6;',
            'email-wrapper' => 'width: 100%; margin: 0; padding: 0; background-color: #F2F4F6;',

            /* Masthead ----------------------- */
            'email-masthead' => 'padding: 25px 0; text-align: center;',
            'email-masthead_name' => 'font-size: 16px; font-weight: bold; color: #2F3133; text-decoration: none; text-shadow: 0 1px 0 white;',

            'email-body' => 'width: 100%; margin: 0; padding: 0; border-top: 1px solid #EDEFF2; border-bottom: 1px solid #EDEFF2; background-color: #FFF;',
            'email-body_inner' => 'width: auto; max-width: 570px; margin: 0 auto; padding: 0;',
            'email-body_cell' => 'padding: 35px;',

            'email-footer' => 'width: auto; max-width: 570px; margin: 0 auto; padding: 0; text-align: center;',
            'email-footer_cell' => 'color: #AEAEAE; padding: 35px; text-align: center;',

            /* Body ------------------------------ */
            'body_action' => 'width: 100%; margin: 30px auto; padding: 0; text-align: center;',
            'body_sub' => 'margin-top: 25px; padding-top: 25px; border-top: 1px solid #EDEFF2;',

            /* Type ------------------------------ */
            'anchor' => 'color: #3869D4;',
            'header-1' => 'margin-top: 0; color: #2F3133; font-size: 18px; font-weight: bold; text-align: left;',
            'header-2' => 'margin-top: 0; color: #2F3133; font-size: 16px; font-weight: bold; text-align: left;',
            'paragraph' => 'margin-top: 0; color: #74787E; font-size: 16px; line-height: 1.5em;',
            'paragraph-sub' => 'margin-top: 0; color: #74787E; font-size: 12px; line-height: 1.5em;',
            'paragraph-center' => 'text-align: center;',

            /* Buttons ------------------------------ */
            'button' => 'display: block; display: inline-block; width: 200px; min-height: 20px; padding: 10px;
             background-color: #3869D4; border-radius: 3px; color: #ffffff; font-size: 15px; line-height: 25px;
             text-align: center; text-decoration: none; -webkit-text-size-adjust: none;',

            'button--green' => 'background-color: #22BC66;',
            'button--red' => 'background-color: #dc4d2f;',
            'button--blue' => 'background-color: #3869D4;',

            /* Alert ---------------------------------- */
            'alert' => 'position: relative;padding: .75rem 1.25rem;margin-bottom: 1rem;border: 1px solid transparent;border-radius: .25rem;',
            'alert-primary' => 'color: #004085;background-color: #cce5ff;border-color: #b8daff;',
            'alert-secondary' => 'color: #383d41;background-color: #e2e3e5;border-color: #d6d8db;',
            'alert-success' => 'color: #155724;background-color: #d4edda;border-color: #c3e6cb;',
            'alert-danger' => 'color: #721c24;background-color: #f8d7da;border-color: #f5c6cb;',

            /* Pill badges ---------------------------- */
            'badge-pill' => 'padding-top: .5em; padding-bottom: .5em; padding-right: 1em;padding-left: 1em;border-radius: 10rem;',
            'badge' => 'display: inline-block;font-size: 75%;font-weight: 700;line-height: 1;text-align: center;white-space: nowrap;vertical-align: baseline;',
            'badge-primary' => 'color: #fff;background-color: #007bff;',
            'badge-secondary' => 'color: #fff;background-color: #6c757d;',
            'badge-success' => 'color: #fff;background-color: #28a745;',
            'badge-danger' => 'color: #fff;background-color: #dc3545;',
            'badge-warning' => 'color: #000;background-color: #FFC109',

            /* Text Align */
            'text-center' => 'text-align: center;',
            'text-left' => 'text-align: left;',
            'text-right' => 'text-align: right;',
            'text-block' => 'text-align: justify;',
        ];

        return $emailStyles[$key];
    }
}
