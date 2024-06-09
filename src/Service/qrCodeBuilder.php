<?php

namespace App\Service;



use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Label\Font\NotoSans;
use Endroid\QrCode\Label\Label;
use Endroid\QrCode\Logo\Logo;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class qrCodeBuilder
{
    public function __construct(
        private readonly ParameterBagInterface       $params,

    )
    {
    }
    public function getQrCode(string $qrCodeUuid): string
    {

        $writer = new PngWriter();


        $projectUrl = $this->params->get('app_url');
        $url = $projectUrl.'/code/'.$qrCodeUuid;

        // Create QR code
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
            ->setPunchoutBackground(false)
        ;

        // Create generic label
        $label = Label::create('ID: '.$qrCodeUuid)
            ->setTextColor(new Color(0, 0, 0))
            ->setFont(new NotoSans(20))
        ;

        $result = $writer->write($qrCode, $logo, $label);


        return $result->getDataUri();


    }

}
