<?php

namespace App\Service;

use Dompdf\Dompdf;
use Dompdf\Options;

class PdfService
{

    public function __construct()
    {
    }

    public function render(string $html, string $filename, bool $attachment = false): void
    {

        $pdfOptions = new Options();

        $pdfOptions->set('defaultFont', 'DejaVu Sans');
        $pdfOptions->set('fontHeightRatio', 1);
        $pdfOptions->set('isHtml5ParserEnabled', true);

        // Instantiate Dompdf with our options
        $dompdf = new Dompdf($pdfOptions);

        // Load HTML to Dompdf
        $dompdf->loadHtml($html);

        // (Optional) Setup the paper size and orientation 'portrait' or 'portrait'
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser (force download)
        $dompdf->stream("$filename.pdf", [
            "Attachment" => false, // inline view
        ]);
    }

}