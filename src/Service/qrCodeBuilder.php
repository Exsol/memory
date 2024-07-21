<?php

namespace App\Service;


use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Label\Font\NotoSans;
use Endroid\QrCode\Label\Label;
use Endroid\QrCode\Label\LabelAlignment;
use Endroid\QrCode\Label\Margin\Margin;
use Endroid\QrCode\Label\Margin\MarginInterface;
use Endroid\QrCode\Logo\Logo;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PdfWriter;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Writer\SvgWriter;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class qrCodeBuilder
{
    public function __construct(
        private readonly ParameterBagInterface $params,

    )
    {
    }

    public function getQrCode(string $qrCodeUuid): string
    {

        $writer = new PngWriter();


        $projectUrl = $this->params->get('app_url');
        $url = $projectUrl . '/person/' . $qrCodeUuid;

        // Create QR person
        $qrCode = QrCode::create($url)
            ->setEncoding(new Encoding('UTF-8'))
            ->setErrorCorrectionLevel(ErrorCorrectionLevel::Low)
            ->setSize(600)
            ->setMargin(10)
            ->setRoundBlockSizeMode(RoundBlockSizeMode::Margin)
            ->setForegroundColor(new Color(0, 0, 0))
            ->setBackgroundColor(new Color(255, 255, 255));

        // Create generic logo
        $logo = Logo::create('./assets/images/logo.png')
            ->setResizeToWidth(150)
            ->setPunchoutBackground(false);

        // Create generic label
        $label = Label::create('ID2: ' . $qrCodeUuid)
            ->setTextColor(new Color(0, 0, 0))
            ->setFont(new NotoSans(20));

        $result = $writer->write($qrCode, $logo, $label);


        return $result->getDataUri();


    }

    public function getQrCodeWithLabel(string $qrCodeUuid,$label): string
    {

        $writer = new PngWriter();


        $projectUrl = $this->params->get('app_url');
        $url = $projectUrl . '/person/code/' . $qrCodeUuid;

        // Create QR person
        $qrCode = QrCode::create($url)
            ->setEncoding(new Encoding('UTF-8'))
            ->setErrorCorrectionLevel(ErrorCorrectionLevel::Low)
            ->setSize(720)
            ->setMargin(0)
            ->setRoundBlockSizeMode(RoundBlockSizeMode::Margin)
            ->setForegroundColor(new Color(0, 0, 0))
            ->setBackgroundColor(new Color(255,255,255,1));

        // Create generic logo
        $logo = Logo::create('./assets/images/logo.png')
            ->setResizeToWidth(150)
            ->setPunchoutBackground(true);

        // Create generic label
        $labelText = Label::create('НЕБЕСНЫЙ-АРХИФ.РФ №: '.$label)
            ->setTextColor(new Color(0, 0, 0))
            ->setFont(new NotoSans(27))
            ->setMargin(new Margin(0,0,24,0));

        $result = $writer->write($qrCode, null, $labelText);

        return $result->getDataUri();
    }

}
