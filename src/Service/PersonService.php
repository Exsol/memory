<?php

namespace App\Service;


use App\Entity\Memory;
use App\Entity\PhotoArhive;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\String\Slugger\SluggerInterface;

class PersonService
{
    public function __construct(
        private readonly ParameterBagInterface  $params,
        private readonly EntityManagerInterface $entityManager,
        private readonly SluggerInterface       $slugger,
    )
    {
    }

    public function uploadAttachments(Memory $memory, array $uploadFiles): bool|JsonResponse
    {

        foreach ($uploadFiles as $key => $uploadUserFile) {

            $originalFilename = pathinfo($uploadUserFile->getClientOriginalName(), PATHINFO_FILENAME);

            $mainPhoto = false;

            if ($originalFilename === 'Avatar_@_6226922') {
                $mainPhoto = true;
            }

            $safeFilename = $this->slugger->slug($originalFilename) . '.' . $uploadUserFile->guessExtension();

            $saveFileName = uniqid() . '.' . $this->getFileFormat($safeFilename);

            // Move the file to the directory where brochures are stored
            try {
                $uploadUserFile->move(
                    $this->params->get('files_directory'),
                    $saveFileName
                );
            } catch (FileException $e) {
                return new JsonResponse([
                    'message' => $e->getMessage(),
                    'code' => $e->getCode(),
                    'traces' => $e->getTrace(),
                ]);
            }

            if ($mainPhoto) {
                $memory->setMainPhoto($saveFileName);
            } else {
                $photoArhive = new PhotoArhive();
                $photoArhive->setPhoto($saveFileName);
                $photoArhive->setMemory($memory);
                $this->entityManager->persist($photoArhive);
            }

        }

        return true;
    }


    public function deleteAttachment(Memory $memory): void
    {

        $mainPhoto = $memory->getMainPhoto();

        if ($mainPhoto) {
            $filePath = $this->params->get('files_directory') . '/' . $mainPhoto;
            // delete old file
            unlink($filePath);
            //delete DB record
            $memory->setMainPhoto(null);
        }

        $photoArhives = $memory->getPhotoArhive();

        if (count($photoArhives) >= 1) {
            foreach ($photoArhives as $photoArhive) {
                $oldFilePath = $this->params->get('files_directory') . '/' . $photoArhive->getPhoto();
                // delete old file
                unlink($oldFilePath);

                //delete DB record
                $memory->removePhotoArhive($photoArhive);
                $this->entityManager->remove($photoArhive);
            }

        }
        //$this->entityManager->flush();

    }


    public function getFileFormat(string $fileName): string
    {
        return pathinfo($fileName, PATHINFO_EXTENSION);
    }


    public function getMainPhotoForEdit(string $mainPhoto): array
    {
        $files = array();

        //foreach ($todoAttachments as $key => $todoAttachment) {
        $file = $this->params->get('files_directory') . '/' . $mainPhoto;

        $files[] = [
            'fileFormat' => $this->getMIMEType($file),
            'fileSize' => $this->fileSizeConvert(filesize($file)),
            'fileContent' => $this->getBaseFromFile($file),
            'fileName' => preg_replace('/-[^-]*$/', '', $mainPhoto)
        ];
        //  }

        return $files;

    }

    public function getPhotoArhiveForEdit(Collection $photoArhives): array
    {
        $files = array();

        foreach ($photoArhives as $key => $photoArhive) {
            $file = $this->params->get('files_directory') . '/' . $photoArhive->getPhoto();

            $files[] = [
                'fileFormat' => $this->getMIMEType($file),
                'fileSize' => $this->fileSizeConvert(filesize($file)),
                'fileContent' => $this->getBaseFromFile($file),
                'fileName' => preg_replace('/-[^-]*$/', '', $photoArhive->getPhoto())
            ];
        }

        return $files;
    }

    public
    function getMIMEType(string $fileName): bool|string
    {
        return mime_content_type($fileName);
    }

    public
    function fileSizeConvert($bytes): string
    {
        $bytes = floatval($bytes);
        $arBytes = array(
            0 => array(
                "UNIT" => "tb",
                "VALUE" => pow(1024, 4)
            ),
            1 => array(
                "UNIT" => "gb",
                "VALUE" => pow(1024, 3)
            ),
            2 => array(
                "UNIT" => "mb",
                "VALUE" => pow(1024, 2)
            ),
            3 => array(
                "UNIT" => "kb",
                "VALUE" => 1024
            ),
            4 => array(
                "UNIT" => "b",
                "VALUE" => 1
            ),
        );

        foreach ($arBytes as $arItem) {
            if ($bytes >= $arItem["VALUE"]) {
                $result = $bytes / $arItem["VALUE"];
                $result = str_replace(".", ",", strval(round($result, 2))) . " " . $arItem["UNIT"];
                break;
            }
        }
        return $result;
    }

    public
    function getBaseFromFile(string $file): string
    {
        return base64_encode(file_get_contents($file));
    }


}
